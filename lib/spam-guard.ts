import { z } from 'zod'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { DROP_SCORE, REVIEW_SCORE, scoreContent, totalScore, URL_RE, type Signal } from './spam-rules'

export type GuardAction = 'send' | 'review' | 'fake-success' | 'reject'

export const CONTACT_FIELDS = ['name', 'email', 'company', 'brandUrl', 'annualRevenue', 'message'] as const
export type ContactField = (typeof CONTACT_FIELDS)[number]
export type ContactValues = Record<ContactField, string>
export type FieldErrors = Partial<Record<ContactField, string>>

export interface GuardResult {
  action: GuardAction
  reasons: string[]
  score?: number
  error?: string
  fieldErrors?: FieldErrors
  data?: ContactValues
}

// ─── Config ──────────────────────────────────────────────────────────────────

const HONEYPOT_FIELD = 'website_url'
const MIN_FILL_MS = 3000
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

const TOO_MANY_REQUESTS = 'Too many requests, please try again shortly or call us.'

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const TURNSTILE_TIMEOUT_MS = 5000
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY

// Safety gate: Turnstile is on only when both keys exist. Otherwise the widget isn't rendered
// (pages pass this to the form) and the server check is skipped, so the form never breaks.
export const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && TURNSTILE_SECRET_KEY
    ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    : undefined

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100, 'Name must be 100 characters or fewer.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .max(254, 'Email must be 254 characters or fewer.')
    .pipe(z.email('Please enter a valid email address.')),
  company: z.string().trim().max(200, 'Company must be 200 characters or fewer.'),
  brandUrl: z.string().trim().max(300, 'Brand URL must be 300 characters or fewer.'),
  annualRevenue: z.string().trim().min(1, 'Please select your annual revenue.').max(50, 'Please select a valid option.'),
  message: z.string().trim().min(1, 'Please enter a message.').max(5000, 'Message must be 5,000 characters or fewer.'),
})

const HTML_TAG_RE = /<\/?\s*(?:script|a|iframe|img|div|span|style|link|meta|form|input|object|embed|svg|html|body|br|p)\b[^>]*>/i

// ─── Rate limiting ───────────────────────────────────────────────────────────

const upstashLimiter =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(RATE_LIMIT, '10 m'),
        prefix: 'estimate-form',
      })
    : null

// Fallback when Upstash isn't configured. This map lives in one server instance's memory,
// so on serverless (Vercel) each instance counts separately and the limit is best-effort only.
const memoryHits = new Map<string, number[]>()

async function isRateLimited(ip: string): Promise<boolean> {
  if (upstashLimiter) {
    try {
      return !(await upstashLimiter.limit(ip)).success
    } catch (err) {
      // Don't block real customers because Redis is down.
      console.error('[spam-guard] Upstash rate limit failed, allowing request', err)
      return false
    }
  }

  const now = Date.now()
  const recent = (memoryHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  memoryHits.set(ip, recent)

  if (memoryHits.size > 5000) {
    for (const [key, times] of memoryHits) {
      if (now - times[times.length - 1] >= RATE_WINDOW_MS) memoryHits.delete(key)
    }
  }

  return recent.length > RATE_LIMIT
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip')?.trim() ||
    'unknown'
  )
}

export function readContactValues(formData: FormData): ContactValues {
  return Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, String(formData.get(field) ?? '')]),
  ) as ContactValues
}

// Both timestamps come from the client clock, so the difference is immune to client/server clock skew.
function checkTiming(formData: FormData): 'too-fast' | 'ok' | 'invalid' {
  const renderedAt = Number(formData.get('renderedAt'))
  const submittedAt = Number(formData.get('submittedAt'))
  if (!(renderedAt > 0) || !(submittedAt > 0) || submittedAt < renderedAt) return 'invalid'
  return submittedAt - renderedAt < MIN_FILL_MS ? 'too-fast' : 'ok'
}

function linkRatio(text: string): number {
  const chars = text.replace(/\s/g, '').length
  if (!chars) return 0
  const linkChars = (text.match(URL_RE) ?? []).reduce((sum, url) => sum + url.length, 0)
  return linkChars / chars
}

async function verifyTurnstile(token: string, ip: string): Promise<'pass' | 'fail' | 'unavailable'> {
  const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY ?? '', response: token })
  if (ip !== 'unknown') body.set('remoteip', ip)

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
    })
    if (!res.ok) return 'unavailable'
    const result = (await res.json()) as { success: boolean; 'error-codes'?: string[] }
    if (result.success) return 'pass'
    return result['error-codes']?.includes('internal-error') ? 'unavailable' : 'fail'
  } catch {
    return 'unavailable'
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function runChecks(formData: FormData, ip: string): Promise<GuardResult> {
  if (await isRateLimited(ip)) {
    return { action: 'reject', reasons: ['rate limit exceeded'], error: TOO_MANY_REQUESTS }
  }

  if (String(formData.get(HONEYPOT_FIELD) ?? '').trim()) {
    return { action: 'fake-success', reasons: ['honeypot filled'] }
  }

  // Soft signals: each adds weight; the total decides send / review / drop (thresholds in spam-rules.ts).
  const signals: Signal[] = []

  const timing = checkTiming(formData)
  if (timing === 'too-fast') {
    return { action: 'fake-success', reasons: [`submitted in under ${MIN_FILL_MS / 1000}s`] }
  }
  if (timing === 'invalid') signals.push({ reason: 'missing or invalid form timestamp', weight: 2 })

  const parsed = contactSchema.safeParse(readContactValues(formData))
  if (!parsed.success) {
    const fieldErrors: FieldErrors = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField
      fieldErrors[field] ??= issue.message
    }
    return { action: 'reject', reasons: [], error: 'Please fix the highlighted fields.', fieldErrors }
  }
  const data = parsed.data

  // Hard blocks: visible error, never a silent drop, so a real person can fix and resend.
  if (Object.values(data).some((value) => HTML_TAG_RE.test(value))) {
    return {
      action: 'reject',
      reasons: ['HTML/script tags in submission'],
      error: 'Please remove any HTML or code from your message and try again.',
    }
  }
  if (linkRatio(data.message) > 0.8) {
    return {
      action: 'reject',
      reasons: ['message is more than 80% links'],
      error: 'Please describe your inquiry in a few words. Messages that are only links can’t be sent.',
      fieldErrors: { message: 'Please add a short description, not just links.' },
    }
  }

  if (turnstileSiteKey) {
    const token = String(formData.get('cf-turnstile-response') ?? '')
    if (!token) {
      // Widget blocked (ad blocker, network) or JS off: deliver for review rather than lock out a real person.
      signals.push({ reason: 'no Turnstile token (widget blocked or not loaded)', weight: 2 })
    } else {
      const verdict = await verifyTurnstile(token, ip)
      if (verdict === 'fail') {
        return {
          action: 'reject',
          reasons: ['Turnstile verification failed'],
          error: 'Security check failed. Please try again.',
        }
      }
      if (verdict === 'unavailable') {
        signals.push({ reason: 'Turnstile verification unavailable (error or timeout)', weight: 2 })
      }
    }
  }

  signals.push(...scoreContent(data))

  const score = totalScore(signals)
  const reasons = signals.map((signal) => `${signal.reason} (+${signal.weight})`)
  const action = score >= DROP_SCORE ? 'fake-success' : score >= REVIEW_SCORE ? 'review' : 'send'
  return { action, reasons, score, data }
}

export async function checkSubmission(formData: FormData, ip: string): Promise<GuardResult> {
  const result = await runChecks(formData, ip)
  if (result.reasons.length) {
    const score = result.score === undefined ? '' : ` score=${result.score}`
    // Dropped by score: log the sender so a false positive can still be found and followed up.
    const from = result.action === 'fake-success' && result.data ? ` from="${result.data.name}" <${result.data.email}>` : ''
    console.warn(`[spam-guard] ${result.action}${score} ip=${ip}${from}: ${result.reasons.join('; ')}`)
  }
  return result
}

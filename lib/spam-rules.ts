import type { ContactValues } from './spam-guard'

// Content scoring for the estimate form. No server-only imports, so `npm run test:spam` can run it
// directly against the sample corpus in scripts/spam-samples.ts.

export interface Signal {
  reason: string
  weight: number
}

// Total weight >= REVIEW_SCORE: delivered with a [Review] tag. >= DROP_SCORE: silently dropped (the
// sender still sees success). Keep any single signal that a real lead could trip below DROP_SCORE.
export const REVIEW_SCORE = 2
export const DROP_SCORE = 6

export const URL_RE = /\b(?:https?:\/\/|www\.)[^\s<>"]+/gi
const BARE_DOMAIN_RE = /\b[\w-]+\.(?:com|net|org|io|co|info|biz|xyz|ru|top|site|online)\b/i
// U+FFFD shows up where a bulk sender's emoji got mangled.
const EMOJI_RE = /[\p{Emoji_Presentation}�]/gu

// [pattern, label, weight], matched against name + company + message.
const SPAM_PHRASES: [RegExp, string, number][] = [
  // SEO / link spam
  [/\bseo (?:services?|agency|expert|package)/i, 'SEO services', 3],
  [/\bsearch engine optimi[sz]ation\b/i, 'search engine optimization', 3],
  [/\bfirst page of google\b/i, 'first page of Google', 3],
  [/\bback-?links?\b/i, 'backlinks', 3],
  [/\blink[- ]building\b/i, 'link building', 3],
  [/\bguest[- ]posts?\b/i, 'guest post', 3],
  [/\bgoogle (?:maps|business profile)\b/i, 'Google Maps / Business Profile', 2],
  [/\bwhere (?:people|customers) are (?:already )?searching\b/i, 'where people are searching', 3],
  [/\b(?:we|i) (?:can )?(?:place|put|rank|list|get) your (?:business|website|company|site)\b/i, 'we place your business', 3],
  // Lead lists / outreach tools
  [/\bb2b (?:data|leads?|database|lead finder)\b/i, 'B2B data / leads', 3],
  [/\blead (?:finder|lists?|generation)\b/i, 'lead finder / lead generation', 2],
  [/\bverified emails?\b/i, 'verified emails', 2],
  [/\b(?:email|outreach) campaigns?\b/i, 'email campaigns', 2],
  [/\bcold[- ]call(?:s|ing)?\b/i, 'cold calling', 2],
  [/\bchromewebstore\.google\.com|\bchrome extension\b/i, 'Chrome extension', 2],
  // Mass-mail tells: templated for an inbox, not a web form
  [/\breply to this (?:email|message)\b/i, 'reply to this email', 3],
  [/\bunsubscribe\b|\bopt[- ]out\b/i, 'unsubscribe / opt out', 3],
  [/\baffiliate program\b/i, 'affiliate program', 2],
  [/\b\d+% commission\b/i, '% commission', 2],
  [/\bclaim your (?:seat|spot|free|offer|account)\b/i, 'claim your seat', 2],
  [/\bare you interested\b/i, 'are you interested?', 2],
  [/\bdear (?:sir|madam|business owner|website owner)\b/i, 'dear sir/madam', 2],
  // Off-topic
  [/\bcrypto(?:currency)?\b/i, 'crypto', 3],
  [/\bbitcoin\b/i, 'bitcoin', 3],
  [/\bforex\b/i, 'forex', 3],
  [/\bcasino\b/i, 'casino', 3],
]

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'sharklasers.com',
  '10minutemail.com',
  'temp-mail.org',
  'tempmail.com',
  'yopmail.com',
  'trashmail.com',
  'getnada.com',
  'dispostable.com',
  'maildrop.cc',
  'throwawaymail.com',
])

// Domains seen in spam the client received, as sender or as the thing being promoted. Enough to drop alone.
const BLOCKED_DOMAINS = ['freeb2bdata.org', 'jmailservice.com']

// Brand URLs nobody gives as their own site.
const PLACEHOLDER_HOSTS = new Set(['google.com', 'bing.com', 'yahoo.com', 'example.com', 'test.com', 'localhost'])

function hostOf(url: string): string {
  try {
    return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

export function totalScore(signals: Signal[]): number {
  return signals.reduce((sum, signal) => sum + signal.weight, 0)
}

export function scoreContent(data: ContactValues): Signal[] {
  const signals: Signal[] = []
  const add = (reason: string, weight: number) => signals.push({ reason, weight })
  const { name, email, company, brandUrl, message } = data
  const domain = email.split('@').pop()?.toLowerCase() ?? ''

  for (const blocked of BLOCKED_DOMAINS) {
    if (domain === blocked || `${brandUrl}\n${message}`.toLowerCase().includes(blocked)) {
      add(`blocked domain: ${blocked}`, DROP_SCORE)
    }
  }

  const urlCount = (message.match(URL_RE) ?? []).length
  if (urlCount >= 3) add(`${urlCount} links in message`, 2)

  const letters = message.match(/\p{L}/gu)?.length ?? 0
  const latin = message.match(/\p{Script=Latin}/gu)?.length ?? 0
  const vowels = message.match(/[aeiouy]/gi)?.length ?? 0
  if (letters >= 20 && latin / letters < 0.5) add('message is mostly non-Latin text', 3)
  else if (latin >= 30 && vowels / latin < 0.2) add('message looks garbled', 3)

  const emoji = message.match(EMOJI_RE)?.length ?? 0
  if (emoji >= 3) add(`${emoji} emoji / mangled characters in message`, 2)

  const text = `${name}\n${company}\n${message}`
  for (const [re, label, weight] of SPAM_PHRASES) {
    if (re.test(text)) add(`spam phrase: ${label}`, weight)
  }

  if (DISPOSABLE_DOMAINS.has(domain)) add(`disposable email domain: ${domain}`, 3)

  if (new RegExp(URL_RE.source, 'i').test(name) || BARE_DOMAIN_RE.test(name)) add('URL in name field', 3)

  if (company && company.trim().toLowerCase() === name.trim().toLowerCase()) add('company is the same as name', 2)

  const host = brandUrl ? hostOf(brandUrl) : ''
  if (PLACEHOLDER_HOSTS.has(host)) add(`placeholder brand URL: ${host}`, 3)

  return signals
}

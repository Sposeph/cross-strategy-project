"use server"

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import { contactEmailQuery } from '@/sanity/lib/queries'
import { checkSubmission, getClientIp, readContactValues, type ContactValues, type FieldErrors } from '@/lib/spam-guard'

export interface ContactFormState {
  ok: boolean
  error?: string
  fieldErrors?: FieldErrors
  // Echoed back so the form can refill itself; React resets uncontrolled fields after every action.
  values?: ContactValues
}

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = readContactValues(formData)
  const guard = await checkSubmission(formData, getClientIp(await headers()))

  if (guard.action === 'fake-success') {
    return { ok: true }
  }

  if (guard.action === 'reject' || !guard.data) {
    return { ok: false, error: guard.error, fieldErrors: guard.fieldErrors, values }
  }

  const { name, email, company, brandUrl, annualRevenue, message } = guard.data
  const review = guard.action === 'review'

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact form] RESEND_API_KEY is not set')
    return { ok: false, error: 'Failed to send message. Please try again.', values }
  }

  // Recipient is editable in Sanity (Site Settings → Contact Email); env is the fallback.
  const recipient =
    (await client.fetch<string | null>(contactEmailQuery).catch(() => null)) ||
    process.env.RESEND_TO_EMAIL

  if (!recipient) {
    console.error('[contact form] no recipient: set Site Settings → Contact Email or RESEND_TO_EMAIL')
    return { ok: false, error: 'Failed to send message. Please try again.', values }
  }

  const { error } = await resend.emails.send({
    // swap 'from' to a verified domain address once the domain is verified in Resend
    from: process.env.RESEND_FROM_EMAIL || 'CrossStrat <onboarding@resend.dev>',
    to: recipient,
    replyTo: email,
    subject: `${review ? '[Review] ' : ''}New lead: ${name}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${company ? escapeHtml(company) : '—'}</p>
      <p><strong>Brand URL:</strong> ${brandUrl ? escapeHtml(brandUrl) : '—'}</p>
      <p><strong>Annual Revenue:</strong> ${escapeHtml(annualRevenue)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      ${review ? `
      <hr />
      <p><strong>Flagged for review (delivered anyway):</strong></p>
      <ul>${guard.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join('')}</ul>
      ` : ''}
    `,
  })

  if (error) {
    console.error('[contact form] Resend error', error)
    return { ok: false, error: 'Failed to send message. Please try again.', values }
  }

  return { ok: true }
}

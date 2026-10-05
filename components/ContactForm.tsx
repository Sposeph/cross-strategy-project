"use client"

import { useActionState, useEffect, useRef } from 'react'
import Script from 'next/script'
import { sendContactMessage, type ContactFormState } from '@/app/actions/contact'
import AnimateIn from './AnimateIn'
import type { ContactSection } from '@/sanity/types'

const INITIAL_STATE: ContactFormState = { ok: false }
const TURNSTILE_MIN_FLEXIBLE_WIDTH = 300 // Cloudflare's minimum width for size: 'flexible'

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: { sitekey: string; theme?: 'light' | 'dark' | 'auto'; size?: 'normal' | 'flexible' | 'compact' },
      ) => string | undefined
      reset: (widgetId: string) => void
    }
  }
}

interface ContactFormProps {
  section?: ContactSection
  // Only set when both Turnstile keys exist (see lib/spam-guard.ts); undefined = no widget.
  turnstileSiteKey?: string
}

function SplitHeadline({ headline, accent, className }: { headline: string; accent?: string; className: string }) {
  if (!accent || !headline.includes(accent)) {
    return <h2 className={className}>{headline}</h2>
  }
  const before = headline.slice(0, headline.lastIndexOf(accent)).trimEnd()
  return (
    <h2 className={className}>
      {before}{' '}
      <em className="italic text-brand-red">{accent}</em>
    </h2>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return <p id={id} className="font-barlow text-brand-red text-label">{message}</p>
}

export default function ContactForm({ section, turnstileSiteKey }: ContactFormProps) {
  const [state, action, pending] = useActionState(sendContactMessage, INITIAL_STATE)
  const renderedAtRef = useRef<HTMLInputElement>(null)
  const submittedAtRef = useRef<HTMLInputElement>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstileIdRef = useRef<string | undefined>(undefined)
  const errors = state.fieldErrors ?? {}
  const values = state.values

  // Set on mount, not during render, so SSR/hydration markup matches.
  useEffect(() => {
    if (renderedAtRef.current) renderedAtRef.current.value = String(Date.now())
  }, [])

  // Turnstile tokens are single-use: get a fresh one after every server response that keeps the form open.
  useEffect(() => {
    if (state === INITIAL_STATE || state.ok || !turnstileIdRef.current) return
    window.turnstile?.reset(turnstileIdRef.current)
  }, [state])

  function renderTurnstile() {
    const el = turnstileRef.current
    if (!turnstileSiteKey || !el || !window.turnstile || turnstileIdRef.current) return
    turnstileIdRef.current = window.turnstile.render(el, {
      sitekey: turnstileSiteKey,
      theme: 'dark',
      size: el.offsetWidth >= TURNSTILE_MIN_FLEXIBLE_WIDTH ? 'flexible' : 'compact',
    })
  }

  const eyebrow        = section?.contactEyebrow        ?? 'Get In Touch'
  const headline       = section?.contactHeadline       ?? 'Ready to get your brand on shelves?'
  const headlineAccent = section?.contactHeadlineAccent ?? 'on shelves?'
  const subheadline    = section?.contactSubheadline    ?? "Send a message and we'll follow up within one business day."
  const successMsg     = section?.contactSuccessMessage ?? "We'll be in touch within one business day."

  const f = section?.contactForm
  const optional = f?.optionalLabel ?? '(optional)'
  const revenueOptions = f?.revenueOptions?.length
    ? f.revenueOptions
    : ['$0-$2M', '$2-$5M', '$5-$25M', '$25-$50M', '$50M+']

  return (
    <section
      id="contact"
      className="bg-brand-jet-black py-24 px-6 lg:px-12"
      aria-label="Contact form"
    >
      <AnimateIn className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="fade-up-item stagger-1 small-caps font-barlow font-bold text-brand-dim-grey tracking-widest text-label">
            {eyebrow}
          </p>
          <div className="w-12 h-0.5 bg-brand-red mx-auto mt-3 mb-6" aria-hidden="true" />
          <SplitHeadline
            headline={headline}
            accent={headlineAccent}
            className="fade-up-item stagger-2 font-playfair text-display-sm md:text-display-md text-brand-alabaster leading-tight"
          />
          <p className="fade-up-item stagger-3 font-barlow text-brand-silver text-body mt-6 max-w-xl mx-auto leading-relaxed">
            {subheadline}
          </p>
        </div>

        {state.ok ? (
          <div className="fade-up-item stagger-2 bg-[#222222] border border-brand-dim-grey p-10 text-center">
            <div className="w-10 h-0.5 bg-brand-red mx-auto mb-6" aria-hidden="true" />
            <p className="font-playfair text-brand-alabaster text-display-sm">
              {f?.successHeading ?? 'Message received.'}
            </p>
            <p className="font-barlow text-brand-silver text-body mt-4 leading-relaxed">
              {successMsg}
            </p>
          </div>
        ) : (
          <form
            action={action}
            onSubmit={() => {
              if (submittedAtRef.current) submittedAtRef.current.value = String(Date.now())
            }}
            noValidate
            className="fade-up-item stagger-2 space-y-5"
          >
            {/* Honeypot — moved off-screen (not display:none, which some bots skip), catches bot submissions */}
            <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
              <label htmlFor="contact-website-url">Website</label>
              <input id="contact-website-url" name="website_url" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <input ref={renderedAtRef} type="hidden" name="renderedAt" />
            <input ref={submittedAtRef} type="hidden" name="submittedAt" />

            {state.error && (
              <p
                role="alert"
                className="font-barlow text-brand-red text-label bg-brand-red/10 border border-brand-red/30 px-4 py-3"
              >
                {state.error}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="font-barlow font-semibold text-brand-silver text-label tracking-wide"
                >
                  {f?.nameLabel ?? 'Name'} <span className="text-brand-red" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  defaultValue={values?.name}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200"
                  placeholder={f?.namePlaceholder ?? 'Jane Smith'}
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="font-barlow font-semibold text-brand-silver text-label tracking-wide"
                >
                  {f?.emailLabel ?? 'Email'} <span className="text-brand-red" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue={values?.email}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200"
                  placeholder={f?.emailPlaceholder ?? 'jane@yourbrand.com'}
                />
                <FieldError id="contact-email-error" message={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-company"
                  className="font-barlow font-semibold text-brand-silver text-label tracking-wide"
                >
                  {f?.companyLabel ?? 'Brand / Company'}{' '}
                  <span className="text-brand-dim-grey font-normal">{optional}</span>
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  defaultValue={values?.company}
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? 'contact-company-error' : undefined}
                  className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200"
                  placeholder={f?.companyPlaceholder ?? 'Your Brand Co.'}
                />
                <FieldError id="contact-company-error" message={errors.company} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-brand-url"
                  className="font-barlow font-semibold text-brand-silver text-label tracking-wide"
                >
                  {f?.brandUrlLabel ?? 'Brand URL'}{' '}
                  <span className="text-brand-dim-grey font-normal">{optional}</span>
                </label>
                <input
                  id="contact-brand-url"
                  name="brandUrl"
                  type="url"
                  autoComplete="url"
                  defaultValue={values?.brandUrl}
                  aria-invalid={!!errors.brandUrl}
                  aria-describedby={errors.brandUrl ? 'contact-brand-url-error' : undefined}
                  className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200"
                  placeholder={f?.brandUrlPlaceholder ?? 'https://yourbrand.com'}
                />
                <FieldError id="contact-brand-url-error" message={errors.brandUrl} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-revenue"
                className="font-barlow font-semibold text-brand-silver text-label tracking-wide"
              >
                {f?.revenueLabel ?? 'Annual Company Revenue'} <span className="text-brand-red" aria-hidden="true">*</span>
              </label>
              <select
                id="contact-revenue"
                name="annualRevenue"
                required
                // key remounts the select so form reset keeps the echoed value (select ignores defaultValue updates)
                key={values?.annualRevenue ?? ''}
                defaultValue={values?.annualRevenue ?? ''}
                aria-invalid={!!errors.annualRevenue}
                aria-describedby={errors.annualRevenue ? 'contact-revenue-error' : undefined}
                className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 focus:outline-none focus:border-brand-red transition-colors duration-200"
              >
                <option value="" disabled>{f?.revenuePlaceholder ?? 'Select range'}</option>
                {revenueOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <FieldError id="contact-revenue-error" message={errors.annualRevenue} />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="font-barlow font-semibold text-brand-silver text-label tracking-wide"
              >
                {f?.messageLabel ?? 'Message'} <span className="text-brand-red" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                defaultValue={values?.message}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200 resize-none"
                placeholder={f?.messagePlaceholder ?? 'Tell us about your company and why you are interested in retail'}
              />
              <FieldError id="contact-message-error" message={errors.message} />
            </div>

            {turnstileSiteKey && (
              <>
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  strategy="afterInteractive"
                  onReady={renderTurnstile}
                />
                {/* Turnstile injects a hidden cf-turnstile-response input here */}
                <div ref={turnstileRef} />
              </>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full md:w-auto font-barlow font-bold text-brand-alabaster bg-brand-red px-8 py-4 hover:opacity-90 transition-opacity duration-200 text-label disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? (f?.sendingLabel ?? 'Sending…') : (f?.submitLabel ?? 'Send Message')}
            </button>
          </form>
        )}
      </AnimateIn>
    </section>
  )
}

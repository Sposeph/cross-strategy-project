"use client"

import { useActionState } from 'react'
import { sendContactMessage, type ContactFormState } from '@/app/actions/contact'
import AnimateIn from './AnimateIn'
import type { ContactSection } from '@/sanity/types'

const INITIAL_STATE: ContactFormState = { ok: false }

interface ContactFormProps {
  section?: ContactSection
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

export default function ContactForm({ section }: ContactFormProps) {
  const [state, action, pending] = useActionState(sendContactMessage, INITIAL_STATE)

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
          <form action={action} noValidate className="fade-up-item stagger-2 space-y-5">
            {/* Honeypot — hidden from users, catches bot submissions */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

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
                  className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200"
                  placeholder={f?.namePlaceholder ?? 'Jane Smith'}
                />
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
                  className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200"
                  placeholder={f?.emailPlaceholder ?? 'jane@yourbrand.com'}
                />
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
                  className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200"
                  placeholder={f?.companyPlaceholder ?? 'Your Brand Co.'}
                />
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
                  className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200"
                  placeholder={f?.brandUrlPlaceholder ?? 'https://yourbrand.com'}
                />
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
                defaultValue=""
                className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 focus:outline-none focus:border-brand-red transition-colors duration-200"
              >
                <option value="" disabled>{f?.revenuePlaceholder ?? 'Select range'}</option>
                {revenueOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
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
                className="bg-[#1a1a1a] border border-brand-dim-grey text-brand-alabaster font-barlow text-body px-4 py-3 placeholder:text-brand-dim-grey focus:outline-none focus:border-brand-red transition-colors duration-200 resize-none"
                placeholder={f?.messagePlaceholder ?? 'Tell us about your company and why you are interested in retail'}
              />
            </div>

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

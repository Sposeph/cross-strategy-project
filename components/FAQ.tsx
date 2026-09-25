import AnimateIn from './AnimateIn'
import type { FaqData, FaqSection } from '@/sanity/types'
import { FALLBACK_FAQS } from '@/lib/fallbacks'

interface FAQProps {
  faqs?: FaqData[]
  section: FaqSection
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

export default function FAQ({ faqs = FALLBACK_FAQS, section }: FAQProps) {
  const count = faqs.length

  if (!count) return null

  return (
    <section
      id="faq"
      className="bg-brand-alabaster py-24 px-6 lg:px-12"
      aria-label="Frequently asked questions about retail placement consulting"
    >
      <AnimateIn className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="fade-up-item stagger-1 small-caps font-barlow font-bold text-brand-dim-grey tracking-widest text-label">
            {section.faqEyebrow}
          </p>
          <div className="w-12 h-0.5 bg-brand-red mx-auto mt-3 mb-6" aria-hidden="true" />
          <SplitHeadline
            headline={section.faqHeadline ?? ''}
            accent={section.faqHeadlineAccent}
            className="fade-up-item stagger-2 font-playfair text-display-sm md:text-display-md text-brand-jet-black leading-tight max-w-2xl mx-auto"
          />
          {count > 0 && (
            <p className="fade-up-item stagger-3 font-barlow text-brand-dim-grey text-body mt-6 max-w-xl mx-auto leading-relaxed">
              {(section.faqSubheadline ?? `{count} question${count !== 1 ? 's' : ''} answered. Don't see yours?`).replace(
                '{count}',
                String(count),
              )}{' '}
              <a href="#contact" className="text-brand-red hover:underline">
                {section.faqHelpLinkLabel ?? 'Book a call.'}
              </a>
            </p>
          )}
        </div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto divide-y divide-brand-alabaster bg-white border border-brand-alabaster shadow-[var(--shadow-box)]">
          {faqs.map((item, i) => {
            const stagger = ['stagger-2', 'stagger-3', 'stagger-4', 'stagger-5'][i % 4]
            return (
              <details
                key={item._id}
                className={`group fade-up-item ${stagger} px-6 py-5 md:px-8`}
                {...(i === 0 ? { open: true } : {})}
              >
                <summary
                  className="flex items-center justify-between gap-4 cursor-pointer list-none font-barlow font-bold text-brand-jet-black text-subheadline leading-snug marker:content-none [&::-webkit-details-marker]:hidden"
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-8 h-8 bg-brand-red flex items-center justify-center font-barlow font-bold text-white text-lg leading-none transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="font-barlow text-brand-dim-grey text-label leading-relaxed mt-4">
                  {item.answer}
                </p>
              </details>
            )
          })}
        </div>
      </AnimateIn>
    </section>
  )
}

import Image from 'next/image'
import AnimateIn from './AnimateIn'
import { urlFor } from '@/sanity/lib/image'
import type { PartnerData, PartnersSection } from '@/sanity/types'
import { FALLBACK_PARTNERS, FALLBACK_PARTNERS_SECTION } from '@/lib/fallbacks'

interface PartnersProps {
  partners?: PartnerData[]
  section?: PartnersSection
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

export default function Partners({ partners = FALLBACK_PARTNERS, section }: PartnersProps) {
  if (!partners.length) return null

  const eyebrow       = section?.partnersEyebrow       ?? FALLBACK_PARTNERS_SECTION.partnersEyebrow
  const headline       = section?.partnersHeadline       ?? FALLBACK_PARTNERS_SECTION.partnersHeadline
  const headlineAccent = section?.partnersHeadlineAccent ?? FALLBACK_PARTNERS_SECTION.partnersHeadlineAccent
  const subheadline     = section?.partnersSubheadline     ?? FALLBACK_PARTNERS_SECTION.partnersSubheadline

  return (
    <section
      id="partners"
      className="bg-brand-jet-black py-24 px-6 lg:px-12"
      aria-label="Client and channel partners"
    >
      <AnimateIn className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {eyebrow && (
            <p className="fade-up-item stagger-1 small-caps font-barlow font-bold text-brand-dim-grey tracking-widest text-label">
              {eyebrow}
            </p>
          )}
          <div className="w-12 h-0.5 bg-brand-red mx-auto mt-3 mb-6" aria-hidden="true" />
          <SplitHeadline
            headline={headline ?? ''}
            accent={headlineAccent}
            className="fade-up-item stagger-2 font-playfair text-display-sm md:text-display-md text-brand-alabaster leading-tight max-w-2xl mx-auto"
          />
          {subheadline && (
            <p className="fade-up-item stagger-3 font-barlow text-brand-silver text-body mt-6 max-w-xl mx-auto leading-relaxed">
              {subheadline}
            </p>
          )}
        </div>

        {/* Partner cards — one wide card per row */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {partners.map((partner, i) => {
            const stagger = ['stagger-2', 'stagger-3', 'stagger-4', 'stagger-5'][i % 4]
            const logoUrl = partner.logo
              ? urlFor(partner.logo).width(600).fit('max').auto('format').url()
              : null

            return (
              <article
                key={partner._id}
                className={`fade-up-item ${stagger} group relative flex flex-col md:flex-row bg-white border-t-4 border-t-brand-red shadow-box transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#ef2626]`}
              >
                {/* Logo window, styled like a shelf-tag label. Fixed size: any logo shape scales to fit. */}
                <div className="flex items-center p-6 md:w-80 shrink-0">
                  <div className="relative w-full h-32 flex items-center justify-center bg-brand-alabaster/50 border border-dashed border-brand-dim-grey/40 p-4">
                    {logoUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={logoUrl}
                          alt={(partner.logo as { alt?: string })?.alt ?? partner.name}
                          fill
                          sizes="(min-width: 768px) 240px, 90vw"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="font-playfair text-subheadline text-brand-jet-black leading-snug text-center">
                        {partner.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col flex-1 px-6 pb-6 md:pl-0 md:pr-8 md:py-6">
                  {/* Tag header strip */}
                  <div className="flex items-center justify-between">
                    <span className="font-barlow font-bold text-[10px] tracking-[0.2em] uppercase text-brand-dim-grey">
                      {section?.partnersTagLabel ?? 'Partner'}
                    </span>
                    <span className="w-1.5 h-1.5 bg-brand-red" aria-hidden="true" />
                  </div>

                  {logoUrl && (
                    <h3 className="font-barlow font-bold text-brand-jet-black text-subheadline leading-snug mt-3">
                      {partner.name}
                    </h3>
                  )}

                  <p className="font-barlow text-brand-dim-grey text-label leading-relaxed mt-3 mb-6">
                    {partner.blurb}
                  </p>

                  {/* Barcode flourish */}
                  <div
                    className="h-3 mt-auto mb-5 opacity-60"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 2px, transparent 2px, transparent 4px, #1a1a1a 4px, #1a1a1a 5px, transparent 5px, transparent 8px)',
                    }}
                    aria-hidden="true"
                  />

                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-barlow font-bold text-brand-alabaster bg-brand-jet-black px-6 py-3 text-center group-hover:bg-brand-red transition-colors duration-200 text-label"
                  >
                    {partner.buttonLabel || 'Visit Website'} →
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </AnimateIn>
    </section>
  )
}

import AnimateIn from './AnimateIn'
import type { FeatureData, FeaturesSection } from '@/sanity/types'
import { FALLBACK_FEATURES } from '@/lib/fallbacks'

const STAGGER = ['stagger-2', 'stagger-3', 'stagger-4', 'stagger-2', 'stagger-3', 'stagger-4'] as const

interface FeaturesProps {
  features?: FeatureData[]
  section: FeaturesSection
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

export default function Features({ features = FALLBACK_FEATURES, section }: FeaturesProps) {
  return (
    <section
      id="features"
      className="bg-brand-jet-black py-24 px-6 lg:px-12"
      aria-label="What successful brands bring to the table"
    >
      <AnimateIn className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="fade-up-item stagger-1 small-caps font-barlow font-bold text-brand-dim-grey tracking-widest text-label">
            {section.featuresEyebrow}
          </p>
          <div className="w-12 h-0.5 bg-brand-red mx-auto mt-3 mb-6" aria-hidden="true" />
          <SplitHeadline
            headline={section.featuresHeadline ?? ''}
            accent={section.featuresHeadlineAccent}
            className="fade-up-item stagger-2 font-playfair text-display-sm md:text-display-md text-brand-alabaster leading-tight max-w-2xl mx-auto"
          />
          {section.featuresSubheadline && (
            <p className="fade-up-item stagger-3 font-barlow text-brand-silver text-body mt-6 max-w-xl mx-auto leading-relaxed">
              {section.featuresSubheadline}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f._id}
              className={`fade-up-item ${STAGGER[i % 6]} group flex flex-col overflow-hidden bg-[#222222] border border-brand-dim-grey hover:shadow-box transition-shadow duration-300`}
            >
              {/* Shelf tag color strip */}
              <div className="h-1 bg-brand-red shrink-0" aria-hidden="true" />

              {/* Feature banner */}
              <div className="bg-brand-red px-8 py-2">
                <span className="font-barlow font-bold text-white text-xs tracking-widest uppercase line-clamp-1">
                  {f.title}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-8">
                <h3 className="font-barlow font-bold text-brand-alabaster text-subheadline leading-snug min-h-[2.75em] mb-3">
                  {f.title}
                </h3>
                <p className="font-barlow font-medium text-brand-silver text-label leading-relaxed pt-4 border-t border-brand-dim-grey/40">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import { stegaClean } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import { aboutPageQuery } from '@/sanity/lib/queries'
import type { AboutPageData } from '@/sanity/types'
import { FALLBACK_ABOUT_PAGE } from '@/lib/fallbacks'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import AnimateIn from '@/components/AnimateIn'
import { SITE_URL, DEFAULT_OG_IMAGE, metaDescription } from '@/lib/site'

// Sanity's webhook revalidates on publish; this is the safety net if it misfires.
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const data = stegaClean((await client.fetch<AboutPageData>(aboutPageQuery)) ?? FALLBACK_ABOUT_PAGE)
  const ownerName = data.ownerName ?? FALLBACK_ABOUT_PAGE.ownerName
  const seo = data.seo ?? {}

  const title = seo.title ?? `About ${ownerName} | Retail Placement Consultant`
  // seo.description falls back to the full bio in GROQ, which runs far past what
  // search results and social cards show — trim it here.
  const description =
    metaDescription(seo.description) ??
    `${ownerName} has placed 240+ Amazon and DTC brands on shelves at Walmart, Target, Whole Foods, and 1,200+ retail doors — generating over $180M in retail revenue.`
  const ogImageUrl = seo.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).fit('crop').auto('format').url()
    : DEFAULT_OG_IMAGE.url

  return {
    title,
    description,
    alternates: { canonical: seo.canonical || '/about' },
    openGraph: {
      type: 'profile',
      url: `${SITE_URL}/about`,
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: seo.ogImage?.alt ?? title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: seo.noindex ? { index: false, follow: false } : undefined,
  }
}

export default async function AboutPage() {
  const { data: rawData } = await sanityFetch({ query: aboutPageQuery })
  const data: AboutPageData = (rawData as AboutPageData | null) ?? FALLBACK_ABOUT_PAGE

  const about: AboutPageData = {
    ownerName:      data.ownerName      ?? FALLBACK_ABOUT_PAGE.ownerName,
    ownerTitle:     data.ownerTitle     ?? FALLBACK_ABOUT_PAGE.ownerTitle,
    bioEyebrow:     data.bioEyebrow     ?? 'About',
    bio:            data.bio            ?? FALLBACK_ABOUT_PAGE.bio,
    photo:          data.photo          ?? FALLBACK_ABOUT_PAGE.photo,
    statsHighlight: data.statsHighlight?.length ? data.statsHighlight : FALLBACK_ABOUT_PAGE.statsHighlight,
    standoutQuote:  data.standoutQuote  ?? FALLBACK_ABOUT_PAGE.standoutQuote,
    standoutQuoteAuthor:      data.standoutQuoteAuthor,
    standoutQuoteAuthorTitle: data.standoutQuoteAuthorTitle,
    contactSection: data.contactSection
      ? { ...data.contactSection, contactEyebrow: stegaClean(data.contactSection.contactEyebrow) }
      : undefined,
  }

  const photoUrl = (about.photo as { asset?: unknown } | undefined)?.asset
    ? urlFor(about.photo!).width(800).height(1000).fit('crop').auto('format').url()
    : null

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${about.ownerName}`,
    url: `${SITE_URL}/about`,
    description: about.bio,
    mainEntity: {
      '@type': 'Person',
      name: about.ownerName,
      jobTitle: about.ownerTitle,
      description: about.bio,
      url: SITE_URL,
      image: photoUrl ?? undefined,
      knowsAbout: [
        'Retail Placement Consulting',
        'Consumer Goods',
        'Buyer Relations',
        'Amazon Seller Strategy',
        'DTC Brand Development',
        'Walmart Vendor Relations',
        'Whole Foods Market Placement',
        'Target Vendor Strategy',
      ],
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
    },
  }

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${about.ownerName}`,
    url: `${SITE_URL}/about#contact`,
    description: `Get in touch with ${about.ownerName} to discuss retail placement consulting for your Amazon or DTC brand.`,
  }

  const paragraphs = about.bio?.split('\n\n').filter(Boolean) ?? []

  return (
    <main>
      <JsonLd schema={aboutPageSchema} />
      <JsonLd schema={contactPageSchema} />

      {/* ── Bio section ── */}
      <section
        className="bg-brand-jet-black py-24 px-6 lg:px-12"
        aria-label={`About ${about.ownerName}`}
      >
        <AnimateIn className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Photo */}
            <div className="fade-up-item stagger-1 relative">
              {photoUrl ? (
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={(about.photo as { alt?: string })?.alt ?? `Photo of ${about.ownerName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div
                    className="absolute inset-0 border border-brand-dim-grey pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 bg-[#222222] border border-brand-dim-grey flex items-center justify-center">
                  <span className="font-playfair text-brand-dim-grey text-display-sm">
                    {about.ownerName?.charAt(0) ?? '?'}
                  </span>
                </div>
              )}

              {/* Stats overlay card */}
              {about.statsHighlight && about.statsHighlight.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {about.statsHighlight.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-[#222222] border border-brand-dim-grey p-5"
                    >
                      <p className="font-playfair text-brand-red text-display-sm leading-none">
                        {stat.value}
                      </p>
                      <p className="font-barlow text-brand-silver text-label mt-1 leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bio text */}
            <div className="fade-up-item stagger-2 flex flex-col justify-center">
              <p className="small-caps font-barlow font-bold text-brand-dim-grey tracking-widest text-label mb-3">
                {stegaClean(about.bioEyebrow)}
              </p>
              <div className="w-12 h-0.5 bg-brand-red mb-6" aria-hidden="true" />
              <h1 className="font-playfair text-display-sm md:text-display-md text-brand-alabaster leading-tight mb-2">
                {about.ownerName}
              </h1>
              {about.ownerTitle && (
                <p className="font-barlow font-semibold text-brand-red text-subheadline mb-8 tracking-wide">
                  {about.ownerTitle}
                </p>
              )}
              <div className="space-y-5">
                {paragraphs.length > 0 ? (
                  paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="font-barlow text-brand-silver text-body leading-relaxed"
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="font-barlow text-brand-silver text-body leading-relaxed">
                    {about.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ── Standout quote ── */}
      {about.standoutQuote && (
        <section
          className="bg-brand-alabaster py-20 px-6 lg:px-12"
          aria-label="Quote"
        >
          <AnimateIn className="max-w-4xl mx-auto text-center">
            <div
              className="w-12 h-0.5 bg-brand-red mx-auto mb-8 fade-up-item stagger-1"
              aria-hidden="true"
            />
            <blockquote className="fade-up-item stagger-2">
              <p className="font-playfair italic text-brand-jet-black text-display-sm md:text-display-md leading-snug">
                {about.standoutQuote}
              </p>
              {about.standoutQuoteAuthor && (
                <footer className="mt-6 font-barlow font-semibold text-brand-dim-grey text-label tracking-wide">
                  — {about.standoutQuoteAuthor}
                  {about.standoutQuoteAuthorTitle && (
                    <span className="block font-normal mt-1">{about.standoutQuoteAuthorTitle}</span>
                  )}
                </footer>
              )}
            </blockquote>
          </AnimateIn>
        </section>
      )}

      {/* ── Contact form ── */}
      <ContactForm section={about.contactSection} />
    </main>
  )
}

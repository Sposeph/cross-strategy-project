import type { Metadata } from 'next'
import { stegaClean } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { homePageQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { SITE_URL, DEFAULT_OG_IMAGE, metaDescription } from '@/lib/site'
import type { HomePageData, SiteSettingsData } from '@/sanity/types'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import Testimonials from '@/components/Testimonials'
import Benefits from '@/components/Benefits'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import CallToAction from '@/components/CallToAction'
import FAQ from '@/components/FAQ'
import Partners from '@/components/Partners'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import SectionDivider from '@/components/SectionDivider'
import {
  FALLBACK_HERO,
  FALLBACK_CREDENTIALS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_BENEFITS,
  FALLBACK_BENEFITS_SECTION,
  FALLBACK_FEATURES,
  FALLBACK_FEATURES_SECTION,
  FALLBACK_HOW_IT_WORKS_STEPS,
  FALLBACK_HOW_IT_WORKS_SECTION,
  FALLBACK_CTA,
  FALLBACK_FAQS,
  FALLBACK_FAQ_SECTION,
  FALLBACK_PARTNERS,
  FALLBACK_PARTNERS_SECTION,
  FALLBACK_SOCIAL_PROOF_SECTION,
  FALLBACK_CONTACT_SECTION,
} from '@/lib/fallbacks'

// Sanity's webhook revalidates on publish; this is the safety net if it misfires.
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const [homeData, settings] = await Promise.all([
    client.fetch<HomePageData>(homePageQuery).then(stegaClean),
    client.fetch<SiteSettingsData>(siteSettingsQuery).then(stegaClean),
  ])
  const ownerName = settings?.ownerName ?? '[Owner Name]'
  const seo = homeData?.seo ?? {}

  const title = seo.title ?? `${ownerName} — Retail Placement Consultant | Amazon & DTC to Shelf`
  const description =
    metaDescription(seo.description) ??
    'I help Amazon and DTC sellers get their products on shelves at Walmart, Target, Whole Foods, and 1,200+ retail doors. Book a strategy call.'
  const ogImageUrl = seo.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).fit('crop').auto('format').url()
    : DEFAULT_OG_IMAGE.url

  return {
    title,
    description,
    alternates: { canonical: seo.canonical || '/' },
    openGraph: {
      type: 'website',
      url: SITE_URL,
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

export default async function Home() {
  const { data: rawData } = await sanityFetch({ query: homePageQuery })
  const data: HomePageData = (rawData as HomePageData | null) ?? {}
  const settings: SiteSettingsData = stegaClean((await client.fetch(siteSettingsQuery)) ?? {})
  const ownerName = settings.ownerName ?? '[Owner Name]'

  const hero            = { ...FALLBACK_HERO, ...(data.hero ?? {}) }
  const credentials     = data.credentials?.length     ? data.credentials     : FALLBACK_CREDENTIALS
  const testimonials    = data.testimonials?.length    ? data.testimonials    : FALLBACK_TESTIMONIALS
  const socialProof     = { ...FALLBACK_SOCIAL_PROOF_SECTION,    ...(data.socialProof     ?? {}) }
  const benefits        = data.benefits?.length        ? data.benefits        : FALLBACK_BENEFITS
  const benefitsSection = { ...FALLBACK_BENEFITS_SECTION,        ...(data.benefitsSection ?? {}) }
  const features        = data.features?.length        ? data.features        : FALLBACK_FEATURES
  const featuresSection = { ...FALLBACK_FEATURES_SECTION,        ...(data.featuresSection ?? {}) }
  const howItWorksSteps = data.howItWorksSteps?.length ? data.howItWorksSteps : FALLBACK_HOW_IT_WORKS_STEPS
  const howItWorksSection = { ...FALLBACK_HOW_IT_WORKS_SECTION,  ...(data.howItWorksSection ?? {}) }
  const cta             = { ...FALLBACK_CTA,                     ...(data.cta             ?? {}) }
  const faqs            = data.faqs?.length            ? data.faqs            : FALLBACK_FAQS
  const faqSection      = { ...FALLBACK_FAQ_SECTION,             ...(data.faqSection      ?? {}) }
  const partners        = data.partners?.length         ? data.partners        : FALLBACK_PARTNERS
  const partnersSection = { ...FALLBACK_PARTNERS_SECTION,        ...(data.partnersSection ?? {}) }
  const contactSection  = { ...FALLBACK_CONTACT_SECTION,         ...(data.contactSection  ?? {}) }

  // Eyebrows are centred small-caps with letter-spacing. In Presentation the invisible
  // stega characters ride along in that text and shove it off-centre, so strip them.
  socialProof.credentialsHeadline   = stegaClean(socialProof.credentialsHeadline)
  socialProof.testimonialsHeadline  = stegaClean(socialProof.testimonialsHeadline)
  benefitsSection.benefitsEyebrow   = stegaClean(benefitsSection.benefitsEyebrow)
  featuresSection.featuresEyebrow   = stegaClean(featuresSection.featuresEyebrow)
  howItWorksSection.howItWorksEyebrow = stegaClean(howItWorksSection.howItWorksEyebrow)
  cta.eyebrow                       = stegaClean(cta.eyebrow)
  faqSection.faqEyebrow             = stegaClean(faqSection.faqEyebrow)
  partnersSection.partnersEyebrow   = stegaClean(partnersSection.partnersEyebrow)
  contactSection.contactEyebrow     = stegaClean(contactSection.contactEyebrow)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  const ctaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Retail Placement Consulting',
    provider: {
      '@type': 'Person',
      name: ownerName,
    },
    description:
      'End-to-end retail placement consulting for Amazon and DTC brands — from buyer introductions to purchase order. 240+ brands placed across Walmart, Target, Whole Foods, and 1,200+ store doors.',
    offers: {
      '@type': 'Offer',
      url: cta.ctaPrimaryHref ?? '#contact',
      description: cta.ctaPrimary ?? 'Book a Strategy Call',
    },
  }

  const howItWorksSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How retail placement consulting works',
    description:
      'The 4-step process for getting your Amazon or DTC brand onto retail shelves at Walmart, Target, Whole Foods, and 1,200+ other stores.',
    step: howItWorksSteps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  }

  const benefitsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Benefits of working with ${ownerName}`,
    itemListElement: benefits.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.title,
      description: b.description,
    })),
  }

  return (
    <main>
      <JsonLd schema={faqSchema} />
      <JsonLd schema={ctaSchema} />
      <JsonLd schema={howItWorksSchema} />
      <JsonLd schema={benefitsSchema} />
      <Hero data={hero} credentials={credentials} />
      <SocialProof credentials={credentials} section={socialProof} />
      <SectionDivider from="light" to="dark" />
      <Benefits benefits={benefits} section={benefitsSection} />
      <SectionDivider from="dark" to="light" />
      <Testimonials testimonials={testimonials} section={socialProof} />
      <SectionDivider from="light" to="dark" />
      <Features features={features} section={featuresSection} />
      <SectionDivider from="dark" to="light" />
      <HowItWorks steps={howItWorksSteps} section={howItWorksSection} />
      <SectionDivider from="light" to="dark" />
      <CallToAction data={cta} />
      <SectionDivider from="dark" to="light" />
      <FAQ faqs={faqs} section={faqSection} />
      <SectionDivider from="light" to="dark" />
      <Partners partners={partners} section={partnersSection} />
      <SectionDivider from="dark" to="dark" />
      <ContactForm section={contactSection} />
    </main>
  )
}

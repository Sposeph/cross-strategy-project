import type { Metadata } from 'next'
import { Playfair_Display, Barlow } from 'next/font/google'
import './globals.css'
import { draftMode } from 'next/headers'
import { stegaClean } from 'next-sanity'
import { VisualEditing } from 'next-sanity/visual-editing'
import { GoogleAnalytics } from '@next/third-parties/google'
import JsonLd from '@/components/JsonLd'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SanityLive, sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettingsData } from '@/sanity/types'
import { SITE_URL } from '@/lib/site'
import { getNavLinks } from '@/lib/navigation'

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings: SiteSettingsData = stegaClean((await client.fetch(siteSettingsQuery)) ?? {})
  const ownerName = settings.ownerName ?? '[Owner Name]'

  return {
    title: {
      default: `${ownerName} — Retail Placement Consultant | Amazon & DTC to Shelf`,
      template: `%s | ${ownerName}`,
    },
    description:
      'I help Amazon and DTC sellers get their products on shelves at Walmart, Target, Whole Foods, and 1,200+ retail doors. Book a strategy call.',
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      url: SITE_URL,
      siteName: `${ownerName} — Retail Placement Consultant`,
      title: `${ownerName} — Retail Placement Consultant | Amazon & DTC to Shelf`,
      description:
        'I help Amazon and DTC sellers get their products on shelves at Walmart, Target, Whole Foods, and 1,200+ retail doors. Book a strategy call.',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ownerName} — Retail Placement Consultant | Amazon & DTC to Shelf`,
      description:
        'I help Amazon and DTC sellers get their products on shelves at Walmart, Target, Whole Foods, and 1,200+ retail doors.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled } = await draftMode()
  const { data: settingsRaw } = await sanityFetch({ query: siteSettingsQuery })
  const settings = (settingsRaw as SiteSettingsData | null) ?? {}
  const ownerName = settings.ownerName ?? '[Owner Name]'
  const logoText = settings.logoText ?? ownerName

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: ownerName,
    jobTitle: settings.ownerTitle ?? 'Retail Placement Consultant',
    description:
      `${ownerName} is a retail placement consultant who has helped 240+ Amazon and DTC brands secure shelf space at Walmart, Target, Whole Foods, Costco, and 1,200+ retail doors, generating over $180M in retail revenue.`,
    url: SITE_URL,
    sameAs: settings.socialLinks?.map((l) => l.url) ?? [],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${ownerName} — Retail Placement Consultant`,
    url: SITE_URL,
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: logoText,
    url: SITE_URL,
    sameAs: settings.socialLinks?.map((l) => l.url) ?? [],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${ownerName} — Retail Placement Consulting`,
    description:
      'Retail placement consulting for Amazon and DTC brands seeking shelf space at major US retailers including Walmart, Target, Whole Foods, Costco, Kroger, CVS, Walgreens, and Sprouts.',
    url: SITE_URL,
    provider: {
      '@type': 'Person',
      name: ownerName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: 'Retail Placement Consulting',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Retail Placement Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Retail Buyer Introductions',
            description:
              'Direct introductions to buyers at Walmart, Target, Whole Foods, Costco, and other major retailers.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Retail Pitch Deck Development',
            description: 'Category analysis, margin modeling, and buyer-ready pitch materials.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Purchase Order Management',
            description:
              'End-to-end support from first buyer meeting through first re-order.',
          },
        },
      ],
    },
  }

  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd schema={personSchema} />
        <JsonLd schema={websiteSchema} />
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={serviceSchema} />
        <Navbar
          logoText={logoText}
          calendarUrl={settings.calendarUrl}
          links={getNavLinks(settings)}
          bookCallLabel={settings.navBookCallLabel || undefined}
        />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        {isEnabled && <VisualEditing />}
        {isEnabled && <SanityLive />}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}

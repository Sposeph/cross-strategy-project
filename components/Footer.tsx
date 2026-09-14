import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettingsData } from '@/sanity/types'

const FOOTER_LINKS = [
  { label: 'Track Record', href: '/#track-record' },
  { label: 'Benefits', href: '/#benefits' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Book a Call', href: '/#contact' },
]

export default async function Footer() {
  const settings: SiteSettingsData = (await client.fetch(siteSettingsQuery)) ?? {}
  const ownerName = settings.logoText ?? settings.ownerName ?? '[Owner Name]'
  const tagline = settings.footerTagline ?? 'Retail placement consulting for Amazon & DTC brands.'

  return (
    <footer className="bg-brand-jet-black border-t border-brand-dim-grey">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <Link
            href="/"
            className="hover:opacity-90 transition-opacity duration-200"
            aria-label="Homepage"
          >
            <Image
              src="/logo/crossover-strategies-logo-light.png"
              alt={ownerName}
              width={900}
              height={176}
              className="h-8 w-auto"
            />
          </Link>
          <p className="font-barlow text-brand-dim-grey text-label max-w-xs text-center md:text-left leading-relaxed">
            {tagline}
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-barlow font-semibold text-brand-silver hover:text-brand-alabaster transition-colors duration-200 text-label"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-dim-grey">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-barlow text-brand-dim-grey text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {ownerName}. All rights reserved.
          </p>
          <p className="font-barlow text-brand-dim-grey/60 text-sm text-center md:text-right flex items-center justify-center md:justify-end gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-brand-red" aria-hidden="true" />
            Powered by Leonis Studios
          </p>
        </div>
      </div>
    </footer>
  )
}

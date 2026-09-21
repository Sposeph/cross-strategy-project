import type { SiteSettingsData } from '@/sanity/types'

export interface NavLink {
  label: string
  href: string
}

export const DEFAULT_BOOK_CALL_LABEL = 'Book a Call'

/** Navbar + footer links. Labels come from Site Settings; hrefs are fixed. */
export function getNavLinks(settings: SiteSettingsData): NavLink[] {
  return [
    { label: settings.navHomeLabel || 'Home', href: '/' },
    { label: settings.navBenefitsLabel || 'Why Partner With Us?', href: '/#benefits' },
    { label: settings.navHowItWorksLabel || 'Getting Started', href: '/#how-it-works' },
    { label: settings.navAboutLabel || 'About', href: '/about' },
    { label: settings.navContentLabel || 'Content', href: '/blog' },
  ]
}

import type { ContactValues } from '../lib/spam-guard'

// Corpus for `npm run test:spam`. Every `spam` sample must score >= DROP_SCORE; every `ham` sample must stay below it.
// To teach the filter a new one: paste the submission into `spam`, run the test, and adjust lib/spam-rules.ts until it passes.

type Sample = ContactValues & { note?: string }

export const spam: Sample[] = [
  {
    note: 'Received 2026-10. B2B lead-list pitch; emoji arrived as U+FFFD.',
    name: 'Desiree May',
    email: 'info@freeb2bdata.org',
    company: 'Desiree May',
    brandUrl: '',
    annualRevenue: '$0-$2M',
    message: `Hi,

Quick one — we just opened FreeB2BData, a B2B lead finder that gives you people, companies, emails and full outreach tools in one place.

Here's what you get:

������ People search — names, job titles, departments, LinkedIn profiles, verified emails
������ Company search — phones, websites, addresses, industries, categories
������ Powerful filters — country, state/province, city, industry, job title, website
������ Unlimited CSV exports — take your leads anywhere
������ Built-in email campaigns — send plain text or HTML, with live open/click tracking
������ Data enrichment — we scan websites & databases to fill in missing emails and add new companies matching your filters
������ 100,000 emails per month included from our servers.
������ Live data updates — the database grows every day
������ Affiliate program — earn 20% commission on every referral

������ Claim your seat: https://freeb2bdata.org

Bonus: If you use RoboRep Dialer for cold calling, grab the Chrome extension — it pairs perfectly with the leads you pull from FreeB2BData:

������ https://chromewebstore.google.com/detail/roborep-dialer/gfmifjmkopgfgafdejokdikldlmpejkl

Questions? Just reply to this email — I read every one.

Talk soon,
FreeB2BData`,
  },
  {
    note: 'Received 2026-10. Local-search listing pitch.',
    name: 'Stephen Morrison',
    email: 'stephen.morrison@jmailservice.com',
    company: 'Stephen Morrison',
    brandUrl: 'https://www.google.com',
    annualRevenue: '$0-$2M',
    message: `We place your business right where people are already searching for your services - setup usually takes less than 24 hours.
Are you interested?`,
  },
]

// Synthetic legit inquiries, written to brush against the rules. Replace or extend with real leads when available.
export const ham: Sample[] = [
  {
    note: 'Typical lead.',
    name: 'Jane Smith',
    email: 'jane@glowbotanics.com',
    company: 'Glow Botanics',
    brandUrl: 'https://glowbotanics.com',
    annualRevenue: '$2-$5M',
    message: `Hi, we're a clean skincare brand doing about $4M a year, mostly on Amazon. We'd like to get into Target and Ulta next year and aren't sure where to start with buyers. Would love to chat about how you work.`,
  },
  {
    note: 'Gmail, no company, links own site and Amazon store, asks "are you interested".',
    name: 'Marcus Lee',
    email: 'marcus.lee.brands@gmail.com',
    company: '',
    brandUrl: '',
    annualRevenue: '$0-$2M',
    message: `Small snack brand, launched 2024. Site is www.crunchco.com and our Amazon store is https://www.amazon.com/stores/CrunchCo. We rank on page one of Amazon search for our keywords and have strong reviews. Looking for help pitching Whole Foods and Sprouts — are you interested in smaller brands like ours?`,
  },
  {
    note: 'Trademark symbols and a couple of emoji.',
    name: 'Priya Natarajan',
    email: 'priya@peakpaws.co',
    company: 'PeakPaws™',
    brandUrl: 'peakpaws.co',
    annualRevenue: '$5-$25M',
    message: `Hello! PeakPaws™ makes premium dog treats 🐶 and we're already in ~300 independent pet stores. We want Petco and Walmart next. Do you work on commission or retainer? Thanks 🙏`,
  },
  {
    note: 'Mentions SEO and email marketing as things they already do in-house.',
    name: 'Tom Alvarez',
    email: 'tom@alvarezhotsauce.com',
    company: 'Alvarez Hot Sauce',
    brandUrl: 'https://alvarezhotsauce.com',
    annualRevenue: '$2-$5M',
    message: `We handle our own SEO and email marketing for DTC, and Amazon is about 60% of revenue. Kroger reached out to us informally but we have no idea how to run a retail launch. Can we set up a call?`,
  },
]

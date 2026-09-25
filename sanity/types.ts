import type { SanityImageSource } from '@sanity/image-url'

export type SanityImage = SanityImageSource & { alt?: string }

export interface HeroData {
  eyebrow?: string
  headline: string
  headlineAccent?: string
  subheadline: string
  bioText?: string
  rightPanelHeadline?: string
  rightPanelSubheadline?: string
  trustSignals?: { text: string }[]
  ctaPrivacyNote?: string
  ctaPrimary?: string
  ctaPrimaryHref?: string
  ctaSecondary?: string
  ctaSecondaryHref?: string
  floatingStatNumber?: string
  floatingStatLabel?: string
  image?: SanityImage
}

export interface SocialProofSection {
  credentialsHeadline?: string
  testimonialsHeadline?: string
}

export interface BenefitsSection {
  benefitsEyebrow?: string
  benefitsHeadline?: string
  benefitsHeadlineAccent?: string
}

export interface FeaturesSection {
  featuresEyebrow?: string
  featuresHeadline?: string
  featuresHeadlineAccent?: string
  featuresSubheadline?: string
}

export interface HowItWorksSection {
  howItWorksEyebrow?: string
  howItWorksHeadline?: string
  howItWorksHeadlineAccent?: string
  howItWorksSubheadline?: string
}

export interface FaqSection {
  faqEyebrow?: string
  faqHeadline?: string
  faqHeadlineAccent?: string
  faqSubheadline?: string
  faqHelpLinkLabel?: string
}

export interface PartnersSection {
  partnersEyebrow?: string
  partnersHeadline?: string
  partnersHeadlineAccent?: string
  partnersSubheadline?: string
  partnersTagLabel?: string
}

export interface ContactFormLabels {
  successHeading?: string
  nameLabel?: string
  namePlaceholder?: string
  emailLabel?: string
  emailPlaceholder?: string
  companyLabel?: string
  companyPlaceholder?: string
  brandUrlLabel?: string
  brandUrlPlaceholder?: string
  optionalLabel?: string
  revenueLabel?: string
  revenuePlaceholder?: string
  revenueOptions?: string[]
  messageLabel?: string
  messagePlaceholder?: string
  submitLabel?: string
  sendingLabel?: string
}

export interface ContactSection {
  contactEyebrow?: string
  contactHeadline?: string
  contactHeadlineAccent?: string
  contactSubheadline?: string
  contactSuccessMessage?: string
  contactForm?: ContactFormLabels
}

export interface TestimonialData {
  _id: string
  quote: string
  authorName: string
  authorTitle?: string
}

export interface CredentialData {
  _id: string
  title: string
  description?: string
}

export interface BenefitData {
  _id: string
  title: string
  description: string
  displayOrder?: number
}

export interface FeatureData {
  _id: string
  title: string
  description: string
  displayOrder?: number
}

export interface HowItWorksStepData {
  _id: string
  stepNumber: number
  title: string
  description: string
}

export interface CtaData {
  eyebrow?: string
  headline: string
  headlineAccent?: string
  subheadline?: string
  ctaPrimary?: string
  ctaPrimaryHref?: string
  ctaSecondary?: string
  ctaSecondaryHref?: string
}

export interface FaqData {
  _id: string
  question: string
  answer: string
  displayOrder?: number
}

export interface PartnerData {
  _id: string
  name: string
  blurb: string
  logo?: SanityImage
  websiteUrl: string
  buttonLabel?: string
  displayOrder?: number
}

export interface SeoData {
  title?: string
  description?: string
  ogImage?: SanityImage
  canonical?: string
  noindex?: boolean
}

export interface AboutPageData {
  ownerName?: string
  ownerTitle?: string
  bioEyebrow?: string
  bio?: string
  photo?: SanityImage
  statsHighlight?: { value: string; label: string }[]
  standoutQuote?: string
  standoutQuoteAuthor?: string
  standoutQuoteAuthorTitle?: string
  /** Pulled from the Home Page document so both pages share one contact form. */
  contactSection?: ContactSection
  seo?: SeoData
}

export interface HomePageData {
  hero?: HeroData
  socialProof?: SocialProofSection
  credentials?: CredentialData[]
  testimonials?: TestimonialData[]
  benefitsSection?: BenefitsSection
  benefits?: BenefitData[]
  featuresSection?: FeaturesSection
  features?: FeatureData[]
  howItWorksSection?: HowItWorksSection
  howItWorksSteps?: HowItWorksStepData[]
  cta?: CtaData
  faqSection?: FaqSection
  faqs?: FaqData[]
  partnersSection?: PartnersSection
  partners?: PartnerData[]
  contactSection?: ContactSection
  seo?: SeoData
}

export interface SiteSettingsData {
  ownerName?: string
  ownerTitle?: string
  logoText?: string
  calendarUrl?: string
  navHomeLabel?: string
  navBenefitsLabel?: string
  navHowItWorksLabel?: string
  navAboutLabel?: string
  navContentLabel?: string
  navBookCallLabel?: string
  contactEmail?: string
  footerTagline?: string
  footerRightsText?: string
  footerCreditText?: string
  socialLinks?: { platform?: string; url: string }[]
}

/** Words on the article list and cards, passed down to client components. */
export interface BlogListLabels {
  searchPlaceholder: string
  allLabel: string
  resultsSingular: string
  resultsPlural: string
  noResultsTitle: string
  noResultsBody: string
  readLabel: string
  minReadLabel: string
}

export interface BlogPageData extends Partial<BlogListLabels> {
  eyebrow?: string
  headline?: string
  headlineAccent?: string
  subheadline?: string
  mosaicEyebrow?: string
  mosaicHeadline?: string
  mosaicHeadlineAccent?: string
  keepReadingLabel?: string
  topicsLabel?: string
  emptyArticleText?: string
  articleCtaHeadline?: string
  articleCtaBody?: string
  articleCtaButton?: string
  seo?: SeoData
}

export interface BlogTagData {
  _id: string
  title: string
  slug: { current: string }
}

export interface BlogCategoryData {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

export interface BlogPostSummary {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  excerpt?: string
  coverImage?: SanityImage
  categories?: BlogCategoryData[]
  tags?: BlogTagData[]
  featured?: boolean
  readingTime?: number
}

export interface BlogPostData extends BlogPostSummary {
  _updatedAt?: string
  body?: unknown[]
  seoTitle?: string
  seoDescription?: string
  seo?: SeoData
}

export interface MosaicItemData {
  _id: string
  mediaType: 'image' | 'youtube'
  caption?: string
  image?: SanityImage
  youtubeUrl?: string
}

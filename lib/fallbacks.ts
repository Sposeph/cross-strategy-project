import type {
  AboutPageData,
  BlogPageData,
  BlogListLabels,
  BenefitData,
  BenefitsSection,
  BlogCategoryData,
  BlogTagData,
  BlogPostSummary,
  ContactSection,
  CredentialData,
  CtaData,
  FaqData,
  FaqSection,
  FeatureData,
  FeaturesSection,
  HeroData,
  HowItWorksSection,
  HowItWorksStepData,
  PartnerData,
  PartnersSection,
  SocialProofSection,
  TestimonialData,
} from "@/sanity/types";

export const FALLBACK_HERO: HeroData = {
  eyebrow: "Retail Placement Consultant",
  headline: "I get your brand on ",
  headlineAccent: "retail shelves.",
  subheadline:
    "[Owner Name] — retail placement consultant. 240+ brands placed across Walmart, Target, Whole Foods, Costco, and 1,200+ store doors.",
  bioText:
    "I help Amazon-native and DTC brands earn shelf space at Walmart, Target, Whole Foods, Costco, and every major U.S. retailer in between — from first pitch to purchase order.",
  rightPanelHeadline: "Get your brand on",
  rightPanelSubheadline:
    "Book a free strategy call. I'll map the right retail targets for your brand and show you exactly what it takes to land purchase orders.",
  trustSignals: [
    { text: "No pitch — just an honest assessment" },
    { text: "No pressure — cancel anytime" },
    { text: "Response within 24 hours" },
  ],
  ctaPrivacyNote: "Your information is never shared or sold.",
  ctaPrimary: "Book My Free Strategy Call →",
  ctaPrimaryHref: "/#contact",
  ctaSecondary: "See My Track Record →",
  ctaSecondaryHref: "#track-record",
  floatingStatNumber: "240+",
  floatingStatLabel: "Brands in Retail",
};

export const FALLBACK_SOCIAL_PROOF_SECTION: SocialProofSection = {
  credentialsHeadline: "Why Work With Me",
  testimonialsHeadline: "What My Clients Say",
};

export const FALLBACK_BENEFITS_SECTION: BenefitsSection = {
  benefitsEyebrow: "Why Work With Me",
  benefitsHeadline: "What you get when you work with me",
  benefitsHeadlineAccent: "work with me",
};

export const FALLBACK_FEATURES_SECTION: FeaturesSection = {
  featuresEyebrow: "Is This You?",
  featuresHeadline: "What do you bring to the table?",
  featuresHeadlineAccent: "bring to the table?",
  featuresSubheadline:
    "The best retail partnerships start with a brand that's ready. Here's what separates the brands that land shelf space from the ones that don't.",
};

export const FALLBACK_HOW_IT_WORKS_SECTION: HowItWorksSection = {
  howItWorksEyebrow: "The Process",
  howItWorksHeadline: "How retail placement consulting works",
  howItWorksHeadlineAccent: "consulting works",
  howItWorksSubheadline:
    "From brand audit to purchase order — a proven 4-step process that has placed 240+ brands across America's top retail chains.",
};

export const FALLBACK_FAQ_SECTION: FaqSection = {
  faqEyebrow: "Common Questions",
  faqHeadline: "Everything you need to know before we talk",
  faqHeadlineAccent: "know before we talk",
};

export const FALLBACK_PARTNERS_SECTION: PartnersSection = {
  partnersEyebrow: "Who We Work With",
  partnersHeadline: "Trusted by the partners who move brands to shelf",
  partnersHeadlineAccent: "move brands to shelf",
  partnersSubheadline:
    "The agencies, brokers, and platforms I work alongside to get brands from first pitch to purchase order.",
};

export const FALLBACK_CONTACT_SECTION: ContactSection = {
  contactEyebrow: "Get In Touch",
  contactHeadline: "Ready to get your brand on shelves?",
  contactHeadlineAccent: "on shelves?",
  contactSubheadline: "Send a message and we'll follow up within one business day.",
  contactSuccessMessage: "We'll be in touch within one business day.",
};

export const FALLBACK_CREDENTIALS: CredentialData[] = [
  {
    _id: "fallback-credential-1",
    title: "Former Retail Buyer",
    description:
      "Built relationships inside buying organizations at major national chains before pivoting to the brand side.",
  },
  {
    _id: "fallback-credential-2",
    title: "National Retailer Network",
    description:
      "Direct access to buyers at Walmart, Target, Whole Foods, Costco, and 50+ regional chains.",
  },
  {
    _id: "fallback-credential-3",
    title: "End-to-End Partner",
    description:
      "Stays in the deal from first pitch through first re-order — no hand-offs, no guesswork.",
  },
];

export const FALLBACK_BENEFITS: BenefitData[] = [
  {
    _id: "fallback-benefit-1",
    title: "Direct Buyer Access",
    description:
      "Skip the cold outreach. I have active relationships with buyers at Walmart, Target, Whole Foods, Costco, and 1,200+ retail doors — built over a decade of placements.",
    displayOrder: 1,
  },
  {
    _id: "fallback-benefit-2",
    title: "Buyer-Ready Pitch Materials",
    description:
      "Category analysis, margin modeling, and retailer-specific decks that speak a buyer's language — so you walk into every meeting positioned to win.",
    displayOrder: 2,
  },
  {
    _id: "fallback-benefit-3",
    title: "End-to-End PO Support",
    description:
      "From first buyer meeting through first re-order. I stay in the process so nothing falls through the cracks between handshake and shelf.",
    displayOrder: 3,
  },
  {
    _id: "fallback-benefit-4",
    title: "Proven Track Record",
    description:
      "240+ brands placed, $180M+ in retail revenue generated. You get a partner who has done this at scale — not someone figuring it out alongside you.",
    displayOrder: 4,
  },
];

export const FALLBACK_FEATURES: FeatureData[] = [
  {
    _id: "fallback-feature-1",
    title: "Proven Sales Velocity",
    description:
      "You have real numbers — DTC revenue, Amazon rank, regional retail data. Buyers want proof of consumer demand before they commit shelf space.",
    displayOrder: 1,
  },
  {
    _id: "fallback-feature-2",
    title: "Retail-Ready Margins",
    description:
      "Your COGS supports a 40–55% retail margin after slotting, freight, and chargebacks. If the math doesn't work, the deal won't either.",
    displayOrder: 2,
  },
  {
    _id: "fallback-feature-3",
    title: "Production Capacity to Scale",
    description:
      "A regional Whole Foods rollout is 50 doors. Walmart is 4,000+. You can fulfill a purchase order without blowing lead times or quality.",
    displayOrder: 3,
  },
  {
    _id: "fallback-feature-4",
    title: "A Brand Story That Sticks",
    description:
      "Buyers hear hundreds of pitches. Yours needs a hook — a clear category, a differentiated claim, and a consumer who can't get it anywhere else.",
    displayOrder: 4,
  },
  {
    _id: "fallback-feature-5",
    title: "Commitment to the Process",
    description:
      "Retail takes time. Buyers go dark. Planogram resets happen twice a year. You're in this for the long game, not a single purchase order.",
    displayOrder: 5,
  },
  {
    _id: "fallback-feature-6",
    title: "Willingness to Adapt",
    description:
      "Pack size, price point, labeling — retailers will ask for changes. Brands that win are the ones willing to meet buyers where they are.",
    displayOrder: 6,
  },
];

export const FALLBACK_HOW_IT_WORKS_STEPS: HowItWorksStepData[] = [
  {
    _id: "fallback-step-1",
    stepNumber: 1,
    title: "Retail Readiness Audit",
    description:
      "We evaluate your brand across margins, packaging, velocity data, and production capacity — the criteria buyers weigh before they commit shelf space.",
  },
  {
    _id: "fallback-step-2",
    stepNumber: 2,
    title: "Strategy & Pitch Development",
    description:
      "Category-specific positioning, margin modeling, and a buyer-ready sell sheet — everything you need to walk into a meeting already speaking a buyer's language.",
  },
  {
    _id: "fallback-step-3",
    stepNumber: 3,
    title: "Direct Buyer Introductions",
    description:
      "I make the calls. You walk into meetings with buyers at Walmart, Target, Whole Foods, and 1,200+ doors already positioned to win — not cold.",
  },
  {
    _id: "fallback-step-4",
    stepNumber: 4,
    title: "From Purchase Order to Shelf",
    description:
      "I stay in the process from first buyer meeting through your first re-order — so nothing falls through the cracks between handshake and shelf.",
  },
];

export const FALLBACK_CTA: CtaData = {
  eyebrow: "Ready to get on shelves?",
  headline: "Let's get your brand into",
  headlineAccent: "retail.",
  subheadline:
    "Book a free 30-minute strategy call. We'll audit your brand for retail readiness and map out the right retailer targets for your category — no pitch, no pressure.",
  ctaPrimary: "Book a Strategy Call",
  ctaPrimaryHref: "#contact",
  ctaSecondary: "View the Process →",
  ctaSecondaryHref: "#how-it-works",
};

export const FALLBACK_FAQS: FaqData[] = [
  {
    _id: "fallback-faq-1",
    question: "What does a retail placement consultant do?",
    answer:
      "A retail placement consultant helps consumer brands get their products on shelves at major retailers such as Walmart, Target, Whole Foods, and Costco. Services include buyer introductions, pitch deck development, pricing and margin analysis, and managing the purchase-order process from first pitch through first re-order.",
    displayOrder: 1,
  },
  {
    _id: "fallback-faq-2",
    question: "How long does it take to get a product into a major retailer?",
    answer:
      "Natural grocery chains like Whole Foods and Sprouts can move in 60–120 days for regional placement. National mass-market retailers like Walmart and Target typically require 6–18 months from first buyer contact to store shelf due to longer buying cycles, planogram resets, and compliance requirements.",
    displayOrder: 2,
  },
  {
    _id: "fallback-faq-3",
    question: "Can an Amazon or DTC brand get into retail stores?",
    answer:
      "Yes. Amazon and DTC brands are increasingly attractive to retail buyers because they arrive with proven consumer demand, established reviews, and velocity data. A retail placement consultant can translate that online traction into a compelling retail pitch and connect the brand with the right buyers.",
    displayOrder: 3,
  },
  {
    _id: "fallback-faq-4",
    question: "What retailers has [Owner Name] placed brands in?",
    answer:
      "[Owner Name] has placed 240+ brands across Walmart, Target, Whole Foods, Costco, Kroger, CVS, Walgreens, Sprouts, and more than 1,200 total retail doors generating over $180M in retail revenue.",
    displayOrder: 4,
  },
  {
    _id: "fallback-faq-5",
    question: "How much does retail placement consulting cost?",
    answer:
      "Fees vary based on scope, target retailers, and engagement model. Common structures include a project retainer, a monthly advisory fee, or a success fee tied to purchase orders. Book a strategy call to discuss the right model for your brand.",
    displayOrder: 5,
  },
];

export const FALLBACK_PARTNERS: PartnerData[] = [
  {
    _id: "fallback-partner-1",
    name: "Shelfwise Analytics",
    blurb: "Category and planogram data that shows buyers exactly where a brand fits on the shelf.",
    websiteUrl: "https://example.com",
    buttonLabel: "Visit Website",
    displayOrder: 1,
  },
  {
    _id: "fallback-partner-2",
    name: "Buyer Bridge Group",
    blurb: "A national broker network that opens doors with regional and independent grocery chains.",
    websiteUrl: "https://example.com",
    buttonLabel: "Visit Website",
    displayOrder: 2,
  },
  {
    _id: "fallback-partner-3",
    name: "Retail Ready Co.",
    blurb: "Compliance and packaging consultants who get brands audit-ready before the first buyer meeting.",
    websiteUrl: "https://example.com",
    buttonLabel: "Visit Website",
    displayOrder: 3,
  },
];

export const FALLBACK_ABOUT_PAGE: AboutPageData = {
  ownerName: "[Owner Name]",
  ownerTitle: "Retail Placement Consultant",
  bio: "[Owner Name] has spent over a decade helping Amazon and DTC brands earn shelf space at the retailers that matter most. After working inside major retail buying organizations, she pivoted to the brand side — bringing the buyer's perspective directly to the founders who needed it most.\n\nTo date, she has placed 240+ brands across Walmart, Target, Whole Foods, Costco, Kroger, CVS, Walgreens, Sprouts, and more than 1,200 total retail doors, generating over $180M in retail revenue for her clients.\n\nHer approach is methodical: audit the brand for retail readiness, build a category-specific pitch, make the buyer introductions, and stay in the deal through the first re-order. No hand-offs. No guesswork.",
  statsHighlight: [
    { value: "240+", label: "Brands Placed" },
    { value: "$180M+", label: "Retail Revenue Generated" },
    { value: "1,200+", label: "Store Doors Opened" },
    { value: "10+", label: "Years in Retail" },
  ],
  standoutQuote:
    "\"The fastest path to retail shelves is through the right relationships. I've spent a decade building them — so your brand doesn't have to start from zero.\"",
};

export const FALLBACK_BLOG_LABELS: BlogListLabels = {
  searchPlaceholder: "Search articles…",
  allLabel: "All",
  resultsSingular: "{count} article found",
  resultsPlural: "{count} articles found",
  noResultsTitle: "No articles found.",
  noResultsBody: "Try a different search term or browse all categories.",
  readLabel: "Read →",
  minReadLabel: "min read",
};

export const FALLBACK_BLOG_PAGE: Required<Omit<BlogPageData, "seo">> = {
  ...FALLBACK_BLOG_LABELS,
  eyebrow: "Retail Insights",
  headline: "The",
  headlineAccent: "Content",
  subheadline:
    "Tactics, frameworks, and firsthand insights on getting consumer brands into major retail chains — written by someone who has done it 240+ times.",
  mosaicEyebrow: "Behind The Scenes",
  mosaicHeadline: "See it in",
  mosaicHeadlineAccent: "action",
  keepReadingLabel: "Keep Reading",
  topicsLabel: "Topics",
  emptyArticleText: "Article content coming soon.",
  articleCtaHeadline: "Ready to get on shelves?",
  articleCtaBody:
    "Book a free 30-minute strategy call. We’ll audit your brand for retail readiness and map out the right retailer targets for your category.",
  articleCtaButton: "Book a Strategy Call",
};

/** Overlay Sanity values on defaults. GROQ returns null for unset fields; those keep the default. */
export function withFallback<T extends object>(fallback: T, data?: Partial<T> | null): T {
  const merged = { ...fallback };
  for (const [key, value] of Object.entries(data ?? {})) {
    if (value !== null && value !== undefined && value !== "") {
      (merged as Record<string, unknown>)[key] = value;
    }
  }
  return merged;
}

export const FALLBACK_BLOG_CATEGORIES: BlogCategoryData[] = [
  {
    _id: "cat-1",
    title: "Retail Strategy",
    slug: { current: "retail-strategy" },
    description:
      "Insights on getting your brand onto retail shelves and winning at brick-and-mortar.",
  },
  {
    _id: "cat-2",
    title: "Buyer Relationships",
    slug: { current: "buyer-relationships" },
    description:
      "How to build, approach, and maintain relationships with retail buyers.",
  },
  {
    _id: "cat-3",
    title: "Brand Readiness",
    slug: { current: "brand-readiness" },
    description:
      "Preparing your Amazon or DTC brand for the demands of retail distribution.",
  },
  {
    _id: "cat-4",
    title: "Retailer Guides",
    slug: { current: "retailer-guides" },
    description:
      "Retailer-specific playbooks for Walmart, Target, Whole Foods, and more.",
  },
];

export const FALLBACK_BLOG_POSTS: BlogPostSummary[] = [
  {
    _id: "post-1",
    title: "How to Get Your Product Into Walmart: The Complete Playbook",
    slug: { current: "how-to-get-product-into-walmart" },
    publishedAt: "2024-11-01T00:00:00Z",
    excerpt:
      "Most brands approach Walmart the wrong way. After placing 40+ brands in Walmart stores, here's what actually works — from building buyer relationships to getting your packaging right.",
    featured: true,
    readingTime: 8,
    categories: [
      {
        _id: "cat-4",
        title: "Retailer Guides",
        slug: { current: "retailer-guides" },
      },
      {
        _id: "cat-1",
        title: "Retail Strategy",
        slug: { current: "retail-strategy" },
      },
    ],
    tags: [
      { _id: "tag-walmart", title: "Walmart", slug: { current: "walmart" } },
      { _id: "tag-retail-placement", title: "Retail Placement", slug: { current: "retail-placement" } },
      { _id: "tag-buyer-pitch", title: "Buyer Pitch", slug: { current: "buyer-pitch" } },
      { _id: "tag-purchase-order", title: "Purchase Order", slug: { current: "purchase-order" } },
    ] as BlogTagData[],
  },
  {
    _id: "post-2",
    title: "What Retail Buyers Actually Want From Your Pitch Deck",
    slug: { current: "what-retail-buyers-want-pitch-deck" },
    publishedAt: "2024-10-15T00:00:00Z",
    excerpt:
      "After sitting on both sides of the table, I know exactly what makes a buyer lean forward — and what makes them pass. Here's how to build a deck that gets to yes.",
    featured: false,
    readingTime: 6,
    categories: [
      {
        _id: "cat-2",
        title: "Buyer Relationships",
        slug: { current: "buyer-relationships" },
      },
    ],
    tags: [
      { _id: "tag-pitch-deck", title: "Pitch Deck", slug: { current: "pitch-deck" } },
      { _id: "tag-retail-buyers", title: "Retail Buyers", slug: { current: "retail-buyers" } },
      { _id: "tag-sell-sheet", title: "Sell Sheet", slug: { current: "sell-sheet" } },
      { _id: "tag-category-analysis", title: "Category Analysis", slug: { current: "category-analysis" } },
    ] as BlogTagData[],
  },
  {
    _id: "post-3",
    title:
      "Is Your Brand Retail-Ready? The 6-Point Audit Every DTC Founder Needs",
    slug: { current: "retail-readiness-audit-dtc-brands" },
    publishedAt: "2024-09-22T00:00:00Z",
    excerpt:
      "Most DTC brands fail in retail not because their product is bad, but because they weren't ready. Run this audit before you talk to a single buyer.",
    featured: false,
    readingTime: 7,
    categories: [
      {
        _id: "cat-3",
        title: "Brand Readiness",
        slug: { current: "brand-readiness" },
      },
    ],
    tags: [
      { _id: "tag-brand-readiness", title: "Brand Readiness", slug: { current: "brand-readiness" } },
      { _id: "tag-dtc", title: "DTC", slug: { current: "dtc" } },
      { _id: "tag-margins", title: "Margins", slug: { current: "margins" } },
      { _id: "tag-packaging", title: "Packaging", slug: { current: "packaging" } },
      { _id: "tag-velocity", title: "Velocity", slug: { current: "velocity" } },
    ] as BlogTagData[],
  },
  {
    _id: "post-4",
    title:
      "The Whole Foods Placement Process: Timeline, Buyers, and What Actually Works",
    slug: { current: "whole-foods-placement-process" },
    publishedAt: "2024-08-30T00:00:00Z",
    excerpt:
      "Whole Foods remains one of the most coveted — and most misunderstood — retail doors for emerging brands. Here's a clear-eyed breakdown of how placements actually happen.",
    featured: false,
    readingTime: 9,
    categories: [
      {
        _id: "cat-4",
        title: "Retailer Guides",
        slug: { current: "retailer-guides" },
      },
    ],
    tags: [
      { _id: "tag-whole-foods", title: "Whole Foods", slug: { current: "whole-foods" } },
      { _id: "tag-natural-grocery", title: "Natural Grocery", slug: { current: "natural-grocery" } },
      { _id: "tag-regional-buyers", title: "Regional Buyers", slug: { current: "regional-buyers" } },
      { _id: "tag-local-producer", title: "Local Producer Program", slug: { current: "local-producer-program" } },
    ] as BlogTagData[],
  },
];

export const FALLBACK_TESTIMONIALS: TestimonialData[] = [
  {
    _id: "fallback-testimonial-1",
    quote:
      "We had tried every broker and distributor pitch deck out there. Within 90 days of working with [Owner Name] we had purchase orders from three regional Whole Foods divisions. The buyer relationships alone were worth every penny.",
    authorName: "Sarah K.",
    authorTitle: "Co-Founder, organic snack brand",
  },
  {
    _id: "fallback-testimonial-2",
    quote:
      "We'd been selling on Amazon for four years and couldn't crack a single major retailer on our own. [Owner Name] got us into 480 Walmart doors in our first retail season. The process was methodical and the results were real.",
    authorName: "Marcus T.",
    authorTitle: "CEO, DTC supplement brand",
  },
  {
    _id: "fallback-testimonial-3",
    quote:
      "I was skeptical of retail consultants after a bad experience. [Owner Name] was different — specific targets, realistic timelines, and she stayed in the deal through the first re-order. We are now in Target nationwide.",
    authorName: "Priya M.",
    authorTitle: "Founder, personal care brand",
  },
];

import { groq } from 'next-sanity'

export const blogListQuery = groq`
  {
    "posts": *[_type == "blogPost"] | order(featured desc, publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage { ..., alt },
      "categories": categories[]-> { _id, title, slug },
      "tags": tags[]-> { _id, title, slug },
      featured,
      readingTime
    },
    "categories": *[_type == "blogCategory"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { ..., alt },
    "categories": categories[]-> { _id, title, slug },
    "tags": tags[]-> { _id, title, slug },
    featured,
    readingTime,
    body,
    seoTitle,
    seoDescription,
    "seo": {
      "title": coalesce(seoTitle, seo.title, title),
      "description": coalesce(seoDescription, seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, coverImage) { ..., alt },
      "canonical": seo.canonical,
      "noindex": coalesce(seo.noindex, false)
    }
  }
`

export const blogRelatedQuery = groq`
  *[_type == "blogPost" && slug.current != $slug && count(categories[_ref in $categoryIds]) > 0] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { ..., alt },
    "categories": categories[]-> { _id, title, slug },
    readingTime
  }
`

export const blogSitemapQuery = groq`
  *[_type == "blogPost"] {
    "slug": slug.current,
    _updatedAt
  }
`

export const blogFeedQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) [0...50] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _updatedAt
  }
`

export const mosaicQuery = groq`
  *[_type == "mosaicItem"] | order(_createdAt asc) {
    _id,
    mediaType,
    caption,
    image { ..., alt },
    youtubeUrl
  }
`

export const blogPageQuery = groq`
  *[_type == "blogPage"][0] {
    eyebrow,
    headline,
    headlineAccent,
    subheadline,
    searchPlaceholder,
    allLabel,
    resultsSingular,
    resultsPlural,
    noResultsTitle,
    noResultsBody,
    readLabel,
    minReadLabel,
    mosaicEyebrow,
    mosaicHeadline,
    mosaicHeadlineAccent,
    keepReadingLabel,
    topicsLabel,
    emptyArticleText,
    articleCtaHeadline,
    articleCtaBody,
    articleCtaButton,
    "seo": {
      "title": seo.title,
      "description": seo.description,
      "ogImage": seo.ogImage { ..., alt },
      "canonical": seo.canonical,
      "noindex": coalesce(seo.noindex, false)
    }
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    ownerName,
    ownerTitle,
    bioEyebrow,
    bio,
    photo { ..., alt },
    statsHighlight[] { value, label },
    standoutQuote,
    standoutQuoteAuthor,
    standoutQuoteAuthorTitle,
    "contactSection": *[_type == "homePage"][0] {
      contactEyebrow, contactHeadline, contactHeadlineAccent,
      contactSubheadline, contactSuccessMessage, contactForm
    },
    "seo": {
      "title": seo.title,
      "description": coalesce(seo.description, bio),
      "ogImage": coalesce(seo.ogImage, photo) { ..., alt },
      "canonical": seo.canonical,
      "noindex": coalesce(seo.noindex, false)
    }
  }
`

export const contactEmailQuery = groq`*[_type == "siteSettings"][0].contactEmail`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    ownerName,
    ownerTitle,
    logoText,
    calendarUrl,
    navHomeLabel,
    navBenefitsLabel,
    navHowItWorksLabel,
    navAboutLabel,
    navContentLabel,
    navBookCallLabel,
    contactEmail,
    footerTagline,
    footerRightsText,
    footerCreditText,
    socialLinks[] { platform, url }
  }
`

// homePageQuery: prefers the unified homePage document.
// Falls back to standalone section documents for legacy compatibility.
export const homePageQuery = groq`
  {
    "hero": select(
      defined(*[_type == "homePage"][0].hero.headline) => *[_type == "homePage"][0].hero {
        eyebrow, headline, headlineAccent, subheadline, bioText,
        rightPanelHeadline, rightPanelSubheadline,
        trustSignals[] { text },
        ctaPrivacyNote,
        ctaPrimary, ctaPrimaryHref, ctaSecondary, ctaSecondaryHref,
        floatingStatNumber, floatingStatLabel, image
      },
      *[_type == "hero" && _id == "homeHero"][0] {
        eyebrow, headline, headlineAccent, subheadline,
        ctaPrimary, ctaPrimaryHref, ctaSecondary, ctaSecondaryHref,
        floatingStatNumber, floatingStatLabel, image
      }
    ),
    "socialProof": *[_type == "homePage"][0] {
      credentialsHeadline,
      testimonialsHeadline
    },
    "credentials": select(
      count(*[_type == "homePage"][0].credentials) > 0 => *[_type == "homePage"][0].credentials[] {
        "_id": _key, title, description
      },
      *[_type == "credential"] | order(displayOrder asc) {
        "_id": _id, title, description
      }
    ),
    "testimonials": select(
      count(*[_type == "homePage"][0].testimonials) > 0 => *[_type == "homePage"][0].testimonials[] {
        "_id": _key, quote, authorName, authorTitle
      },
      *[_type == "testimonial"] | order(_createdAt asc) {
        "_id": _id, quote, authorName, authorTitle
      }
    ),
    "benefitsSection": *[_type == "homePage"][0] {
      benefitsEyebrow, benefitsHeadline, benefitsHeadlineAccent
    },
    "benefits": select(
      count(*[_type == "homePage"][0].benefits) > 0 => *[_type == "homePage"][0].benefits[] {
        "_id": _key, title, description
      },
      *[_type == "benefit"] | order(displayOrder asc) {
        "_id": _id, title, description
      }
    ),
    "featuresSection": *[_type == "homePage"][0] {
      featuresEyebrow, featuresHeadline, featuresHeadlineAccent, featuresSubheadline
    },
    "features": select(
      count(*[_type == "homePage"][0].features) > 0 => *[_type == "homePage"][0].features[] {
        "_id": _key, title, description
      },
      *[_type == "feature"] | order(displayOrder asc) {
        "_id": _id, title, description
      }
    ),
    "howItWorksSection": *[_type == "homePage"][0] {
      howItWorksEyebrow, howItWorksHeadline, howItWorksHeadlineAccent, howItWorksSubheadline
    },
    "howItWorksSteps": select(
      count(*[_type == "homePage"][0].howItWorksSteps) > 0 => *[_type == "homePage"][0].howItWorksSteps[] | order(stepNumber asc) {
        "_id": _key, stepNumber, title, description
      },
      *[_type == "howItWorksStep"] | order(stepNumber asc) {
        "_id": _id, stepNumber, title, description
      }
    ),
    "cta": select(
      defined(*[_type == "homePage"][0].cta.headline) => *[_type == "homePage"][0].cta {
        eyebrow, headline, headlineAccent, subheadline,
        ctaPrimary, ctaPrimaryHref, ctaSecondary, ctaSecondaryHref
      },
      *[_type == "cta" && _id == "homeCta"][0] {
        eyebrow, headline, headlineAccent, subheadline,
        ctaPrimary, ctaPrimaryHref, ctaSecondary, ctaSecondaryHref
      }
    ),
    "faqSection": *[_type == "homePage"][0] {
      faqEyebrow, faqHeadline, faqHeadlineAccent, faqSubheadline, faqHelpLinkLabel
    },
    "faqs": select(
      count(*[_type == "homePage"][0].faqs) > 0 => *[_type == "homePage"][0].faqs[] {
        "_id": _key, question, answer
      },
      *[_type == "faq"] | order(displayOrder asc) {
        "_id": _id, question, answer
      }
    ),
    "partnersSection": *[_type == "homePage"][0] {
      partnersEyebrow, partnersHeadline, partnersHeadlineAccent, partnersSubheadline, partnersTagLabel
    },
    "partners": select(
      count(*[_type == "homePage"][0].partners) > 0 => *[_type == "homePage"][0].partners[] {
        "_id": _key, name, blurb, logo { ..., alt }, websiteUrl, buttonLabel
      },
      *[_type == "partner" && active != false] | order(displayOrder asc) {
        "_id": _id, name, blurb, logo { ..., alt }, websiteUrl, buttonLabel
      }
    ),
    "contactSection": *[_type == "homePage"][0] {
      contactEyebrow, contactHeadline, contactHeadlineAccent,
      contactSubheadline, contactSuccessMessage, contactForm
    },
    "seo": *[_type == "homePage"][0] {
      "title": seo.title,
      "description": coalesce(seo.description, hero.bioText, hero.subheadline),
      "ogImage": coalesce(seo.ogImage, hero.image) { ..., alt },
      "canonical": seo.canonical,
      "noindex": coalesce(seo.noindex, false)
    }
  }
`

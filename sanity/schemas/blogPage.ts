import { defineType, defineField } from 'sanity'

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Content Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'listing', title: 'Search & Article Cards' },
    { name: 'media', title: 'Media Gallery' },
    { name: 'article', title: 'Individual Articles' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── PAGE HEADER ─────────────────────────────────────────────────────────
    defineField({
      name: 'eyebrow',
      title: 'Small Label',
      type: 'string',
      group: 'header',
      description: 'Tiny label above the heading on the Content page. e.g. "Retail Insights"',
    }),
    defineField({
      name: 'headline',
      title: 'Heading (red part)',
      type: 'string',
      group: 'header',
      description: 'First half of the heading, shown in red. e.g. "The"',
    }),
    defineField({
      name: 'headlineAccent',
      title: 'Heading (white part)',
      type: 'string',
      group: 'header',
      description: 'Second half of the heading, shown in white. e.g. "Content"',
    }),
    defineField({
      name: 'subheadline',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'header',
      description: 'Paragraph below the heading. e.g. "Tactics, frameworks, and firsthand insights on…"',
    }),

    // ─── SEARCH & ARTICLE CARDS ──────────────────────────────────────────────
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Box — Placeholder',
      type: 'string',
      group: 'listing',
      description: 'Grey text inside the empty search box. Leave blank to use "Search articles…".',
    }),
    defineField({
      name: 'allLabel',
      title: 'Category Filter — "All" Button',
      type: 'string',
      group: 'listing',
      description: 'First category button that shows every article. Leave blank to use "All".',
    }),
    defineField({
      name: 'resultsSingular',
      title: 'Search Result Count — One Article',
      type: 'string',
      group: 'listing',
      description: 'Shown while searching/filtering when exactly one article matches. Use {count} for the number. Leave blank to use "{count} article found".',
    }),
    defineField({
      name: 'resultsPlural',
      title: 'Search Result Count — Several Articles',
      type: 'string',
      group: 'listing',
      description: 'Shown while searching/filtering for zero or several matches. Use {count} for the number. Leave blank to use "{count} articles found".',
    }),
    defineField({
      name: 'noResultsTitle',
      title: 'No Results — Heading',
      type: 'string',
      group: 'listing',
      description: 'Leave blank to use "No articles found."',
    }),
    defineField({
      name: 'noResultsBody',
      title: 'No Results — Supporting Text',
      type: 'string',
      group: 'listing',
      description: 'Leave blank to use "Try a different search term or browse all categories."',
    }),
    defineField({
      name: 'readLabel',
      title: 'Article Card — Read Link',
      type: 'string',
      group: 'listing',
      description: 'Link at the bottom of every article card. Leave blank to use "Read →".',
    }),
    defineField({
      name: 'minReadLabel',
      title: 'Article Card — Reading Time Word(s)',
      type: 'string',
      group: 'listing',
      description: 'Shown after the number of minutes, e.g. the "min read" in "5 min read". Leave blank to use "min read".',
    }),

    // ─── MEDIA GALLERY ───────────────────────────────────────────────────────
    defineField({
      name: 'mosaicEyebrow',
      title: 'Media Section — Small Label',
      type: 'string',
      group: 'media',
      description: 'Tiny label above the media gallery heading. e.g. "Behind The Scenes"',
    }),
    defineField({
      name: 'mosaicHeadline',
      title: 'Media Section — Heading',
      type: 'string',
      group: 'media',
      description: 'Main heading over the media gallery. e.g. "See it in"',
    }),
    defineField({
      name: 'mosaicHeadlineAccent',
      title: 'Media Section — Heading Italic Part',
      type: 'string',
      group: 'media',
      description: 'The words in the heading that appear in italic. e.g. "action"',
    }),

    // ─── INDIVIDUAL ARTICLES ─────────────────────────────────────────────────
    defineField({
      name: 'keepReadingLabel',
      title: 'Related Articles — Label',
      type: 'string',
      group: 'article',
      description: 'Label above the related articles at the bottom of an article. Leave blank to use "Keep Reading".',
    }),
    defineField({
      name: 'topicsLabel',
      title: 'Article Tags — Label',
      type: 'string',
      group: 'article',
      description: 'Label above an article\'s tags. Leave blank to use "Topics".',
    }),
    defineField({
      name: 'emptyArticleText',
      title: 'Article With No Body — Message',
      type: 'string',
      group: 'article',
      description: 'Shown when an article has no content yet. Leave blank to use "Article content coming soon."',
    }),
    defineField({
      name: 'articleCtaHeadline',
      title: 'Article Footer CTA — Heading',
      type: 'string',
      group: 'article',
      description: 'Heading of the booking prompt at the bottom of every article. e.g. "Ready to get on shelves?"',
    }),
    defineField({
      name: 'articleCtaBody',
      title: 'Article Footer CTA — Supporting Text',
      type: 'text',
      rows: 3,
      group: 'article',
      description: 'Paragraph under that heading.',
    }),
    defineField({
      name: 'articleCtaButton',
      title: 'Article Footer CTA — Button Text',
      type: 'string',
      group: 'article',
      description: 'e.g. "Book a Strategy Call"',
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Content Page' }),
  },
})

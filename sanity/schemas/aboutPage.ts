import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'ownerName',
      title: 'Owner Name',
      type: 'string',
      description: 'Your full name as it appears on the About page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ownerTitle',
      title: 'Your Title / Role',
      type: 'string',
      description: 'e.g. "Retail Placement Consultant"',
    }),
    defineField({
      name: 'bioEyebrow',
      title: 'Small Label Above Your Name',
      type: 'string',
      description: 'Tiny label above your name at the top of the page. Leave blank to use "About".',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 8,
      description: 'Your biography shown on the About page. Use two blank lines to create paragraph breaks.',
    }),
    defineField({
      name: 'photo',
      title: 'Owner Photo',
      type: 'image',
      description: 'Your professional photo shown on the About page',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'statsHighlight',
      title: 'Highlight Stats',
      type: 'array',
      description: 'Key numbers shown prominently on the About page. e.g. "240+ Brands Placed"',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The number or stat. e.g. "240+", "$180M+"',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Short label below the number. e.g. "Brands Placed"',
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'standoutQuote',
      title: 'Featured Quote',
      type: 'text',
      rows: 3,
      description: 'The quote shown between your bio and the contact form. Include quotation marks if you want them displayed.',
    }),
    defineField({
      name: 'standoutQuoteAuthor',
      title: 'Featured Quote — Who Said It',
      type: 'string',
      description: 'Name shown under the quote. e.g. "Sarah K." Leave blank to show no name.',
    }),
    defineField({
      name: 'standoutQuoteAuthorTitle',
      title: 'Featured Quote — Their Role / Company',
      type: 'string',
      description: 'Optional line under their name. e.g. "Co-Founder, organic snack brand"',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'ownerName', subtitle: 'ownerTitle' },
  },
})

import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'ownerName',
      title: 'Owner / Business Name',
      type: 'string',
      description: 'Your full name — used throughout the site wherever your name appears.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logoText',
      title: 'Navbar Logo Text',
      type: 'string',
      description: 'Text shown in the top-left of the navigation bar. e.g. "CrossStrat" or your name.',
    }),
    defineField({
      name: 'ownerTitle',
      title: 'Your Title / Role',
      type: 'string',
      description: 'Your role shown on the site. e.g. "Retail Placement Consultant"',
    }),
    defineField({
      name: 'calendarUrl',
      title: 'Booking / Calendar Link',
      type: 'string',
      description: 'The URL visitors go to when they click "Book a Call". e.g. your Calendly link.',
    }),
    defineField({
      name: 'navHomeLabel',
      title: 'Navbar — Home Button',
      type: 'string',
      description: 'Text of the top-bar button that goes to the top of the home page. Also used in the footer. Leave blank to use "Home".',
    }),
    defineField({
      name: 'navBenefitsLabel',
      title: 'Navbar — Benefits Button',
      type: 'string',
      description: 'Text of the top-bar button that goes to the Benefits section of the home page. Also used in the footer. Leave blank to use "Why Partner With Us?".',
    }),
    defineField({
      name: 'navHowItWorksLabel',
      title: 'Navbar — How It Works Button',
      type: 'string',
      description: 'Text of the top-bar button that goes to the How It Works section of the home page. Also used in the footer. Leave blank to use "Getting Started".',
    }),
    defineField({
      name: 'navAboutLabel',
      title: 'Navbar — About Button',
      type: 'string',
      description: 'Text of the top-bar button that goes to the About page. Leave blank to use "About".',
    }),
    defineField({
      name: 'navContentLabel',
      title: 'Navbar — Content Button',
      type: 'string',
      description: 'Text of the top-bar button that goes to the Content (blog) page. Leave blank to use "Content".',
    }),
    defineField({
      name: 'navBookCallLabel',
      title: 'Navbar — Book a Call Button',
      type: 'string',
      description: 'Text of the top-bar button that goes to your booking link. Also used in the footer. Leave blank to use "Book a Call".',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Email address used on the contact form and in the footer.',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
      rows: 2,
      description: 'Short tagline shown at the bottom of every page.',
    }),
    defineField({
      name: 'footerRightsText',
      title: 'Footer — Copyright Text',
      type: 'string',
      description: 'Text after the year and your name in the footer. Leave blank to use "All rights reserved."',
    }),
    defineField({
      name: 'footerCreditText',
      title: 'Footer — Credit Line',
      type: 'string',
      description: 'Small credit line in the bottom-right of the footer. Leave blank to use "Powered by Leonis Studios".',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Links to your social/professional profiles (e.g. LinkedIn). Used in site structured data.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'e.g. "LinkedIn", "Instagram"',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
  ],
})

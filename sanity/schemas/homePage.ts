import { defineType, defineField, defineArrayMember } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'socialProof', title: 'Social Proof' },
    { name: 'benefits', title: 'Benefits' },
    { name: 'features', title: 'What You Bring' },
    { name: 'howItWorks', title: 'How It Works' },
    { name: 'cta', title: 'Call To Action' },
    { name: 'faq', title: 'FAQ' },
    { name: 'partners', title: 'Partners' },
    { name: 'contact', title: 'Contact / Booking Form' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── HERO ────────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      description: 'The large section visitors see first when they land on the site.',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Small Label Above Headline',
          type: 'string',
          description: 'Tiny line above the main heading. e.g. "Amazon & DTC Sellers → Retail Shelves"',
        }),
        defineField({
          name: 'headline',
          title: 'Headline (Left Side)',
          type: 'string',
          description: 'Main heading on the left. e.g. "I get your brand on"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'headlineAccent',
          title: 'Headline — Highlighted Word(s)',
          type: 'string',
          description: 'The red italic words that complete the headline. e.g. "retail shelves."',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline (Left Side)',
          type: 'text',
          rows: 2,
          description: 'Short supporting line under the headline. e.g. "240+ brands placed across Walmart, Target, Whole Foods, Costco."',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'bioText',
          title: 'Bio Paragraph',
          type: 'text',
          rows: 3,
          description: 'Short paragraph about what you do. e.g. "I help Amazon-native and DTC brands earn shelf space at Walmart, Target, Whole Foods, Costco, and every major U.S. retailer in between — from first pitch to purchase order."',
        }),
        defineField({
          name: 'ctaPrimary',
          title: 'Main Button Text',
          type: 'string',
          description: 'e.g. "Work With Me"',
        }),
        defineField({
          name: 'ctaPrimaryHref',
          title: 'Main Button Link',
          type: 'string',
          description: 'Where the button goes. e.g. "#contact"',
        }),
        defineField({
          name: 'ctaSecondary',
          title: 'Secondary Link Text',
          type: 'string',
          description: 'e.g. "See My Track Record →"',
        }),
        defineField({
          name: 'ctaSecondaryHref',
          title: 'Secondary Link URL',
          type: 'string',
        }),
        defineField({
          name: 'floatingStatNumber',
          title: 'Badge — Number',
          type: 'string',
          description: 'Big number on the floating badge. e.g. "240+"',
        }),
        defineField({
          name: 'floatingStatLabel',
          title: 'Badge — Label',
          type: 'string',
          description: 'Label under the badge number. e.g. "Brands in Retail"',
        }),
        defineField({
          name: 'image',
          title: 'Owner Photo',
          type: 'image',
          description: 'Your professional photo shown on the right side of the page.',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string', description: 'Describe the photo for screen readers. e.g. "Hassan Shirazi, retail placement consultant"' }),
          ],
        }),
        defineField({
          name: 'rightPanelHeadline',
          title: 'Right Panel — Heading',
          type: 'string',
          description: 'Heading above the booking form on the right side. e.g. "Get your brand on"',
        }),
        defineField({
          name: 'rightPanelSubheadline',
          title: 'Right Panel — Supporting Text',
          type: 'text',
          rows: 2,
          description: 'Short description above the CTA button. e.g. "Book a free strategy call. I\'ll map the right retail targets for your brand and show you exactly what it takes to land purchase orders."',
        }),
        defineField({
          name: 'trustSignals',
          title: 'Trust Signals',
          description: 'The 3 bullet points shown below the CTA button. e.g. "No pitch — just an honest assessment"',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Trust Signal Text',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
              ],
              preview: { select: { title: 'text' } },
            }),
          ],
        }),
        defineField({
          name: 'ctaPrivacyNote',
          title: 'Privacy Note',
          type: 'string',
          description: 'Small text below the form. e.g. "Your information is never shared or sold."',
        }),
      ],
    }),

    // ─── SOCIAL PROOF ────────────────────────────────────────────────────────
    defineField({
      name: 'credentialsHeadline',
      title: 'Credentials Section — Heading',
      type: 'string',
      group: 'socialProof',
      description: 'Header above the credentials/trust signals. e.g. "Why Work With Me"',
    }),

    defineField({
      name: 'credentials',
      title: 'Credentials',
      description: 'Trust signals shown near the top of the page — short proof points about your background and network.',
      type: 'array',
      group: 'socialProof',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Credential Title',
              type: 'string',
              description: 'Short credential name. e.g. "Former Retail Buyer"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: '1–2 sentence explanation shown below the credential title.',
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),

    defineField({
      name: 'testimonialsHeadline',
      title: 'Testimonials Section — Heading',
      type: 'string',
      group: 'socialProof',
      description: 'Header above the client quotes. e.g. "What My Clients Say"',
    }),

    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      description: 'Client reviews shown on the home page. Each needs a quote and the client\'s name.',
      type: 'array',
      group: 'socialProof',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              description: 'The testimonial in the client\'s own words. e.g. "Within 90 days we had purchase orders from three Whole Foods divisions."',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              description: 'Client\'s name as shown on site. e.g. "Sarah K."',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'authorTitle',
              title: 'Author Title / Company',
              type: 'string',
              description: 'Their role and brand type. e.g. "Co-Founder, organic snack brand"',
            }),
          ],
          preview: { select: { title: 'authorName', subtitle: 'quote' } },
        }),
      ],
    }),

    // ─── BENEFITS ────────────────────────────────────────────────────────────
    defineField({
      name: 'benefitsEyebrow',
      title: 'Benefits Section — Small Label',
      type: 'string',
      group: 'benefits',
      description: 'Tiny label above the section heading. e.g. "Why Work With Me"',
    }),
    defineField({
      name: 'benefitsHeadline',
      title: 'Benefits Section — Heading',
      type: 'string',
      group: 'benefits',
      description: 'Main heading for this section. e.g. "What you get when you work with me"',
    }),
    defineField({
      name: 'benefitsHeadlineAccent',
      title: 'Benefits Section — Heading Italic Part',
      type: 'string',
      group: 'benefits',
      description: 'The words in the heading that appear in italic. e.g. "work with me"',
    }),

    defineField({
      name: 'benefits',
      title: 'Benefits List',
      description: 'What clients get when working with you. Each item has a title and a short description.',
      type: 'array',
      group: 'benefits',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Benefit Title',
              type: 'string',
              description: 'Short benefit name. e.g. "Direct Buyer Access"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Explanation shown below the benefit title on the site.',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),

    // ─── FEATURES (WHAT YOU BRING) ───────────────────────────────────────────
    defineField({
      name: 'featuresEyebrow',
      title: '"What You Bring" Section — Small Label',
      type: 'string',
      group: 'features',
      description: 'Tiny label above the section heading. e.g. "Is This You?"',
    }),
    defineField({
      name: 'featuresHeadline',
      title: '"What You Bring" Section — Heading',
      type: 'string',
      group: 'features',
      description: 'Main heading. e.g. "What do you bring to the table?"',
    }),
    defineField({
      name: 'featuresHeadlineAccent',
      title: '"What You Bring" Section — Heading Italic Part',
      type: 'string',
      group: 'features',
      description: 'The words in the heading that appear in italic. e.g. "bring to the table?"',
    }),
    defineField({
      name: 'featuresSubheadline',
      title: '"What You Bring" Section — Supporting Text',
      type: 'text',
      rows: 2,
      group: 'features',
      description: 'Paragraph shown under the heading. e.g. "The best retail partnerships start with a brand that\'s ready. Here\'s what separates the brands that land shelf space from the ones that don\'t."',
    }),

    defineField({
      name: 'features',
      title: 'Requirements List',
      description: 'What a brand needs to qualify. Each item is a requirement with a title and description.',
      type: 'array',
      group: 'features',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Requirement Title',
              type: 'string',
              description: 'Short requirement name. e.g. "Proven Sales Velocity"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Explanation shown below the title on the site.',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),

    // ─── HOW IT WORKS ────────────────────────────────────────────────────────
    defineField({
      name: 'howItWorksEyebrow',
      title: '"How It Works" Section — Small Label',
      type: 'string',
      group: 'howItWorks',
      description: 'Tiny label above the section heading. e.g. "The Process"',
    }),
    defineField({
      name: 'howItWorksHeadline',
      title: '"How It Works" Section — Heading',
      type: 'string',
      group: 'howItWorks',
      description: 'Main heading. e.g. "How retail placement consulting works"',
    }),
    defineField({
      name: 'howItWorksHeadlineAccent',
      title: '"How It Works" Section — Heading Italic Part',
      type: 'string',
      group: 'howItWorks',
      description: 'The words in the heading that appear in italic. e.g. "consulting works"',
    }),
    defineField({
      name: 'howItWorksSubheadline',
      title: '"How It Works" Section — Supporting Text',
      type: 'text',
      rows: 2,
      group: 'howItWorks',
      description: 'Paragraph shown under the heading. e.g. "From brand audit to purchase order — a proven 4-step process that has placed 240+ brands across America\'s top retail chains."',
    }),

    defineField({
      name: 'howItWorksSteps',
      title: 'Process Steps',
      description: 'The steps shown in order. Each step has a number, a title, and a description.',
      type: 'array',
      group: 'howItWorks',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              description: 'Controls the order. Step 1 appears first.',
              validation: (r) => r.required().min(1),
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              description: 'Short step name. e.g. "Retail Readiness Audit"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'What happens in this step, shown below the title.',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'stepNumber' },
            prepare({ title, subtitle }) {
              return { title, subtitle: `Step ${subtitle}` }
            },
          },
        }),
      ],
    }),

    // ─── CALL TO ACTION ──────────────────────────────────────────────────────
    defineField({
      name: 'cta',
      title: 'Call To Action Section',
      description: 'The full-width banner section that prompts visitors to book a call.',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Small Label Above Headline',
          type: 'string',
          description: 'Short intro above the headline. e.g. "Ready to get on shelves?"',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main heading text. e.g. "Let\'s get your brand into"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'headlineAccent',
          title: 'Headline — Highlighted Word(s)',
          type: 'string',
          description: 'Red italic part that completes the headline. e.g. "retail."',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          description: 'Supporting text below the headline. e.g. "Book a free 30-minute strategy call."',
        }),
        defineField({
          name: 'ctaPrimary',
          title: 'Main Button Text',
          type: 'string',
          description: 'e.g. "Book a Strategy Call"',
        }),
        defineField({
          name: 'ctaPrimaryHref',
          title: 'Main Button Link',
          type: 'string',
          description: 'Where the button goes. e.g. "#contact"',
        }),
        defineField({
          name: 'ctaSecondary',
          title: 'Secondary Link Text',
          type: 'string',
          description: 'e.g. "View the Process →"',
        }),
        defineField({ name: 'ctaSecondaryHref', title: 'Secondary Link URL', type: 'string' }),
      ],
    }),

    // ─── FAQ ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'faqEyebrow',
      title: 'FAQ Section — Small Label',
      type: 'string',
      group: 'faq',
      description: 'Tiny label above the section heading. e.g. "Common Questions"',
    }),
    defineField({
      name: 'faqHeadline',
      title: 'FAQ Section — Heading',
      type: 'string',
      group: 'faq',
      description: 'Main heading. e.g. "Everything you need to know before we talk"',
    }),
    defineField({
      name: 'faqHeadlineAccent',
      title: 'FAQ Section — Heading Italic Part',
      type: 'string',
      group: 'faq',
      description: 'The words in the heading that appear in italic. e.g. "know before we talk"',
    }),
    defineField({
      name: 'faqSubheadline',
      title: 'FAQ Section — Text Under Heading',
      type: 'string',
      group: 'faq',
      description: 'Line under the heading. Use {count} for the number of questions. Leave blank to use "{count} questions answered. Don\'t see yours?"',
    }),
    defineField({
      name: 'faqHelpLinkLabel',
      title: 'FAQ Section — Booking Link Text',
      type: 'string',
      group: 'faq',
      description: 'Link shown after that line. Leave blank to use "Book a call."',
    }),

    defineField({
      name: 'faqs',
      title: 'Questions & Answers',
      description: 'Frequently asked questions. Each item expands to show the answer when clicked.',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              description: 'The question as it appears on the site.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              description: 'Full answer shown when the question is expanded.',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        }),
      ],
    }),

    // ─── PARTNERS ────────────────────────────────────────────────────────────
    defineField({
      name: 'partnersEyebrow',
      title: 'Partners Section — Small Label',
      type: 'string',
      group: 'partners',
      description: 'Tiny label above the section heading. e.g. "Who We Work With"',
    }),
    defineField({
      name: 'partnersHeadline',
      title: 'Partners Section — Heading',
      type: 'string',
      group: 'partners',
      description: 'Main heading. e.g. "Trusted by the partners who move brands to shelf"',
    }),
    defineField({
      name: 'partnersHeadlineAccent',
      title: 'Partners Section — Heading Italic Part',
      type: 'string',
      group: 'partners',
      description: 'The words in the heading that appear in italic. e.g. "move brands to shelf"',
    }),
    defineField({
      name: 'partnersSubheadline',
      title: 'Partners Section — Supporting Text',
      type: 'text',
      rows: 2,
      group: 'partners',
      description: 'Short line below the heading.',
    }),
    defineField({
      name: 'partnersTagLabel',
      title: 'Partner Cards — Tag Label',
      type: 'string',
      group: 'partners',
      description: 'Small label in the corner of every partner card. Leave blank to use "Partner".',
    }),

    defineField({
      name: 'partners',
      title: 'Partner Cards',
      description: 'Client and channel partners shown as cards. Each has a name, blurb, logo, and website link.',
      type: 'array',
      group: 'partners',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'blurb',
              title: 'Blurb',
              type: 'text',
              rows: 3,
              description: 'Short description of the partner shown on the card.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              description: "The partner's logo shown on the card.",
              options: { hotspot: false },
              fields: [
                defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
              ],
            }),
            defineField({
              name: 'websiteUrl',
              title: 'Website URL',
              type: 'url',
              description: "Where the card's button links to.",
              validation: (r) => r.required().uri({ scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'buttonLabel',
              title: 'Button Label',
              type: 'string',
              description: 'e.g. "Visit Website"',
              initialValue: 'Visit Website',
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'websiteUrl', media: 'logo' } },
        }),
      ],
    }),

    // ─── CONTACT / BOOKING FORM ──────────────────────────────────────────────
    defineField({
      name: 'contactEyebrow',
      title: 'Contact Section — Small Label',
      type: 'string',
      group: 'contact',
      description: 'Tiny label above the section heading. e.g. "Get In Touch"',
    }),
    defineField({
      name: 'contactHeadline',
      title: 'Contact Section — Heading',
      type: 'string',
      group: 'contact',
      description: 'Main heading. e.g. "Ready to get your brand on shelves?"',
    }),
    defineField({
      name: 'contactHeadlineAccent',
      title: 'Contact Section — Heading Italic Part',
      type: 'string',
      group: 'contact',
      description: 'The words in the heading that appear in italic. e.g. "on shelves?"',
    }),
    defineField({
      name: 'contactSubheadline',
      title: 'Contact Section — Supporting Text',
      type: 'text',
      rows: 2,
      group: 'contact',
      description: 'Short line below the heading. e.g. "Send a message and we\'ll follow up within one business day."',
    }),
    defineField({
      name: 'contactSuccessMessage',
      title: 'Form Success Message',
      type: 'text',
      rows: 2,
      group: 'contact',
      description: 'Message shown after the form is submitted successfully. e.g. "Message received. We\'ll be in touch within one business day."',
    }),
    defineField({
      name: 'contactForm',
      title: 'Form Labels & Buttons',
      description: 'The words on the form itself. Every field is optional — leave one blank to keep its current wording. These also apply to the form at the bottom of the About page.',
      type: 'object',
      group: 'contact',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'successHeading', title: 'Success Heading', type: 'string', description: 'Big line shown after sending. Default: "Message received."' }),
        defineField({ name: 'nameLabel', title: 'Name — Label', type: 'string', description: 'Default: "Name"' }),
        defineField({ name: 'namePlaceholder', title: 'Name — Example Text', type: 'string', description: 'Grey text in the empty box. Default: "Jane Smith"' }),
        defineField({ name: 'emailLabel', title: 'Email — Label', type: 'string', description: 'Default: "Email"' }),
        defineField({ name: 'emailPlaceholder', title: 'Email — Example Text', type: 'string', description: 'Default: "jane@yourbrand.com"' }),
        defineField({ name: 'companyLabel', title: 'Company — Label', type: 'string', description: 'Default: "Brand / Company"' }),
        defineField({ name: 'companyPlaceholder', title: 'Company — Example Text', type: 'string', description: 'Default: "Your Brand Co."' }),
        defineField({ name: 'brandUrlLabel', title: 'Brand URL — Label', type: 'string', description: 'Default: "Brand URL"' }),
        defineField({ name: 'brandUrlPlaceholder', title: 'Brand URL — Example Text', type: 'string', description: 'Default: "https://yourbrand.com"' }),
        defineField({ name: 'optionalLabel', title: '"Optional" Tag', type: 'string', description: 'Shown next to optional fields. Default: "(optional)"' }),
        defineField({ name: 'revenueLabel', title: 'Revenue — Label', type: 'string', description: 'Default: "Annual Company Revenue"' }),
        defineField({ name: 'revenuePlaceholder', title: 'Revenue — Empty Choice', type: 'string', description: 'Shown before a range is picked. Default: "Select range"' }),
        defineField({
          name: 'revenueOptions',
          title: 'Revenue — Choices',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'The ranges people can pick, in order. Default: $0-$2M, $2-$5M, $5-$25M, $25-$50M, $50M+',
        }),
        defineField({ name: 'messageLabel', title: 'Message — Label', type: 'string', description: 'Default: "Message"' }),
        defineField({ name: 'messagePlaceholder', title: 'Message — Example Text', type: 'string', description: 'Default: "Tell us about your company and why you are interested in retail"' }),
        defineField({ name: 'submitLabel', title: 'Send Button', type: 'string', description: 'Default: "Send Message"' }),
        defineField({ name: 'sendingLabel', title: 'Send Button — While Sending', type: 'string', description: 'Default: "Sending…"' }),
      ],
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
})

export default {
  name: 'fourColumns',
  title: 'Four Columns Section',
  type: 'document',
  fields: [
    {
      name: 'columns',
      title: 'Columns (exactly 4)',
      description: 'Order: 1) dark background, 2) white background, 3) light-gray background, 4) blue background.',
      type: 'array',
      validation: (Rule: any) => Rule.min(4).max(4).error('Exactly 4 columns required'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'localeString',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'localeText',
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'localeString',
            },
            {
              name: 'buttonPage',
              title: 'Button — Link: Page',
              description: 'Choose an existing page or case study instead of typing a URL manually.',
              type: 'reference',
              to: [
                { type: 'contact' },
                { type: 'about' },
                { type: 'howWeWork' },
                { type: 'homepage' },
                { type: 'portfolio' },
                { type: 'caseStudy' },
              ],
            },
            {
              name: 'buttonHref',
              title: 'Button — Link: Manual URL',
              description: 'Use only if no page was selected above (e.g. an external link).',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}

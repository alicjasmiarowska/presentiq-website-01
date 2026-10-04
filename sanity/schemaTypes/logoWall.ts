export default {
  name: 'logoWall',
  title: 'Logo Wall',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'e.g. "Client Logos"',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'localeString',
    },
    {
      name: 'stats',
      title: 'Stats (exactly 3)',
      type: 'array',
      validation: (Rule: any) => Rule.max(3).error('Maximum 3 stats'),
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            { name: 'label', title: 'Label', type: 'localeString' },
            { name: 'value', title: 'Numeric Value', description: 'e.g. 1.34 or 1100', type: 'number' },
            {
              name: 'decimals',
              title: 'Decimal Places',
              type: 'number',
              initialValue: 0,
              validation: (Rule: any) => Rule.min(0).max(2),
            },
            { name: 'suffix', title: 'Suffix (e.g. "+")', type: 'string' },
          ],
          preview: {
            select: { title: 'label.en', value: 'value' },
            prepare({ title, value }: any) {
              return { title, subtitle: String(value) }
            },
          },
        },
      ],
    },
    {
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'image',
          name: 'logo',
          title: 'Logo',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
          preview: {
            select: { title: 'alt', media: 'asset' },
          },
        },
      ],
    },
  ],
}
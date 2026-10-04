import { localeValidation } from '../lib/textRules'

export default {
  name: 'pillars',
  title: 'Three Pillars Section',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    },
    {
      name: 'introText',
      title: 'Text below the heading (2 lines)',
      description: "Short text shown below the heading in the grid's first cell.",
      type: 'localeText',
    },
    {
      name: 'pillars',
      title: 'Pillars (exactly 3)',
      type: 'array',
      validation: (Rule: any) => Rule.min(3).max(3).error('Exactly 3 pillars required'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Pillar Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'title',
              title: 'Pillar Title',
              type: 'localeString',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'object',
              validation: localeValidation,
              fields: [
                { name: 'en', type: 'text', title: 'English' },
                { name: 'de', type: 'text', title: 'Deutsch' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
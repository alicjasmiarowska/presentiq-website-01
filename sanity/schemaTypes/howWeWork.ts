import { processStepsField } from './lib/processStepsSchema'

export default {
  name: 'howWeWork',
  title: 'How We Work Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (used to pick this page in Navigation/Footer)',
      type: 'string',
      initialValue: 'How We Work',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      description: 'Choose which Hero version (from Hero documents) to use on this page.',
      type: 'reference',
      to: [{ type: 'hero' }],
    },
    {
      name: 'reasons',
      title: '"Der Blick von außen..." — Reasons Grid',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Heading (H2)',
          type: 'localeString',
        },
        {
          name: 'items',
          title: 'Reasons (any number, in a 2-column grid)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'localeString' },
                { name: 'body', title: 'Text', type: 'localeText' },
              ],
              preview: { select: { title: 'title.en' } },
            },
          ],
        },
      ],
    },
    {
      name: 'successStatement',
      title: '"Gemeinsam zum Erfolg" — Navy Band',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Heading (H2)',
          type: 'localeString',
        },
        {
          name: 'body',
          title: 'Text',
          type: 'localeText',
        },
      ],
    },
    processStepsField('process', 'Our Process (any number of steps, gray background)', (Rule: any) =>
      Rule.min(1).error('Add at least one step')
    ),
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

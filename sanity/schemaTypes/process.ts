export default {
  name: 'process',
  title: 'Process Section',
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
      name: 'steps',
      title: 'Steps (exactly 4)',
      type: 'array',
      validation: (Rule: any) => Rule.min(4).max(4).error('Wymagane dokładnie 4 kroki'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'localeString',
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'localeText',
            },
          ],
          preview: {
            select: { title: 'title.en' },
          },
        },
      ],
    },
  ],
}

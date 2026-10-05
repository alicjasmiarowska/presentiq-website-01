export default {
  name: 'process',
  title: 'Process Section',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    },
    {
      name: 'steps',
      title: 'Steps (exactly 4)',
      type: 'array',
      validation: (Rule: any) => Rule.min(4).max(4).error('Exactly 4 steps required'),
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

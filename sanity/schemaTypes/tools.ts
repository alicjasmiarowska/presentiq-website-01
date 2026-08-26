export default {
  name: 'tools',
  title: 'Tools Section',
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
      name: 'text',
      title: 'Text (pod headline)',
      type: 'localeText',
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tool Title',
              type: 'localeString',
            },
            {
              name: 'description',
              title: 'Description',
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

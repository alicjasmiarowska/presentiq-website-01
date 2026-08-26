export default {
  name: 'features',
  title: 'Features Section',
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
      name: 'items',
      title: 'Features (exactly 4)',
      type: 'array',
      validation: (Rule: any) => Rule.min(4).max(4).error('Wymagane dokładnie 4 elementy'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'title',
              title: 'Title',
              type: 'localeString',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'localeText',
            },
          ],
          preview: {
            select: { title: 'title.en', media: 'icon' },
          },
        },
      ],
    },
  ],
}

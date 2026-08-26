export default {
  name: 'fourPillars',
  title: 'Four Pillars Section',
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
      name: 'pillars',
      title: 'Pillars (exactly 4)',
      type: 'array',
      validation: (Rule: any) => Rule.min(4).max(4).error('Wymagane dokładnie 4 filary'),
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

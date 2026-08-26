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
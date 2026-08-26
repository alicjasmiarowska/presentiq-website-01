export default {
  name: 'about',
  title: 'About Us Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (used to pick this page in Navigation/Footer)',
      type: 'string',
      initialValue: 'About',
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
      description: 'Wybierz, która wersja Hero (z dokumentów typu Hero) ma być użyta na tej stronie.',
      type: 'reference',
      to: [{ type: 'hero' }],
    },
    {
      name: 'teamHeadline',
      title: 'Team Section Headline',
      type: 'localeString',
    },
    {
      name: 'teamText',
      title: 'Team Section Text (opis, obok headline po prawej)',
      type: 'localeText',
    },
    {
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          title: 'Team Member',
          fields: [
            {
              name: 'photo',
              title: 'Photo (portrait, 3:4)',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'name', media: 'photo' },
          },
        },
      ],
    },
    {
      name: 'textAndPicture',
      title: 'Text and Picture Section',
      description: 'Wybierz, który dokument Text and Picture ma być użyty na tej stronie (renderowany przed Final CTA).',
      type: 'reference',
      to: [{ type: 'textAndPicture' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

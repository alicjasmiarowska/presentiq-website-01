export default {
  name: 'portfolio',
  title: 'Portfolio Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (used to pick this page in Navigation/Footer)',
      type: 'string',
      initialValue: 'Portfolio',
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

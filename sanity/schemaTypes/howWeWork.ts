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
      description: 'Wybierz, która wersja Hero (z dokumentów typu Hero) ma być użyta na tej stronie.',
      type: 'reference',
      to: [{ type: 'hero' }],
    },
    {
      name: 'textAndPictureBullets',
      title: 'Text and Picture (Bullets) Section',
      description: 'Wybierz, który dokument Text and Picture (Bullets) ma być użyty na tej stronie (renderowany pod Hero).',
      type: 'reference',
      to: [{ type: 'textAndPictureBullets' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

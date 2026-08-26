export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      description: 'Zastępuje domyślny tytuł strony w wynikach wyszukiwania i karcie przeglądarki. Zostaw puste, żeby użyć domyślnego.',
      type: 'localeString',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      description: 'Zastępuje domyślny opis w wynikach wyszukiwania. Zalecane ok. 150–160 znaków. Zostaw puste, żeby użyć domyślnego.',
      type: 'localeText',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image (Open Graph)',
      description: 'Obrazek pokazywany przy udostępnianiu linku w social media (np. LinkedIn, Facebook). Zalecane 1200×630px.',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}

export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      description: 'Adres podstrony tej usługi: /services/[slug]',
      type: 'slug',
      options: { source: 'title.en' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Krótki opis pokazywany na liście usług (np. na Home).',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    },
    {
      name: 'hero',
      title: 'Hero Section',
      description: 'Wybierz, która wersja Hero ma być użyta na dedykowanej stronie tej usługi.',
      type: 'reference',
      to: [{ type: 'hero' }],
    },
    {
      name: 'textAndPicture',
      title: 'Text and Picture Section',
      description: 'Wybierz, który dokument Text and Picture ma być użyty na tej stronie (renderowany pod Hero).',
      type: 'reference',
      to: [{ type: 'textAndPicture' }],
    },
    {
      name: 'fourPillars',
      title: 'Four Pillars Section',
      description: 'Wybierz, który dokument Four Pillars ma być użyty na tej stronie.',
      type: 'reference',
      to: [{ type: 'fourPillars' }],
    },
    {
      name: 'features',
      title: 'Features Section',
      description: 'Wybierz, który dokument Features ma być użyty na tej stronie.',
      type: 'reference',
      to: [{ type: 'features' }],
    },
    {
      name: 'textAndImageSliderServices',
      title: 'Text and Image Slider (Service Links) Section',
      description: 'Wybierz, który dokument Text and Image Slider (Service Links) ma być użyty na tej stronie.',
      type: 'reference',
      to: [{ type: 'textAndImageSliderServices' }],
    },
    {
      name: 'faq',
      title: 'FAQ Section',
      description: 'Wybierz, który dokument FAQ ma być użyty na tej stronie (osobny per usługa).',
      type: 'reference',
      to: [{ type: 'faq' }],
    },
    {
      name: 'body',
      title: 'Body (treść na dedykowanej stronie usługi)',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    },
    {
      name: 'accentColor',
      title: 'Kolor ćwiartki koła (dedykowana strona usługi)',
      description: 'Kolor dekoracyjnej poświaty w rogu Hero na stronie tej usługi — kliknij, żeby wpisać dokładny kod HEX.',
      type: 'color',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
    },
  },
}
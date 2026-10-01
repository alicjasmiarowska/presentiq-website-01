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
      name: 'intro',
      title: 'Intro (dwie kolumny nad zdjęciami zespołu)',
      description: 'Wybierz dokument Two Column Section: lewa kolumna = nagłówek + tekst, prawa = tekst + niebieski nagłówek („Lernen Sie unser Team kennen”).',
      type: 'reference',
      to: [{ type: 'twoColumnSection' }],
    },
    // Replaced by `intro`; kept hidden so existing content isn't lost. Plain
    // objects (not localeString/localeText) so the editorial checks in
    // textRules.ts don't raise warnings on text nobody sees.
    ...['teamHeadline', 'teamText'].map((name) => ({
      name,
      type: 'object',
      hidden: true,
      fields: [
        { name: 'en', type: 'text' },
        { name: 'de', type: 'text' },
      ],
    })),
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
              title: 'Photo (kadrowane do kwadratu 1:1 – ustaw hotspot na twarzy)',
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
      name: 'principles',
      title: 'Unsere Prinzipien (siatka 2×2)',
      description: 'Wybierz dokument Four Pillars z nagłówkiem i 4 zasadami (tytuł + opis; zdjęcia nie są tu używane).',
      type: 'reference',
      to: [{ type: 'fourPillars' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

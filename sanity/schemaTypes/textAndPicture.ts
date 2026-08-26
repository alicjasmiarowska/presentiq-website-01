export default {
  name: 'textAndPicture',
  title: 'Text and Picture',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'e.g. "Problem Statement"',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    },
    {
      name: 'image',
      title: 'Image / GIF',
      type: 'image',
      description: 'Użyj tego LUB pola Video poniżej, nie obu naraz.',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    },
    {
      name: 'video',
      title: 'Video (MP4)',
      type: 'file',
      description: 'Użyj tego LUB pola Image / GIF powyżej, nie obu naraz.',
      options: { accept: 'video/mp4' },
    },
    {
      name: 'imageWidth',
      title: 'Image Width (%)',
      description: 'Szerokość kolumny z obrazkiem/wideo jako % szerokości sekcji (10–90). Domyślnie 50%.',
      type: 'number',
      validation: (Rule: any) => Rule.min(10).max(90),
      initialValue: 50,
    },
    {
      name: 'imageHeight',
      title: 'Image Height (px)',
      description: 'Wysokość pola z obrazkiem/wideo w pikselach.',
      type: 'number',
      validation: (Rule: any) => Rule.min(100).max(900),
      initialValue: 400,
    },
    {
      name: 'imageFit',
      title: 'Image Fit',
      description: 'Jak obrazek/wideo ma się zachować w polu: "Wypełnij pole" przytnie go do rozmiaru pola, "Dopasuj proporcjonalnie" zmniejszy go do wielkości pola bez przycinania i bez naruszania proporcji.',
      type: 'string',
      options: {
        list: [
          { title: 'Wypełnij pole (przytnij)', value: 'cover' },
          { title: 'Dopasuj proporcjonalnie (bez przycinania)', value: 'contain' },
        ],
      },
      initialValue: 'cover',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'localeString',
    },
    {
      name: 'buttonPage',
      title: 'Przekierowanie: strona',
      description: 'Wybierz istniejącą stronę zamiast wpisywać URL ręcznie.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref',
      title: 'Przekierowanie: ręczny URL',
      description: 'Użyj tylko jeśli powyżej nie wybrano strony (np. link zewnętrzny).',
      type: 'string',
    },
  ],
}

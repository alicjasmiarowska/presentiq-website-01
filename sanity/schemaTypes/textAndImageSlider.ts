export default {
  name: 'textAndImageSlider',
  title: 'Text and Image Slider',
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
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    },
    {
      name: 'images',
      title: 'Images (slider)',
      description: 'Zdjęcia pokazywane w sliderze po lewej stronie sekcji.',
      type: 'array',
      validation: (Rule: any) => Rule.min(1).error('Wymagane co najmniej 1 zdjęcie'),
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
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

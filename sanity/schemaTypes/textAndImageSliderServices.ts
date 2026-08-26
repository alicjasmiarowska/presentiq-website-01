export default {
  name: 'textAndImageSliderServices',
  title: 'Text and Image Slider (Service Links)',
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
      name: 'services',
      title: 'Powiązane usługi (dokładnie 3)',
      description: 'Linki do 3 usług pokazywane zamiast przycisku (nazwa + strzałka).',
      type: 'array',
      validation: (Rule: any) => Rule.length(3).error('Wymagane dokładnie 3 usługi'),
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
    },
  ],
}

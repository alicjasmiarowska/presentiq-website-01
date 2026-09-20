export default {
  name: 'fourColumns',
  title: 'Four Columns Section',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
    },
    {
      name: 'columns',
      title: 'Columns (exactly 4)',
      description: 'Kolejność: 1) ciemne tło, 2) białe tło, 3) jasnoszare tło, 4) niebieskie tło.',
      type: 'array',
      validation: (Rule: any) => Rule.min(4).max(4).error('Wymagane dokładnie 4 kolumny'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'localeString',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'localeText',
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'localeString',
            },
            {
              name: 'buttonPage',
              title: 'Button — przekierowanie: strona',
              description: 'Wybierz istniejącą stronę zamiast wpisywać URL ręcznie.',
              type: 'reference',
              to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
            },
            {
              name: 'buttonHref',
              title: 'Button — przekierowanie: ręczny URL',
              description: 'Użyj tylko jeśli powyżej nie wybrano strony (np. link zewnętrzny).',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}

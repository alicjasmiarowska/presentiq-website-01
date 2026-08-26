export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Hero Name',
      type: 'string',
      description: 'e.g. "Main Hero", "Secondary Hero"',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
    },
    {
      name: 'buttonText1',
      title: 'Button 1 Text',
      type: 'localeString',
    },
    {
      name: 'buttonPage1',
      title: 'Button 1 — przekierowanie: strona',
      description: 'Wybierz istniejącą stronę zamiast wpisywać URL ręcznie.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref1',
      title: 'Button 1 — przekierowanie: ręczny URL',
      description: 'Użyj tylko jeśli powyżej nie wybrano strony (np. link zewnętrzny).',
      type: 'string',
    },
    {
      name: 'buttonText2',
      title: 'Button 2 Text',
      type: 'localeString',
    },
    {
      name: 'buttonPage2',
      title: 'Button 2 — przekierowanie: strona',
      description: 'Wybierz istniejącą stronę zamiast wpisywać URL ręcznie.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref2',
      title: 'Button 2 — przekierowanie: ręczny URL',
      description: 'Użyj tylko jeśli powyżej nie wybrano strony (np. link zewnętrzny).',
      type: 'string',
    },
  ],
}
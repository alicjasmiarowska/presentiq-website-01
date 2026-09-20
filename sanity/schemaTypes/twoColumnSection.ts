export default {
  name: 'twoColumnSection',
  title: 'Two Column Section',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'e.g. "Why Presentiq"',
    },
    {
      name: 'leftHeadline',
      title: 'Lewa kolumna: nagłówek (H2)',
      type: 'localeString',
    },
    {
      name: 'buttonText',
      title: 'Lewa kolumna: tekst przycisku',
      type: 'localeString',
    },
    {
      name: 'buttonPage',
      title: 'Lewa kolumna: przekierowanie — strona',
      description: 'Wybierz istniejącą stronę zamiast wpisywać URL ręcznie.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref',
      title: 'Lewa kolumna: przekierowanie — ręczny URL',
      description: 'Użyj tylko jeśli powyżej nie wybrano strony (np. link zewnętrzny).',
      type: 'string',
    },
    {
      name: 'rightBody',
      title: 'Prawa kolumna: tekst',
      type: 'localeRichText',
    },
    {
      name: 'rightHeadline',
      title: 'Prawa kolumna: nagłówek pod tekstem (H2)',
      type: 'localeString',
    },
  ],
}

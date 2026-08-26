export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'e.g. "Main Footer"',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Numer telefonu',
      type: 'string',
    },
    {
      name: 'columns',
      title: 'Kolumny linków (2) — np. "Pages" i "Legal"',
      description: 'Kolumna "Services" pojawia się automatycznie między tymi dwiema kolumnami (lista usług z Services Section), więc tutaj ustaw tylko pozostałe 2 (np. Pages, Legal). Na stronie widoczne są tylko same linki, bez nazwy kolumny — tytuł służy jedynie do rozpoznania kolumny w Studio.',
      type: 'array',
      validation: (Rule: any) => Rule.length(2).error('Wymagane dokładnie 2 kolumny'),
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Kolumna',
          fields: [
            { name: 'title', title: 'Tytuł kolumny', type: 'localeString' },
            {
              name: 'links',
              title: 'Linki',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'footerLink',
                  title: 'Link',
                  fields: [
                    { name: 'label', title: 'Label', type: 'localeString' },
                    {
                      name: 'page',
                      title: 'Strona',
                      description: 'Wybierz istniejącą stronę zamiast wpisywać URL ręcznie.',
                      type: 'reference',
                      to: [
                        { type: 'contact' },
                        { type: 'about' },
                        { type: 'howWeWork' },
                        { type: 'portfolio' },
                        { type: 'legalNotice' },
                        { type: 'privacyPolicy' },
                      ],
                    },
                    {
                      name: 'href',
                      title: 'Ręczny URL',
                      description: 'Użyj tylko jeśli powyżej nie wybrano strony (np. link zewnętrzny).',
                      type: 'string',
                    },
                  ],
                  preview: {
                    select: { title: 'label.en', subtitle: 'href', pageTitle: 'page.title' },
                    prepare({ title, subtitle, pageTitle }: any) {
                      return { title, subtitle: pageTitle || subtitle }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title.en' },
          },
        },
      ],
    },
    {
      name: 'copyright',
      title: 'Copyright',
      type: 'localeString',
    },
    {
      name: 'privacySettingsLabel',
      title: 'Etykieta przycisku "Privacy Settings"',
      description: 'Przycisk w stopce otwierający panel ustawień zgód Usercentrics (Consent Management).',
      type: 'localeString',
      initialValue: { en: 'Privacy Settings', de: 'Datenschutzeinstellungen' },
    },
  ],
}

export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    },
    {
      name: 'logoLight',
      title: 'Logo (jasna wersja)',
      description: 'Używane w nawigacji, która nakłada się na ciemne tło (np. hero). Jeśli puste, używane jest zwykłe Logo.',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    },
    {
      name: 'navLinks',
      title: 'Linki w menu',
      description: 'np. Portfolio, Services, Tools, About, Contact',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navLink',
          title: 'Link',
          fields: [
            { name: 'label', title: 'Label', type: 'localeString' },
            {
              name: 'page',
              title: 'Strona',
              description: 'Wybierz istniejącą stronę zamiast wpisywać URL ręcznie.',
              type: 'reference',
              to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'portfolio' }],
            },
            {
              name: 'href',
              title: 'Ręczny URL (np. /services)',
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
    {
      name: 'servicesLabel',
      title: 'Etykieta rozwijanego menu "Services"',
      description: 'Lista usług w rozwijanym menu pobiera się automatycznie z dokumentów Service — tu ustawiasz tylko tekst przycisku.',
      type: 'localeString',
      initialValue: { en: 'Services', de: 'Leistungen' },
    },
    {
      name: 'loginLabel',
      title: 'Login Button Text',
      type: 'localeString',
    },
    {
      name: 'loginHref',
      title: 'Login URL',
      description: 'Ścieżka wewnętrzna (np. /login) albo pełny link zewnętrzny (np. https://app.presentiq.com) — otworzy się w nowej karcie.',
      type: 'string',
    },
  ],
}

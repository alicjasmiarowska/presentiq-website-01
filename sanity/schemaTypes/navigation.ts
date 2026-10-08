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
      title: 'Logo (light version)',
      description: 'Used in navigation that overlaps a dark background (e.g. the hero). If empty, the regular Logo is used.',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    },
    {
      name: 'navLinks',
      title: 'Menu Links',
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
              title: 'Page',
              description: 'Choose an existing page instead of typing a URL manually.',
              type: 'reference',
              to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'portfolio' }],
            },
            {
              name: 'href',
              title: 'Manual URL (e.g. /services)',
              description: 'Use only if no page was selected above (e.g. an external link).',
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
      title: 'Label for the "Services" dropdown menu',
      description: 'The service list in the dropdown menu is pulled automatically from Service documents — here you only set the button text.',
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
      description: 'An internal path (e.g. /login) or a full external link (e.g. https://extranet.k16.de) — opens in a new tab.',
      type: 'string',
    },
  ],
}

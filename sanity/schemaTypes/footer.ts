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
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'columns',
      title: 'Link Columns (2) — e.g. "Pages" and "Legal"',
      description: 'The "Services" column appears automatically between these two columns (the service list from Services Section), so only set the remaining 2 here (e.g. Pages, Legal). Only the links themselves are visible on the page, not the column name — the title is just for identifying the column in Studio.',
      type: 'array',
      validation: (Rule: any) => Rule.length(2).error('Exactly 2 columns required'),
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Column',
          fields: [
            { name: 'title', title: 'Column Title', type: 'localeString' },
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
                      title: 'Page',
                      description: 'Choose an existing page instead of typing a URL manually.',
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
                      title: 'Manual URL',
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
      title: 'Label for "Privacy Settings" Button',
      description: 'Footer button that opens the Usercentrics consent management settings panel.',
      type: 'localeString',
      initialValue: { en: 'Privacy Settings', de: 'Datenschutzeinstellungen' },
    },
  ],
}

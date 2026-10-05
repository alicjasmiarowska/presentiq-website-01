export default {
  name: 'finalCta',
  title: 'Final CTA',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'localeString',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'localeString',
    },
    {
      name: 'buttonPage',
      title: 'Link: Page',
      description: 'Choose an existing page instead of typing a URL manually.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref',
      title: 'Link: Manual URL',
      description: 'Use only if no page was selected above (e.g. an external link).',
      type: 'string',
    },
  ],
}
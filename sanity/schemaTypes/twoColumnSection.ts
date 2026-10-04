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
      title: 'Left column: Heading (H2)',
      type: 'localeString',
    },
    {
      name: 'leftBody',
      title: 'Left column: Text below the heading (optional)',
      type: 'localeText',
    },
    {
      name: 'buttonText',
      title: 'Left column: Button text',
      type: 'localeString',
    },
    {
      name: 'buttonPage',
      title: 'Left column: Link — Page',
      description: 'Choose an existing page instead of typing a URL manually.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref',
      title: 'Left column: Link — Manual URL',
      description: 'Use only if no page was selected above (e.g. an external link).',
      type: 'string',
    },
    {
      name: 'rightBody',
      title: 'Right column: Text',
      type: 'localeRichText',
    },
    {
      name: 'rightHeadline',
      title: 'Right column: Heading below the text (H2)',
      type: 'localeString',
    },
  ],
}

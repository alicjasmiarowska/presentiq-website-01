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
      title: 'Button 1 — Link: Page',
      description: 'Choose an existing page instead of typing a URL manually.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref1',
      title: 'Button 1 — Link: Manual URL',
      description: 'Use only if no page was selected above (e.g. an external link).',
      type: 'string',
    },
    {
      name: 'buttonText2',
      title: 'Button 2 Text',
      type: 'localeString',
    },
    {
      name: 'buttonPage2',
      title: 'Button 2 — Link: Page',
      description: 'Choose an existing page instead of typing a URL manually.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref2',
      title: 'Button 2 — Link: Manual URL',
      description: 'Use only if no page was selected above (e.g. an external link).',
      type: 'string',
    },
  ],
}
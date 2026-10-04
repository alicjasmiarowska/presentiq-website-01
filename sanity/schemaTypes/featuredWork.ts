export default {
  name: 'featuredWork',
  title: 'Featured Work Section',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'e.g. "Featured Work"',
    },
    {
      name: 'headline',
      title: 'Headline',
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
    {
      name: 'projects',
      title: 'Featured Case Studies (3)',
      description: 'Choose exactly 3 existing case studies to show in this section.',
      type: 'array',
      validation: (Rule: any) => Rule.min(3).max(3).error('Exactly 3 case studies required'),
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
    },
  ],
}

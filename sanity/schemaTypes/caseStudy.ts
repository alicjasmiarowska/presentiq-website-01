// One "Challenge"/"Solution"/"Result" row: a left column (heading + body)
// always shown, and an independent right column (its own optional heading +
// body) — leaving the right heading empty renders it as plain continuation
// text under the left heading (2-column flow); filling it in renders it as
// its own labeled block. Either layout, same fields.
function caseStudySection(name: string, title: string, defaultLeftHeading: string) {
  return {
    name,
    title,
    type: 'object',
    fields: [
      {
        name: 'leftHeading',
        title: 'Left column heading',
        type: 'localeString',
        initialValue: { en: defaultLeftHeading, de: defaultLeftHeading },
      },
      {
        name: 'leftBody',
        title: 'Left column text',
        type: 'localeRichText',
      },
      {
        name: 'rightHeading',
        title: 'Right column heading (optional)',
        description: 'Leave empty to make the right column read as a continuation of the left text (2-column flow) instead of its own labeled block.',
        type: 'localeString',
      },
      {
        name: 'rightBody',
        title: 'Right column text (optional)',
        type: 'localeRichText',
      },
    ],
  }
}

export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fieldsets: [
    {
      name: 'basics',
      title: 'Basics (list card)',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'body',
      title: 'Challenge / Solution / Result',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      fieldset: 'basics',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title.en' },
      validation: (Rule: any) => Rule.required(),
      fieldset: 'basics',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'localeString',
      fieldset: 'basics',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
      fieldset: 'basics',
    },
    {
      name: 'headline',
      title: 'Hero Headline (H1)',
      description: 'Type <br> to force a line break.',
      type: 'localeString',
    },
    {
      name: 'subheadline',
      title: 'Subheadline (above the Challenge/Solution/Result rows)',
      type: 'localeString',
    },
    { ...caseStudySection('challenge', 'The Challenge', 'The Challenge'), fieldset: 'body' },
    { ...caseStudySection('solution', 'The Solution', 'The Solution'), fieldset: 'body' },
    { ...caseStudySection('result', 'The Result', 'The Result'), fieldset: 'body' },
    {
      name: 'facts',
      title: 'Fact box (blue, next to the Result row)',
      description: 'Any number of "label: value" lines — different case studies need different facts, so labels are free text rather than a fixed set (e.g. "Service", "Client", "Timeline", whatever applies).',
      type: 'array',
      fieldset: 'body',
      of: [
        {
          type: 'object',
          name: 'fact',
          fields: [
            { name: 'label', title: 'Label', type: 'localeString' },
            { name: 'value', title: 'Value', type: 'localeString' },
          ],
          preview: {
            select: { label: 'label.en', value: 'value.en' },
            prepare: ({ label, value }: { label?: string; value?: string }) => ({
              title: label || 'Fact',
              subtitle: value,
            }),
          },
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'category.en',
      media: 'mainImage',
    },
  },
}

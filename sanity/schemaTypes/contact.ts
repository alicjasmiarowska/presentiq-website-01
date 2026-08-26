export default {
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (used to pick this page in Navigation/Footer)',
      type: 'string',
      initialValue: 'Contact',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'headline',
      title: 'Headline (H1)',
      type: 'localeString',
    },
    {
      name: 'formHeadline',
      title: 'Form Column Headline (H3)',
      type: 'localeString',
    },
    {
      name: 'formBody',
      title: 'Form Column Body Text',
      type: 'localeString',
    },
    {
      name: 'privacyText',
      title: 'Privacy Consent Checkbox Text',
      description: 'Text shown next to the required consent checkbox in the contact form.',
      type: 'localeString',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

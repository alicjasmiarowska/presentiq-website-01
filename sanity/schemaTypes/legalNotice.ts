export default {
  name: 'legalNotice',
  title: 'Legal Notice Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (used to pick this page in Navigation/Footer)',
      type: 'string',
      initialValue: 'Legal Notice',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heading',
      title: 'Page Heading (visible on the page, EN/DE)',
      type: 'localeString',
    },
    {
      name: 'body',
      title: 'Content',
      type: 'localeRichText',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

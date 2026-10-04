export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      description: 'Overrides the default page title in search results and the browser tab. Leave empty to use the default.',
      type: 'localeString',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      description: 'Overrides the default description in search results. Recommended around 150–160 characters. Leave empty to use the default.',
      type: 'localeText',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image (Open Graph)',
      description: 'Image shown when the link is shared on social media (e.g. LinkedIn, Facebook). Recommended 1200×630px.',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}

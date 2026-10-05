export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'reference',
      to: [{ type: 'hero' }],
    },
    {
      name: 'twoColumnSection',
      title: 'Two Column Section',
      type: 'reference',
      to: [{ type: 'twoColumnSection' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

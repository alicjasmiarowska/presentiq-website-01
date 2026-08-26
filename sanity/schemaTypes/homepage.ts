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
      name: 'textAndPicture',
      title: 'Text and Picture Section',
      type: 'reference',
      to: [{ type: 'textAndPicture' }],
    },
    {
      name: 'logoWall',
      title: 'Logo Wall Section',
      type: 'reference',
      to: [{ type: 'logoWall' }],
    },
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'reference',
      to: [{ type: 'servicesSection' }],
    },
   
    {
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'reference',
      to: [{ type: 'finalCta' }],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      to: [{ type: 'footer' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
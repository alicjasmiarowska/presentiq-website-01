export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'localeString',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
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

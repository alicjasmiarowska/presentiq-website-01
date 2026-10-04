import { localeValidation } from '@/sanity/lib/textRules'

export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      description: "This service's page address: /services/[slug]",
      type: 'slug',
      options: { source: 'title.en' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Short description shown in the services list (e.g. on the homepage).',
      type: 'object',
      validation: localeValidation,
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    },
    {
      name: 'hero',
      title: 'Hero Section',
      description: "Choose which Hero version to use on this service's dedicated page.",
      type: 'reference',
      to: [{ type: 'hero' }],
    },
    {
      name: 'textAndPicture',
      title: 'Text and Picture Section',
      description: 'Choose which Text and Picture document to use on this page (rendered below the Hero).',
      type: 'reference',
      to: [{ type: 'textAndPicture' }],
    },
    {
      name: 'fourPillars',
      title: 'Four Pillars Section',
      description: 'Choose which Four Pillars document to use on this page.',
      type: 'reference',
      to: [{ type: 'fourPillars' }],
    },
    {
      name: 'features',
      title: 'Features Section',
      description: 'Choose which Features document to use on this page.',
      type: 'reference',
      to: [{ type: 'features' }],
    },
    {
      name: 'textAndImageSliderServices',
      title: 'Text and Image Slider (Service Links) Section',
      description: 'Choose which Text and Image Slider (Service Links) document to use on this page.',
      type: 'reference',
      to: [{ type: 'textAndImageSliderServices' }],
    },
    {
      name: 'faq',
      title: 'FAQ Section',
      description: 'Choose which FAQ document to use on this page (separate per service).',
      type: 'reference',
      to: [{ type: 'faq' }],
    },
    {
      name: 'body',
      title: "Body (content on the service's dedicated page)",
      type: 'object',
      validation: localeValidation,
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    },
    {
      name: 'accentColor',
      title: "Corner glow color (service's dedicated page)",
      description: "Color of the decorative corner glow in the Hero on this service's page — click to enter an exact HEX code.",
      type: 'color',
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
    },
  },
}
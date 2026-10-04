import { processStepsField } from './lib/processStepsSchema'

export default {
  name: 'aiDesign',
  title: 'AI Design Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (used to pick this page in Navigation/Footer)',
      type: 'string',
      initialValue: 'AI Design',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      description: 'Choose which Hero version (from Hero documents) to use on this page.',
      type: 'reference',
      to: [{ type: 'hero' }],
    },
    {
      name: 'intro',
      title: 'Intro (two columns — question on navy + text on white)',
      description: 'Choose a Two Column Section document. The right column (heading) can be left empty.',
      type: 'reference',
      to: [{ type: 'twoColumnSection' }],
    },
    processStepsField('processSteps', 'Process (3 steps, gray background)', (Rule: any) =>
      Rule.min(3).max(3).error('Exactly 3 steps required')
    ),
    {
      name: 'videoSection',
      title: 'Video + Text',
      description: 'Choose a Text and Picture document. In it, upload a video in the "Video (MP4)" field instead of an image.',
      type: 'reference',
      to: [{ type: 'textAndPicture' }],
    },
    {
      name: 'collaboration',
      title: 'Besser zusammenarbeiten',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline (H2)',
          type: 'localeString',
        },
        {
          name: 'body',
          title: 'Body text',
          type: 'localeRichText',
        },
        {
          name: 'items',
          title: 'Linked services (exactly 3)',
          description: 'Choose 3 services — each will appear as a link to its own page, with an arrow at the end.',
          type: 'array',
          validation: (Rule: any) => Rule.min(3).max(3).error('Exactly 3 services required'),
          of: [
            {
              type: 'reference',
              to: [{ type: 'service' }],
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

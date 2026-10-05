export default {
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow Text (above the headline)',
      type: 'localeString',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
    },
  ],
}
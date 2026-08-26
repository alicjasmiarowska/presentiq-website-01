export default {
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'e.g. "Main Services"',
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow Text (przed headlinem)',
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
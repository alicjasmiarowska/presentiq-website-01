export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Hero Name',
      type: 'string',
      description: 'e.g. "Main Hero", "Secondary Hero"',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
    },
  ],
  // There are several Hero documents (one per page that needs its own
  // headline) — this is what shows in the list when picking which one a
  // page should use, so it must actually distinguish them.
  preview: {
    select: { title: 'name', subtitle: 'title.en' },
  },
}

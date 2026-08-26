export default {
  name: 'videoSection',
  title: 'Video Section',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'e.g. "Showreel"',
    },
    {
      name: 'video',
      title: 'Video (MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
    },
  ],
}

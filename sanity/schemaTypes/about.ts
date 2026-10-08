export default {
  name: 'about',
  title: 'About Us Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title (used to pick this page in Navigation/Footer)',
      type: 'string',
      initialValue: 'About',
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
      title: 'Intro (two columns above the team photos)',
      description: 'Choose a Two Column Section document: left column = heading + text, right column = text + blue heading ("Lernen Sie unser Team kennen").',
      type: 'reference',
      to: [{ type: 'twoColumnSection' }],
    },
    // Legacy fields superseded by `intro`; hidden in Studio and retained to
    // preserve existing content. Plain objects (not localeString/localeText)
    // so the editorial checks in textRules.ts skip text that is never
    // rendered.
    ...['teamHeadline', 'teamText'].map((name) => ({
      name,
      type: 'object',
      hidden: true,
      fields: [
        { name: 'en', type: 'text' },
        { name: 'de', type: 'text' },
      ],
    })),
    {
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          title: 'Team Member',
          fields: [
            {
              name: 'photo',
              title: 'Photo (cropped to a 1:1 square — set the hotspot on the face)',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'name', media: 'photo' },
          },
        },
      ],
    },
    {
      name: 'principles',
      title: 'Unsere Prinzipien (2×2 grid)',
      description: 'Choose a Four Pillars document with a heading and 4 principles (title + description; images aren\'t used here).',
      type: 'reference',
      to: [{ type: 'fourPillars' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}

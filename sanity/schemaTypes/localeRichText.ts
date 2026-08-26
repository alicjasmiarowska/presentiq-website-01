const blockContent = {
  type: 'array' as const,
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{ name: 'href', title: 'URL', type: 'url' }],
          },
        ],
      },
    },
  ],
}

export default {
  name: 'localeRichText',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    { name: 'en', title: 'English', ...blockContent },
    { name: 'de', title: 'Deutsch', ...blockContent },
  ],
}

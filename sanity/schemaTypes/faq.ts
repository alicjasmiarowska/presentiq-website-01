export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'page',
      title: 'Strona',
      description: 'Na której stronie ma się pokazać ten zestaw pytań',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Usługi', value: 'services' },
          { title: 'How We Work', value: 'howWeWork' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
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
      name: 'subheadline',
      title: 'Subheadline',
      type: 'localeString',
    },
    {
      name: 'items',
      title: 'Pytania i odpowiedzi (max 5)',
      type: 'array',
      validation: (Rule: any) => Rule.max(5).warning('Maksymalnie 5 pytań na sekcję FAQ'),
      of: [
        {
          type: 'object',
          name: 'qna',
          title: 'Pytanie i odpowiedź',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'localeString',
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'object',
              fields: [
                { name: 'en', type: 'text', title: 'English' },
                { name: 'de', type: 'text', title: 'Deutsch' },
              ],
            },
          ],
          preview: {
            select: { title: 'question.en' },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline.en',
      subtitle: 'page',
    },
  },
}

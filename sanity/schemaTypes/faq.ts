import { localeValidation } from '@/sanity/lib/textRules'

export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'page',
      title: 'Page',
      description: 'Which page this set of questions should appear on',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Services', value: 'services' },
          { title: 'How We Work', value: 'howWeWork' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
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
      name: 'subheadline',
      title: 'Subheadline',
      type: 'localeString',
    },
    {
      name: 'items',
      title: 'Questions and Answers (max 5)',
      type: 'array',
      validation: (Rule: any) => Rule.max(5).warning('Maximum 5 questions per FAQ section'),
      of: [
        {
          type: 'object',
          name: 'qna',
          title: 'Question and Answer',
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
              validation: localeValidation,
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

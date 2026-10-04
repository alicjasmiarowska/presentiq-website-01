import { localeValidation } from '@/sanity/lib/textRules'

export default {
  name: 'localeText',
  title: 'Localized Text (description)',
  type: 'object',
  validation: localeValidation,
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    },
    {
      name: 'de',
      title: 'Deutsch',
      type: 'text',
      rows: 4,
    },
  ],
}

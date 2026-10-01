import { localeValidation } from '../lib/textRules'

export default {
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  validation: localeValidation,
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
    {
      name: 'de',
      title: 'Deutsch',
      type: 'string',
    },
  ],
}
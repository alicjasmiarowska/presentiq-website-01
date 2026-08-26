export default {
  name: 'featuredWork',
  title: 'Featured Work Section',
  type: 'document',
  fields: [
    {
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'e.g. "Featured Work"',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'localeString',
    },
    {
      name: 'buttonPage',
      title: 'Przekierowanie: strona',
      description: 'Wybierz istniejącą stronę zamiast wpisywać URL ręcznie.',
      type: 'reference',
      to: [{ type: 'contact' }, { type: 'about' }, { type: 'howWeWork' }, { type: 'homepage' }, { type: 'portfolio' }],
    },
    {
      name: 'buttonHref',
      title: 'Przekierowanie: ręczny URL',
      description: 'Użyj tylko jeśli powyżej nie wybrano strony (np. link zewnętrzny).',
      type: 'string',
    },
    {
      name: 'projects',
      title: 'Wyróżnione Case Studies (3)',
      description: 'Wybierz dokładnie 3 istniejące Case Studies do pokazania w tej sekcji.',
      type: 'array',
      validation: (Rule: any) => Rule.min(3).max(3).error('Wymagane dokładnie 3 case studies'),
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
    },
  ],
}

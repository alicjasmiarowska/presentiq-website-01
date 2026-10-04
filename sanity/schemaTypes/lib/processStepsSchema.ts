// Shared "N-step process" field: a blue step number (auto, from array
// position), an uppercase title and a short bullet list per step, on a
// light-gray band — used by AI Design (fixed at 3 steps) and How We Work
// (any number of steps), via the same ProcessSteps React component.
export function processStepsField(name: string, title: string, validation?: (Rule: any) => any) {
  return {
    name,
    title,
    type: 'object',
    fields: [
      {
        name: 'steps',
        title: 'Steps',
        type: 'array',
        validation,
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Step Title',
                type: 'localeString',
              },
              {
                name: 'bullets',
                title: 'Bullet Points',
                type: 'array',
                of: [{ type: 'localeString' }],
              },
            ],
            preview: {
              select: { title: 'title.en' },
            },
          },
        ],
      },
    ],
  }
}

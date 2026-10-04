import Heading from '../atoms/Heading'
import Reveal from '../atoms/Reveal'

interface ProcessStep {
  _key: string
  title?: { en: string; de: string }
  bullets?: { _key: string; en: string; de: string }[]
}

interface ProcessStepsData {
  steps?: ProcessStep[]
}

interface ProcessStepsProps {
  data: ProcessStepsData
  locale: 'en' | 'de'
}

// Light-gray "3-step process" band: a blue step number, an uppercase title,
// and a short bullet list per column.
export default function ProcessSteps({ data, locale }: ProcessStepsProps) {
  if (!data || !data.steps?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <section className="bg-neutral-light">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {data.steps.map((step, i) => (
            <Reveal key={step._key} delay={i * 100}>
              <Heading level="h3" text={String(i + 1).padStart(2, '0')} className="text-primary-blue mb-2" />
              <Heading level="h4" text={t(step.title)} className="mb-4" />
              {step.bullets && step.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {step.bullets.map((bullet) => (
                    <li key={bullet._key} className="text-base text-primary-dark leading-relaxed">
                      {t(bullet)}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

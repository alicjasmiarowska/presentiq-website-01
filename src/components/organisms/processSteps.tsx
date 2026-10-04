import Heading from '@/src/components/atoms/Heading'
import Reveal from '@/src/components/atoms/Reveal'
import { resolveLocale } from '@/src/lib/locale'

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

  const t = (field: any) => resolveLocale(field, locale)

  return (
    <section className="bg-neutral-light">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {data.steps.map((step, i) => (
            <Reveal key={step._key} delay={i * 100}>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-h3 md:text-h3-md lg:text-h3-lg font-normal text-primary-blue">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Heading level="h4" text={t(step.title)} />
              </div>
              {step.bullets && step.bullets.length > 0 && (
                <ul className="[list-style-type:square] pl-5 space-y-1">
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

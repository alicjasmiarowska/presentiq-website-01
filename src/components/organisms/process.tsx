import Heading from '@/src/components/atoms/Heading'
import Text from '@/src/components/atoms/Text'
import Section from '@/src/components/atoms/Section'
import Reveal from '@/src/components/atoms/Reveal'
import { resolveLocale } from '@/src/lib/locale'

interface ProcessStep {
  _key: string
  title: { en: string; de: string }
  description: { en: string; de: string }
}

interface ProcessData {
  headline: { en: string; de: string }
  steps: ProcessStep[]
}

interface ProcessSectionProps {
  data: ProcessData
  locale: 'en' | 'de'
  textColor?: 'dark' | 'light'
}

export default function ProcessSection({ data, locale, textColor = 'dark' }: ProcessSectionProps) {
  if (!data || !data.steps?.length) return null

  const t = (field: any) => resolveLocale(field, locale)
  const isLight = textColor === 'light'

  return (
    <Section className="py-16 md:py-24">
      <div>
        <Reveal>
          <Heading
            level="h3"
            text={t(data.headline)}
            className={`mb-10 md:mb-24 ${isLight ? 'text-white' : ''}`}
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {data.steps.map((step, index) => (
            <Reveal key={step._key} delay={index * 150}>
              <div>
                <Heading
                  level="h3"
                  text={String(index + 1).padStart(2, '0')}
                  className={`mb-4 ${isLight ? 'text-white' : ''}`}
                />
                <div
                  className={`pt-6 border-t-2 ${isLight ? 'border-primary-blue' : 'border-primary-blue'}`}
                >
                  <Heading
                    level="h5"
                    text={t(step.title)}
                    className={`mb-3 ${isLight ? 'text-white' : ''}`}
                  />
                  <Text text={t(step.description)} size="base" color={isLight ? 'primary' : 'secondary'} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

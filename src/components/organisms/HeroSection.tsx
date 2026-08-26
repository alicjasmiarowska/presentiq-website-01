import Heading from '../atoms/Heading'
import Button from '../atoms/Button'
import Reveal from '../atoms/Reveal'
import CharReveal from '../atoms/CharReveal'
import { resolveButtonHref } from '../../lib/resolveHref'

interface HeroData {
  title: { en: string; de: string }
  subtitle: { en: string; de: string }
  buttonText1?: { en: string; de: string }
  buttonPage1?: { type?: string; slug?: string }
  buttonHref1?: string
  buttonText2?: { en: string; de: string }
  buttonPage2?: { type?: string; slug?: string }
  buttonHref2?: string
}

interface HeroSectionProps {
  data: HeroData
  locale: 'en' | 'de'
}

export default function HeroSection({ data, locale }: HeroSectionProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const buttonHref1 = resolveButtonHref(locale, data.buttonPage1, data.buttonHref1)
  const buttonHref2 = resolveButtonHref(locale, data.buttonPage2, data.buttonHref2)

  return (
    <section className="min-h-150 max-lg:landscape:min-h-0 max-lg:landscape:h-auto md:h-[80vh] flex flex-col justify-between gap-10 max-lg:landscape:gap-6 px-6 md:px-20 lg:px-40 pt-16 max-lg:landscape:pt-20 pb-12 max-lg:landscape:pb-10 md:pt-20 md:pb-40">
      <div className="w-full max-w-[1680px] mx-auto">
        <div className="w-full md:w-[90%]">
          <Heading level="h1" text={t(data.title)} className="text-white">
            <CharReveal text={t(data.title)} />
          </Heading>
        </div>
      </div>

      <div className="w-full max-w-[1680px] mx-auto flex flex-col md:flex-row gap-8 md:gap-20">
        <div className="w-full md:w-[40%]">
          <Reveal delay={500}>
            <Heading
              level="h5"
              text={t(data.subtitle)}
              className="text-white font-light"
            />
          </Reveal>
        </div>

        <div className="flex-1 flex items-start md:items-end justify-start md:justify-end">
          <Reveal delay={650}>
            <div className="flex flex-wrap gap-4 md:gap-6">
              {t(data.buttonText1) && (
                <Button
                  text={t(data.buttonText1)}
                  href={buttonHref1}
                  variant="primary"
                  size="md"
                />
              )}
              {t(data.buttonText2) && (
                <Button
                  text={t(data.buttonText2)}
                  href={buttonHref2}
                  variant="secondary"
                  size="md"
                />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
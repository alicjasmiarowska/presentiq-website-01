import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import PlusDraw from '../atoms/PlusDraw'
import { resolveButtonHref } from '../../lib/resolveHref'

interface FinalCtaData {
  headline: { en: string; de: string }
  subheadline: { en: string; de: string }
  buttonText: { en: string; de: string }
  buttonPage?: { type?: string; slug?: string }
  buttonHref?: string
}

interface FinalCtaSectionProps {
  data: FinalCtaData
  locale: 'en' | 'de'
}

export default function FinalCtaSection({ data, locale }: FinalCtaSectionProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)

  return (
    <section className="relative bg-primary-blue px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:py-32">
      <div className="max-w-[1680px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <div className="flex justify-start mb-4 md:mb-0 md:items-start">
          <PlusDraw size={160} strokeWidth={38} className="w-16 h-16 md:w-40 md:h-40" />
        </div>

        <div>
          <Heading
            level="h3"
            text={t(data.headline)}
            className="text-white mb-6"
          />
          <Text
            text={t(data.subheadline)}
            size="lg"
            color="secondary"
            className="text-white mb-12"
          />
          <Button
            text={t(data.buttonText)}
            href={buttonHref}
            variant="secondary"
            size="md"
          />
        </div>
      </div>
    </section>
  )
}

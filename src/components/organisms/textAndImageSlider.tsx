import Heading from '@/src/components/atoms/Heading'
import Text from '@/src/components/atoms/Text'
import Button from '@/src/components/atoms/Button'
import Reveal from '@/src/components/atoms/Reveal'
import ImageSlider from '@/src/components/molecules/ImageSlider'
import { resolveButtonHref } from '@/src/lib/resolveHref'
import { resolveLocale } from '@/src/lib/locale'
import type { SanityImageValue } from '@/src/types/sanity'

interface SlideImage {
  _key: string
  asset?: SanityImageValue
  alt?: string
}

interface TextAndImageSliderData {
  headline: { en: string; de: string }
  body?: { en: string; de: string }
  images: SlideImage[]
  buttonText?: { en: string; de: string }
  buttonPage?: { type?: string; slug?: string }
  buttonHref?: string
}

interface TextAndImageSliderSectionProps {
  data: TextAndImageSliderData
  locale: 'en' | 'de'
  textColor?: 'dark' | 'light'
}

export default function TextAndImageSliderSection({
  data,
  locale,
  textColor = 'dark',
}: TextAndImageSliderSectionProps) {
  if (!data || !data.images?.length) return null

  const t = (field: any) => resolveLocale(field, locale)
  const isLight = textColor === 'light'
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 lg:mr-40 mb-6 lg:mb-0">
        <Reveal>
          <ImageSlider images={data.images} locale={locale} fallbackAlt={t(data.headline)} />
        </Reveal>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <Reveal delay={150}>
          <Heading
            level="h3"
            text={t(data.headline)}
            className={`mb-6 ${isLight ? 'text-white' : ''}`}
          />
          {data.body && (
            <Text
              text={t(data.body)}
              size="base"
              color={isLight ? 'primary' : 'secondary'}
              className="mb-8"
            />
          )}
          {data.buttonText && (
            <Button text={t(data.buttonText)} href={buttonHref} variant="primary" size="md" />
          )}
        </Reveal>
      </div>
    </div>
  )
}

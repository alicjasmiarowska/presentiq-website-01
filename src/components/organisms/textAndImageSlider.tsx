import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Reveal from '../atoms/Reveal'
import ImageSlider from '../molecules/ImageSlider'
import { resolveButtonHref } from '../../lib/resolveHref'

interface SlideImage {
  _key: string
  asset?: any
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

  const t = (field: any) => field?.[locale] || field?.en || ''
  const isLight = textColor === 'light'
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 md:mr-40 mb-6 md:mb-0">
        <Reveal>
          <ImageSlider images={data.images} />
        </Reveal>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
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

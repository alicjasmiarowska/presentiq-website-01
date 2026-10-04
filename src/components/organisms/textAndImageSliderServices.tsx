import Link from 'next/link'
import Heading from '@/src/components/atoms/Heading'
import Text from '@/src/components/atoms/Text'
import Reveal from '@/src/components/atoms/Reveal'
import ImageSlider from '@/src/components/molecules/ImageSlider'
import ArrowIcon from '@/src/components/atoms/ArrowIcon'
import { resolveLocale } from '@/src/lib/locale'
import type { SanityImageValue } from '@/src/types/sanity'

interface SlideImage {
  _key: string
  asset?: SanityImageValue
  alt?: string
}

interface ServiceLink {
  _id: string
  title: { en: string; de: string }
  slug?: string
}

interface TextAndImageSliderServicesData {
  headline: { en: string; de: string }
  body?: { en: string; de: string }
  images: SlideImage[]
  services?: ServiceLink[]
}

interface TextAndImageSliderServicesSectionProps {
  data: TextAndImageSliderServicesData
  locale: 'en' | 'de'
  textColor?: 'dark' | 'light'
}

export default function TextAndImageSliderServicesSection({
  data,
  locale,
  textColor = 'dark',
}: TextAndImageSliderServicesSectionProps) {
  if (!data || !data.images?.length) return null

  const t = (field: any) => resolveLocale(field, locale)
  const isLight = textColor === 'light'
  const services = (data.services || []).filter((service) => service.slug)

  return (
    <div className="flex flex-col lg:flex-row pb-10">
      <div className="w-full lg:w-1/2 lg:mr-40 mb-10 lg:mb-10">
        <Reveal>
          <ImageSlider images={data.images} locale={locale} fallbackAlt={t(data.headline)} />
        </Reveal>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col">
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
        </Reveal>

        {services.length > 0 && (
          <Reveal delay={300}>
            <div>
              {services.map((service) => (
                <Link
                  key={service._id}
                  href={`/${locale}/services/${service.slug}`}
                  className={`group flex items-center justify-between gap-4 py-5 border-b border-primary-dark/20 transition-colors duration-300 ${
                    isLight ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`font-display text-base font-bold ${isLight ? 'text-white' : 'text-primary-dark'}`}>
                    {t(service.title)}
                  </span>
                  <ArrowIcon className="shrink-0 text-primary-blue transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  )
}

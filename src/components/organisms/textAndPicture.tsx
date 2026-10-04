import Image from 'next/image'
import Heading from '@/src/components/atoms/Heading'
import RichText from '@/src/components/atoms/RichText'
import Button from '@/src/components/atoms/Button'
import Reveal from '@/src/components/atoms/Reveal'
import AiBadge from '@/src/components/atoms/AiBadge'
import { urlFor } from '@/sanity/lib/image'
import { resolveButtonHref } from '@/src/lib/resolveHref'
import { resolveLocale } from '@/src/lib/locale'
import type { SanityImageValue, PortableTextLocaleValue } from '@/src/types/sanity'

interface TextAndPictureData {
  headline: { en: string; de: string }
  body: PortableTextLocaleValue
  image?: SanityImageValue
  videoUrl?: string
  aiGenerated?: boolean
  imageWidth?: number
  imageHeight?: number
  imageFit?: 'cover' | 'contain'
  buttonText?: { en: string; de: string }
  buttonPage?: { type?: string; slug?: string }
  buttonHref?: string
}

interface TextAndPictureSectionProps {
  data: TextAndPictureData
  locale: 'en' | 'de'
  textColor?: 'dark' | 'light'
  priority?: boolean
}

export default function TextAndPictureSection({ data, locale, textColor = 'dark', priority = false }: TextAndPictureSectionProps) {
  if (!data) return null

  const t = (field: any) => resolveLocale(field, locale)
  const imageWidth = data.imageWidth ?? 50
  const imageHeight = data.imageHeight ?? 400
  const imageFit = data.imageFit ?? 'cover'
  const fitClass = imageFit === 'contain' ? 'object-contain' : 'object-cover'
  const isLight = textColor === 'light'
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)

  return (
    <>
      {t(data.headline) && (
        <div className="w-full md:w-[70%]">
          <Reveal>
            <Heading
              level="h2"
              variant="section"
              text={t(data.headline)}
              className={`mb-6 md:mb-30 ${isLight ? 'text-white' : ''}`}
            />
          </Reveal>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        <div
          className="w-full lg:w-(--img-w) lg:mr-40 lg:shrink-0 mb-6 lg:mb-0"
          style={{ '--img-w': `${imageWidth}%` } as React.CSSProperties}
        >
          {data.videoUrl ? (
            <div
              className="relative h-64 lg:h-(--img-h) rounded-2xl overflow-hidden"
              style={{ '--img-h': `${imageHeight}px` } as React.CSSProperties}
            >
              <video
                src={data.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full ${fitClass}`}
              />
              {data.aiGenerated && <AiBadge locale={locale} className="left-4!" />}
            </div>
          ) : (
            data.image?.asset && (
              <div
              className="relative h-64 lg:h-(--img-h) rounded-2xl overflow-hidden"
              style={{ '--img-h': `${imageHeight}px` } as React.CSSProperties}
            >
                <Image
                  src={urlFor(data.image).width(1200).url()}
                  alt={data.image.alt || t(data.headline)}
                  fill
                  sizes={`(max-width: 1024px) 100vw, ${imageWidth}vw`}
                  className={fitClass}
                  priority={priority}
                  loading={priority ? undefined : 'lazy'}
                />
                {data.aiGenerated && <AiBadge locale={locale} className="left-4!" />}
              </div>
            )
          )}
        </div>

        <div className="flex-1">
          <RichText
            value={data.body?.[locale] || data.body?.en}
            color={isLight ? 'primary' : 'secondary'}
            className="mb-10"
          />
          {data.buttonText && (
            <Button text={t(data.buttonText)} href={buttonHref} variant="primary" size="md" />
          )}
        </div>
      </div>
    </>
  )
}

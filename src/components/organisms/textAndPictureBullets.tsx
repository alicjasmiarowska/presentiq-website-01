import Image from 'next/image'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Reveal from '../atoms/Reveal'
import { urlFor } from '../../../sanity/lib/image'
import { resolveButtonHref } from '../../lib/resolveHref'

interface Bullet {
  _key: string
  en: string
  de: string
}

interface TextAndPictureBulletsData {
  headline: { en: string; de: string }
  body?: { en: string; de: string }
  bullets?: Bullet[]
  image?: any
  videoUrl?: string
  imageWidth?: number
  imageHeight?: number
  imageFit?: 'cover' | 'contain'
  buttonText?: { en: string; de: string }
  buttonPage?: { type?: string; slug?: string }
  buttonHref?: string
}

interface TextAndPictureBulletsSectionProps {
  data: TextAndPictureBulletsData
  locale: 'en' | 'de'
  textColor?: 'dark' | 'light'
}

export default function TextAndPictureBulletsSection({
  data,
  locale,
  textColor = 'dark',
}: TextAndPictureBulletsSectionProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const imageWidth = data.imageWidth ?? 50
  const imageHeight = data.imageHeight ?? 400
  const imageFit = data.imageFit ?? 'cover'
  const fitClass = imageFit === 'contain' ? 'object-contain' : 'object-cover'
  const isLight = textColor === 'light'
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)

  return (
    <>
      <div className="w-full md:w-[80%]">
        <Reveal>
          <Heading
            level="h2"
            text={t(data.headline)}
            className={`mb-6 md:mb-30 ${isLight ? 'text-white' : ''}`}
          />
        </Reveal>
      </div>

      <div className="flex flex-col md:flex-row">
        <div
          className="w-full md:w-(--img-w) md:mr-40 md:shrink-0 mb-6 md:mb-0"
          style={{ '--img-w': `${imageWidth}%` } as React.CSSProperties}
        >
          {data.videoUrl ? (
            <div
              className="relative h-64 md:h-(--img-h) rounded-2xl overflow-hidden"
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
            </div>
          ) : (
            data.image?.asset && (
              <div
                className="relative h-64 md:h-(--img-h) rounded-2xl overflow-hidden"
                style={{ '--img-h': `${imageHeight}px` } as React.CSSProperties}
              >
                <Image
                  src={urlFor(data.image).width(600).url()}
                  alt={data.image.alt || ''}
                  fill
                  sizes={`(max-width: 768px) 100vw, ${imageWidth}vw`}
                  className={fitClass}
                />
              </div>
            )
          )}
        </div>

        <div className="flex-1">
          {data.body && (
            <Text
              text={t(data.body)}
              size="base"
              color={isLight ? 'primary' : 'secondary'}
              className="mb-8"
            />
          )}
          {data.bullets && data.bullets.length > 0 && (
            <ul className="mb-10 space-y-3">
              {data.bullets.map((bullet) => (
                <li key={bullet._key} className="flex items-start gap-3">
                  <span
                    className={`mt-2.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                      isLight ? 'bg-white' : 'bg-primary-dark'
                    }`}
                  />
                  <Text text={t(bullet)} size="base" color={isLight ? 'primary' : 'secondary'} />
                </li>
              ))}
            </ul>
          )}
          {data.buttonText && (
            <Button text={t(data.buttonText)} href={buttonHref} variant="primary" size="md" />
          )}
        </div>
      </div>
    </>
  )
}

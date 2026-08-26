import Image from 'next/image'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import { urlFor } from '../../../sanity/lib/image'

interface Logo {
  _key: string
  alt?: string
  asset?: any
}

interface LogoWallData {
  headline: { en: string; de: string }
  subheadline: { en: string; de: string }
  logos?: Logo[]
}

interface LogoWallProps {
  data: LogoWallData
  locale: 'en' | 'de'
}

function LogoBadge({ logo }: { logo: Logo }) {
  return (
    <div className="shrink-0 flex items-center justify-center border-2 border-neutral-light rounded-full px-8 py-4">
      <div className="relative h-10 w-28">
        <Image
          src={urlFor(logo).height(80).url()}
          alt={logo.alt || ''}
          fill
          sizes="112px"
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default function LogoWall({ data, locale }: LogoWallProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const logos = data.logos?.filter((logo) => logo.asset) || []
  const half = Math.ceil(logos.length / 2)
  const row1 = logos.slice(0, half)
  const row2 = logos.slice(half)

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="pt-12 md:pt-20">
        <div className="max-w-[1680px] mx-auto px-6 md:px-20 lg:px-40 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12 mb-12">
          <Heading level="h4" text={t(data.headline)} />
          <div className="w-full md:w-[40%]">
            <Text
              text={t(data.subheadline)}
              size="base"
              color="secondary"
              className="text-left"
            />
          </div>
        </div>

        {logos.length > 0 ? (
          <div className="flex flex-col gap-6">
            {row1.length > 0 && (
              <div className="overflow-hidden">
                <div className="flex w-max items-center gap-6 animate-[marquee_80s_linear_infinite]">
                  {[...row1, ...row1].map((logo, i) => (
                    <LogoBadge key={`${logo._key}-a-${i}`} logo={logo} />
                  ))}
                </div>
              </div>
            )}
            {row2.length > 0 && (
              <div className="overflow-hidden">
                <div className="flex w-max items-center gap-6 animate-[marquee-reverse_80s_linear_infinite]">
                  {[...row2, ...row2].map((logo, i) => (
                    <LogoBadge key={`${logo._key}-b-${i}`} logo={logo} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-[1680px] mx-auto px-6 md:px-20 lg:px-40">
            <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Logo wall - coming soon</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

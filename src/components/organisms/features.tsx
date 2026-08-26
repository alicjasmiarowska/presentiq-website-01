import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Section from '../atoms/Section'
import Reveal from '../atoms/Reveal'
import { urlFor } from '../../../sanity/lib/image'

interface FeatureItem {
  _key: string
  icon?: any
  title: { en: string; de: string }
  description: { en: string; de: string }
}

interface FeaturesData {
  headline: { en: string; de: string }
  items: FeatureItem[]
}

interface FeaturesSectionProps {
  data: FeaturesData
  locale: 'en' | 'de'
  textColor?: 'dark' | 'light'
}

export default function FeaturesSection({ data, locale, textColor = 'dark' }: FeaturesSectionProps) {
  if (!data || !data.items?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const isLight = textColor === 'light'

  return (
    <Section>
      <div className="pt-10 pb-20">
        <Reveal>
          <Heading
            level="h3"
            text={t(data.headline)}
            className={`mb-24 ${isLight ? 'text-white' : ''}`}
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {data.items.map((item, index) => (
            <Reveal key={item._key} delay={index * 150}>
              <div>
                {item.icon?.asset && (
                  <div
                    className="w-20 h-20 mb-4 bg-primary-blue"
                    style={{
                      WebkitMaskImage: `url(${urlFor(item.icon).width(200).url()})`,
                      maskImage: `url(${urlFor(item.icon).width(200).url()})`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                    }}
                  />
                )}
                <div className="pt-6 border-t-2 border-primary-blue">
                  <Heading
                    level="h4"
                    text={t(item.title)}
                    className={`mb-3 ${isLight ? 'text-white' : ''}`}
                  />
                  <Text text={t(item.description)} size="base" color={isLight ? 'primary' : 'secondary'} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

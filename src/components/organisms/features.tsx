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

// CSS mask-image (used to tint an arbitrary icon to our brand color) is
// inconsistently supported for cross-origin SVGs on mobile browsers, so we
// fetch the SVG server-side and inline it with fill="currentColor" instead —
// that renders identically everywhere and just inherits the wrapper's color.
async function fetchInlineIcon(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const text = await res.text()
    if (!text.includes('<svg')) return null
    return text.replace(/fill="(?!none")[^"]*"/g, 'fill="currentColor"')
  } catch {
    return null
  }
}

export default async function FeaturesSection({ data, locale, textColor = 'dark' }: FeaturesSectionProps) {
  if (!data || !data.items?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const isLight = textColor === 'light'

  const icons = await Promise.all(
    data.items.map((item) =>
      item.icon?.asset ? fetchInlineIcon(urlFor(item.icon).width(200).url()) : Promise.resolve(null)
    )
  )

  return (
    <Section>
      <div className="pt-10 pb-10 md:pt-10 md:pb-20">
        <Reveal>
          <Heading
            level="h3"
            text={t(data.headline)}
            className={`mb-10 md:mb-24 ${isLight ? 'text-white' : ''}`}
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {data.items.map((item, index) => (
            <Reveal key={item._key} delay={index * 150}>
              <div>
                {icons[index] && (
                  <span
                    className="block w-20 h-20 mb-4 text-primary-blue [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: icons[index]! }}
                  />
                )}
                <div className="pt-6 border-t-2 border-primary-blue">
                  <Heading
                    level="h5"
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

import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Reveal from '../atoms/Reveal'

interface ReasonItem {
  _key: string
  title?: { en: string; de: string }
  body?: { en: string; de: string }
}

interface ReasonsGridData {
  headline?: { en: string; de: string }
  items?: ReasonItem[]
}

interface ReasonsGridProps {
  data?: ReasonsGridData
  locale: 'en' | 'de'
}

// "Der Blick von außen macht den Unterschied" white section: a headline
// above a 2-column grid of short reasons, cells divided by a thin line —
// a plain table-like grid, not cards (compare FourColumnsSection, which is
// full-bleed colored blocks with buttons).
export default function ReasonsGrid({ data, locale }: ReasonsGridProps) {
  if (!data || !data.items?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <section className="bg-white">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {t(data.headline) && (
          <Reveal>
            <Heading level="h2" variant="section" text={t(data.headline)} className="mb-12 md:mb-16" />
          </Reveal>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {data.items.map((item, i) => {
            const isLeftColumn = i % 2 === 0
            const isTopRow = i < 2
            return (
              <Reveal key={item._key} delay={i * 100}>
                <div
                  className={`py-8 md:py-10 max-w-[427px] ${isLeftColumn ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'} ${
                    isLeftColumn ? 'md:border-r md:border-primary-dark/15' : ''
                  } ${!isTopRow ? 'border-t border-primary-dark/15 md:pt-10' : ''}`}
                >
                  <Heading level="h4" text={t(item.title)} className="text-primary-blue! mb-4" />
                  <Text text={t(item.body)} size="base" color="secondary" />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

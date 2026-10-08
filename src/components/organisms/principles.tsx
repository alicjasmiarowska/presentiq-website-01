import Image from 'next/image'
import Heading, { LEAD_TEXT_CLASSES } from '@/src/components/atoms/Heading'
import Text from '@/src/components/atoms/Text'
import Reveal from '@/src/components/atoms/Reveal'
import DrawLine from '@/src/components/atoms/DrawLine'
import { resolveLocale } from '@/src/lib/locale'

interface Principle {
  _key: string
  title: { en: string; de: string }
  description: { en: string; de: string }
}

interface PrinciplesData {
  headline: { en: string; de: string }
  pillars: Principle[]
}

interface PrinciplesSectionProps {
  data: PrinciplesData
  locale: 'en' | 'de'
}

const TITLE_CLASS = `${LEAD_TEXT_CLASSES} text-white`

// "Unsere Prinzipien" on the About page: a 2×2 grid on navy, split by the
// site's animated blue DrawLines — a vertical one in each row (stopping
// short of the horizontal one between the rows), like the homepage pillars.
// Uses the Four Pillars document shape (headline + 4 title/description).
export default function PrinciplesSection({ data, locale }: PrinciplesSectionProps) {
  if (!data || !data.pillars?.length) return null

  const t = (field: any) => resolveLocale(field, locale)
  const rows = [data.pillars.slice(0, 2), data.pillars.slice(2, 4)].filter((row) => row.length)

  return (
    <section className="relative overflow-hidden bg-primary-dark">
      <Image
        src="/images/line-2.png"
        alt=""
        aria-hidden="true"
        width={2648}
        height={2746}
        className="absolute right-0 top-0 -translate-y-[14%] w-[26vw] max-w-[374px] min-w-32 h-auto rotate-180 pointer-events-none select-none"
      />

      <div className="relative pt-20 pb-16 mini:pt-25 mini:pb-30">
        <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <Heading level="h2" variant="section" text={t(data.headline)} className="text-white" />
          </Reveal>

          {/* Each row's vertical line spans the row's full height (229px at
             1440px): top-row text hangs from the top of its line, bottom-row
             text sits on the bottom of its line, with 30px between the lines
             and the horizontal divider. Descriptions have room for three
             lines. */}
          <div className="mt-12 mini:mt-32">
            {rows.map((row, rowIndex) => {
              const isTop = rowIndex === 0
              return (
                <div key={rowIndex}>
                  {!isTop && <DrawLine direction="horizontal" className="h-px w-full mini:my-[30px]" delay={600} />}
                  {/* The vertical divider is a sibling of the grid, not a
                      child — as a child, `divide-y` would count it when
                      deciding which cells get a border even though it's
                      `hidden` on mobile (a display:none class, not the
                      `hidden` HTML attribute divide-y's selector excludes),
                      risking a second, unwanted line next to the real one. */}
                  <div className="relative">
                    <div className="grid grid-cols-1 mini:grid-cols-2 divide-y divide-primary-blue mini:divide-y-0">
                      {row.map((principle, i) => (
                        <div
                          key={principle._key}
                          className={`flex flex-col py-8 mini:py-0 mini:min-h-[229px] ${isTop ? 'mini:justify-start mini:pt-[11px]' : 'mini:justify-end'} ${i === 0 ? 'mini:pr-15' : 'mini:pl-16'}`}
                        >
                          <Reveal delay={(rowIndex * 2 + i) * 150}>
                            <p className={TITLE_CLASS}>{t(principle.title)}</p>
                            <Text text={t(principle.description)} size="base" color="primary" className="mt-6 max-w-[560px]" />
                          </Reveal>
                        </div>
                      ))}
                    </div>
                    {row.length === 2 && (
                      <DrawLine
                        direction="vertical"
                        reverse={!isTop}
                        className="hidden mini:block absolute left-1/2 top-0 bottom-0 w-px"
                        delay={0}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

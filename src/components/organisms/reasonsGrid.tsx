'use client'

import { useEffect, useRef, useState } from 'react'
import Heading, { LEAD_TEXT_CLASSES } from '@/src/components/atoms/Heading'
import Text from '@/src/components/atoms/Text'
import Reveal from '@/src/components/atoms/Reveal'
import DrawLine from '@/src/components/atoms/DrawLine'
import { resolveLocale } from '@/src/lib/locale'

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
// above a 2-column grid of short reasons (paired into rows of 2), using
// the exact same animated divider mechanism as the homepage's
// ThreePillarsSection — a vertical DrawLine per row, inset top/bottom so it
// stops short of the horizontal DrawLine between rows instead of crossing
// through it, rather than one plain continuous line.
export default function ReasonsGrid({ data, locale }: ReasonsGridProps) {
  const t = (field: any) => resolveLocale(field, locale)
  const items = data?.items || []
  const rows: ReasonItem[][] = []
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2))

  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [lineHeights, setLineHeights] = useState<number[]>([])

  useEffect(() => {
    const measure = () => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      if (!isDesktop) {
        setLineHeights([])
        return
      }
      // top-8/bottom-8 insets (32px each) are what the line aligns to, so
      // its length is the row's own height minus those two insets.
      setLineHeights(rowRefs.current.map((el) => (el ? el.clientHeight - 64 : 0)))
    }

    measure()
    const observer = new ResizeObserver(measure)
    rowRefs.current.forEach((el) => el && observer.observe(el))
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [rows.length])

  if (rows.length === 0) return null

  return (
    <section className="bg-white text-primary-dark">
      <div className="py-16 md:py-25">
        <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20">
          {t(data?.headline) && (
            <Reveal>
              <Heading level="h2" variant="section" text={t(data?.headline)} className="mb-12 md:mb-16" />
            </Reveal>
          )}

          {rows.map((row, rowIndex) => {
            const reverse = rowIndex % 2 === 1
            const lineHeight = lineHeights[rowIndex]

            return (
              <div key={rowIndex}>
                <div
                  ref={(el) => {
                    rowRefs.current[rowIndex] = el
                  }}
                  className="relative grid grid-cols-1 md:grid-cols-2 divide-y divide-primary-blue md:divide-y-0"
                >
                  {row.map((item, i) => (
                    <Reveal key={item._key} delay={(rowIndex * 2 + i) * 100}>
                      <div className={`py-8 max-w-[427px] ${i === 0 ? 'md:pr-15' : 'md:pl-15'}`}>
                        <p className={`${LEAD_TEXT_CLASSES} text-primary-blue mb-4`}>{t(item.title)}</p>
                        <Text text={t(item.body)} size="base" color="secondary" />
                      </div>
                    </Reveal>
                  ))}

                  <div
                    className={`hidden md:block absolute left-1/2 -translate-x-1/2 ${reverse ? 'bottom-8' : 'top-8'}`}
                  >
                    <DrawLine
                      direction="vertical"
                      reverse={reverse}
                      className="w-px"
                      style={lineHeight !== undefined ? { height: `${lineHeight}px` } : undefined}
                      delay={0}
                    />
                  </div>
                </div>

                {rowIndex < rows.length - 1 && <DrawLine direction="horizontal" className="h-px w-full" delay={200} />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import Text from '../atoms/Text'
import Reveal from '../atoms/Reveal'
import DrawLine from '../atoms/DrawLine'
import Heading from '../atoms/Heading'

interface Pillar {
  _key: string
  title: { en: string; de: string }
}

interface PillarsData {
  headline: { en: string; de: string }
  introText?: { en: string; de: string }
  pillars: Pillar[]
}

interface PillarsProps {
  data: PillarsData
  locale: 'en' | 'de'
}

export default function Pillars({ data, locale }: PillarsProps) {
  const row1Ref = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState<number | null>(null)
  const [rowHeight, setRowHeight] = useState<number | null>(null)

  useEffect(() => {
    const el = row1Ref.current
    if (!el) return

    const measure = () => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      if (!isDesktop) {
        setLineHeight(null)
        setRowHeight(null)
        return
      }
      // top-8/bottom-8 insets (32px each) are what the top line aligns to,
      // so its length is the row's own height minus those two insets. Row 2
      // is given the same total height so its line has room to match without
      // colliding with the horizontal divider in between.
      setLineHeight(el.clientHeight - 64)
      setRowHeight(el.clientHeight)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  if (!data || !data.pillars?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const [pillar1, pillar2, pillar3] = data.pillars

  const pillarTextClass =
    'font-display font-normal uppercase !text-[28px] !leading-tight text-primary-dark'

  return (
    <section className="bg-white text-primary-dark">
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-25">
        <div className="max-w-[1680px] mx-auto">
          <div ref={row1Ref} className="relative grid grid-cols-1 md:grid-cols-2 divide-y divide-primary-blue md:divide-y-0">
            <div className="md:min-h-60 py-8 flex flex-col justify-start md:pr-15">
              <Reveal>
                <Heading level="h2" variant="section" text={t(data.headline)} className="text-primary-dark" />
              </Reveal>
              {t(data.introText) && (
                <Reveal delay={100}>
                  <div className="mt-16">
                    <Text text={t(data.introText)} size="base" color="secondary" />
                  </div>
                </Reveal>
              )}
            </div>

            <div className="md:min-h-60 py-8 flex flex-col justify-end md:pl-15">
              {pillar2 && (
                <Reveal delay={200}>
                  <p className={pillarTextClass}>{t(pillar2.title)}</p>
                </Reveal>
              )}
            </div>

            <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2">
              <DrawLine
                direction="vertical"
                className="w-px"
                style={lineHeight !== null ? { height: `${lineHeight}px` } : undefined}
                delay={0}
              />
            </div>
          </div>

          <DrawLine
            direction="horizontal"
            className="h-px w-full"
            delay={800}
          />

          <div
            className="relative grid grid-cols-1 md:grid-cols-2 divide-y divide-primary-blue md:divide-y-0"
            style={rowHeight !== null ? { minHeight: `${rowHeight}px` } : undefined}
          >
            <div className="md:min-h-60 py-8 flex flex-col justify-end md:pr-15">
              {pillar1 && (
                <Reveal delay={400}>
                  <p className={pillarTextClass}>{t(pillar1.title)}</p>
                </Reveal>
              )}
            </div>

            <div className="md:min-h-60 py-8 flex flex-col justify-end md:pl-15">
              {pillar3 && (
                <Reveal delay={600}>
                  <p className={pillarTextClass}>{t(pillar3.title)}</p>
                </Reveal>
              )}
            </div>

            <div className="hidden md:block absolute left-1/2 bottom-8 -translate-x-1/2">
              <DrawLine
                direction="vertical"
                reverse
                className="w-px"
                style={lineHeight !== null ? { height: `${lineHeight}px` } : undefined}
                delay={0}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

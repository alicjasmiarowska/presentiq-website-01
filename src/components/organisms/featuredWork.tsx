'use client'

import { useEffect, useRef, useState } from 'react'
import Heading from '@/src/components/atoms/Heading'
import Button from '@/src/components/atoms/Button'
import FeaturedWorkCard from '@/src/components/molecules/FeaturedWorkCard'
import { resolveButtonHref } from '@/src/lib/resolveHref'
import { resolveLocale } from '@/src/lib/locale'
import type { SanityImageValue } from '@/src/types/sanity'

interface Project {
  _id: string
  mainImage?: SanityImageValue
  title: { en: string; de: string }
  category: { en: string; de: string }
}

interface FeaturedWorkData {
  headline: { en: string; de: string }
  buttonText?: { en: string; de: string }
  buttonPage?: { type?: string; slug?: string }
  buttonHref?: string
  projects?: Project[]
}

interface FeaturedWorkSectionProps {
  data: FeaturedWorkData
  locale: 'en' | 'de'
}

export default function FeaturedWorkSection({ data, locale }: FeaturedWorkSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // The pinned horizontal scrub needs a tall wrapper to reserve scroll
    // distance, and that distance depends on content size, which varies
    // widely on small screens. The effect is therefore desktop-only; smaller
    // screens swipe the cards natively.
    const mq = window.matchMedia('(min-width: 1104px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleScroll = () => {
      const wrapper = wrapperRef.current
      const viewport = viewportRef.current
      const track = trackRef.current
      if (!wrapper || !viewport || !track) return

      const rect = wrapper.getBoundingClientRect()
      const scrollableHeight = rect.height - window.innerHeight
      const progress =
        scrollableHeight > 0
          ? Math.min(Math.max(-rect.top / scrollableHeight, 0), 1)
          : 0

      const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0)
      setTranslateX(-progress * maxTranslate)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isDesktop])

  if (!data?.projects?.length) return null

  const t = (field: any) => resolveLocale(field, locale)
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)

  return (
    <section ref={wrapperRef} className={`relative ${isDesktop ? 'h-[250vh]' : ''}`}>
      <div
        className={`flex flex-col justify-center overflow-hidden mx-4 md:mx-20 bg-white py-10 md:py-0 ${
          isDesktop ? 'sticky top-0 h-screen' : ''
        }`}
      >
        <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 mb-8 md:mb-16 pl-6 pr-6 md:pl-12 md:pr-40">
          <Heading level="h3" text={t(data.headline)} />
          {data.buttonText && (
            <Button text={t(data.buttonText)} href={buttonHref} variant="secondary-light" size="md" />
          )}
        </div>

        <div
          ref={viewportRef}
          className={isDesktop ? 'overflow-hidden pl-6 md:pl-12' : 'px-6'}
        >
          <div
            ref={trackRef}
            className={isDesktop ? 'flex gap-8 w-max' : 'flex flex-col gap-8'}
            style={isDesktop ? { transform: `translateX(${translateX}px)` } : undefined}
          >
            {data.projects.map((project) => (
              <div key={project._id} className={isDesktop ? 'shrink-0 w-[55vw]' : 'w-full'}>
                <FeaturedWorkCard
                  image={project.mainImage}
                  title={t(project.title)}
                  category={t(project.category)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

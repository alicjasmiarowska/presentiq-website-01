'use client'

import { useEffect, useRef, useState } from 'react'
import Heading from '../atoms/Heading'
import Button from '../atoms/Button'
import FeaturedWorkCard from '../molecules/FeaturedWorkCard'
import { resolveButtonHref } from '../../lib/resolveHref'

interface Project {
  _id: string
  mainImage?: any
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

  useEffect(() => {
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
  }, [])

  if (!data?.projects?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)

  return (
    <section ref={wrapperRef} className="relative" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden mx-4 md:mx-20 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8 mb-8 md:mb-16 pl-6 pr-6 md:pl-20 md:pr-40">
          <Heading level="h3" text={t(data.headline)} />
          {data.buttonText && (
            <Button text={t(data.buttonText)} href={buttonHref} variant="secondary-light" size="md" />
          )}
        </div>

        <div ref={viewportRef} className="overflow-hidden pl-6 md:pl-20">
          <div
            ref={trackRef}
            className="flex gap-8 w-max"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {data.projects.map((project) => (
              <div key={project._id} className="shrink-0 w-[85vw] md:w-[55vw]">
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

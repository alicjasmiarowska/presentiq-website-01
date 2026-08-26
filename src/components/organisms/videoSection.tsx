'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoSectionData {
  videoUrl?: string
}

interface VideoSectionProps {
  data: VideoSectionData
}

const MIN_WIDTH_PERCENT = 80
const MAX_WIDTH_PERCENT = 100

export default function VideoSection({ data }: VideoSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [widthPercent, setWidthPercent] = useState(MAX_WIDTH_PERCENT)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Same reasoning as FeaturedWork: the pinned-scroll shrink effect needs a
    // tall wrapper reserved for it, but the video (shorter than the viewport
    // on mobile) then gets vertically centered inside an oversized h-screen
    // box — huge gaps above/below. Keep the effect desktop-only.
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const scrollableHeight = rect.height - window.innerHeight
      const progress =
        scrollableHeight > 0
          ? Math.min(Math.max(-rect.top / scrollableHeight, 0), 1)
          : 0

      setWidthPercent(
        MAX_WIDTH_PERCENT - progress * (MAX_WIDTH_PERCENT - MIN_WIDTH_PERCENT)
      )
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop])

  if (!data?.videoUrl) return null

  return (
    <section ref={wrapperRef} className={`relative ${isDesktop ? 'h-[200vh]' : ''}`}>
      <div
        className={`flex items-center justify-center overflow-hidden px-6 md:px-20 lg:px-40 ${
          isDesktop ? 'sticky top-0 h-screen' : 'py-10'
        }`}
      >
        <div
          className="max-w-[1680px] mx-auto"
          style={isDesktop ? { width: `${widthPercent}%` } : undefined}
        >
          <video
            src={data.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}

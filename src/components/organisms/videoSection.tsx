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

  useEffect(() => {
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
  }, [])

  if (!data?.videoUrl) return null

  return (
    <section ref={wrapperRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6 md:px-20 lg:px-40">
        <div
          className="max-w-[1680px] mx-auto"
          style={{ width: `${widthPercent}%` }}
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

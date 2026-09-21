'use client'

import { useEffect, useRef, useState } from 'react'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'

interface ToolCardProps {
  title: string
  description: string
}

export default function ToolCard({ title, description }: ToolCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-6 md:py-8 px-4 border-b border-white/20 bg-primary-dark transition-all duration-700 ease-out hover:bg-primary-blue hover:opacity-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-10'
      }`}
    >
      <div className="md:w-2/4 md:shrink-0 md:pr-40">
        <Heading
          level="h5"
          text={title}
          className="text-white"
        />
      </div>

      <div className="md:flex-1">
        <Text
          text={description}
          color="secondary"
          size="base"
          className="text-white group-hover:text-white transition-colors duration-300"
        />
      </div>
    </div>
  )
}

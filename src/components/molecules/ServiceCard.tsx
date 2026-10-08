'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Text from '@/src/components/atoms/Text'
import ArrowIcon from '@/src/components/atoms/ArrowIcon'

interface ServiceCardProps {
  index: number
  title: string
  description: string
  href?: string
}

export default function ServiceCard({ index, title, description, href }: ServiceCardProps) {
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

  const number = String(index).padStart(2, '0')

  // Stacked card (number + title, then the description) up to tablets; the
  // four-column row only from lg:, where the title column is wide enough.
  const content = (
    <>
      <div className="flex items-center justify-between gap-4 lg:contents">
        <div className="flex items-baseline gap-4 lg:contents">
          <Text text={number} size="lg" className="shrink-0 text-primary-blue! group-hover:text-white! group-active:text-white! transition-colors duration-300 lg:w-16" />

          <div className="lg:w-1/3 lg:shrink-0 lg:pr-8">
            <Text text={title} size="lg" className="text-white!" />
          </div>
        </div>

        <div className="shrink-0 lg:hidden">
          <ArrowIcon className="text-white" />
        </div>
      </div>

      <div className="lg:flex-1 lg:pr-12">
        <Text
          text={description}
          color="secondary"
          size="base"
          className="text-white group-hover:text-white transition-colors duration-300"
        />
      </div>

      <div className="hidden lg:block shrink-0">
        <ArrowIcon className="text-white" />
      </div>
    </>
  )

  return (
    <div
      ref={ref}
      className={`group flex flex-col lg:flex-row lg:items-end gap-3 lg:gap-8 py-10 lg:py-14 px-4 border-b border-white/20 bg-transparent transition-all duration-700 ease-out hover:bg-primary-blue hover:opacity-100 active:bg-primary-blue active:opacity-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-10'
      }`}
    >
      {href ? (
        <Link href={href} className="contents">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}

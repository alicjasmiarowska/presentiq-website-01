'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'

interface ServiceCardProps {
  title: string
  description: string
  href?: string
}

export default function ServiceCard({ title, description, href }: ServiceCardProps) {
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

  const content = (
    <>
      <div className="flex items-center justify-between gap-4 md:contents">
        <div className="md:w-2/4 md:shrink-0 md:pr-40">
          <Heading
            level="h3"
            text={title}
            className="text-white"
          />
        </div>

        <div className="shrink-0 md:hidden">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-white"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="md:flex-1 md:pr-12">
        <Text
          text={description}
          color="secondary"
          size="base"
          className="text-white group-hover:text-white transition-colors duration-300"
        />
      </div>

      <div className="hidden md:block shrink-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-white"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  )

  return (
    <div
      ref={ref}
      className={`group flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-6 md:py-8 px-4 border-b border-white/20 bg-primary-dark transition-all duration-700 ease-out hover:bg-primary-blue hover:opacity-100 ${
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

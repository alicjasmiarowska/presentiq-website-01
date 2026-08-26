'use client'

import { useEffect, useRef, useState } from 'react'

interface MaskRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function MaskReveal({ children, delay = 0, className = '' }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
          opacity: visible ? 1 : 0,
          transitionProperty: 'transform, opacity',
          transitionDuration: '1.2s, 0.6s',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

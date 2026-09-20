'use client'

import { useEffect, useRef, useState } from 'react'

interface DrawLineProps {
  direction: 'horizontal' | 'vertical'
  reverse?: boolean
  className?: string
  delay?: number
  style?: React.CSSProperties
}

export default function DrawLine({ direction, reverse = false, className = '', delay = 0, style }: DrawLineProps) {
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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`bg-primary-blue ${
        direction === 'horizontal' ? (reverse ? 'origin-right' : 'origin-left') : reverse ? 'origin-bottom' : 'origin-top'
      } ${className}`}
      style={{
        ...style,
        transform: visible
          ? 'scale(1)'
          : direction === 'horizontal'
            ? 'scaleX(0)'
            : 'scaleY(0)',
        transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}ms`,
      }}
    />
  )
}

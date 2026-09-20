'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpNumberProps {
  value: number
  decimals?: number
  suffix?: string
  locale: 'en' | 'de'
  className?: string
  duration?: number
  style?: React.CSSProperties
}

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3)

export default function CountUpNumber({
  value,
  decimals = 0,
  suffix = '',
  locale,
  className = '',
  duration = 1500,
  style,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          setDisplay(value * EASE_OUT(progress))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  const formatted = new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(display)

  return (
    <span ref={ref} className={className} style={style}>
      {formatted}
      {suffix}
    </span>
  )
}

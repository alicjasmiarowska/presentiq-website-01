'use client'

import { useEffect, useRef, useState } from 'react'

interface CharRevealProps {
  text: string
  className?: string
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const STAGGER = 0.035

export default function CharReveal({ text, className = '' }: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
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

  const words = text.split(' ')
  let charIndex = 0

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char) => {
            const i = charIndex
            charIndex += 1
            return (
              <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: 'top' }}>
                <span
                  className="inline-block"
                  style={{
                    transform: visible ? 'translateY(0)' : 'translateY(100%)',
                    opacity: visible ? 1 : 0,
                    transitionProperty: 'transform, opacity',
                    transitionDuration: `0.8s, 0.5s`,
                    transitionTimingFunction: EASE,
                    transitionDelay: `${i * STAGGER}s`,
                  }}
                >
                  {char}
                </span>
              </span>
            )
          })}
          {wordIndex < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

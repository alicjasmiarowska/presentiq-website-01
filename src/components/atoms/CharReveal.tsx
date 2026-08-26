'use client'

import { useEffect, useRef, useState } from 'react'

interface CharRevealProps {
  text: string
  className?: string
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const STAGGER = 0.035
// Long unbroken words (German compounds especially) can't rely on
// hyphens-auto/text-balance here — the text is split into per-character
// spans, so the browser has no plain text run left to hyphenate and the
// word overflows instead of wrapping. Chunking each word into inline-block
// groups with a <wbr/> between them gives it a legal place to wrap if it
// doesn't fit, without changing anything for ordinary short words.
const CHUNK_SIZE = 8

export default function CharReveal({ text, className = '' }: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    // On narrow screens each word usually wraps to its own line, so a global
    // per-character stagger reveals only an isolated letter-fragment at a time
    // instead of a whole line — stagger per word there so each line rises as one piece.
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Content editors can force a manual line break by typing <br> in the
  // CMS text field, same as elsewhere on the site — since this text is never
  // parsed as HTML (it's split into per-character spans for the animation),
  // we look for that marker ourselves and start a fresh line at each one.
  const lines = text.split(/<br\s*\/?>/i)
  let charIndex = 0
  let globalWordIndex = 0

  return (
    <span ref={ref} className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(' ').map((word, idxInLine, wordsInLine) => {
            const wordIndex = globalWordIndex
            globalWordIndex += 1
            const isLastInLine = idxInLine === wordsInLine.length - 1
            const chars = word.split('')
            const chunks: string[][] = []
            for (let c = 0; c < chars.length; c += CHUNK_SIZE) {
              chunks.push(chars.slice(c, c + CHUNK_SIZE))
            }

            return (
              <span key={wordIndex}>
                {chunks.map((chunk, chunkIndex) => (
                  <span key={chunkIndex}>
                    {chunkIndex > 0 && '­'}
                    <span className="inline-block">
                      {chunk.map((char) => {
                        const key = charIndex
                        const delay = isMobile ? wordIndex * 3 : charIndex
                        charIndex += 1
                        return (
                          <span key={key} className="inline-block overflow-hidden" style={{ verticalAlign: 'top' }}>
                            <span
                              className="inline-block"
                              style={{
                                transform: visible ? 'translateY(0)' : 'translateY(100%)',
                                opacity: visible ? 1 : 0,
                                transitionProperty: 'transform, opacity',
                                transitionDuration: `0.8s, 0.5s`,
                                transitionTimingFunction: EASE,
                                transitionDelay: `${delay * STAGGER}s`,
                              }}
                            >
                              {char}
                            </span>
                          </span>
                        )
                      })}
                    </span>
                  </span>
                ))}
                {!isLastInLine && ' '}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

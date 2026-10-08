'use client'

import { useEffect, useRef, useState } from 'react'

interface CharRevealProps {
  text: string
  className?: string
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const STAGGER = 0.035
// Long words (German compounds especially) can't rely on hyphens-auto
// here — the text is split into per-character spans, so the browser has no
// plain text run left to hyphenate and the word overflows instead of
// wrapping. Callers pass text pre-hyphenated with soft hyphens (see
// src/lib/hyphenate.ts); each word is chunked into unbreakable groups at
// those syllable breaks, and after any real hyphen, so it can only wrap at
// a dictionary-correct point.
const SOFT_HYPHEN = '\u00AD'

function splitWord(word: string): { text: string; softBreak: boolean }[] {
  const chunks: { text: string; softBreak: boolean }[] = []
  for (const part of word.split(SOFT_HYPHEN)) {
    // A real hyphen ("Decision-makers") is already visible, so the break
    // after it needs no extra hyphen drawn.
    const pieces = part.split(/(?<=-)/)
    pieces.forEach((piece, i) => {
      if (piece) chunks.push({ text: piece, softBreak: i === 0 && chunks.length > 0 })
    })
  }
  return chunks
}

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

  // A word wraps only at its soft-hyphen chunk boundaries, but browsers
  // don't reliably draw the "-" there when the letters are animated
  // inline-blocks (Safari draws nothing). So each such boundary carries its
  // own zero-width hyphen, shown only when the next chunk actually starts on
  // a new line. Being zero-width, toggling it never changes the wrapping.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      el.querySelectorAll<HTMLElement>('[data-hyphen]').forEach((hyphen) => {
        const chunk = hyphen.parentElement!
        const next = chunk.parentElement?.nextElementSibling?.querySelector<HTMLElement>('[data-chunk]')
        hyphen.style.visibility = next && next.offsetTop > chunk.offsetTop ? 'visible' : 'hidden'
      })
    }
    update()
    document.fonts?.ready.then(update)
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  useEffect(() => {
    // On narrow screens each word usually wraps to its own line, so a global
    // per-character stagger reveals only an isolated letter-fragment at a time
    // instead of a whole line — stagger per word there so each line rises as one piece.
    const mq = window.matchMedia('(max-width: 1023px)')
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
            const chunks = splitWord(word)

            return (
              <span key={wordIndex}>
                {chunks.map((chunk, chunkIndex) => (
                  <span key={chunkIndex}>
                    {chunkIndex > 0 && <wbr />}
                    <span data-chunk className="whitespace-nowrap">
                      {chunk.text.split('').map((char) => {
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
                      {chunks[chunkIndex + 1]?.softBreak && (
                        <span
                          data-hyphen
                          aria-hidden="true"
                          className="inline-block w-0"
                          style={{ visibility: 'hidden', opacity: visible ? 1 : 0, transition: 'opacity 0.5s' }}
                        >
                          -
                        </span>
                      )}
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

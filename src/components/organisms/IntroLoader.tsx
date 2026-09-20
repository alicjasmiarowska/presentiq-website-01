'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { colors } from '../../styles/design-tokens'

const LOGO_DELAY_MS = 300
const VISIBLE_MS = 3000
const EXIT_MS = 2000
const EASE = 'cubic-bezier(0.22,1,0.36,1)'

export default function IntroLoader() {
  // Starts visible so it's part of the server-rendered HTML and covers the
  // page from the very first paint, before hydration or JS timers run.
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'hidden'>('visible')
  const [logoVisible, setLogoVisible] = useState(false)
  const [lineSvgTopLeft, setLineSvgTopLeft] = useState<string | null>(null)
  const [lineSvgBottomRight, setLineSvgBottomRight] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    Promise.all([
      fetch('/images/line_01.1.svg').then((res) => res.text()),
      fetch('/images/line_02.1.svg').then((res) => res.text()),
    ])
      .then(([topLeft, bottomRight]) => {
        if (ignore) return
        setLineSvgTopLeft(topLeft)
        setLineSvgBottomRight(bottomRight)
      })
      .catch(() => {})
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('hidden')
      return
    }

    document.body.style.overflow = 'hidden'
    const logoTimer = setTimeout(() => setLogoVisible(true), LOGO_DELAY_MS)
    const exitTimer = setTimeout(() => setPhase('exiting'), VISIBLE_MS)
    return () => {
      clearTimeout(logoTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'exiting') return

    document.body.style.overflow = ''
    const removeTimer = setTimeout(() => setPhase('hidden'), EXIT_MS)
    return () => clearTimeout(removeTimer)
  }, [phase])

  if (phase === 'hidden') return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity ${
        phase === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: colors.primary.dark, transitionDuration: `${EXIT_MS}ms`, transitionTimingFunction: EASE }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(187, 23, 58, 0.25) 0%, rgba(0, 85, 255, 0.25) 50%, rgba(0, 85, 255, 0.05) 80%, rgba(0, 85, 255, 0) 100%)',
        }}
      />

      {lineSvgTopLeft && (
        <div
          className={`absolute top-0 left-0 w-40 md:w-156 lg:w-124 h-auto pointer-events-none select-none intro-line-svg ${
            logoVisible ? 'intro-line-play' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: lineSvgTopLeft }}
        />
      )}

      {lineSvgBottomRight && (
        <div
          className={`absolute bottom-0 right-0 w-40 md:w-156 lg:w-124 h-auto pointer-events-none select-none intro-line-svg ${
            logoVisible ? 'intro-line-play' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: lineSvgBottomRight }}
        />
      )}

      <Image
        src="/images/logo_white.svg"
        alt="Presentiq"
        width={320}
        height={30}
        priority
        className={`relative w-80 md:w-lg lg:w-160 h-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
    </div>
  )
}

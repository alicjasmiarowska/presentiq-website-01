'use client'

import { useEffect, useRef, useState } from 'react'
import PhotoTextSplit from './photoTextSplit'

interface PhotoTextBlocksProps {
  data?: any[]
  locale: 'en' | 'de'
}

// Renders each `intro` block from Sanity, alternating image side and panel
// theme by index: #0 is photo-left/navy-text-right, #1 flips to
// gray-text-left/photo-right (Word & PDF's second block), and so on — so
// stacking more than one block mirrors rather than repeats. When there's
// more than one block, they're all measured and matched to the tallest
// one's height (desktop only) instead of each sizing to its own text.
export default function PhotoTextBlocks({ data, locale }: PhotoTextBlocksProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    const measure = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      if (!isDesktop) {
        setMinHeight(undefined)
        return
      }
      const heights = refs.current.map((el) => el?.offsetHeight || 0).filter(Boolean)
      setMinHeight(heights.length > 1 ? Math.max(...heights) : undefined)
    }

    measure()
    const observer = new ResizeObserver(measure)
    refs.current.forEach((el) => el && observer.observe(el))
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [data?.length])

  if (!data || data.length === 0) return null

  return (
    <>
      {data.map((block, i) => (
        <div
          key={block._key}
          ref={(el) => {
            refs.current[i] = el
          }}
        >
          <PhotoTextSplit
            data={block}
            locale={locale}
            reverse={i % 2 === 1}
            theme={i % 2 === 1 ? 'light' : 'dark'}
            minHeight={minHeight}
          />
        </div>
      ))}
    </>
  )
}

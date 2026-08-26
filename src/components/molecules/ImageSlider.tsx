'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '../../../sanity/lib/image'

interface SlideImage {
  _key: string
  asset?: any
  alt?: string
}

interface ImageSliderProps {
  images: SlideImage[]
}

const AUTOPLAY_INTERVAL = 4000

export default function ImageSlider({ images }: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (images.length <= 1 || isPaused) return

    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length)
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(id)
  }, [images.length, isPaused])

  if (!images?.length) return null

  const goTo = (index: number) => setActiveIndex((index + images.length) % images.length)

  return (
    <div
      className="relative"
      role="region"
      aria-label="Image slider"
      aria-live="off"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative h-64 md:h-100 rounded-2xl overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image._key}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {image.asset && (
              <Image
                src={urlFor(image).width(800).url()}
                alt={image.alt || ''}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="#000023" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="#000023" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          {images.map((image, index) => (
            <button
              key={image._key}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-primary-blue' : 'w-2 bg-primary-dark/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

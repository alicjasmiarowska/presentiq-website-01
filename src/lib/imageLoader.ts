'use client'

// Global next/image loader (images.loaderFile in next.config.ts).
//
// Sanity images are resized by the Sanity CDN straight from the original
// upload, so each image is compressed exactly once, at the width the browser
// asked for. Routing them through Next's optimizer would re-encode an
// already-compressed Sanity rendition a second time.
//
// Local files in /public are tiny SVGs / decorative PNGs and are served as-is.

const SANITY_CDN = 'https://cdn.sanity.io/'

// Sanity's own default is 75; keep compression light.
const DEFAULT_QUALITY = 90

type LoaderArgs = { src: string; width: number; quality?: number }

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (!src.startsWith(SANITY_CDN)) return src

  const url = new URL(src)
  const params = url.searchParams
  const w = Number(params.get('w'))
  const h = Number(params.get('h'))

  // A fixed box (w + h, e.g. square team photos) keeps its aspect ratio at the
  // new width; a height-only request (logos) becomes width-driven instead.
  if (w && h) {
    params.set('h', String(Math.round((h * width) / w)))
  } else {
    params.delete('h')
    // Never upscale past the original — it only adds bytes, not detail.
    if (!params.has('fit')) params.set('fit', 'max')
  }

  params.set('w', String(width))
  params.set('q', String(quality ?? DEFAULT_QUALITY))
  if (!params.has('auto')) params.set('auto', 'format')

  return url.toString()
}

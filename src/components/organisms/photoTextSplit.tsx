import Image from 'next/image'
import RichText from '@/src/components/atoms/RichText'
import Reveal from '@/src/components/atoms/Reveal'
import EdgeBars from '@/src/components/atoms/EdgeBars'
import AiBadge from '@/src/components/atoms/AiBadge'
import { LEAD_TEXT_CLASSES } from '@/src/components/atoms/Heading'
import { urlFor } from '@/sanity/lib/image'
import { layout } from '@/src/styles/design-tokens'
import { resolveLocale } from '@/src/lib/locale'
import type { SanityImageValue, PortableTextLocaleValue } from '@/src/types/sanity'

interface PhotoTextSplitData {
  headline?: { en: string; de: string }
  image?: SanityImageValue
  body?: PortableTextLocaleValue
}

interface PhotoTextSplitProps {
  data: PhotoTextSplitData
  locale: 'en' | 'de'
  // Image on the right instead of the left (Word & PDF alternates blocks).
  reverse?: boolean
  // "dark": navy text panel, white text. "light": gray text panel, navy
  // text (Word & PDF's second block).
  theme?: 'dark' | 'light'
  // Forces this block's row to a shared height (desktop only) — set by
  // PhotoTextBlocks so stacked blocks with different amounts of text all
  // match the tallest one instead of each sizing to its own content.
  minHeight?: number
}

// A full-bleed photo on one side, text with the same edge-bar accent as the
// Contact/About intro on the other — same split as TwoColumnSection, but
// with a real photo in place of the left-hand text column. One of these per
// entry in a page's `intro` array — see PhotoTextBlocks, which alternates
// `reverse`/`theme` across entries.
export default function PhotoTextSplit({ data, locale, reverse = false, theme = 'dark', minHeight }: PhotoTextSplitProps) {
  if (!data) return null

  const t = (field: any) => resolveLocale(field, locale)
  const headline = t(data.headline)
  const body = data.body?.[locale] || data.body?.en
  const dark = theme === 'dark'

  const image = (
    <div className="relative min-h-[320px] md:min-h-[620px]">
      {/* This panel bleeds full-bleed (no max-w cap) up to 50vw, same as
          the color panels elsewhere on the site, so the source needs to
          cover wide/high-DPI screens rather than a typical capped slot. */}
      {data.image?.asset && (
        <>
          <Image
            src={urlFor(data.image).url()}
            alt={data.image.alt || headline}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
          {data.image.aiGenerated && <AiBadge locale={locale} />}
        </>
      )}
    </div>
  )

  const text = (
    <div
      className={`relative overflow-hidden ${dark ? 'bg-primary-dark' : 'bg-neutral-light'} ${
        reverse ? `${layout.edgeGutter.left} pr-6 md:pr-12 lg:pr-20` : `${layout.edgeGutter.right} pl-6 md:pl-12 lg:pl-20`
      } py-16 md:py-24`}
    >
      {dark && <EdgeBars />}
      {(headline || (body && body.length > 0)) && (
        <Reveal className="relative max-w-[600px]">
          {headline && (
            <h2 className={`${LEAD_TEXT_CLASSES} ${dark ? 'text-white' : 'text-primary-dark'} mb-6`}>{headline}</h2>
          )}
          {body && body.length > 0 && <RichText value={body} color={dark ? 'primary' : 'secondary'} />}
        </Reveal>
      )}
    </div>
  )

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2"
      style={minHeight ? { minHeight: `${minHeight}px` } : undefined}
    >
      {reverse ? (
        <>
          {text}
          {image}
        </>
      ) : (
        <>
          {image}
          {text}
        </>
      )}
    </section>
  )
}

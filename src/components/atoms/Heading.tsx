import { releaseLastPair } from '@/src/lib/typography'
import { typography } from '@/src/styles/design-tokens'

interface HeadingProps {
  text: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: 'default' | 'section'
  className?: string
  children?: React.ReactNode
}

// Sizes come from design-tokens.ts (`typography.headingSize`), wired into
// Tailwind's fontSize scale in tailwind.config.ts — this file only maps
// levels to the resulting utility classes plus their weight/case, so the
// actual pixel values live in exactly one place.
const sizes = {
  h1: 'text-h1 md:text-h1-md lg:text-h1-lg font-bold',
  h2: 'text-h2 md:text-h2-md lg:text-h2-lg font-extrabold',
  h3: 'text-h3 md:text-h3-md lg:text-h3-lg font-bold uppercase',
  h4: 'text-h4 md:text-h4-md lg:text-h4-lg font-normal uppercase',
  h5: 'text-h5 md:text-h5-md lg:text-h5-lg font-bold',
  h6: 'text-base font-bold',
}

// The site-wide "section heading" look: uppercase, regular weight, tracked
// out, clamped size. Used for every H2 that introduces a section (Hero
// subsections, FAQ, services, pillars, logo wall, ...) so they all stay in
// sync from this one place instead of each section re-declaring the style.
// CMS text arrives with grammatically placed soft hyphens
// (src/lib/hyphenate.ts); hyphens-manual breaks only there, so long German
// compounds wrap at their seam ("Präsentations-agentur") instead of
// overflowing narrow phones.
// German capitals carry umlauts (Ä Ö Ü), so German headings get a little
// more line spacing to keep the dots clear of the line above.
export const SECTION_VARIANT_CLASSES = 'font-display font-normal uppercase tracking-wider leading-[1.1] [&:lang(de)]:leading-[1.15] text-balance hyphens-manual break-words'
export const SECTION_VARIANT_STYLE = { fontSize: typography.sectionHeading.fontSize }

// The smaller uppercase "lead" look: pillar titles on the homepage, the
// principle titles and longer intro statements on About. Sized off the h4
// step (20/24/28px) so it stays visibly smaller than a nearby `variant=
// "section"` heading (28–40px) at every breakpoint — a flat 28px here used
// to tie with that heading's own 28px mobile floor, erasing the hierarchy
// between a section's main title and its sub-items on phones.
export const LEAD_TEXT_CLASSES = 'font-display font-normal uppercase text-h4 md:text-h4-md lg:text-h4-lg leading-tight text-balance hyphens-manual'

export default function Heading({ text, level = 'h1', variant = 'default', className = '', children }: HeadingProps) {
  const Tag = level

  // Content editors can force a manual line break by typing <br> in the CMS
  // text field — this text is never parsed as HTML, so we look for that
  // marker ourselves and start a fresh line at each one instead of relying
  // on dangerouslySetInnerHTML. Skipped when `children` already provides
  // custom markup (e.g. CharReveal splitting the heading for animation).
  const lines = releaseLastPair(text)
  const content =
    children ??
    (variant === 'section'
      ? lines.split(/<br\s*\/?>/i).map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))
      : lines)

  if (variant === 'section') {
    return (
      <Tag className={`${SECTION_VARIANT_CLASSES} ${className}`} style={SECTION_VARIANT_STYLE}>
        {content}
      </Tag>
    )
  }

  // text-balance/hyphens-manual assume a plain text node to re-flow and
  // hyphenate. When children override `text` (e.g. CharReveal splitting the
  // heading into per-character spans for animation), the browser has no text
  // run left to balance or hyphenate, and text-balance actively suppresses
  // the visual hyphen at any manual break point we add ourselves — so skip
  // both here and let it wrap normally instead.
  const wrapClasses = children ? '' : 'text-balance hyphens-manual'

  return (
    <Tag className={`font-display leading-[1.2] ${sizes[level]} text-primary-dark ${wrapClasses} ${className}`}>
      {content}
    </Tag>
  )
}

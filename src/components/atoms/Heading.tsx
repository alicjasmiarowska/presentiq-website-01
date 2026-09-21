import { typography } from '../../styles/design-tokens'

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
  h4: 'text-h4 md:text-h4-md lg:text-h4-lg font-bold uppercase',
  h5: 'text-h5 md:text-h5-md lg:text-h5-lg font-bold',
  h6: 'text-base font-bold',
}

// The site-wide "section heading" look: uppercase, regular weight, tracked
// out, clamped size. Used for every H2 that introduces a section (Hero
// subsections, FAQ, services, pillars, logo wall, ...) so they all stay in
// sync from this one place instead of each section re-declaring the style.
export const SECTION_VARIANT_CLASSES = 'font-display font-normal uppercase tracking-wider leading-[1.1]'
export const SECTION_VARIANT_STYLE = { fontSize: typography.sectionHeading.fontSize }

export default function Heading({ text, level = 'h1', variant = 'default', className = '', children }: HeadingProps) {
  const Tag = level

  // Content editors can force a manual line break by typing <br> in the CMS
  // text field — this text is never parsed as HTML, so we look for that
  // marker ourselves and start a fresh line at each one instead of relying
  // on dangerouslySetInnerHTML. Skipped when `children` already provides
  // custom markup (e.g. CharReveal splitting the heading for animation).
  const content =
    children ??
    (variant === 'section'
      ? text.split(/<br\s*\/?>/i).map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))
      : text)

  if (variant === 'section') {
    return (
      <Tag className={`${SECTION_VARIANT_CLASSES} ${className}`} style={SECTION_VARIANT_STYLE}>
        {content}
      </Tag>
    )
  }

  // text-balance/hyphens-auto assume a plain text node to re-flow and
  // hyphenate. When children override `text` (e.g. CharReveal splitting the
  // heading into per-character spans for animation), the browser has no text
  // run left to balance or hyphenate, and text-balance actively suppresses
  // the visual hyphen at any manual break point we add ourselves — so skip
  // both here and let it wrap normally instead.
  const wrapClasses = children ? '' : 'text-balance hyphens-auto'

  return (
    <Tag className={`font-display leading-[1.2] ${sizes[level]} text-primary-dark ${wrapClasses} ${className}`}>
      {content}
    </Tag>
  )
}

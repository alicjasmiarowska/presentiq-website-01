interface HeadingProps {
  text: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: 'default' | 'section'
  className?: string
  children?: React.ReactNode
}

const sizes = {
  h1: 'text-[48px] md:text-[72px] lg:text-[112px] font-bold',
  h2: 'text-[36px] md:text-[56px] lg:text-[84px] font-extrabold',
  h3: 'text-[28px] md:text-[36px] lg:text-[48px] font-bold',
  h4: 'text-[22px] md:text-[26px] lg:text-[32px] font-bold',
  h5: 'text-[18px] md:text-[20px] lg:text-[24px] font-bold',
  h6: 'text-base font-bold',
}

// The site-wide "section heading" look: uppercase, regular weight, tracked
// out, clamped size. Used for every H2 that introduces a section (Hero
// subsections, FAQ, services, pillars, logo wall, ...) so they all stay in
// sync from this one place instead of each section re-declaring the style.
const SECTION_VARIANT_CLASSES = 'font-display font-normal uppercase tracking-wider leading-[1.1]'
const SECTION_VARIANT_STYLE = { fontSize: 'clamp(28px, 3.5vw, 40px)' }

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

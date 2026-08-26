interface HeadingProps {
  text: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children?: React.ReactNode
}

export default function Heading({ text, level = 'h1', className = '', children }: HeadingProps) {
  const sizes = {
    h1: 'text-[48px] md:text-[72px] lg:text-[112px] font-bold',
    h2: 'text-[36px] md:text-[56px] lg:text-[84px] font-extrabold',
    h3: 'text-[28px] md:text-[36px] lg:text-[48px] font-bold',
    h4: 'text-[22px] md:text-[26px] lg:text-[32px] font-bold',
    h5: 'text-[18px] md:text-[20px] lg:text-[24px] font-bold',
    h6: 'text-base font-bold',
  }

  const Tag = level
  // text-balance/hyphens-auto assume a plain text node to re-flow and
  // hyphenate. When children override `text` (e.g. CharReveal splitting the
  // heading into per-character spans for animation), the browser has no text
  // run left to balance or hyphenate, and text-balance actively suppresses
  // the visual hyphen at any manual break point we add ourselves — so skip
  // both here and let it wrap normally instead.
  const wrapClasses = children ? '' : 'text-balance hyphens-auto'

  return (
    <Tag className={`font-display leading-[1.2] ${sizes[level]} text-primary-dark ${wrapClasses} ${className}`}>
      {children ?? text}
    </Tag>
  )
}
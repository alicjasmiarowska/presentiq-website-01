interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  style?: React.CSSProperties
}

export default function Section({
  children,
  className = '',
  containerClassName = 'max-w-[1680px]',
  style,
}: SectionProps) {
  // The cap and the gutter live on the same element (not padding on this
  // outer, full-bleed-background section with a second cap nested inside
  // it) — on screens wider than ~1680px, padding outside the cap and
  // padding inside it measure from different edges and drift out of
  // alignment with the nav bar, which caps and pads together.
  return (
    <section className={`py-8 md:py-12 ${className}`} style={style}>
      <div className={`${containerClassName} mx-auto px-6 md:px-12 lg:px-20`}>{children}</div>
    </section>
  )
}

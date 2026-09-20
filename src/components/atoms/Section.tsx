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
  return (
    <section className={`px-6 md:px-12 lg:px-20 py-8 md:py-12 ${className}`} style={style}>
      <div className={`${containerClassName} mx-auto`}>{children}</div>
    </section>
  )
}

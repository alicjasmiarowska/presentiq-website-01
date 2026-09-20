import { colors } from '../../styles/design-tokens'

// Hidden site-wide for now — every call site stays in place, so flipping
// this one flag is all it takes to bring the glow back everywhere.
const HIDDEN = true

type CornerPosition = 'bottom-right' | 'bottom-left'

// Which corner of the box stays square vs. rounded off, per flush position —
// the rounded corner always faces inward, toward the page content.
const CORNER_CONFIG: Record<CornerPosition, { inset: React.CSSProperties; radius: string }> = {
  'bottom-right': { inset: { right: 0, bottom: 0 }, radius: '820px 0 0 0' },
  'bottom-left': { inset: { left: 0, bottom: 0 }, radius: '0 820px 0 0' },
}

interface BlurGlowProps {
  // "edge": a large circle straddling the top-right edge, behind the hero.
  // "corner": a smaller quarter-circle flush in one bottom corner.
  variant?: 'edge' | 'corner'
  position?: CornerPosition
  size?: number
  color?: string
  className?: string
}

export default function BlurGlow({
  variant = 'corner',
  position = 'bottom-right',
  size = 420,
  color = colors.primary.blue,
  className = '',
}: BlurGlowProps) {
  if (HIDDEN) return null

  if (variant === 'edge') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        <div
          className={`absolute rounded-full ${className}`}
          style={{
            right: 0,
            top: '19.7%',
            width: '820px',
            height: '820px',
            transform: 'translate(50%, -50%)',
            backgroundColor: color,
            filter: 'blur(200px)',
          }}
        />
      </div>
    )
  }

  const { inset, radius } = CORNER_CONFIG[position]

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        ...inset,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        filter: 'blur(200px)',
        borderRadius: radius,
      }}
    />
  )
}

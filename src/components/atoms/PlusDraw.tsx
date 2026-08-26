interface PlusDrawProps {
  size?: number
  strokeWidth?: number
  className?: string
}

export default function PlusDraw({ size = 160, strokeWidth = 14, className = '' }: PlusDrawProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      className={className}
    >
      <line
        x1="120"
        y1="20"
        x2="120"
        y2="220"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        style={{
          strokeDasharray: 240,
          animation: 'draw-plus 3.2s ease-in-out infinite',
        }}
      />
      <line
        x1="20"
        y1="120"
        x2="220"
        y2="120"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        style={{
          strokeDasharray: 240,
          animation: 'draw-plus 3.2s ease-in-out infinite 0.25s',
        }}
      />
    </svg>
  )
}

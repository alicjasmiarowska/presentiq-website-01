interface ArrowIconProps {
  className?: string
  size?: number
}

// The "→" arrow shared by every link row and button (Button, ServiceCard,
// CollaborationSection, TextAndImageSliderServices, CaseStudyList).
export default function ArrowIcon({ className = '', size = 24 }: ArrowIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

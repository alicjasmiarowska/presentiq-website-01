interface ArrowIconProps {
  className?: string
  size?: number
}

// The "→" arrow used on every link-row/button across the site (Button,
// ServiceCard, CollaborationSection, TextAndImageSliderServices,
// CaseStudyList) — one shared glyph instead of six copies of the same path.
export default function ArrowIcon({ className = '', size = 24 }: ArrowIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

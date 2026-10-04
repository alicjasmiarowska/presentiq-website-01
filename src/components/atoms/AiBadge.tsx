interface AiBadgeProps {
  locale: 'en' | 'de'
  className?: string
}

// Small "AI-generated" pill shown over a photo/video's bottom-left corner
// when an editor flags that media (e.g. Storytelling's intro photo). The
// label is a fixed UI string, not CMS content, so it's translated here once
// instead of being retyped per image. Position is baked in (not left to each
// caller) so it always lines up with the page's standard left gutter — the
// same px-6/md:px-12/lg:px-20 the logo sits at in the nav bar — rather than
// an arbitrary fixed offset. The parent media container just needs to be
// `position: relative`.
export default function AiBadge({ locale, className = '' }: AiBadgeProps) {
  const label = locale === 'de' ? 'KI-generiert' : 'AI-generated'

  return (
    <span
      className={`absolute bottom-4 left-6 md:left-12 lg:left-20 inline-flex items-center rounded-full border border-neutral-light bg-white px-3 py-1 font-sans text-xs text-[#acacac] ${className}`}
    >
      {label}
    </span>
  )
}

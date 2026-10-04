import Reveal from '@/src/components/atoms/Reveal'

interface DividedTextListItem {
  key: string
  text: string
}

interface DividedTextListProps {
  items: DividedTextListItem[]
}

// Plain-text rows in a 2-column grid, each divided from its neighbor by a
// thin line — no links, no images, just copy. Used by ProductsList (service
// pages) and CaseStudyList (Portfolio), which each map their own data into
// this shape and wrap it in their own section background/padding.
export default function DividedTextList({ items }: DividedTextListProps) {
  if (items.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20">
      {items.map((item, i) => (
        <Reveal key={item.key} delay={i * 50}>
          <div className="py-5 border-b border-primary-dark/20">
            <span className="font-display text-[22px] md:text-[28px] leading-[1.3] font-normal text-primary-dark text-pretty hyphens-manual">
              {item.text}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

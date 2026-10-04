import Link from 'next/link'
import Reveal from '@/src/components/atoms/Reveal'
import ArrowIcon from '@/src/components/atoms/ArrowIcon'
import { resolveLocale } from '@/src/lib/locale'
import type { SanityImageValue } from '@/src/types/sanity'

interface CaseStudy {
  _id: string
  title: { en: string; de: string }
  category?: { en: string; de: string }
  mainImage?: SanityImageValue
  slug?: string
}

interface CaseStudyListProps {
  caseStudies: CaseStudy[]
  locale: 'en' | 'de'
}

// Portfolio's case studies as a plain two-column text list (client/project
// names, no images, no category filter), each linking to its own case
// study page — replaces the filtered image-card grid on the live page.
// CaseStudyGrid + CaseStudyCard (the filtered, card-based version) are kept
// in the codebase, just unused for now, in case filtering comes back.
export default function CaseStudyList({ caseStudies, locale }: CaseStudyListProps) {
  const t = (field: any) => resolveLocale(field, locale)
  const items = (caseStudies || []).filter((cs) => t(cs.title))

  if (items.length === 0) return null

  return (
    <section className="bg-neutral-light">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20">
          {items.map((item, i) => {
            const content = (
              <div
                className={`group flex items-center justify-between gap-4 py-5 border-b border-primary-dark/20 ${
                  item.slug ? 'transition-colors duration-300 hover:bg-white/40' : ''
                }`}
              >
                <span className="font-display text-[22px] md:text-[28px] leading-[1.3] font-normal text-primary-dark text-pretty hyphens-manual">
                  {t(item.title)}
                </span>
                {item.slug && (
                  <ArrowIcon className="shrink-0 text-primary-blue transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </div>
            )

            return (
              <Reveal key={item._id} delay={i * 50}>
                {item.slug ? (
                  <Link href={`/${locale}/portfolio/${item.slug}`}>{content}</Link>
                ) : (
                  content
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

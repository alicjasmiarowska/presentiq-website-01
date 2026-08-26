'use client'

import { useMemo, useState } from 'react'
import CaseStudyCard from '../molecules/CaseStudyCard'

interface CaseStudy {
  _id: string
  title: { en: string; de: string }
  category: { en: string; de: string }
  mainImage?: any
}

interface CaseStudyGridProps {
  caseStudies: CaseStudy[]
  locale: 'en' | 'de'
}

export default function CaseStudyGrid({ caseStudies, locale }: CaseStudyGridProps) {
  const t = (field: any) => field?.[locale] || field?.en || ''
  const allLabel = locale === 'de' ? 'Alle' : 'All'

  const categories = useMemo(() => {
    return Array.from(new Set(caseStudies.map((cs) => t(cs.category)).filter(Boolean)))
  }, [caseStudies, locale])

  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  if (!caseStudies?.length) return null

  const filtered = activeCategory
    ? caseStudies.filter((cs) => t(cs.category) === activeCategory)
    : caseStudies

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3 mb-12" role="group" aria-label="Filter case studies by category">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeCategory === null
                ? 'bg-primary-blue text-white'
                : 'border-2 border-primary-dark/30 text-primary-dark hover:border-primary-blue'
            }`}
          >
            {allLabel}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-primary-blue text-white'
                  : 'border-2 border-primary-dark/30 text-primary-dark hover:border-primary-blue'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {filtered.map((caseStudy) => (
          <CaseStudyCard
            key={caseStudy._id}
            image={caseStudy.mainImage}
            title={t(caseStudy.title)}
            category={t(caseStudy.category)}
          />
        ))}
      </div>
    </div>
  )
}

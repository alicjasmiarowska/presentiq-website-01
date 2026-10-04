import RichText from '@/src/components/atoms/RichText'
import Reveal from '@/src/components/atoms/Reveal'
import { resolveLocale } from '@/src/lib/locale'
import type { PortableTextLocaleValue } from '@/src/types/sanity'

interface LocaleString {
  en: string
  de: string
}

interface SectionData {
  leftHeading?: LocaleString
  leftBody?: PortableTextLocaleValue
  rightHeading?: LocaleString
  rightBody?: PortableTextLocaleValue
}

interface FactItem {
  _key: string
  label?: LocaleString
  value?: LocaleString
}

interface CaseStudyBodyData {
  subheadline?: LocaleString
  challenge?: SectionData
  solution?: SectionData
  result?: SectionData
  facts?: FactItem[]
}

interface CaseStudyBodyProps {
  data?: CaseStudyBodyData
  locale: 'en' | 'de'
}

function Column({
  heading,
  body,
  locale,
}: {
  heading?: LocaleString
  body?: PortableTextLocaleValue
  locale: 'en' | 'de'
}) {
  const t = (field?: LocaleString) => resolveLocale(field, locale)
  const headingText = t(heading)
  const bodyValue = body?.[locale] || body?.en

  if (!headingText && (!bodyValue || bodyValue.length === 0)) return null

  return (
    <div>
      {headingText && <p className="font-bold text-lg text-primary-dark mb-3">{headingText}</p>}
      {bodyValue && bodyValue.length > 0 && <RichText value={bodyValue} color="secondary" />}
    </div>
  )
}

// When there's only a left-hand heading + body (no right column authored),
// the heading sits full-width above the row — never level with the body
// text — and the body itself flows across 2 CSS columns underneath, so one
// long text still reads as two columns without needing a second field.
function SingleColumnFlow({
  heading,
  body,
  locale,
}: {
  heading?: LocaleString
  body?: PortableTextLocaleValue
  locale: 'en' | 'de'
}) {
  const t = (field?: LocaleString) => resolveLocale(field, locale)
  const headingText = t(heading)
  const bodyValue = body?.[locale] || body?.en

  if (!headingText && (!bodyValue || bodyValue.length === 0)) return null

  return (
    <div>
      {headingText && <p className="font-bold text-lg text-primary-dark mb-4">{headingText}</p>}
      {bodyValue && bodyValue.length > 0 && (
        <div className="md:columns-2 md:gap-12 lg:gap-16">
          <RichText value={bodyValue} color="secondary" />
        </div>
      )}
    </div>
  )
}

// The "label: value" blue callout that replaces the right column on the
// Result row when filled in — any number of free-text facts, since
// different case studies need different ones (not a fixed set of fields).
function FactsBox({ facts, locale }: { facts?: FactItem[]; locale: 'en' | 'de' }) {
  const t = (field?: LocaleString) => resolveLocale(field, locale)
  const rows = (facts || [])
    .map((fact) => ({ key: fact._key, label: t(fact.label), value: t(fact.value) }))
    .filter((row) => row.value)

  if (rows.length === 0) return null

  return (
    <div className="bg-primary-blue text-white px-8 py-10 md:px-10 md:py-12">
      <div className="space-y-2">
        {rows.map((row) => (
          <p key={row.key} className="text-base leading-relaxed whitespace-pre-line">
            {row.label && <span className="font-bold">{row.label}: </span>}
            <span>{row.value}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

// Case study detail body: a subheadline, then three divided rows
// (Challenge/Solution/Result). Each row has two authoring modes, chosen
// automatically by whether the right column has anything in it: with only
// a left heading + body, the heading spans full width and the body text
// flows across 2 CSS columns underneath (SingleColumnFlow) — with a right
// heading and/or body also filled in, it's two independent labeled blocks
// side by side (Column × 2) instead. The Result row's right column shows
// the fact box instead of a Column, when facts are filled in.
export default function CaseStudyBody({ data, locale }: CaseStudyBodyProps) {
  if (!data) return null

  const t = (field?: LocaleString) => resolveLocale(field, locale)
  const hasFacts = (data.facts || []).some((fact) => t(fact.value))

  const rows = (
    [
      { key: 'challenge', section: data.challenge },
      { key: 'solution', section: data.solution },
      { key: 'result', section: data.result },
    ] as const
  ).filter((row) => row.section)

  if (!t(data.subheadline) && rows.length === 0) return null

  return (
    <section className="bg-neutral-light">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        {t(data.subheadline) && (
          <Reveal>
            <p className="font-display text-[22px] md:text-[28px] uppercase tracking-wide text-primary-dark pb-8 md:pb-10 border-b border-primary-dark/20">
              {t(data.subheadline)}
            </p>
          </Reveal>
        )}

        {rows.map(({ key, section }, i) => {
          const showFacts = key === 'result' && hasFacts
          const rightHeadingText = t(section?.rightHeading)
          const rightBodyValue = section?.rightBody?.[locale] || section?.rightBody?.en
          const hasRightContent = showFacts || !!rightHeadingText || !!(rightBodyValue && rightBodyValue.length > 0)
          const rowBorder = i < rows.length - 1 ? 'border-b border-primary-dark/20' : ''

          return (
            <Reveal key={key} delay={i * 100}>
              {hasRightContent ? (
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-8 py-10 md:py-14 ${rowBorder}`}>
                  <Column heading={section?.leftHeading} body={section?.leftBody} locale={locale} />
                  {showFacts ? (
                    <FactsBox facts={data.facts} locale={locale} />
                  ) : (
                    <Column heading={section?.rightHeading} body={section?.rightBody} locale={locale} />
                  )}
                </div>
              ) : (
                <div className={`py-10 md:py-14 ${rowBorder}`}>
                  <SingleColumnFlow heading={section?.leftHeading} body={section?.leftBody} locale={locale} />
                </div>
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

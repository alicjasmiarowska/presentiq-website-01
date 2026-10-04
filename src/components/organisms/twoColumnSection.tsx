import Button from '../atoms/Button'
import RichText from '../atoms/RichText'
import Reveal from '../atoms/Reveal'
import Heading, { LEAD_TEXT_CLASSES } from '../atoms/Heading'
import Text from '../atoms/Text'
import EdgeBars from '../atoms/EdgeBars'
import { resolveButtonHref } from '../../lib/resolveHref'
import { layout } from '../../styles/design-tokens'

interface TwoColumnSectionData {
  leftHeadline: { en: string; de: string }
  leftBody?: { en: string; de: string }
  buttonText?: { en: string; de: string }
  buttonPage?: { type?: string; slug?: string }
  buttonHref?: string
  rightBody?: { en: any[]; de: any[] }
  rightHeadline: { en: string; de: string }
}

interface TwoColumnSectionProps {
  data: TwoColumnSectionData
  locale: 'en' | 'de'
  // The thin bar graphic along the navy column's left edge (About page).
  edgeBars?: boolean
  // "lead": the smaller 28px uppercase style for a longer left statement
  // (About intro); default is the regular section heading.
  leftHeadlineStyle?: 'section' | 'lead'
  // "compact": the About intro's proportions from the design — tighter
  // padding, and the two columns no longer share row heights: top content
  // sits at the top, the bottom items (left text, right headline) share
  // the bottom edge. Default keeps the homepage's larger layout.
  spacing?: 'default' | 'compact'
}

export default function TwoColumnSection({
  data,
  locale,
  edgeBars = false,
  leftHeadlineStyle = 'section',
  spacing = 'default',
}: TwoColumnSectionProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)
  const compact = spacing === 'compact'
  const sectionClasses = compact ? 'grid grid-cols-1 md:grid-cols-2' : 'grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_auto]'
  const columnClasses = compact
    ? 'py-16 md:py-30 flex flex-col justify-between'
    : 'py-16 md:py-24 lg:py-32 grid grid-cols-1 md:grid-rows-subgrid md:row-span-2'
  const bottomGap = compact ? 'mt-12 md:mt-14' : 'mt-12 md:mt-30'

  return (
    <section className={sectionClasses}>
      <div className={`relative overflow-hidden bg-primary-dark ${layout.edgeGutter.left} pr-6 md:pr-12 lg:pr-20 ${columnClasses}`}>
        {edgeBars && <EdgeBars />}
        <Reveal className="relative">
          {leftHeadlineStyle === 'lead' ? (
            <h2 className={`${LEAD_TEXT_CLASSES} text-white max-w-[20em]`}>{t(data.leftHeadline)}</h2>
          ) : (
            <Heading level="h2" variant="section" text={t(data.leftHeadline)} className="text-white" />
          )}
        </Reveal>
        {(t(data.leftBody) || t(data.buttonText)) && (
          <Reveal delay={100} className="relative">
            <div className={bottomGap}>
              {t(data.leftBody) && <Text text={t(data.leftBody)} size="base" color="primary" className="max-w-[70ch]" />}
              {t(data.buttonText) && (
                <div className={t(data.leftBody) ? 'mt-10' : ''}>
                  <Button text={t(data.buttonText)} href={buttonHref} variant="text" showArrow />
                </div>
              )}
            </div>
          </Reveal>
        )}
      </div>

      <div className={`bg-white pl-6 md:pl-12 lg:pl-20 ${layout.edgeGutter.right} ${columnClasses}`}>
        <Reveal delay={150}>
          <RichText value={data.rightBody?.[locale] || data.rightBody?.en} />
        </Reveal>
        {t(data.rightHeadline) && (
          <Reveal delay={250}>
            <Heading level="h2" variant="section" text={t(data.rightHeadline)} className={`text-primary-blue ${compact ? bottomGap : 'mt-16 md:mt-30'}`} />
          </Reveal>
        )}
      </div>
    </section>
  )
}

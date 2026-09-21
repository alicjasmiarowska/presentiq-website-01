import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Reveal from '../atoms/Reveal'
import { resolveButtonHref } from '../../lib/resolveHref'
import { layout } from '../../styles/design-tokens'

interface FourColumnsItem {
  _key: string
  heading: { en: string; de: string }
  text: { en: string; de: string }
  buttonText?: { en: string; de: string }
  buttonPage?: { type?: string; slug?: string }
  buttonHref?: string
}

interface FourColumnsData {
  columns: FourColumnsItem[]
}

interface FourColumnsSectionProps {
  data: FourColumnsData
  locale: 'en' | 'de'
}

// Left-column cells (0, 2) bleed their background to the true viewport
// edge on the left; right-column cells (1, 3) bleed on the right. The
// opposite side always uses the plain gutter since it faces the shared
// seam between columns, not the page edge.
const BLOCK_STYLES = [
  { bg: 'bg-primary-dark', headingClassName: 'text-white', textColor: 'primary' as const, buttonClassName: '', arrowClassName: undefined, edgeClassName: `${layout.edgeGutter.left} pr-6 md:pr-12 lg:pr-20` },
  { bg: 'bg-white', headingClassName: '', textColor: 'secondary' as const, buttonClassName: 'text-primary-dark', arrowClassName: undefined, edgeClassName: `pl-6 md:pl-12 lg:pl-20 ${layout.edgeGutter.right}` },
  { bg: 'bg-neutral-light', headingClassName: '', textColor: 'secondary' as const, buttonClassName: 'text-primary-dark', arrowClassName: undefined, edgeClassName: `${layout.edgeGutter.left} pr-6 md:pr-12 lg:pr-20` },
  { bg: 'bg-primary-blue', headingClassName: 'text-white', textColor: 'primary' as const, buttonClassName: '', arrowClassName: 'text-white', edgeClassName: `pl-6 md:pl-12 lg:pl-20 ${layout.edgeGutter.right}` },
]

export default function FourColumnsSection({ data, locale }: FourColumnsSectionProps) {
  if (!data || !data.columns?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr">
      {data.columns.map((item, index) => {
        const style = BLOCK_STYLES[index % BLOCK_STYLES.length]
        const buttonHref = resolveButtonHref(locale, item.buttonPage, item.buttonHref)

        return (
          <div
            key={item._key}
            className={`${style.bg} flex flex-col ${style.edgeClassName} py-16 md:py-24`}
          >
            <Reveal delay={index * 100}>
              <Heading level="h4" text={t(item.heading)} className={style.headingClassName} />
              <Text text={t(item.text)} size="base" color={style.textColor} className="mt-12" />
            </Reveal>
            {t(item.buttonText) && (
              <Reveal delay={index * 100 + 100}>
                <div className="flex justify-end mt-auto pt-10">
                  <Button
                    text={t(item.buttonText)}
                    href={buttonHref}
                    variant="text"
                    showArrow
                    className={style.buttonClassName}
                    arrowClassName={style.arrowClassName}
                  />
                </div>
              </Reveal>
            )}
          </div>
        )
      })}
    </section>
  )
}

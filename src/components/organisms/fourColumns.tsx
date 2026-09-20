import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Reveal from '../atoms/Reveal'
import { resolveButtonHref } from '../../lib/resolveHref'

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

const BLOCK_STYLES = [
  { bg: 'bg-primary-dark', headingClassName: 'text-white', textColor: 'primary' as const, buttonClassName: '', arrowClassName: undefined },
  { bg: 'bg-white', headingClassName: '', textColor: 'secondary' as const, buttonClassName: 'text-primary-dark', arrowClassName: undefined },
  { bg: 'bg-neutral-light', headingClassName: '', textColor: 'secondary' as const, buttonClassName: 'text-primary-dark', arrowClassName: undefined },
  { bg: 'bg-primary-blue', headingClassName: 'text-white', textColor: 'primary' as const, buttonClassName: '', arrowClassName: 'text-white' },
]

export default function FourColumnsSection({ data, locale }: FourColumnsSectionProps) {
  if (!data || !data.columns?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {data.columns.map((item, index) => {
        const style = BLOCK_STYLES[index % BLOCK_STYLES.length]
        const buttonHref = resolveButtonHref(locale, item.buttonPage, item.buttonHref)

        return (
          <div
            key={item._key}
            className={`${style.bg} flex flex-col px-6 md:px-12 lg:px-20 py-16 md:py-24`}
          >
            <Reveal delay={index * 100}>
              <Heading level="h3" text={t(item.heading)} className={style.headingClassName} />
              <Text text={t(item.text)} size="base" color={style.textColor} className="mt-6" />
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

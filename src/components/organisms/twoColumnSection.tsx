import Button from '../atoms/Button'
import RichText from '../atoms/RichText'
import Reveal from '../atoms/Reveal'
import Heading from '../atoms/Heading'
import { resolveButtonHref } from '../../lib/resolveHref'
import { layout } from '../../styles/design-tokens'

interface TwoColumnSectionData {
  leftHeadline: { en: string; de: string }
  buttonText?: { en: string; de: string }
  buttonPage?: { type?: string; slug?: string }
  buttonHref?: string
  rightBody?: { en: any[]; de: any[] }
  rightHeadline: { en: string; de: string }
}

interface TwoColumnSectionProps {
  data: TwoColumnSectionData
  locale: 'en' | 'de'
}

export default function TwoColumnSection({ data, locale }: TwoColumnSectionProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const buttonHref = resolveButtonHref(locale, data.buttonPage, data.buttonHref)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_auto]">
      <div className={`bg-primary-dark ${layout.edgeGutter.left} pr-6 md:pr-12 lg:pr-20 py-16 md:py-24 lg:py-32 grid md:grid-rows-subgrid md:row-span-2`}>
        <Reveal>
          <Heading level="h2" variant="section" text={t(data.leftHeadline)} className="text-white" />
        </Reveal>
        {t(data.buttonText) && (
          <Reveal delay={100}>
            <div className="mt-30">
              <Button text={t(data.buttonText)} href={buttonHref} variant="text" showArrow />
            </div>
          </Reveal>
        )}
      </div>

      <div className={`bg-white pl-6 md:pl-12 lg:pl-20 ${layout.edgeGutter.right} py-16 md:py-24 lg:py-32 grid md:grid-rows-subgrid md:row-span-2`}>
        <Reveal delay={150}>
          <RichText value={data.rightBody?.[locale] || data.rightBody?.en} />
        </Reveal>
        <Reveal delay={250}>
          <Heading level="h2" variant="section" text={t(data.rightHeadline)} className="text-primary-blue mt-30" />
        </Reveal>
      </div>
    </section>
  )
}

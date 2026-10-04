import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Reveal from '../atoms/Reveal'
import EdgeBars from '../atoms/EdgeBars'

interface SuccessStatementData {
  headline?: { en: string; de: string }
  body?: { en: string; de: string }
}

interface SuccessStatementProps {
  data?: SuccessStatementData
  locale: 'en' | 'de'
}

// "Gemeinsam zum Erfolg." navy band: a short headline and a longer
// statement side by side, with the same edge-bar accent used on other navy
// panels (Contact/PhotoTextSplit/TwoColumnSection).
export default function SuccessStatement({ data, locale }: SuccessStatementProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const headline = t(data.headline)
  const body = t(data.body)
  if (!headline && !body) return null

  return (
    <section className="relative overflow-hidden bg-primary-dark">
      <EdgeBars />
      <div className="relative max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          {headline && (
            <Reveal className="md:w-1/3 shrink-0">
              <Heading level="h2" variant="section" text={headline} className="text-white" />
            </Reveal>
          )}
          {body && (
            <Reveal delay={100} className="md:flex-1">
              <Text text={body} size="base" color="primary" />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

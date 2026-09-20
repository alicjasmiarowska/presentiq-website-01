import Text from '../atoms/Text'
import Heading from '../atoms/Heading'
import Section from '../atoms/Section'
import FaqAccordionItem from '../molecules/FaqAccordionItem'
import Reveal from '../atoms/Reveal'

interface FaqQnA {
  _key: string
  question: { en: string; de: string }
  answer: { en: string; de: string }
}

interface FaqSectionData {
  eyebrow: { en: string; de: string }
  headline: { en: string; de: string }
  subheadline: { en: string; de: string }
  items: FaqQnA[]
}

interface FaqSectionProps {
  data: FaqSectionData
  locale: 'en' | 'de'
}

export default function FaqSection({ data, locale }: FaqSectionProps) {
  if (!data || !data.items?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.items.map((item) => ({
      '@type': 'Question',
      name: t(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(item.answer),
      },
    })),
  }

  return (
    <Section className="py-30!">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 pb-12 md:pb-20 px-0 md:px-10">
        <div className="w-full md:w-1/3">
          <Reveal>
            <p className="text-white font-semibold uppercase text-sm mb-4">
              {t(data.eyebrow)}
            </p>
            <Heading level="h2" variant="section" text={t(data.headline)} className="text-white mb-6 md:mb-14" />
            <Text
              text={t(data.subheadline)}
              size="base"
            />
          </Reveal>
        </div>
        <div className="w-full md:w-2/3 md:ml-20">
          {data.items.map((item, index) => (
            <Reveal key={item._key} delay={index * 150}>
              <FaqAccordionItem
                question={t(item.question)}
                answer={t(item.answer)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

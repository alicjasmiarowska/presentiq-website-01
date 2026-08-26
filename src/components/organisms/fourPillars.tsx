import Heading from '../atoms/Heading'
import Section from '../atoms/Section'
import PillarCard from '../molecules/PillarCard'
import Reveal from '../atoms/Reveal'

interface Pillar {
  _key: string
  image?: any
  title: { en: string; de: string }
  description: { en: string; de: string }
}

interface FourPillarsData {
  headline: { en: string; de: string }
  pillars: Pillar[]
}

interface FourPillarsSectionProps {
  data: FourPillarsData
  locale: 'en' | 'de'
}

export default function FourPillarsSection({ data, locale }: FourPillarsSectionProps) {
  if (!data || !data.pillars?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <Section className="bg-primary-dark">
      <div className="pt-10 pb-20">
        <Reveal>
          <Heading level="h2" text={t(data.headline)} className="text-white mb-16" />
        </Reveal>

        <div className="flex justify-end">
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {data.pillars.map((pillar, index) => (
              <Reveal key={pillar._key} delay={index * 200}>
                <PillarCard
                  image={pillar.image}
                  title={t(pillar.title)}
                  description={t(pillar.description)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

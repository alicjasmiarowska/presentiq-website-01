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

interface PillarsData {
  headline: { en: string; de: string }
  pillars: Pillar[]
}

interface PillarsProps {
  data: PillarsData
  locale: 'en' | 'de'
}

export default function Pillars({ data, locale }: PillarsProps) {
  if (!data || !data.pillars?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <Section className="bg-primary-dark">
    <div className="pt-10 pb-10 md:pt-20 md:pb-20">
      <Reveal>
        <Heading
          level="h2"
          text={t(data.headline)}
          className="text-white text-left mb-24"
        />
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
    </Section>
  )
}

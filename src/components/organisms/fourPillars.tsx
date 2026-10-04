import Heading from '@/src/components/atoms/Heading'
import Section from '@/src/components/atoms/Section'
import PillarCard from '@/src/components/molecules/PillarCard'
import Reveal from '@/src/components/atoms/Reveal'
import { resolveLocale } from '@/src/lib/locale'
import type { SanityImageValue } from '@/src/types/sanity'

interface Pillar {
  _key: string
  image?: SanityImageValue
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

  const t = (field: any) => resolveLocale(field, locale)

  return (
    <Section className="bg-primary-dark py-16 md:py-24">
      <div>
        <Reveal>
          <Heading level="h2" variant="section" text={t(data.headline)} className="text-white mb-16" />
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

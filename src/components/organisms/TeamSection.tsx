import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Section from '../atoms/Section'
import TeamMemberCard from '../molecules/TeamMemberCard'
import Reveal from '../atoms/Reveal'

interface TeamMember {
  _key: string
  photo?: any
  name: string
}

interface TeamSectionData {
  teamHeadline: { en: string; de: string }
  teamText: { en: string; de: string }
  team: TeamMember[]
}

interface TeamSectionProps {
  data: TeamSectionData
  locale: 'en' | 'de'
}

export default function TeamSection({ data, locale }: TeamSectionProps) {
  if (!data || !data.team?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <Section>
      <div className="pt-12 pb-12 md:pt-20 md:pb-20">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-16 mb-10 md:mb-16">
          <Reveal>
            <Heading level="h2" text={t(data.teamHeadline)} className="-mt-2" />
          </Reveal>
          <Reveal delay={150}>
            <div className="w-full lg:w-160 lg:shrink-0">
              <Text text={t(data.teamText)} size="base" color="secondary" />
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {data.team.map((member, index) => (
            <Reveal key={member._key} delay={(index % 3) * 150}>
              <TeamMemberCard photo={member.photo} name={member.name} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

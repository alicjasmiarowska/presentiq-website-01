import Section from '../atoms/Section'
import TeamMemberCard from '../molecules/TeamMemberCard'
import Reveal from '../atoms/Reveal'

interface TeamMember {
  _key: string
  photo?: any
  name: string
}

interface TeamSectionData {
  team: TeamMember[]
}

interface TeamSectionProps {
  data: TeamSectionData
  locale: 'en' | 'de'
}

export default function TeamSection({ data, locale }: TeamSectionProps) {
  if (!data || !data.team?.length) return null

  return (
    <Section>
      {/* Team photos only — the intro above them is the About page's
          two-column section. */}
      <div className="pt-12 pb-12 md:pt-20 md:pb-20">
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

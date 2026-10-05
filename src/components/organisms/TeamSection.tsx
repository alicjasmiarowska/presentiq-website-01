import Section from '@/src/components/atoms/Section'
import TeamMemberCard from '@/src/components/molecules/TeamMemberCard'
import Reveal from '@/src/components/atoms/Reveal'
import type { SanityImageValue } from '@/src/types/sanity'

interface TeamMember {
  _key: string
  photo?: SanityImageValue
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
    <Section className="pt-10 pb-16 md:py-24">
      {/* Team photos only — the intro above them is the About page's
          two-column section. */}
      <div>
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

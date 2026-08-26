import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import Section from '../atoms/Section'
import ToolCard from '../molecules/ToolCard'
import Reveal from '../atoms/Reveal'

interface Tool {
  _key: string
  title: { en: string; de: string }
  description: { en: string; de: string }
}

interface ToolsData {
  headline: { en: string; de: string }
  text?: { en: string; de: string }
  tools: Tool[]
}

interface ToolsSectionProps {
  data: ToolsData
  locale: 'en' | 'de'
  textColor?: 'dark' | 'light'
}

export default function ToolsSection({ data, locale, textColor = 'dark' }: ToolsSectionProps) {
  if (!data || !data.tools?.length) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const isLight = textColor === 'light'

  return (
    <Section className="bg-primary-dark">
      <div className="pt-10 pb-20">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-16 mb-10 md:mb-16">
          <Reveal>
            <Heading
              level="h2"
              text={t(data.headline)}
              className={isLight ? 'text-white' : ''}
            />
          </Reveal>
          {data.text && (
            <Reveal delay={150}>
              <div className="w-full lg:w-160 lg:shrink-0">
                <Text text={t(data.text)} size="base" color={isLight ? 'primary' : 'secondary'} />
              </div>
            </Reveal>
          )}
        </div>

        <div className="flex justify-end">
          <div className="w-full">
            {data.tools.map((tool) => (
              <ToolCard key={tool._key} title={t(tool.title)} description={t(tool.description)} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

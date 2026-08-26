import Heading from '../atoms/Heading'
import Section from '../atoms/Section'
import ServiceCard from '../molecules/ServiceCard'
import Reveal from '../atoms/Reveal'

interface Service {
  _id: string
  title: { en: string; de: string }
  description: { en: string; de: string }
  slug?: { current: string }
}

interface ServicesSectionData {
  eyebrow: { en: string; de: string }
  headline: { en: string; de: string }
}

interface ServicesSectionProps {
  services: Service[]
  data: ServicesSectionData
  locale: 'en' | 'de'
}

export default function ServicesSection({ services, data, locale }: ServicesSectionProps) {
  if (!services || !data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <Section className="bg-primary-dark">
      <div className="pt-10 pb-20">
        <div className="mb-16 ml-4">
          <Reveal>
            <Heading
              level="h4"
              text={t(data.headline)}
              className="text-left text-primary-blue!"
            />
          </Reveal>
        </div>
        <div>
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              title={t(service.title)}
              description={t(service.description)}
              href={service.slug?.current ? `/${locale}/services/${service.slug.current}` : undefined}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

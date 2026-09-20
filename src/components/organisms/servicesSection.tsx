import Image from 'next/image'
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
    <div className="relative overflow-hidden bg-primary-dark">
      <Image
        src="/images/line_1.svg"
        alt=""
        aria-hidden="true"
        width={677}
        height={692}
        className="absolute top-0 left-0 w-40 md:w-56 lg:w-104 h-auto pointer-events-none select-none"
        unoptimized
      />
      <Image
        src="/images/line-2.png"
        alt=""
        aria-hidden="true"
        width={2648}
        height={2746}
        className="absolute bottom-0 right-0 w-40 md:w-56 lg:w-164 h-auto pointer-events-none select-none"
      />

      <Section className="relative">
        <div className="pt-30 pb-30">
          <div className="mb-20 ml-4">
            <Reveal>
              <Heading level="h2" variant="section" text={t(data.headline)} className="text-white" />
            </Reveal>
          </div>
          <div>
            {services.map((service, index) => (
              <ServiceCard
                key={service._id}
                index={index + 1}
                title={t(service.title)}
                description={t(service.description)}
                href={service.slug?.current ? `/${locale}/services/${service.slug.current}` : undefined}
              />
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

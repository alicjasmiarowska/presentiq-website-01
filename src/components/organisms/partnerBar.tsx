import Image from 'next/image'
import RichText from '../atoms/RichText'
import Reveal from '../atoms/Reveal'

interface PartnerBarData {
  text?: { en: any[]; de: any[] }
}

interface PartnerBarProps {
  data: PartnerBarData
  locale: 'en' | 'de'
}

// The light-gray "we work with our parent company K16" callout between the
// photo intro and the navy collaboration section.
export default function PartnerBar({ data, locale }: PartnerBarProps) {
  if (!data) return null

  const text = data.text?.[locale] || data.text?.en
  if (!text || text.length === 0) return null

  return (
    <section className="bg-neutral-light">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-0 md:min-h-[188px] flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <Reveal className="max-w-[720px]">
          <RichText value={text} color="secondary" />
        </Reveal>
        <Reveal delay={100} className="shrink-0">
          <Image src="/images/logo-k16.svg" alt="K16" width={96} height={83} className="w-20 md:w-24 h-auto" />
        </Reveal>
      </div>
    </section>
  )
}

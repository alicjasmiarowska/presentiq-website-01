import Image from 'next/image'
import RichText from '@/src/components/atoms/RichText'
import Reveal from '@/src/components/atoms/Reveal'
import type { PortableTextLocaleValue } from '@/src/types/sanity'

interface PartnerBarData {
  text?: PortableTextLocaleValue
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
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 grid grid-cols-1 md:grid-cols-4 md:items-center gap-8">
        <Reveal className="md:col-span-3">
          <RichText value={text} color="secondary" />
        </Reveal>
        <Reveal delay={100} className="md:col-span-1 md:justify-self-end">
          <a
            href="https://www.k16.de/de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={locale === 'de' ? 'K16 (öffnet in neuem Fenster)' : 'K16 (opens in a new window)'}
            className="block transition-opacity hover:opacity-70"
          >
            <Image src="/images/logo-k16.svg" alt="K16" width={96} height={83} className="w-20 md:w-24 h-auto" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

import Image from 'next/image'
import Reveal from '../atoms/Reveal'
import CharReveal from '../atoms/CharReveal'
import { gradients, layout } from '../../styles/design-tokens'

// Shared by every page hero (this component and the contact page) so the
// headline looks and sits the same everywhere.
export const HERO_TITLE_CLASSES =
  'w-full max-w-[1680px] mx-auto font-display text-white uppercase font-normal leading-[1.05] [&:lang(de)]:leading-[1.15] tracking-wider'
// On phones the size follows the screen width so the longest line
// ("FÜR ENTSCHEIDER", ~9.8em wide in this face) fits within the 24px
// gutters, and long German compounds break at their seam
// ("PRÄSENTATIONS-/AGENTUR") instead of mid-syllable.
export const HERO_TITLE_STYLE = { fontSize: 'min(72px, max(48px, 6vw), calc((100vw - 48px) / 9.8))' }
// Space between the headline and the bottom of the hero.
export const HERO_TITLE_BOTTOM = 'pb-24 md:pb-36'

interface HeroData {
  title: { en: string; de: string }
  subtitle: { en: string; de: string }
  buttonText1?: { en: string; de: string }
  buttonPage1?: { type?: string; slug?: string }
  buttonHref1?: string
  buttonText2?: { en: string; de: string }
  buttonPage2?: { type?: string; slug?: string }
  buttonHref2?: string
}

interface HeroSectionProps {
  data: HeroData
  locale: 'en' | 'de'
}

export default function HeroSection({ data, locale }: HeroSectionProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <section
      className="relative flex flex-col min-h-screen 2xl:min-h-[80vh]"
      style={{ backgroundImage: gradients.heroBase }}
    >
      <Image
        src="/images/line_1.svg"
        alt=""
        aria-hidden="true"
        width={677}
        height={692}
        className="absolute top-0 left-0 w-40 md:w-156 lg:w-124 h-auto pointer-events-none select-none"
        unoptimized
        priority
      />

      <div className="absolute inset-y-0 left-7/12 w-5/12 pointer-events-none">
        <Image
          src="/images/line-2.png"
          alt=""
          aria-hidden="true"
          width={2648}
          height={2746}
          className="absolute bottom-0 left-0 w-full h-auto select-none"
        />
      </div>

      <div
        className={`flex-1 flex items-end px-6 md:px-12 lg:px-20 pt-24 md:pt-32 ${HERO_TITLE_BOTTOM}`}
        style={{ backgroundImage: gradients.heroGlow }}
      >
        <h1 className={HERO_TITLE_CLASSES} style={HERO_TITLE_STYLE}>
          <CharReveal text={t(data.title)} />
        </h1>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className={`w-full md:w-7/12 bg-primary-blue ${layout.edgeGutter.left} pr-6 md:pr-16 py-10 md:py-14`}>
          <Reveal delay={500}>
            <p className="font-display text-white uppercase font-normal leading-[1.3] tracking-wider text-[20px] md:text-[24px]">
              {t(data.subtitle)}
            </p>
          </Reveal>
        </div>
        <div className="hidden md:block md:w-5/12" />
      </div>
    </section>
  )
}
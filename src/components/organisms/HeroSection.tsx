import Image from 'next/image'
import Reveal from '@/src/components/atoms/Reveal'
import CharReveal from '@/src/components/atoms/CharReveal'
import BlurGlow from '@/src/components/atoms/BlurGlow'
import { gradients, layout } from '@/src/styles/design-tokens'
import { resolveLocale } from '@/src/lib/locale'

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
  title?: { en: string; de: string }
  subtitle?: { en: string; de: string }
}

interface HeroSectionProps {
  data: HeroData
  locale: 'en' | 'de'
  // Wraps the hero in the standard `relative overflow-hidden bg-primary-dark`
  // + BlurGlow (corner + edge) pair used by every page's hero except the
  // homepage, which already has its own full-bleed gradient wrapper doing
  // the equivalent job — pass nothing there rather than forcing this shape
  // on a layout it doesn't fit.
  glow?: boolean | { cornerPosition?: 'bottom-right' | 'bottom-left'; color?: string }
}

export default function HeroSection({ data, locale, glow }: HeroSectionProps) {
  if (!data) return null

  const t = (field: any) => resolveLocale(field, locale)
  // Full viewport height only makes sense when the blue subtitle bar fills
  // out the bottom (homepage, service pages with a hero tagline). Without
  // it (Contact, case studies, ...) that same height leaves a huge empty
  // gap below the headline, so the section sizes to its content instead.
  const hasSubtitle = !!t(data.subtitle)
  const glowConfig = glow === true ? {} : glow || null

  const hero = (
    <section
      className={`relative flex flex-col ${hasSubtitle ? 'min-h-screen 2xl:min-h-[80vh]' : ''}`}
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

      {/* This wrapper spans the section's full height (inset-y-0), which on
          mobile includes the stacked subtitle bar below the headline — the
          bottom-anchored image then bleeds into the blue bar as a stray
          stripe. Desktop-only, where the bar sits beside the headline
          instead of under it. */}
      <div className="hidden md:block absolute inset-y-0 left-7/12 w-5/12 pointer-events-none">
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
        className={
          hasSubtitle
            ? `flex-1 flex items-end px-6 md:px-12 lg:px-20 pt-24 md:pt-32 ${HERO_TITLE_BOTTOM}`
            : `px-6 md:px-12 lg:px-20 pt-40 md:pt-56 lg:pt-[271px] ${HERO_TITLE_BOTTOM}`
        }
        style={{ backgroundImage: gradients.heroGlow }}
      >
        <h1 className={HERO_TITLE_CLASSES} style={HERO_TITLE_STYLE}>
          <CharReveal text={t(data.title)} />
        </h1>
      </div>

      {t(data.subtitle) && (
        <div className="flex flex-col md:flex-row">
          <div className={`w-full md:w-7/12 bg-primary-blue ${layout.edgeGutter.left} pr-6 md:pr-16 py-10 md:py-14`}>
            <Reveal delay={500}>
              <p className="font-display text-white uppercase font-normal leading-[1.3] tracking-wider text-[20px] md:text-[24px]">
                {t(data.subtitle)}
              </p>
            </Reveal>
          </div>
          <div className="hidden md:block md:w-5/12 bg-primary-dark" />
        </div>
      )}
    </section>
  )

  if (!glowConfig) return hero

  return (
    <div className="relative overflow-hidden bg-primary-dark">
      <BlurGlow variant="corner" position={glowConfig.cornerPosition || 'bottom-right'} color={glowConfig.color} />
      <BlurGlow variant="edge" color={glowConfig.color} />
      {hero}
    </div>
  )
}
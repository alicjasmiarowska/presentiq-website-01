'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Heading from '../atoms/Heading'
import CountUpNumber from '../atoms/CountUpNumber'
import Reveal from '../atoms/Reveal'
import { urlFor } from '../../../sanity/lib/image'

interface Logo {
  _key: string
  alt?: string
  asset?: any
}

interface Stat {
  _key: string
  label: { en: string; de: string }
  value: number
  decimals?: number
  suffix?: string
}

interface LogoWallData {
  headline: { en: string; de: string }
  stats?: Stat[]
  logos?: Logo[]
}

interface LogoWallProps {
  data: LogoWallData
  locale: 'en' | 'de'
}

function LogoImage({ logo, hidden }: { logo: Logo; hidden?: boolean }) {
  return (
    <div className="relative h-8 w-28 shrink-0" {...(hidden ? { 'aria-hidden': true } : {})}>
      <Image
        src={urlFor(logo).height(64).url()}
        alt={hidden ? '' : logo.alt || ''}
        fill
        sizes="112px"
        className="object-contain object-left [filter:brightness(0)_invert(1)]"
      />
    </div>
  )
}

function MarqueeRow({ logos, reverse }: { logos: Logo[]; reverse?: boolean }) {
  return (
    <div
      className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="list"
      aria-label="Client logos"
    >
      <div
        className={`flex w-max items-center gap-20 group-hover:[animation-play-state:paused] ${
          reverse ? 'animate-[marquee-reverse_40s_linear_infinite]' : 'animate-[marquee_40s_linear_infinite]'
        }`}
      >
        {[...logos, ...logos].map((logo, i) => (
          <LogoImage key={`${logo._key}-${i}`} logo={logo} hidden={i >= logos.length} />
        ))}
      </div>
    </div>
  )
}

export default function LogoWall({ data, locale }: LogoWallProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const logos = data.logos?.filter((logo) => logo.asset) || []
  const half = Math.ceil(logos.length / 2)
  const row1 = logos.slice(0, half)
  const row2 = logos.slice(half)
  const stats = data.stats || []

  return (
    <section className="relative overflow-hidden bg-white text-primary-dark">
      <div className="relative">
      <Image
        src="/images/line-03.png"
        alt=""
        aria-hidden="true"
        width={170}
        height={345.7}
        unoptimized
        className="absolute bottom-0 left-0 w-1/5 h-auto pointer-events-none select-none"
      />

      <div className="relative px-6 md:px-12 lg:px-20 pt-30">
        <Reveal>
          <Heading level="h2" variant="section" text={t(data.headline)} className="text-primary-dark" />
        </Reveal>
      </div>

      {stats.length > 0 && (
        <div className="relative mt-16 md:mt-24 pr-6 md:pr-12 lg:pr-20">
          <div className="ml-[29%] grid grid-cols-3">
            {stats.map((stat, i) => (
              <div key={`label-${stat._key}`} className={`px-6 md:px-10 pb-8 ${i > 0 ? 'border-l border-primary-blue' : ''}`}>
                <Reveal delay={i * 100}>
                  <p className="text-[22px] font-normal leading-snug line-clamp-3">{t(stat.label)}</p>
                </Reveal>
              </div>
            ))}
            {stats.map((stat, i) => (
              <div key={`value-${stat._key}`} className={`px-6 md:px-10 ${i > 0 ? 'border-l border-primary-blue' : ''}`}>
                <CountUpNumber
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  locale={locale}
                  className="font-display font-normal"
                  style={{ fontSize: 'clamp(48px, 5vw, 72px)' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative mt-16 md:mt-24 flex">
        <div className="w-1/5 shrink-0" aria-hidden="true" />
        <div
          className="flex-1 py-12 overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(0, 85, 255, 0) 0%, rgba(0, 85, 255, 0.25) 100%), linear-gradient(180deg, #000023 0%, #050518 100%)',
          }}
        >
          {logos.length > 0 &&
            (reducedMotion ? (
              <div className="flex flex-wrap items-center gap-x-20 gap-y-8 px-6 md:px-12">
                {logos.map((logo) => (
                  <LogoImage key={logo._key} logo={logo} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {row1.length > 0 && <MarqueeRow logos={row1} />}
                {row2.length > 0 && <MarqueeRow logos={row2} reverse />}
              </div>
            ))}
        </div>
      </div>
      </div>
    </section>
  )
}

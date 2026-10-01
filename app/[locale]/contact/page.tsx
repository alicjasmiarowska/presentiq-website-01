import type { Metadata } from 'next'
import Heading from '../../../src/components/atoms/Heading'
import Text from '../../../src/components/atoms/Text'
import Reveal from '../../../src/components/atoms/Reveal'
import CharReveal from '../../../src/components/atoms/CharReveal'
import ContactForm from '../../../src/components/organisms/ContactForm'
import EdgeBars from '../../../src/components/atoms/EdgeBars'
import { HERO_TITLE_BOTTOM, HERO_TITLE_CLASSES, HERO_TITLE_STYLE } from '../../../src/components/organisms/HeroSection'
import Image from 'next/image'
import { gradients, layout } from '../../../src/styles/design-tokens'
import { getContact, getFooter } from '../../../sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '../../../src/lib/pageMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getContact()
  const t = (field: any) => field?.[l] || field?.en
  const seo = resolveSeoText(data?.seo, l, t(data?.headline) || 'Contact', t(data?.formBody))

  return buildMetadata({
    locale: l,
    path: '/contact',
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getContact()
  // The address from the footer doubles as the fallback if the form can't send.
  const footer = await getFooter()

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <main>
      {/* Hero: same navy base and blue glow as the homepage hero, the bar
          graphics top-left and bottom-right, headline bottom-left. */}
      <section className="relative overflow-hidden" style={{ backgroundImage: gradients.heroBase }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: gradients.heroGlow }} aria-hidden="true" />
        <Image
          src="/images/line_1.svg"
          alt=""
          aria-hidden="true"
          width={677}
          height={692}
          unoptimized
          priority
          className="absolute left-[5px] top-0 -translate-y-[16.7%] w-[max(10rem,min(31.4vw,452px))] h-auto pointer-events-none select-none"
        />
        <div
          className="absolute bottom-0 left-[calc(75%-7px)] w-[min(25.5vw,367px)] aspect-[367/468] overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <Image src="/images/line-2.png" alt="" fill sizes="367px" className="object-cover select-none" />
        </div>

        <div className={`relative px-6 md:px-12 lg:px-20 pt-40 md:pt-56 lg:pt-[271px] ${HERO_TITLE_BOTTOM}`}>
          <h1 className={HERO_TITLE_CLASSES} style={HERO_TITLE_STYLE}>
            <CharReveal text={t(data?.headline)} />
          </h1>
        </div>
      </section>

      {/* Two halves that bleed to the viewport edges: navy statement on the
          left, the form on white on the right. */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className={`relative overflow-hidden bg-primary-dark ${layout.edgeGutter.left} pr-6 md:pr-12 lg:pr-20 pt-16 pb-16 md:pt-30 md:pb-30`}>
          <EdgeBars />
          <div className="relative max-w-[517px]">
            <Reveal>
              <Heading level="h2" variant="section" text={t(data?.formHeadline)} className="text-white" />
            </Reveal>
            <Reveal delay={150}>
              <Text text={t(data?.formBody)} size="base" color="primary" className="mt-12 lg:mt-36" />
            </Reveal>
          </div>
        </div>

        <div className={`bg-white pl-6 md:pl-12 lg:pl-20 ${layout.edgeGutter.right} pt-12 pb-16 md:pt-[102px] md:pb-30`}>
          <ContactForm
            locale={locale as 'en' | 'de'}
            privacyText={t(data?.privacyText)}
            fallbackEmail={footer?.email || 'kontakt@presentiq.de'}
          />
        </div>
      </section>
    </main>
  )
}

import type { Metadata } from 'next'
import Heading from '@/src/components/atoms/Heading'
import Text from '@/src/components/atoms/Text'
import Reveal from '@/src/components/atoms/Reveal'
import ContactForm from '@/src/components/organisms/ContactForm'
import EdgeBars from '@/src/components/atoms/EdgeBars'
import HeroSection from '@/src/components/organisms/HeroSection'
import { layout } from '@/src/styles/design-tokens'
import { getContact, getFooter } from '@/sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '@/src/lib/pageMetadata'
import { resolveLocale } from '@/src/lib/locale'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getContact()
  const t = (field: any) => resolveLocale(field, l)
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

  const t = (field: any) => resolveLocale(field, locale as 'en' | 'de')

  return (
    <main>
      {/* Same Hero component as the homepage, so the two look identical. */}
      <HeroSection data={{ title: data?.headline, subtitle: data?.heroTagline }} locale={locale as 'en' | 'de'} />

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

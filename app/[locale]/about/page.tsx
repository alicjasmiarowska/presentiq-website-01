import type { Metadata } from 'next'
import HeroSection from '@/src/components/organisms/HeroSection'
import TeamSection from '@/src/components/organisms/TeamSection'
import TwoColumnSection from '@/src/components/organisms/twoColumnSection'
import PrinciplesSection from '@/src/components/organisms/principles'
import FinalCtaSection from '@/src/components/organisms/finalCta'
import BlurGlow from '@/src/components/atoms/BlurGlow'
import { getAbout, getFinalCta, getFourPillars } from '@/sanity/lib/fetch'
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
  const data = await getAbout()
  const t = (field: any) => resolveLocale(field, l)
  const seo = resolveSeoText(
    data?.seo,
    l,
    t(data?.hero?.title) || 'About Us',
    t(data?.hero?.subtitle) || t(data?.teamText)
  )

  return buildMetadata({
    locale: l,
    path: '/about',
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [data, finalCtaData, fourPillarsData] = await Promise.all([
    getAbout(),
    getFinalCta(locale as 'en' | 'de'),
    getFourPillars(locale as 'en' | 'de'),
  ])

  return (
    <main>
      <HeroSection data={data?.hero} locale={locale as 'en' | 'de'} glow />

      <TwoColumnSection data={data?.intro} locale={locale as 'en' | 'de'} edgeBars leftHeadlineStyle="lead" spacing="compact" />
      <TeamSection data={data} locale={locale as 'en' | 'de'} />
      <div className="relative overflow-hidden bg-primary-dark">
        <BlurGlow variant="corner" position="bottom-left" />
        {/* Falls back to the Four Pillars document until a principles document
           is selected in Studio. */}
        <PrinciplesSection data={data?.principles ?? fourPillarsData} locale={locale as 'en' | 'de'} />
      </div>
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

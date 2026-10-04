import type { Metadata } from 'next'
import HeroSection from '@/src/components/organisms/HeroSection'
import CaseStudyList from '@/src/components/organisms/caseStudyList'
import FinalCtaSection from '@/src/components/organisms/finalCta'
import { getPortfolio, getCaseStudies, getFinalCta } from '@/sanity/lib/fetch'
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
  const data = await getPortfolio()
  const t = (field: any) => resolveLocale(field, l)
  const seo = resolveSeoText(data?.seo, l, t(data?.hero?.title) || 'Portfolio', t(data?.hero?.subtitle))

  return buildMetadata({
    locale: l,
    path: '/portfolio',
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getPortfolio()
  const caseStudies = await getCaseStudies()
  const finalCtaData = await getFinalCta(locale as 'en' | 'de')

  return (
    <main>
      <HeroSection data={data?.hero} locale={locale as 'en' | 'de'} glow />
      <CaseStudyList caseStudies={caseStudies} locale={locale as 'en' | 'de'} />
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

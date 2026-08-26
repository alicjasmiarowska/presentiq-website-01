import type { Metadata } from 'next'
import HeroSection from '../../../src/components/organisms/HeroSection'
import CaseStudyGrid from '../../../src/components/organisms/caseStudyGrid'
import FinalCtaSection from '../../../src/components/organisms/finalCta'
import Section from '../../../src/components/atoms/Section'
import { getPortfolio, getCaseStudies, getFinalCta } from '../../../sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '../../../src/lib/pageMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getPortfolio()
  const t = (field: any) => field?.[l] || field?.en
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
      <div className="relative overflow-hidden bg-primary-dark">
        <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          bottom: 0,
          width: '420px',
          height: '420px',
          backgroundColor: '#0055FF',
          filter: 'blur(200px)',
          borderRadius: '820px 0 0 0', // ćwiartka koła w rogu dolno-prawym
        }}
      />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          <div
            className="absolute rounded-full"
            style={{
              right: 0,
              top: '19.7%',
              width: '820px',
              height: '820px',
              transform: 'translate(50%, -50%)',
              backgroundColor: '#0055FF',
              filter: 'blur(200px)',
            }}
          />
        </div>
        <HeroSection data={data?.hero} locale={locale as 'en' | 'de'} />
      </div>
      <Section>
        <CaseStudyGrid caseStudies={caseStudies} locale={locale as 'en' | 'de'} />
      </Section>
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

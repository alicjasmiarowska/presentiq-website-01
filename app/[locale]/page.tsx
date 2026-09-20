import type { Metadata } from 'next'
import HeroSection from '../../src/components/organisms/HeroSection'
import TwoColumnSection from '../../src/components/organisms/twoColumnSection'
import ThreePillarsSection from '../../src/components/organisms/threePillars'
import ServicesSection from '../../src/components/organisms/servicesSection'
import FeaturedWorkSection from '../../src/components/organisms/featuredWork'
import LogoWall from '../../src/components/organisms/logoWall'
import FourColumnsSection from '../../src/components/organisms/fourColumns'
import VideoSection from '../../src/components/organisms/videoSection'
import FaqSection from '../../src/components/organisms/faqSection'
import FinalCtaSection from '../../src/components/organisms/finalCta'
import BlurGlow from '../../src/components/atoms/BlurGlow'
import { colors } from '../../src/styles/design-tokens'
import {
  getHomepage,
  getThreePillars,
  getServicesSection,
  getFeaturedWork,
  getLogoWall,
  getFourColumns,
  getVideoSection,
  getFaq,
  getFinalCta,
} from '../../sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '../../src/lib/pageMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const homepageData = await getHomepage()
  const hero = homepageData?.hero
  const t = (field: any) => field?.[l] || field?.en
  const seo = resolveSeoText(homepageData?.seo, l, t(hero?.title) || 'Presentiq', t(hero?.subtitle))

  return buildMetadata({
    locale: l,
    path: '',
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const homepageData = await getHomepage()
  const heroData = homepageData?.hero
  const twoColumnSectionData = homepageData?.twoColumnSection
  const featuredWorkData = await getFeaturedWork(locale as 'en' | 'de')
  const threePillarsData = await getThreePillars(locale as 'en' | 'de')
  const servicesSectionData = await getServicesSection(locale as 'en' | 'de')
  const logoWallData = await getLogoWall(locale as 'en' | 'de')
  const fourColumnsData = await getFourColumns()
  const videoSectionData = await getVideoSection()
  const faqData = await getFaq('home')
  const finalCtaData = await getFinalCta(locale as 'en' | 'de')

  return (
    <main>
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat -z-10"
          style={{
            backgroundImage: `linear-gradient(180deg, ${colors.primary.dark} 0%, ${colors.primary.dark} 24.48%, ${colors.neutral.white} 55.8%, ${colors.neutral.white} 100%)`,
          }}
        />
        <div className="relative">
          <BlurGlow variant="edge" />
          <HeroSection data={heroData} locale={locale as 'en' | 'de'} />
          <TwoColumnSection data={twoColumnSectionData} locale={locale as 'en' | 'de'} />
        </div>
        {/* Tymczasowo ukryte: <FeaturedWorkSection data={featuredWorkData} locale={locale as 'en' | 'de'} /> */}
      </div>
      <ThreePillarsSection data={threePillarsData} locale={locale as 'en' | 'de'} />
      <ServicesSection
        services={servicesSectionData?.services}
        data={servicesSectionData}
        locale={locale as 'en' | 'de'}
      />
      <LogoWall data={logoWallData} locale={locale as 'en' | 'de'} />
      <FourColumnsSection data={fourColumnsData} locale={locale as 'en' | 'de'} />
      <div className="relative bg-primary-dark">
      {/* Tymczasowo ukryte: <VideoSection data={videoSectionData} /> */}
      <FaqSection data={faqData} locale={locale as 'en' | 'de'} />
      </div>
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}
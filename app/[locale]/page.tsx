import type { Metadata } from 'next'
import HeroSection from '../../src/components/organisms/HeroSection'
import TextAndPictureSection from '../../src/components/organisms/textAndPicture'
import ThreePillarsSection from '../../src/components/organisms/threePillars'
import ServicesSection from '../../src/components/organisms/servicesSection'
import FeaturedWorkSection from '../../src/components/organisms/featuredWork'
import LogoWall from '../../src/components/organisms/logoWall'
import VideoSection from '../../src/components/organisms/videoSection'
import FaqSection from '../../src/components/organisms/faqSection'
import FinalCtaSection from '../../src/components/organisms/finalCta'
import {
  getHomepage,
  getThreePillars,
  getServicesSection,
  getFeaturedWork,
  getLogoWall,
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
  const textAndPictureData = homepageData?.textAndPicture
  const featuredWorkData = await getFeaturedWork(locale as 'en' | 'de')
  const threePillarsData = await getThreePillars(locale as 'en' | 'de')
  const servicesSectionData = await getServicesSection(locale as 'en' | 'de')
  const logoWallData = await getLogoWall(locale as 'en' | 'de')
  const videoSectionData = await getVideoSection()
  const faqData = await getFaq('home')
  const finalCtaData = await getFinalCta(locale as 'en' | 'de')

  return (
    <main>
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat -z-10"
           style={{
        backgroundImage: `
        linear-gradient(180deg, #000023 0%, #000023 24.48%, #FFFFFF 55.8%, #FFFFFF 100%)
         `,
        }}
        />
        <div className="relative">
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
          <HeroSection data={heroData} locale={locale as 'en' | 'de'} />
          <section className="relative">
            <div className="mx-4 md:mx-20 bg-white rounded-t-[20px] md:rounded-t-[48px] pt-10 pb-10 px-6 md:pt-20 md:pb-20 md:px-20">
              <TextAndPictureSection data={textAndPictureData} locale={locale as 'en' | 'de'} textColor="dark" priority />
            </div>
          </section>
        </div>
        <FeaturedWorkSection data={featuredWorkData} locale={locale as 'en' | 'de'} />
      </div>
      <ThreePillarsSection data={threePillarsData} locale={locale as 'en' | 'de'} />
      <ServicesSection
        services={servicesSectionData?.services}
        data={servicesSectionData}
        locale={locale as 'en' | 'de'}
      />
      <LogoWall data={logoWallData} locale={locale as 'en' | 'de'} />
      <div className="relative"
         style={{
        backgroundImage: `
        linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 10%, #000023 60%, #000023 100%)
         `,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute"
            style={{
              left: 0,
              bottom: 0,
              width: '420px',
              height: '420px',
              backgroundColor: '#0055FF',
              filter: 'blur(200px)',
              borderRadius: '0 820px 0 0', // ćwiartka koła w rogu dolno-lewym
            }}
          />
        </div>
      <VideoSection data={videoSectionData} />
      <FaqSection data={faqData} locale={locale as 'en' | 'de'} />
      </div>
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}
import type { Metadata } from 'next'
import HeroSection from '../../../src/components/organisms/HeroSection'
import TeamSection from '../../../src/components/organisms/TeamSection'
import TextAndPictureSection from '../../../src/components/organisms/textAndPicture'
import FourPillarsSection from '../../../src/components/organisms/fourPillars'
import FinalCtaSection from '../../../src/components/organisms/finalCta'
import Section from '../../../src/components/atoms/Section'
import { getAbout, getFinalCta, getFourPillars } from '../../../sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '../../../src/lib/pageMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getAbout()
  const t = (field: any) => field?.[l] || field?.en
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
  const data = await getAbout()
  const finalCtaData = await getFinalCta(locale as 'en' | 'de')
  const fourPillarsData = await getFourPillars(locale as 'en' | 'de')

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
      
      <TeamSection data={data} locale={locale as 'en' | 'de'} />
      <div className="relative overflow-hidden bg-primary-dark">
        <div
        className="absolute pointer-events-none"
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
        <FourPillarsSection data={fourPillarsData} locale={locale as 'en' | 'de'} />
        <Section className="pt-6 md:pt-20">
          <TextAndPictureSection data={data?.textAndPicture} locale={locale as 'en' | 'de'} textColor="light" />
        </Section>
      </div>
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

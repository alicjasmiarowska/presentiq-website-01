import type { Metadata } from 'next'
import HeroSection from '../../../src/components/organisms/HeroSection'
import TeamSection from '../../../src/components/organisms/TeamSection'
import TextAndPictureSection from '../../../src/components/organisms/textAndPicture'
import FourPillarsSection from '../../../src/components/organisms/fourPillars'
import FinalCtaSection from '../../../src/components/organisms/finalCta'
import Section from '../../../src/components/atoms/Section'
import BlurGlow from '../../../src/components/atoms/BlurGlow'
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
        <BlurGlow variant="corner" position="bottom-right" />
        <BlurGlow variant="edge" />
        <HeroSection data={data?.hero} locale={locale as 'en' | 'de'} />
      </div>

      <TeamSection data={data} locale={locale as 'en' | 'de'} />
      <div className="relative overflow-hidden bg-primary-dark">
        <BlurGlow variant="corner" position="bottom-left" />
        <FourPillarsSection data={fourPillarsData} locale={locale as 'en' | 'de'} />
        <Section className="pt-6 md:pt-20">
          <TextAndPictureSection data={data?.textAndPicture} locale={locale as 'en' | 'de'} textColor="light" />
        </Section>
      </div>
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

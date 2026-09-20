import HeroSection from '../../../src/components/organisms/HeroSection'
import TextAndPictureBulletsSection from '../../../src/components/organisms/textAndPictureBullets'
import ProcessSection from '../../../src/components/organisms/process'
import ToolsSection from '../../../src/components/organisms/tools'
import FaqSection from '../../../src/components/organisms/faqSection'
import TextAndImageSliderSection from '../../../src/components/organisms/textAndImageSlider'
import FinalCtaSection from '../../../src/components/organisms/finalCta'
import Section from '../../../src/components/atoms/Section'
import BlurGlow from '../../../src/components/atoms/BlurGlow'
import { getHowWeWork, getProcess, getTools, getFaq, getFinalCta, getTextAndImageSlider, } from '../../../sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '../../../src/lib/pageMetadata'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getHowWeWork()
  const t = (field: any) => field?.[l] || field?.en
  const seo = resolveSeoText(data?.seo, l, t(data?.hero?.title) || 'How We Work', t(data?.hero?.subtitle))

  return buildMetadata({
    locale: l,
    path: '/how-we-work',
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function HowWeWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getHowWeWork()
  const processData = await getProcess(locale as 'en' | 'de')
  const toolsData = await getTools(locale as 'en' | 'de')
  const faqData = await getFaq('howWeWork')
  const finalCtaData = await getFinalCta(locale as 'en' | 'de')
  const textAndImageSliderData = await getTextAndImageSlider(locale as 'en' | 'de')

  return (
    <main>
      <div className="relative overflow-hidden bg-primary-dark">
        <BlurGlow variant="corner" position="bottom-right" />
        <BlurGlow variant="edge" />
        <HeroSection data={data?.hero} locale={locale as 'en' | 'de'} />
      </div>
      <Section>
        <TextAndPictureBulletsSection data={data?.textAndPictureBullets} locale={locale as 'en' | 'de'} />
      </Section>
      <ProcessSection data={processData} locale={locale as 'en' | 'de'} />
      <div className="relative overflow-hidden bg-primary-dark">
        <BlurGlow variant="corner" position="bottom-left" />
        <ToolsSection data={toolsData} locale={locale as 'en' | 'de'} textColor="light" />
      <Section>
        <TextAndImageSliderSection
          data={textAndImageSliderData}
          locale={locale as 'en' | 'de'}
          textColor="light"
        />
      </Section>
      <div className="bg-primary-dark pt-20">
        <FaqSection data={faqData} locale={locale as 'en' | 'de'} />
      </div>
      </div>
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

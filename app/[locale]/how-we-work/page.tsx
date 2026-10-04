import HeroSection from '@/src/components/organisms/HeroSection'
import ReasonsGrid from '@/src/components/organisms/reasonsGrid'
import SuccessStatement from '@/src/components/organisms/successStatement'
import ProcessSteps from '@/src/components/organisms/processSteps'
import FaqSection from '@/src/components/organisms/faqSection'
import FinalCtaSection from '@/src/components/organisms/finalCta'
import { getHowWeWork, getFaq, getFinalCta } from '@/sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '@/src/lib/pageMetadata'
import type { Metadata } from 'next'
import { resolveLocale } from '@/src/lib/locale'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getHowWeWork()
  const t = (field: any) => resolveLocale(field, l)
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
  const faqData = await getFaq('howWeWork')
  const finalCtaData = await getFinalCta(locale as 'en' | 'de')

  return (
    <main>
      <HeroSection data={data?.hero} locale={locale as 'en' | 'de'} glow />
      <ReasonsGrid data={data?.reasons} locale={locale as 'en' | 'de'} />
      <SuccessStatement data={data?.successStatement} locale={locale as 'en' | 'de'} />
      <ProcessSteps data={data?.process} locale={locale as 'en' | 'de'} />
      <div className="bg-primary-dark">
        <FaqSection data={faqData} locale={locale as 'en' | 'de'} />
      </div>
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

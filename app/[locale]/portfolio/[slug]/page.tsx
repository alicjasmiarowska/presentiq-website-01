import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HeroSection from '../../../../src/components/organisms/HeroSection'
import CaseStudyBody from '../../../../src/components/organisms/caseStudyBody'
import FinalCtaSection from '../../../../src/components/organisms/finalCta'
import BlurGlow from '../../../../src/components/atoms/BlurGlow'
import { getCaseStudyBySlug, getFinalCta } from '../../../../sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '../../../../src/lib/pageMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const l = locale as 'en' | 'de'
  const data = await getCaseStudyBySlug(slug)
  const t = (field: any) => field?.[l] || field?.en
  const seo = resolveSeoText(data?.seo, l, t(data?.headline) || t(data?.title) || 'Case Study')

  return buildMetadata({
    locale: l,
    path: `/portfolio/${slug}`,
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const data = await getCaseStudyBySlug(slug)

  if (!data) notFound()

  const finalCtaData = await getFinalCta(locale as 'en' | 'de')

  return (
    <main>
      <div className="relative overflow-hidden bg-primary-dark">
        <BlurGlow variant="corner" position="bottom-right" />
        <BlurGlow variant="edge" />
        <HeroSection data={{ title: data.headline || data.title }} locale={locale as 'en' | 'de'} />
      </div>
      <CaseStudyBody data={data} locale={locale as 'en' | 'de'} />
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

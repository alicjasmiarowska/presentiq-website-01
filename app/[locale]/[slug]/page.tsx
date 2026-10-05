import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HeroSection from '@/src/components/organisms/HeroSection'
import CaseStudyBody from '@/src/components/organisms/caseStudyBody'
import FinalCtaSection from '@/src/components/organisms/finalCta'
import { getCaseStudyBySlug, getFinalCta } from '@/sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '@/src/lib/pageMetadata'
import { resolveLocale } from '@/src/lib/locale'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const l = locale as 'en' | 'de'
  const data = await getCaseStudyBySlug(slug)
  const t = (field: any) => resolveLocale(field, l)
  const seo = resolveSeoText(data?.seo, l, t(data?.headline) || t(data?.title) || 'Case Study')

  return buildMetadata({
    locale: l,
    path: `/${slug}`,
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

// Case studies live at the site root (/en/powerpoint-to-google-slides), not
// nested under /portfolio/ — Next.js resolves the explicit static routes
// (about, contact, services, ...) before falling back to this catch-all, so
// a case study slug can't accidentally shadow one of those.
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
      <HeroSection data={{ title: data.headline || data.title }} locale={locale as 'en' | 'de'} glow />
      <CaseStudyBody data={data} locale={locale as 'en' | 'de'} />
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

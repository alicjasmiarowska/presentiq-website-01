import HeroSection from '../../../../src/components/organisms/HeroSection'
import TextAndPictureSection from '../../../../src/components/organisms/textAndPicture'
import FourPillarsSection from '../../../../src/components/organisms/fourPillars'
import FeaturesSection from '../../../../src/components/organisms/features'
import TextAndImageSliderServicesSection from '../../../../src/components/organisms/textAndImageSliderServices'
import FaqSection from '../../../../src/components/organisms/faqSection'
import Text from '../../../../src/components/atoms/Text'
import Reveal from '../../../../src/components/atoms/Reveal'
import Section from '../../../../src/components/atoms/Section'
import BlurGlow from '../../../../src/components/atoms/BlurGlow'
import FinalCtaSection from '../../../../src/components/organisms/finalCta'
import { getServiceBySlug, getFinalCta } from '../../../../sanity/lib/fetch'
import { notFound } from 'next/navigation'
import { buildMetadata, resolveSeoText } from '../../../../src/lib/pageMetadata'
import { siteUrl } from '../../../../src/lib/siteUrl'
import { colors } from '../../../../src/styles/design-tokens'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const l = locale as 'en' | 'de'
  const data = await getServiceBySlug(slug)
  const t = (field: any) => field?.[l] || field?.en

  if (!data) return buildMetadata({ locale: l, path: `/services/${slug}` })

  const seo = resolveSeoText(data.seo, l, t(data.title) || 'Service', t(data.description))

  return buildMetadata({
    locale: l,
    path: `/services/${slug}`,
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const data = await getServiceBySlug(slug)

  if (!data) notFound()

  const t = (field: any) => field?.[locale] || field?.en || ''
  const finalCtaData = await getFinalCta(locale as 'en' | 'de')
  const accentColor = data.accentColor?.hex || colors.primary.blue
  const serviceName = t(data.title)
  const pageUrl = `${siteUrl}/${locale}/services/${slug}`

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: t(data.description),
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: 'Presentiq',
      url: siteUrl,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: serviceName, item: pageUrl },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="relative overflow-hidden bg-primary-dark">
        <BlurGlow variant="corner" position="bottom-right" color={accentColor} />
        <BlurGlow variant="edge" color={accentColor} />
        <HeroSection data={data.hero} locale={locale as 'en' | 'de'} />
      </div>
      {data.textAndPicture && (
        <Section className="pb-20 md:pb-20">
          <TextAndPictureSection data={data.textAndPicture} locale={locale as 'en' | 'de'} />
        </Section>
      )}
      {data.body && (
        <Section>
          <Reveal>
            <Text text={t(data.body)} size="lg" color="secondary" className="max-w-[900px]" />
          </Reveal>
        </Section>
      )}
      <FourPillarsSection data={data.fourPillars} locale={locale as 'en' | 'de'} />
      <FeaturesSection data={data.features} locale={locale as 'en' | 'de'} />
      {data.textAndImageSliderServices && (
        <Section>
          <TextAndImageSliderServicesSection
            data={data.textAndImageSliderServices}
            locale={locale as 'en' | 'de'}
          />
        </Section>
      )}
      {data.faq && (
        <div className="bg-primary-dark">
          <FaqSection data={data.faq} locale={locale as 'en' | 'de'} />
        </div>
      )}
      <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
    </main>
  )
}

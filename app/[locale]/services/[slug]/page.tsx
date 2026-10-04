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
import CollaborationSection from '../../../../src/components/organisms/collaborationSection'
import TwoColumnSection from '../../../../src/components/organisms/twoColumnSection'
import ProcessSteps from '../../../../src/components/organisms/processSteps'
import SimpleServicePage from '../../../../src/components/organisms/simpleServicePage'
import { getServiceBySlug, getFinalCta, getStorytelling, getAiDesign, getTemplates, getCompanyPresentations, getPresentationDesign, getWordAndAdobePdf } from '../../../../sanity/lib/fetch'
import { notFound } from 'next/navigation'
import { buildMetadata, resolveSeoText } from '../../../../src/lib/pageMetadata'
import { siteUrl } from '../../../../src/lib/siteUrl'
import { colors } from '../../../../src/styles/design-tokens'
import type { Metadata } from 'next'
import { toJsonLd } from '../../../../src/lib/hyphenate'

// Services whose bespoke redesign is the same layout as Storytelling (hero →
// photo+text intro → partner bar → collaboration → final CTA), rendered via
// SimpleServicePage below instead of each duplicating that JSX.
const SIMPLE_SERVICE_FETCHERS: Record<string, () => Promise<any>> = {
  storytelling: getStorytelling,
  templates: getTemplates,
  'company-presentations': getCompanyPresentations,
  'presentation-design': getPresentationDesign,
  'word-and-adobe-pdf': getWordAndAdobePdf,
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const l = locale as 'en' | 'de'

  // Storytelling, Templates and AI Design got bespoke redesigns (own Sanity
  // documents) rather than the generic service template — see the early
  // returns below.
  if (slug in SIMPLE_SERVICE_FETCHERS) {
    const data = await SIMPLE_SERVICE_FETCHERS[slug]()
    const t = (field: any) => field?.[l] || field?.en
    const seo = resolveSeoText(data?.seo, l, t(data?.headline) || data?.title)
    return buildMetadata({
      locale: l,
      path: `/services/${slug}`,
      title: seo.title,
      description: seo.description,
      image: seo.image,
    })
  }

  if (slug === 'ai-support') {
    const data = await getAiDesign()
    const t = (field: any) => field?.[l] || field?.en
    const seo = resolveSeoText(data?.seo, l, t(data?.hero?.title) || 'AI Design')
    return buildMetadata({
      locale: l,
      path: `/services/${slug}`,
      title: seo.title,
      description: seo.description,
      image: seo.image,
    })
  }

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

  // Bespoke redesigns that all share the Storytelling layout — see
  // SimpleServicePage for the shared hero → intro → partner bar →
  // collaboration → CTA composition.
  if (slug in SIMPLE_SERVICE_FETCHERS) {
    const data = await SIMPLE_SERVICE_FETCHERS[slug]()
    const finalCtaData = await getFinalCta(locale as 'en' | 'de')

    return <SimpleServicePage data={data} finalCtaData={finalCtaData} locale={locale as 'en' | 'de'} />
  }

  // AI Design: bespoke redesign, own Sanity document — reuses HeroSection,
  // TwoColumnSection (edge bars, like the About intro) and TextAndPicture
  // (video in place of its image field) instead of one-off sections.
  if (slug === 'ai-support') {
    const data = await getAiDesign()
    const finalCtaData = await getFinalCta(locale as 'en' | 'de')

    return (
      <main>
        <div className="relative overflow-hidden bg-primary-dark">
          <BlurGlow variant="corner" position="bottom-right" />
          <BlurGlow variant="edge" />
          <HeroSection data={data?.hero} locale={locale as 'en' | 'de'} />
        </div>

        <TwoColumnSection data={data?.intro} locale={locale as 'en' | 'de'} edgeBars spacing="compact" />
        <ProcessSteps data={data?.processSteps} locale={locale as 'en' | 'de'} />
        {data?.videoSection && (
          <Section className="pb-20 md:pb-20">
            <TextAndPictureSection data={data.videoSection} locale={locale as 'en' | 'de'} />
          </Section>
        )}
        <CollaborationSection data={data?.collaboration} locale={locale as 'en' | 'de'} />
        <FinalCtaSection data={finalCtaData} locale={locale as 'en' | 'de'} />
      </main>
    )
  }

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
        dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
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

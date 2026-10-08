import HeroSection from './HeroSection'
import PhotoTextBlocks from './photoTextBlocks'
import ProductsList from './productsList'
import PartnerBar from './partnerBar'
import CollaborationSection from './collaborationSection'
import FinalCtaSection from './finalCta'

interface SimpleServicePageData {
  headline?: { en: string; de: string }
  heroTagline?: { en: string; de: string }
  intro?: any[]
  products?: any[]
  partnerBar?: any
  collaboration?: any
  seo?: any
}

interface SimpleServicePageProps {
  data?: SimpleServicePageData
  finalCtaData: any
  locale: 'en' | 'de'
}

// Shared layout for service pages with the same structure: hero (same
// HeroSection as the homepage) → photo+text intro block(s) → products →
// partner bar → "work better together" collaboration → final CTA. Pages with
// a different composition (e.g. AI Design) build their own JSX in the route
// file.
export default function SimpleServicePage({ data, finalCtaData, locale }: SimpleServicePageProps) {
  return (
    <main>
      <HeroSection data={{ title: data?.headline, subtitle: data?.heroTagline }} locale={locale} />

      <PhotoTextBlocks data={data?.intro} locale={locale} />
      <ProductsList data={data?.products} locale={locale} />
      <PartnerBar data={data?.partnerBar} locale={locale} />
      <CollaborationSection data={data?.collaboration} locale={locale} />
      <FinalCtaSection data={finalCtaData} locale={locale} />
    </main>
  )
}

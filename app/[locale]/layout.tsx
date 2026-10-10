import { Red_Hat_Display, Roboto } from "next/font/google";
import Navigation from "@/src/components/organisms/Navigation";
import Footer from "@/src/components/organisms/footer";
import BackToTopButton from "@/src/components/atoms/BackToTopButton";
import IntroLoader from "@/src/components/organisms/IntroLoader";
import { getNavigation, getFooter, getServicesSection } from "@/sanity/lib/fetch";
import { siteUrl } from "@/src/lib/siteUrl";
import { toJsonLd } from '@/src/lib/hyphenate'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [navigationData, footerData, servicesSectionData] = await Promise.all([
    getNavigation(),
    getFooter(),
    getServicesSection(locale as 'en' | 'de'),
  ]);

  // Organization and WebSite give search engines the brand name and logo
  // shown next to results. The logo is a square raster file on the site's own
  // domain, as Google's logo guidelines require.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Presentiq',
    legalName: 'Presentiq GmbH',
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    ...(footerData?.email ? { email: footerData.email } : {}),
    ...(footerData?.phone ? { telephone: footerData.phone } : {}),
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Presentiq',
    alternateName: 'presentiq.de',
    url: siteUrl,
  };

  return (
    <div className={`${redHatDisplay.variable} ${roboto.variable} font-display`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(websiteJsonLd) }}
      />
      <IntroLoader />
      <Navigation data={navigationData} services={servicesSectionData?.services} locale={locale as 'en' | 'de'} />
      {children}
      <Footer data={footerData} services={servicesSectionData?.services} locale={locale as 'en' | 'de'} />
      <BackToTopButton />
    </div>
  );
}

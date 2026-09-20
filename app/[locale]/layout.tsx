import { Red_Hat_Display, Roboto } from "next/font/google";
import Navigation from "../../src/components/organisms/Navigation";
import Footer from "../../src/components/organisms/footer";
import BackToTopButton from "../../src/components/atoms/BackToTopButton";
import IntroLoader from "../../src/components/organisms/IntroLoader";
import { getNavigation, getFooter, getServicesSection } from "../../sanity/lib/fetch";
import { urlFor } from "../../sanity/lib/image";
import { siteUrl } from "../../src/lib/siteUrl";

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

  const navigationData = await getNavigation();
  const footerData = await getFooter();
  const servicesSectionData = await getServicesSection(locale as 'en' | 'de');

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Presentiq',
    url: siteUrl,
    ...(navigationData?.logo?.asset ? { logo: urlFor(navigationData.logo).width(400).url() } : {}),
    ...(footerData?.email ? { email: footerData.email } : {}),
    ...(footerData?.phone ? { telephone: footerData.phone } : {}),
  };

  return (
    <div className={`${redHatDisplay.variable} ${roboto.variable} font-display`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <IntroLoader />
      <Navigation data={navigationData} services={servicesSectionData?.services} locale={locale as 'en' | 'de'} />
      {children}
      <Footer data={footerData} services={servicesSectionData?.services} locale={locale as 'en' | 'de'} />
      <BackToTopButton />
    </div>
  );
}

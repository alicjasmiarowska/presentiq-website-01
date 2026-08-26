import Image from 'next/image'
import Link from 'next/link'
import Text from '../atoms/Text'
import PrivacySettingsButton from '../atoms/PrivacySettingsButton'
import { urlFor } from '../../../sanity/lib/image'

interface FooterLink {
  _key: string
  label: { en: string; de: string }
  href?: string
  pageSlug?: string
}

interface FooterColumn {
  _key: string
  title: { en: string; de: string }
  links: FooterLink[]
}

interface Service {
  _id: string
  title: { en: string; de: string }
  slug?: { current: string }
}

interface FooterData {
  logo?: any
  email: string
  phone: string
  columns: FooterColumn[]
  copyright: { en: string; de: string }
  privacySettingsLabel?: { en: string; de: string }
}

interface FooterProps {
  data: FooterData
  services?: Service[]
  locale: 'en' | 'de'
}

export default function Footer({ data, services, locale }: FooterProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const linkHref = (link: FooterLink) => link.pageSlug ? `/${link.pageSlug}` : (link.href || '/')
  const activeServices = (services || []).filter((service) => service.slug?.current)
  const [pagesColumn, legalColumn] = data.columns || []

  const renderColumn = (key: string, links: React.ReactNode) => (
    <div key={key} className="min-w-0">
      <ul className="space-y-4">{links}</ul>
    </div>
  )

  return (
    <footer className="bg-primary-dark text-white py-16 px-6 md:px-20 lg:px-40">
      <div className="max-w-[1680px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-16 lg:gap-10 mb-16">
          <div className="min-w-0 lg:mr-10">
            {data.logo?.asset ? (
              <Image
                src={urlFor(data.logo).width(320).url()}
                alt={data.logo.alt || 'Presentiq'}
                width={160}
                height={30}
                className="w-80 h-auto mb-6 brightness-0 invert"
              />
            ) : (
              <span className="font-display text-xl font-bold mb-6 block">
                Presentiq
              </span>
            )}
            {data.phone && (
              <h4 className="font-display leading-[1.2] text-[22px] md:text-[26px] lg:text-[32px] font-bold mb-2">
                <a
                  href={`tel:${data.phone}`}
                  className="text-primary-blue hover:text-white"
                >
                  {data.phone}
                </a>
              </h4>
            )}
            {data.email && (
              <h4 className="font-display leading-[1.2] text-[22px] md:text-[26px] lg:text-[32px] font-bold">
                <a
                  href={`mailto:${data.email}`}
                  className="text-primary-blue hover:text-white"
                >
                  {data.email}
                </a>
              </h4>
            )}
          </div>

          {pagesColumn &&
            renderColumn(
              pagesColumn._key,
              pagesColumn.links?.map((link) => (
                <li key={link._key}>
                  <Link
                    href={`/${locale}${linkHref(link)}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))
            )}

          {activeServices.length > 0 &&
            renderColumn(
              'services',
              activeServices.map((service) => (
                <li key={service._id}>
                  <Link
                    href={`/${locale}/services/${service.slug!.current}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t(service.title)}
                  </Link>
                </li>
              ))
            )}

          {legalColumn &&
            renderColumn(
              legalColumn._key,
              legalColumn.links?.map((link) => (
                <li key={link._key}>
                  <Link
                    href={`/${locale}${linkHref(link)}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))
            )}
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Text
            text={t(data.copyright)}
            size="sm"
            className="text-center text-white/70"
          />
        </div>
      </div>
    </footer>
  )
}

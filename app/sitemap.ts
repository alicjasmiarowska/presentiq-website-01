import type { MetadataRoute } from 'next'
import { siteUrl } from '../src/lib/siteUrl'
import { getServiceSlugs } from '../sanity/lib/fetch'

const locales = ['en', 'de'] as const

const staticPaths = [
  '',
  '/about',
  '/contact',
  '/how-we-work',
  '/portfolio',
  '/legal-notice',
  '/privacy-policy',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServiceSlugs()
  const servicePaths = services
    .filter((service: { slug: string }) => service.slug)
    .map((service: { slug: string }) => `/services/${service.slug}`)

  const paths = [...staticPaths, ...servicePaths]

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}${path}`])
        ),
      },
    }))
  )
}

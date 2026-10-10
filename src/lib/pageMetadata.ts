import type { Metadata } from 'next'
import { siteUrl } from './siteUrl'
import { urlFor } from '@/sanity/lib/image'
import { stripSoftHyphens } from './hyphenate'
import { resolveLocale } from './locale'

// Link-preview image (LinkedIn, WhatsApp, Slack, …) for any page without its
// own SEO image in Sanity: the logo on the hero background.
export const DEFAULT_OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: 'Presentiq' }

interface BuildMetadataParams {
  locale: 'en' | 'de'
  path: string
  title?: string
  description?: string
  image?: any
}

export function buildMetadata({ locale, path, title: rawTitle, description: rawDescription, image }: BuildMetadataParams): Metadata {
  // CMS text arrives with soft hyphens for on-page wrapping; search results
  // and link previews must not carry them.
  const title = stripSoftHyphens(rawTitle)
  const description = stripSoftHyphens(rawDescription)
  const url = `${siteUrl}/${locale}${path}`
  const ogImage = image?.asset
    ? { url: urlFor(image).width(1200).height(630).url(), width: 1200, height: 630, alt: title }
    : DEFAULT_OG_IMAGE

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en${path}`,
        de: `${siteUrl}/de${path}`,
        'x-default': `${siteUrl}/de${path}`,
      },
    },
    // A page's openGraph/twitter replace the root layout's wholesale, so the
    // shared fields are repeated here.
    openGraph: {
      title,
      description,
      url,
      siteName: 'Presentiq',
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? 'en_US' : 'de_DE',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  }
}

interface SeoField {
  metaTitle?: { en?: string; de?: string }
  metaDescription?: { en?: string; de?: string }
  ogImage?: any
}

export function resolveSeoText(
  seo: SeoField | undefined,
  locale: 'en' | 'de',
  fallbackTitle?: string,
  fallbackDescription?: string
) {
  const t = (field?: { en?: string; de?: string }) => resolveLocale(field, locale)

  return {
    title: t(seo?.metaTitle) || fallbackTitle,
    description: t(seo?.metaDescription) || fallbackDescription,
    image: seo?.ogImage,
  }
}

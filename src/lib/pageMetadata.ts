import type { Metadata } from 'next'
import { siteUrl } from './siteUrl'
import { urlFor } from '../../sanity/lib/image'

interface BuildMetadataParams {
  locale: 'en' | 'de'
  path: string
  title?: string
  description?: string
  image?: any
}

export function buildMetadata({ locale, path, title, description, image }: BuildMetadataParams): Metadata {
  const url = `${siteUrl}/${locale}${path}`
  const ogImageUrl = image?.asset ? urlFor(image).width(1200).height(630).url() : undefined

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en${path}`,
        de: `${siteUrl}/de${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: ogImageUrl ? { images: [ogImageUrl] } : undefined,
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
  const t = (field?: { en?: string; de?: string }) => field?.[locale] || field?.en

  return {
    title: t(seo?.metaTitle) || fallbackTitle,
    description: t(seo?.metaDescription) || fallbackDescription,
    image: seo?.ogImage,
  }
}

import Heading from '@/src/components/atoms/Heading'
import RichText from '@/src/components/atoms/RichText'
import Reveal from '@/src/components/atoms/Reveal'
import CharReveal from '@/src/components/atoms/CharReveal'
import { hyphenate } from '@/src/lib/hyphenate'
import Section from '@/src/components/atoms/Section'
import { getPrivacyPolicy } from '@/sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '@/src/lib/pageMetadata'
import type { Metadata } from 'next'
import { resolveLocale } from '@/src/lib/locale'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getPrivacyPolicy()
  const t = (field: any) => resolveLocale(field, l)
  const seo = resolveSeoText(
    data?.seo,
    l,
    t(data?.heading) || data?.title || 'Privacy Policy',
    // Fallback summary for search results when Sanity has none.
    l === 'de'
      ? 'Datenschutzerklärung der Presentiq GmbH: welche Daten wir verarbeiten, wofür und welche Rechte Sie haben.'
      : 'Privacy policy of Presentiq GmbH: which data we process, why, and what rights you have.'
  )

  return buildMetadata({
    locale: l,
    path: '/privacy-policy',
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getPrivacyPolicy()

  const t = (field: any) => resolveLocale(field, locale as 'en' | 'de')
  const heading = t(data?.heading) || data?.title || 'Privacy Policy'

  return (
    <main className="bg-primary-dark">
      <Section>
        <div className="max-w-225 py-12">
          <Heading
            level="h1"
            text={heading}
            className="text-h2! md:text-h2-md! lg:text-h2-lg! font-extrabold! text-white! mb-16"
          >
            <CharReveal text={hyphenate(heading, locale as 'en' | 'de')} />
          </Heading>
          <Reveal delay={200}>
            <RichText value={data?.body?.[locale as 'en' | 'de'] || data?.body?.en} color="primary" />
          </Reveal>
        </div>
      </Section>
    </main>
  )
}

import Heading from '@/src/components/atoms/Heading'
import RichText from '@/src/components/atoms/RichText'
import Reveal from '@/src/components/atoms/Reveal'
import CharReveal from '@/src/components/atoms/CharReveal'
import { hyphenate } from '@/src/lib/hyphenate'
import Section from '@/src/components/atoms/Section'
import { getLegalNotice } from '@/sanity/lib/fetch'
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
  const data = await getLegalNotice()
  const t = (field: any) => resolveLocale(field, l)
  const seo = resolveSeoText(
    data?.seo,
    l,
    t(data?.heading) || data?.title || 'Legal Notice',
    // Fallback summary for search results when Sanity has none.
    l === 'de'
      ? 'Impressum der Presentiq GmbH: Anbieterkennzeichnung, Kontakt und verantwortliche Personen.'
      : 'Legal notice of Presentiq GmbH: company details, contact and responsible persons.'
  )

  return buildMetadata({
    locale: l,
    path: '/legal-notice',
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getLegalNotice()

  const t = (field: any) => resolveLocale(field, locale as 'en' | 'de')
  const heading = t(data?.heading) || data?.title || 'Legal Notice'

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

import Heading from '../../../src/components/atoms/Heading'
import RichText from '../../../src/components/atoms/RichText'
import Reveal from '../../../src/components/atoms/Reveal'
import CharReveal from '../../../src/components/atoms/CharReveal'
import Section from '../../../src/components/atoms/Section'
import { getLegalNotice } from '../../../sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '../../../src/lib/pageMetadata'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getLegalNotice()
  const t = (field: any) => field?.[l] || field?.en
  const seo = resolveSeoText(data?.seo, l, t(data?.heading) || data?.title || 'Legal Notice')

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

  const t = (field: any) => field?.[locale] || field?.en || ''
  const heading = t(data?.heading) || data?.title || 'Legal Notice'

  return (
    <main className="bg-white">
      <Section>
        <div className="max-w-225 py-12">
          <Heading
            level="h1"
            text={heading}
            className="text-[36px]! md:text-[56px]! lg:text-[84px]! font-extrabold! mb-16"
          >
            <CharReveal text={heading} />
          </Heading>
          <Reveal delay={200}>
            <RichText value={t(data?.body)} />
          </Reveal>
        </div>
      </Section>
    </main>
  )
}

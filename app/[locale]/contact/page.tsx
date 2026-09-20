import type { Metadata } from 'next'
import Heading from '../../../src/components/atoms/Heading'
import Text from '../../../src/components/atoms/Text'
import Reveal from '../../../src/components/atoms/Reveal'
import CharReveal from '../../../src/components/atoms/CharReveal'
import ContactForm from '../../../src/components/organisms/ContactForm'
import BlurGlow from '../../../src/components/atoms/BlurGlow'
import { getContact } from '../../../sanity/lib/fetch'
import { buildMetadata, resolveSeoText } from '../../../src/lib/pageMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const l = locale as 'en' | 'de'
  const data = await getContact()
  const t = (field: any) => field?.[l] || field?.en
  const seo = resolveSeoText(data?.seo, l, t(data?.headline) || 'Contact', t(data?.formBody))

  return buildMetadata({
    locale: l,
    path: '/contact',
    title: seo.title,
    description: seo.description,
    image: seo.image,
  })
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getContact()

  const t = (field: any) => field?.[locale] || field?.en || ''

  return (
    <main className="relative overflow-hidden bg-primary-dark px-6 md:px-12 lg:px-20 pt-16 pb-16 md:pt-20 md:pb-30">
      <BlurGlow variant="corner" position="bottom-right" size={820} />
      <div className="relative max-w-[1680px] mx-auto">
        <Heading level="h1" text={t(data?.headline)} className="text-white mb-10 md:mb-20">
          <CharReveal text={t(data?.headline)} />
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <Reveal delay={500}>
            <Heading level="h3" text={t(data?.formHeadline)} className="text-white mb-6" />
            <Text text={t(data?.formBody)} size="base" color="primary" className="mr-10" />
          </Reveal>

          <Reveal delay={650}>
            <ContactForm
              locale={locale as 'en' | 'de'}
              privacyText={t(data?.privacyText)}
            />
          </Reveal>
        </div>
      </div>
    </main>
  )
}

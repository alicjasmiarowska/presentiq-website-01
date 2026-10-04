import Image from 'next/image'
import Link from 'next/link'
import Heading from '../atoms/Heading'
import Text from '../atoms/Text'
import RichText from '../atoms/RichText'
import Reveal from '../atoms/Reveal'

interface CollaborationItem {
  _key: string
  title?: { en: string; de: string }
  slug?: string
}

interface CollaborationData {
  headline?: { en: string; de: string }
  body?: { en: any[]; de: any[] }
  items?: CollaborationItem[]
}

interface CollaborationSectionProps {
  data: CollaborationData
  locale: 'en' | 'de'
}

// "Besser zusammenarbeiten": closing navy section — headline + body on the
// left, a divided list of outcomes on the right, with the same vertical-bar
// decoration used in the intro loader anchored to the bottom-right corner.
export default function CollaborationSection({ data, locale }: CollaborationSectionProps) {
  if (!data) return null

  const t = (field: any) => field?.[locale] || field?.en || ''
  const items = data.items || []
  const body = data.body?.[locale] || data.body?.en

  return (
    <section className="relative overflow-hidden bg-primary-dark">
      <Image
        src="/images/line_02.1.svg"
        alt=""
        aria-hidden="true"
        width={677}
        height={692}
        className="absolute bottom-0 right-0 w-40 md:w-56 lg:w-80 h-auto pointer-events-none select-none"
      />

      <div className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[1680px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <Reveal>
              <Heading level="h2" variant="section" text={t(data.headline)} className="text-white" />
            </Reveal>
            {body && body.length > 0 && (
              <Reveal delay={100}>
                <RichText value={body} color="primary" className="mt-8 max-w-[480px]" />
              </Reveal>
            )}
          </div>

          {items.length > 0 && (
            <div>
              {items.map((item, i) => (
                <Reveal key={item._key} delay={i * 100 + 150}>
                  <Link
                    href={`/${locale}/services/${item.slug}`}
                    className="group flex items-center justify-between gap-4 py-5 border-b border-primary-blue hover:opacity-80 transition-opacity duration-300"
                  >
                    <Text text={t(item.title)} size="lg" color="primary" />
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

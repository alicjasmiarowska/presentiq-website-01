import DividedTextList from '@/src/components/molecules/DividedTextList'

interface ProductsListItem {
  _key: string
  en?: string
  de?: string
}

interface ProductsListProps {
  data?: ProductsListItem[]
  locale: 'en' | 'de'
}

// Plain-text product/service names between the intro and partner bar — no
// links, just on-page copy for SEO (crawlable keywords), unlike
// CollaborationSection's items which are real navigation links.
export default function ProductsList({ data, locale }: ProductsListProps) {
  const t = (field?: string, fallback?: string) => field || fallback || ''
  const items = (data || [])
    .filter((item) => t(item[locale], item.en))
    .map((item) => ({ key: item._key, text: t(item[locale], item.en) }))

  if (items.length === 0) return null

  return (
    <section className="bg-neutral-light">
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <DividedTextList items={items} />
      </div>
    </section>
  )
}

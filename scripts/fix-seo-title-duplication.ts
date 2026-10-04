// Fix: app/layout.tsx's title template is "%s | Presentiq", but the SEO
// titles just written in fill-seo-and-alt-text.ts also ended in
// "| Presentiq" / started with "Presentiq |", producing
// "X | Presentiq | Presentiq" on every page. Strip the redundant suffix.
//
// Run once: npx sanity exec scripts/fix-seo-title-duplication.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const IDS = [
  'contact', 'about', 'howWeWork', 'portfolio', 'homepage', 'storytelling', 'templates',
  'companyPresentations', 'presentationDesign', 'wordAndAdobePdf', 'aiDesign',
  '0f3047df-c55e-4982-802f-4c27b0611bdd', '3ff1ec4b-eaa8-4686-a3da-849966bb9bde',
  '7f12b97d-c73a-4143-b299-edc1965112a9', 'b6efd9c5-4a98-4728-abdf-b10e3544e9bb',
  'd1767573-c952-4e15-ad2f-898431083324', 'fb2d5428-86ce-4b4a-a9ea-16704c4f062e',
  '8715d1d2-90c5-4f55-8c74-bdd4b2464a58', 'd05ee05e-d2b0-4d73-88c2-03684a1ae6e2',
  'de25bc77-2f7f-4e69-b885-30dc600cef90', 'e9de51cd-e315-4ac0-9cd5-63c636d0fd43',
]

function stripPresentiq(title: string): string {
  return title
    .replace(/\s*\|\s*Presentiq\s*$/i, '')
    .trim()
}

async function run() {
  const docs = await client.fetch<any[]>(
    `*[_id in $ids]{_id, "titleEn": seo.metaTitle.en, "titleDe": seo.metaTitle.de}`,
    { ids: IDS }
  )

  const tx = client.transaction()
  let count = 0

  for (const doc of docs) {
    const en = doc.titleEn ? stripPresentiq(doc.titleEn) : undefined
    const de = doc.titleDe ? stripPresentiq(doc.titleDe) : undefined
    if (!en && !de) continue

    const patch: Record<string, string> = {}
    if (en) patch['seo.metaTitle.en'] = en
    if (de) patch['seo.metaTitle.de'] = de

    tx.patch(doc._id, (p) => p.set(patch))
    count++
    console.log(`${doc._id}: "${doc.titleEn}" -> "${en}"`)
  }

  await tx.commit()
  console.log(`Fixed ${count} document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

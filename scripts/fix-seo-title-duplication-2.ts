// Second pass: these 5 titles mention "Presentiq" in the middle of the
// custom text (not a clean trailing "| Presentiq" suffix), so the layout's
// "%s | Presentiq" title template still produced a duplicate brand mention.
// Run once: npx sanity exec scripts/fix-seo-title-duplication-2.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const TITLES: Record<string, { en: string; de: string }> = {
  about: { en: 'A Studio Focused on Presentations', de: 'Fokussiert auf Präsentationen' },
  contact: { en: "Let's Talk About Your Project", de: 'Sprechen Sie mit uns' },
  homepage: { en: 'Presentation Design Agency for Decision-Makers', de: 'Präsentationsagentur für Entscheider' },
  howWeWork: { en: 'Our Presentation Process', de: 'Unser Präsentationsprozess' },
  portfolio: { en: 'Presentation Design Work', de: 'Präsentationsdesign-Arbeiten' },
}

async function run() {
  const tx = client.transaction()
  for (const [id, title] of Object.entries(TITLES)) {
    tx.patch(id, (p) => p.set({ 'seo.metaTitle.en': title.en, 'seo.metaTitle.de': title.de }))
  }
  await tx.commit()
  console.log(`Fixed ${Object.keys(TITLES).length} document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

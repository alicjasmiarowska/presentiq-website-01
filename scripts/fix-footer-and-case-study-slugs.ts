// One-off fixes:
// 1. footer.copyright.de had a leftover "Copyright DE: " debug prefix
//    (mirroring the "Copyright EN: " one already fixed on the English side).
// 2. The 4 case studies still had placeholder slugs (lorem-ipsum,
//    lorem-ipsum1/2/3) instead of real, title-derived URLs.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/fix-footer-and-case-study-slugs.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const SLUGS: Record<string, string> = {
  '8715d1d2-90c5-4f55-8c74-bdd4b2464a58': 'powerpoint-to-google-slides',
  'd05ee05e-d2b0-4d73-88c2-03684a1ae6e2': 'corporate-presentations',
  'de25bc77-2f7f-4e69-b885-30dc600cef90': 'pitch-investor-presentations-smes',
  'e9de51cd-e315-4ac0-9cd5-63c636d0fd43': 'international-automotive-group',
}

async function run() {
  const tx = client.transaction()

  tx.patch('footer', (p) =>
    p.set({ 'copyright.de': '© 2026 Presentiq. Alle Rechte vorbehalten.' })
  )

  for (const [id, slug] of Object.entries(SLUGS)) {
    tx.patch(id, (p) => p.set({ slug: { _type: 'slug', current: slug } }))
  }

  await tx.commit()
  console.log('Fixed footer.copyright.de and', Object.keys(SLUGS).length, 'case study slugs.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

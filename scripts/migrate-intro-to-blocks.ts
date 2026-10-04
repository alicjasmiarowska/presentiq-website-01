// One-off migration: `intro` on storytelling/templates/companyPresentations/
// presentationDesign/wordAndAdobePdf just changed from a single {image, body}
// object to an array of blocks (so a page like Word & PDF can stack two
// photo+text sections). Existing documents still hold the old object shape,
// which the new array-based PhotoTextBlocks component can't read — this wraps
// the existing object as the array's first (and only) element, unchanged
// otherwise, so existing pages keep rendering exactly as before.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/migrate-intro-to-blocks.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const TYPES = ['storytelling', 'templates', 'companyPresentations', 'presentationDesign', 'wordAndAdobePdf']

function keyId() {
  return Math.random().toString(36).slice(2, 12)
}

async function run() {
  const docs = await client.fetch<any[]>(`*[_type in $types]{_id, _type, intro}`, { types: TYPES })

  const tx = client.transaction()
  let patchCount = 0

  for (const doc of docs) {
    const intro = doc.intro
    if (!intro || Array.isArray(intro)) continue

    const { _type, ...rest } = intro
    tx.patch(doc._id, (p) => p.set({ intro: [{ _type: 'introBlock', _key: keyId(), ...rest }] }))
    patchCount++
    console.log(`Queued ${doc._type} (${doc._id}): intro -> [intro]`)
  }

  if (patchCount === 0) {
    console.log('Nothing to migrate — no object-shaped intro values found.')
    return
  }

  await tx.commit()
  console.log(`Migrated ${patchCount} document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

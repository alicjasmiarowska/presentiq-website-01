// One-off migration: textAndPicture's `body` field just changed from a
// plain string to localeRichText (Portable Text block array) so editors
// can use bold/italic. Existing documents still hold the old plain-string
// value, which the new block editor can't read — this converts each
// stored string into one block per paragraph (split on blank lines) so
// existing copy survives the schema change.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/migrate-textandpicture-richtext.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

function keyId() {
  return Math.random().toString(36).slice(2, 12)
}

function toBlocks(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: 'block',
      _key: keyId(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: keyId(), text: paragraph, marks: [] }],
    }))
}

function isPlainLocaleText(value: any) {
  return value && typeof value === 'object' && (typeof value.en === 'string' || typeof value.de === 'string')
}

async function run() {
  const docs = await client.fetch<any[]>(`*[_type == "textAndPicture" && defined(body)]{_id, body}`)

  const tx = client.transaction()
  let patchCount = 0

  for (const doc of docs) {
    if (!isPlainLocaleText(doc.body)) continue

    const next: Record<string, any> = { _type: 'localeRichText' }
    if (typeof doc.body.en === 'string') next.en = toBlocks(doc.body.en)
    if (typeof doc.body.de === 'string') next.de = toBlocks(doc.body.de)

    tx.patch(doc._id, (p) => p.set({ body: next }))
    patchCount++
    console.log(`Queued textAndPicture (${doc._id}): body`)
  }

  if (patchCount === 0) {
    console.log('Nothing to migrate — no plain-string body values found.')
    return
  }

  await tx.commit()
  console.log(`Migrated ${patchCount} document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

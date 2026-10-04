// One-off migration: `intro.body` / `partnerBar.text` / `collaboration.body`
// on storytelling/templates/companyPresentations/aiDesign just changed from
// `localeText` (plain string) to `localeRichText` (Portable Text block
// array), so bold/italic can be used in Studio. Existing documents still
// hold the old plain-string value, which the new block editor can't read —
// this converts each stored string into one block per paragraph (split on
// blank lines) so existing copy survives the schema change.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/migrate-simple-service-richtext.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const FIELD_PATHS: Record<string, string[]> = {
  storytelling: ['intro.body', 'partnerBar.text', 'collaboration.body'],
  templates: ['intro.body', 'partnerBar.text', 'collaboration.body'],
  companyPresentations: ['intro.body', 'partnerBar.text', 'collaboration.body'],
  aiDesign: ['collaboration.body'],
}

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

function migrateField(value: any) {
  if (!isPlainLocaleText(value)) return null
  const next: Record<string, any> = { _type: 'localeRichText' }
  if (typeof value.en === 'string') next.en = toBlocks(value.en)
  if (typeof value.de === 'string') next.de = toBlocks(value.de)
  return next
}

async function run() {
  const types = Object.keys(FIELD_PATHS)
  const docs = await client.fetch<any[]>(`*[_type in $types]`, { types })

  const tx = client.transaction()
  let patchCount = 0

  for (const doc of docs) {
    const paths = FIELD_PATHS[doc._type] || []
    const patch: Record<string, any> = {}

    for (const path of paths) {
      const [group, field] = path.split('.')
      const current = doc[group]?.[field]
      const migrated = migrateField(current)
      if (migrated) patch[path] = migrated
    }

    if (Object.keys(patch).length > 0) {
      tx.patch(doc._id, (p) => p.set(patch))
      patchCount++
      console.log(`Queued ${doc._type} (${doc._id}): ${Object.keys(patch).join(', ')}`)
    }
  }

  if (patchCount === 0) {
    console.log('Nothing to migrate — no plain-string values found.')
    return
  }

  await tx.commit()
  console.log(`Migrated ${patchCount} document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

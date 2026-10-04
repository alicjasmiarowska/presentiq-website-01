// One-off cleanup: `faqItem` and `whyPresentiq` document types have no
// schema file in sanity/schemaTypes and are never queried in
// sanity/lib/fetch.ts — dead data left over from an earlier iteration of
// the site, confirmed unused before deleting.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/delete-orphaned-documents.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const IDS = ['8a580c29-d79c-4e56-8b6d-e1b41da677f1', 'aefd940a-eecc-4c72-981a-82d53a6aec5e']

async function run() {
  const tx = client.transaction()
  IDS.forEach((id) => tx.delete(id))
  await tx.commit()
  console.log(`Deleted ${IDS.length} orphaned document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

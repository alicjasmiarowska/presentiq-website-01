// One-off cleanup: `textAndImageSlider` and `textAndPictureBullets` had no
// schema file consumer anywhere in app/ (confirmed via grep before this
// script was written) and their schema types were just removed from
// sanity/schemaTypes/index.ts — these are the last 2 leftover documents of
// those types, deleted so Studio doesn't show orphaned, type-less data.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/delete-unused-schema-documents.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const IDS = ['6669e026-035b-464e-a36d-3051490b1b22', 'a0aa51a0-0f85-48e9-8192-1eaa20ad6aea']

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

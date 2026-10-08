// One-off cleanup (2026-10-08): content left over from the old site that no
// page renders any more. A document was "unused" when it can't be reached
// from what the pages query (sanity/lib/fetch.ts) by following references;
// an asset when no reachable document uses it. Full dataset backup taken
// first: ~/presentiq-sanity-backup-2026-10-08.tar.gz
// (restore: npx sanity dataset import <file> production --replace).
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/delete-unused-old-site-content.ts --with-user-token
import { getCliClient } from 'sanity/cli'

// 'raw' sees drafts too, so nothing an unpublished edit still uses is removed.
const client = getCliClient().withConfig({ apiVersion: '2026-08-16', perspective: 'raw' })

// process, tools, textAndPicture "Gegründet in K16", fourPillars "Woran wir
// glauben", and stray drafts of the schema-less threePillars / whyPresentiq.
const DOCUMENT_IDS = [
  "0345c970-8c94-4157-8a15-0984caba019d",
  "4ce70c89-b257-4800-9cf9-b539c3d223bd",
  "720dc05b-33b5-4aaa-8d7f-9707385ca208",
  "bd535565-bc95-46d1-8b4b-c417b2ec10e7",
  "drafts.4e901083-43a2-44bf-8b09-e5182dd6d264",
  "drafts.8a580c29-d79c-4e56-8b6d-e1b41da677f1"
]

const ASSET_IDS = [
  "file-6dae035c81649ce88e3c3981d3db5126843815ae-mp4",
  "image-0842a2641189fa5cb1c85e2bfb38a4bb46cd3a9a-912x686-jpg",
  "image-0ca991bbd773eab0fc360eefbf4ca956c0c17ed8-228x88-jpg",
  "image-0e53045ab0fd00580bce031488e1dba29e735379-158x88-jpg",
  "image-10575842a259e3ef50b727ba4d4f1a19ade38586-1498x1053-png",
  "image-10711db57d7b2ac6fdcc4eebd4e8ea0fa25479f8-2676x1536-png",
  "image-11a875322fdea7f203900d777b69c30e7666ddb9-168x86-jpg",
  "image-146e431c4d2075fefb1175f573e98c0d561cb987-24x24-svg",
  "image-1748a68cba6e3eaa84e25d7a27e410cb974055f0-1115x1115-jpg",
  "image-193c7f5f3152952e00c7c86387e437804fe5acd1-3744x5616-jpg",
  "image-1af766daac17303b6a6b08cecc1d08d5b2e19656-510x485-png",
  "image-2419169aed36147e07fed0dea72ef2c0b4d98238-210x130-jpg",
  "image-24ded1d37c3fcb5599895ca432ddd45c75a06aa0-420x389-png",
  "image-2659991ccc39951e17c42fb322cf7dfca17564c8-1536x1536-webp",
  "image-2dd7d4ac06b76b82d4408d2f51fc7370b1092c2c-278x116-jpg",
  "image-3152951c96113feaf0f3ef4987a23c0ff85df341-24x24-svg",
  "image-35db4faf5bcbb1324f99eb44ee35eeac944ff08f-1442x1240-jpg",
  "image-4d908b3345e9867f799db454fd2292d4c1cbaace-180x86-png",
  "image-4fa17ba4438d8ba60507c23c5a174046211bd576-244x44-jpg",
  "image-5364dc7e112b710ea806cb05a247522a43e6f9b3-152x120-jpg",
  "image-5706cdbb471b6cfc12b96b97c6ef1815286a08c6-214x140-jpg",
  "image-603a57d3cb82784df37d3d010b6c5652ee1d9e91-24x24-svg",
  "image-646636a47b154522d982854032a0b97d1499908b-170x170-jpg",
  "image-6a0baca37b94fd75814357746c9cfce155c7e7f1-322x90-jpg",
  "image-6c3dc4726ea632f014681c7883b5382fd9787f6f-118x72-png",
  "image-79bc431a608d269209d821e78b70a8ecd0b95465-210x64-png",
  "image-7e9acf0e7d8be55744978e6dd8b42ba558774769-116x114-jpg",
  "image-8463293c45374ca9070fb7a12aec7db17d69b75d-24x24-svg",
  "image-85fe72b1334cfb2166140332f6cab183a47c27d6-963x594-png",
  "image-98d5e1cfff4493c6c2bf32639be43370ddd780eb-214x118-jpg",
  "image-a6f3579ab6f110b05dccd060dfe1b157c7e9218e-224x110-jpg",
  "image-a73517488dd71713a0cfe44be7e5c1f8e4b58a1e-4725x886-png",
  "image-aabb209f3a503b84b2770cd5d805568bbabb3d3e-24x24-svg",
  "image-ab5220a81b7516924107136b71395ab9be9e7409-186x88-png",
  "image-ae274c7b7c161846c06fbcccbcdeb6712dc16dbc-24x24-svg",
  "image-b1d97ae072edcb6f42c0d2e1005e4bf74988aaf3-222x124-jpg",
  "image-b2597c3ebfb2d3aadab74c77a327c53182b6e87f-204x92-png",
  "image-bb19782d63f764da78c257dc914a180318aa69cb-4725x886-png",
  "image-bc83f8812a5bc419d47dcbbadb473883376ba429-184x110-jpg",
  "image-c18abf8eacea7e501c69d98c563b5b8cff4f3998-2667x1782-jpg",
  "image-c41d88fb45e0016e1ee59a500f36108a642ce928-232x92-png",
  "image-c6ca4e0818e7ed573b1e79cb6086b60d38a355fd-140x68-png",
  "image-c7f5c6c68a1fc3f3256bdcbf83e5cb0226ec6459-224x72-jpg",
  "image-cac76d5996e67e5474bca594454fcd707b9821ef-200x88-jpg",
  "image-cb82e7e1d5f968df8ada07391ff1f4fb1f27fe89-1134x213-svg",
  "image-d300afdd12f63c1519f9c45dad15737795e70ea7-510x485-png",
  "image-d5a387f2091efa4fdf8a44c5887834feb527d2ea-170x108-jpg",
  "image-e3abe664ff7547a99b66e233b883dd7731a8ad91-226x128-png",
  "image-e967c99224034c6c5b715a3f4e31a364211804ca-278x84-png",
  "image-eb20ed914c1ea6c300c546a93daf6ec902dd4a99-296x86-jpg",
  "image-f671952251d791f6a7aaa98f1c2231b65180fd67-308x82-jpg",
  "image-f6ef0b7ac6f0b7b29290d880d91ef276490085ec-262x82-jpg",
  "image-fb2065a596840206c045fb969f98faf4244481b0-204x116-jpg",
  "image-fef2ab40dfb1bc9036ee30e4ab401e9279f4e89e-234x52-jpg"
]

async function run() {
  // Abort if anything outside this list (a draft in progress included) still
  // points at one of these documents.
  const blockers: string[] = await client.fetch(
    '*[!(_id in $ids) && references($ids)]._id',
    { ids: DOCUMENT_IDS }
  )
  if (blockers.length) throw new Error(`Still referenced by: ${blockers.join(', ')}`)

  // DRY_RUN=1: report what would go, change nothing.
  if (process.env.DRY_RUN) {
    const usedAssets: string[] = await client.fetch(
      '*[_id in $ids && count(*[!(_id in $docs) && references(^._id)]) > 0]._id',
      { ids: ASSET_IDS, docs: DOCUMENT_IDS }
    )
    console.log(`Dry run: ${DOCUMENT_IDS.length} document(s), ${ASSET_IDS.length - usedAssets.length} asset(s) would be deleted; kept: ${usedAssets.join(', ') || 'none'}`)
    return
  }

  const docs = client.transaction()
  DOCUMENT_IDS.forEach((id) => docs.delete(id))
  await docs.commit()
  console.log(`Deleted ${DOCUMENT_IDS.length} document(s).`)

  // Re-check each asset right before deleting: anything still referenced
  // (e.g. used since the analysis) is kept.
  const unreferenced: string[] = await client.fetch(
    '*[_id in $ids && count(*[references(^._id)]) == 0]._id',
    { ids: ASSET_IDS }
  )
  const assets = client.transaction()
  unreferenced.forEach((id) => assets.delete(id))
  await assets.commit()
  console.log(`Deleted ${unreferenced.length} of ${ASSET_IDS.length} asset(s); ${ASSET_IDS.length - unreferenced.length} kept because still referenced.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

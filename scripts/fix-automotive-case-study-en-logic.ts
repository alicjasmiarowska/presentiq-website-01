// Fix: the Automotive case study's fact box had "Service: Automotive" —
// every other case study's first fact is "Service: <what we did>"
// (confirmed by querying the other 3), but here the value was the client's
// industry, not the service. The actual service description
// ("PowerPoint presentation design and execution") was instead stuck as a
// dangling, ungrammatical fragment at the end of the Result paragraph.
//
// Fix (English only, per the user's request — German left untouched
// except filling in the one brand-new fact's .de side, since leaving a
// newly-added array item's German half blank would be worse than a
// straightforward factual label):
//   1. facts[0].value.en: "Automotive" -> "PowerPoint presentation design
//      and execution" (now matches the "Service: <deliverable>" pattern).
//   2. Insert a new fact right after it: "Industry: Automotive" (en),
//      with a minimal German mirror ("Branche: Automotive") since this is
//      a brand-new array item, not an edit to existing German copy.
//   3. Remove the now-redundant trailing "Service: PowerPoint presentation
//      design and execution" fragment from the English Result body (it's
//      properly represented in the fact box now).
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/fix-automotive-case-study-en-logic.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const DOC_ID = 'e9de51cd-e315-4ac0-9cd5-63c636d0fd43'
const SERVICE_FACT_KEY = '42589e52f98e'

function keyId() {
  return Math.random().toString(36).slice(2, 12)
}

async function run() {
  const doc = await client.fetch<any>(`*[_id == $id][0]{facts, result}`, { id: DOC_ID })
  if (!doc) throw new Error('Document not found')

  const facts = doc.facts as any[]
  const serviceFactIndex = facts.findIndex((f) => f._key === SERVICE_FACT_KEY)
  if (serviceFactIndex === -1) throw new Error('Service fact not found')

  const newFacts = [...facts]
  newFacts[serviceFactIndex] = {
    ...newFacts[serviceFactIndex],
    value: { ...newFacts[serviceFactIndex].value, en: 'PowerPoint presentation design and execution' },
  }
  newFacts.splice(serviceFactIndex + 1, 0, {
    _key: keyId(),
    _type: 'fact',
    label: { _type: 'localeString', en: 'Industry', de: 'Branche' },
    value: { _type: 'localeString', en: 'Automotive', de: 'Automotive' },
  })

  const enBlocks = doc.result.leftBody.en
  const lastBlock = enBlocks[enBlocks.length - 1]
  const lastSpan = lastBlock.children[lastBlock.children.length - 1]
  const cleanedText = lastSpan.text.replace(
    / Service: PowerPoint presentation design and execution\s*$/,
    ''
  )
  if (cleanedText === lastSpan.text) throw new Error('Trailing fragment not found — text may have changed')

  const newEnBlocks = enBlocks.map((block: any, i: number) =>
    i !== enBlocks.length - 1
      ? block
      : {
          ...block,
          children: block.children.map((child: any, j: number) =>
            j !== block.children.length - 1 ? child : { ...child, text: cleanedText }
          ),
        }
  )

  await client
    .transaction()
    .patch(DOC_ID, (p) =>
      p.set({
        facts: newFacts,
        'result.leftBody.en': newEnBlocks,
      })
    )
    .commit()

  console.log('Fixed Automotive case study: facts + result body (EN only).')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

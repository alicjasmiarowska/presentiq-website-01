// One-off fixes from an English-language audit of the shared section
// components (features, fourColumns, fourPillars, textAndImageSliderServices,
// textAndPicture, twoColumnSection): trailing whitespace in titles, a
// comma-splice/run-on, a broken parallel list, and a missing article/awkward
// fragment. fourColumns, textAndImageSliderServices and twoColumnSection
// were already clean — nothing to patch there.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/fix-en-language-audit-shared-sections.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  const tx = client.transaction()

  // features.ts — trailing-space titles
  tx.patch('20e9ec8a-a917-4780-884f-8178c2ac0fb1', (p) =>
    p
      .set({ 'items[_key=="21bab693fada"].title.en': 'Dedicated Support' })
      .set({ 'items[_key=="92e0828c90a9"].title.en': 'Flexible Engagement' })
      .set({ 'items[_key=="58403a6162db"].title.en': 'Immediate Delivery' })
  )
  tx.patch('bb6709a7-b672-418f-8cf9-48ad5e649ef7', (p) =>
    p
      .set({ 'items[_key=="dcd6da7a1c0f"].title.en': 'Custom Design' })
      .set({ 'items[_key=="88e05440515c"].title.en': 'Brand Consistency' })
      .set({ 'items[_key=="41b534cb226f"].title.en': 'Professional Delivery' })
  )

  // fourPillars.ts — trailing-space titles/description, a parallelism fix,
  // and a comma splice.
  tx.patch('e433fb2f-5ca1-4f25-9837-595bf0ac6b1e', (p) =>
    p
      .set({ 'pillars[_key=="5e5d3391ffb6"].title.en': 'AI Videos' })
      .set({ 'pillars[_key=="f474500fb37f"].title.en': 'Visual Enhancement' })
      .set({
        'pillars[_key=="6703f44e9fb9"].description.en':
          "Custom generated images refined by design. Specific to your brand, your message, your audience.",
      })
  )
  tx.patch('dbf9be9b-1ae9-4290-8d63-dacb9dd23375', (p) =>
    p
      .set({
        // Was a comma splice: "...refinements we adapt quickly."
        'pillars[_key=="545cd29c251a"].description.en':
          'Strategy shifts, design pivots, message refinements — we adapt quickly. Changes happen without delay or frustration.',
      })
      .set({
        // "new announcement" broke the plural parallel with "quarters"/"data".
        'pillars[_key=="70e8cfdfde1b"].description.en':
          'New quarters, new data or new announcements. We keep your presentations current, consistent, and ready. Always.',
      })
  )

  // textAndPicture.ts — richtext bodies, preserving block/span structure.
  tx.patch('720dc05b-33b5-4aaa-8d7f-9707385ca208', (p) =>
    p.set({
      'body.en[_key=="b2k5jcymg7"].children[_key=="h7otam2y49"].text':
        "We started inside K16, a strategic communication studio in Hamburg. Today we're an independent brand with our own focus and team, but we share the same collaborative spirit: solving communication problems, one focused mission at a time.",
    })
  )
  tx.patch('eb9ee4e6-7afc-4681-bd96-f2c213934d7e', (p) =>
    p.set({
      'body.en[_key=="w7ki1k3grf"].children[_key=="j1nkti74fk"].text':
        "We start by understanding what you already know. Then we create presentations that bring this way of thinking to life. The design serves what matters most: it highlights it, underscores your company's character, and helps build it.",
    })
  )

  await tx.commit()
  console.log('Applied English-language audit fixes to shared section components.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

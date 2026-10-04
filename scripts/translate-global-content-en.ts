// One-off content pass: translate/polish English copy across global,
// navigation and page-level documents (hero, footer, navigation, homepage,
// about, contact, howWeWork, portfolio, legalNotice, privacyPolicy,
// servicesSection, logoWall, finalCta, faq, pillars, process, tools,
// featuredWork). Only ever sets `.en` — `.de` is untouched.
//
// Most content in this scope already had solid, hand-written English
// copy matching the house voice, so this only fixes the handful of real
// gaps found: a missing translation, a dropped leading letter, and a
// debug-looking "Copyright EN:" label prefix that shouldn't be visible on
// the live site. legalNotice and privacyPolicy (German legal/GDPR text)
// were reviewed and are already complete, faithful English translations —
// intentionally left untouched rather than regenerated.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/translate-global-content-en.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  const tx = client.transaction()

  // Hero "Main Hero" subtitle: dropped leading "P" in "Professional".
  tx.patch('b99a3d1e-a2c2-405e-9132-9b140ba23229', (p) =>
    p.set({
      'subtitle.en':
        'Professional business presentations for companies – from corporate, product and sales presentations to pitch decks, templates and day-to-day presentation support.',
    })
  )

  // Footer copyright: drop the "Copyright EN:" debug prefix — the DE
  // field has a matching "Copyright DE:" prefix that's out of scope here
  // (only .en is touched), worth a human follow-up pass.
  tx.patch('footer', (p) => p.set({ 'copyright.en': '© 2026 Presentiq. All rights reserved.' }))

  // How We Work's navy "Gemeinsam zum Erfolg" band had no English headline
  // at all.
  tx.patch('howWeWork', (p) => p.set({ 'successStatement.headline.en': 'Better, together.' }))

  await tx.commit()
  console.log('Translated: hero subtitle typo, footer copyright, howWeWork successStatement headline.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

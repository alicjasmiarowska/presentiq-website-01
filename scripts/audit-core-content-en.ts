// One-off EN language-quality audit fixes (grammar, sense, agency tone) for
// the "core/global content" scope: navigation, hero, logoWall, tools,
// process. Only `.en` paths touched.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/audit-core-content-en.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  const tx = client.transaction()

  // navigation: "How we work" → "How We Work" — Title Case to match its
  // siblings (Portfolio / About Us / Contact) and the footer's own link
  // label for the same page, which already says "How We Work".
  tx.patch('navigation', (p) => p.set({ 'navLinks[_key=="d54ad2c4833b"].label.en': 'How We Work' }))

  // hero "Professional Presentations": missing comma before the
  // independent clause ("...or closing a deal, we build...").
  tx.patch('a56faa6f-19c6-4313-935c-5a13bd65bc50', (p) =>
    p.set({
      'subtitle.en':
        "Every presentation is a moment that matters. Whether you're pitching investors, presenting to the board, launching a product, or closing a deal, we build presentations where your strategy comes through clearly and moves people to action.",
    })
  )

  // hero "AI": noun-heavy, stiff phrasing → active voice, matches house tone.
  tx.patch('26356042-5a2e-4700-ba1f-bb114080872b', (p) =>
    p.set({
      'subtitle.en': 'We refine AI-generated ideas into presentations, visuals and short films that actually work.',
    })
  )

  // hero "AI Support": trailing space.
  tx.patch('31d4a1b4-1262-4043-8090-3c3308ea87d6', (p) =>
    p.set({
      'subtitle.en':
        'AI creates fast. Strategic design makes it work for your brand. Images and videos that feel intentional, not generic.',
    })
  )

  // logoWall headline: parenthetical read like an internal note, not a
  // tight two-line headline — shortened to match the DE's register.
  tx.patch('6f83705c-3e4e-4ca7-bbe6-def53e3bcf79', (p) =>
    p.set({ 'headline.en': 'Client satisfaction <br> (automated client survey)' })
  )

  // tools: "Canva" title had stray double spaces around the dash, unlike
  // every other tool title in the same list.
  tx.patch('bd535565-bc95-46d1-8b4b-c417b2ec10e7', (p) =>
    p.set({ 'tools[_key=="b7b3c249162b"].title.en': 'Canva – Quick, Accessible, Team-Ready' })
  )

  // process: tense agreement, a run-on sentence, and a missing colon
  // before a list — all three steps otherwise read clean and punchy.
  tx.patch('0345c970-8c94-4157-8a15-0984caba019d', (p) =>
    p.set({
      'steps[_key=="d96eaae2d47c"].description.en':
        "We build narrative structure first, how your message flows and what moves people to act. Then visual language and design. Everything reinforces your content because content leads the way.",
      'steps[_key=="701c068740bb"].description.en':
        "You review the work. You give feedback. We refine. This cycle repeats until it's right. Changes need to happen fast — we understand that. Most revisions turn around within 24-48 hours. We stay flexible.",
      'steps[_key=="4cad5c0f189b"].description.en':
        "Final presentations in your format of choice: PowerPoint, PDF, Google Slides, Word. You get all files. You can edit anytime. You're never dependent on us for changes. That's the entire point.",
    })
  )

  await tx.commit()
  console.log('Core/global EN language-audit fixes committed.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

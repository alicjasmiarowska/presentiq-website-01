// English language audit fix (service-page family + case studies scope).
// Two genuine issues found after reviewing every .en field in this scope:
// 1. "specialised" (British spelling) vs. the American spelling used
//    everywhere else on the site.
// 2. A literal-translation artifact: German "Denn X. Y" (a valid German
//    sentence pattern — "denn" can start a new sentence) was translated
//    word-for-word as "Because X. Y", which is an English sentence
//    fragment ("Because" clauses need a main clause in the same sentence).
// Everything else reviewed in this scope (service, storytelling, templates,
// companyPresentations, presentationDesign, wordAndAdobePdf, aiDesign, and
// all 4 caseStudy documents) was already clean, on-tone agency copy — a few
// other oddities (a redundant-looking case-study subheadline, a mismatched
// "Service: Automotive" fact, a stray trailing label sentence) turned out
// to match the German source exactly, so they're content choices, not
// English-specific defects, and were left untouched.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/fix-en-language-audit-service-pages.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  const tx = client.transaction()

  tx.patch('companyPresentations', (p) =>
    p.set({
      'collaboration.body.en': [
        {
          _type: 'block',
          _key: 'dwa1',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'dwa1s',
              marks: [],
              text: 'A strong presentation starts with a clear narrative and lives on in your templates. For structure and key messages we work with experienced content strategists, for large template projects with a specialized unit.',
            },
          ],
        },
      ],
    })
  )

  tx.patch('d05ee05e-d2b0-4d73-88c2-03684a1ae6e2', (p) =>
    p.set({
      'challenge.leftBody.en': [
        {
          _type: 'block',
          _key: 'cs1a',
          level: 1,
          listItem: 'bullet',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'cs1as',
              marks: [],
              text: "PRESENTIQ doesn't start with the first slide — it starts with the questions:\nWhat should the presentation achieve? Who's on the other side of the table, and what should they think or do afterward?",
            },
          ],
        },
        {
          _type: 'block',
          _key: 'cs1b',
          level: 1,
          listItem: 'bullet',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'cs1bs',
              marks: [],
              text: "That's because company information is available anytime today, through websites\nand AI. A sales presentation has to do more\nthan inform: it has to be relevant and persuasive.",
            },
          ],
        },
      ],
    })
  )

  await tx.commit()
  console.log('Fixed: companyPresentations.collaboration.body.en (specialised -> specialized), caseStudy d05ee05e challenge.leftBody.en (sentence fragment).')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

// One-off content fix: fill in the handful of missing/incorrect English
// fields across the shared section components (textAndPicture,
// twoColumnSection, textAndImageSliderServices). features/fourColumns/
// fourPillars/textAndImageSlider/textAndPictureBullets/videoSection were
// audited too and already have complete, agency-voice English — nothing to
// change there.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/translate-shared-sections-en.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

function keyId() {
  return Math.random().toString(36).slice(2, 12)
}

async function run() {
  const tx = client.transaction()

  // textAndPicture "AI Support" video section — body.en was never filled in.
  tx.patch('df5be8f4-c0ec-4108-9e9e-d45a789a287e', (p) =>
    p.set({
      'body.en': [
        {
          _type: 'block',
          _key: keyId(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: keyId(),
              marks: ['strong'],
              text: 'Want to bring your message to life with a short film?',
            },
          ],
        },
        {
          _type: 'block',
          _key: keyId(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: keyId(),
              marks: [],
              text: "AI makes it possible to turn ideas into visual stories fast. But it takes the right design and fine-tuning to create a film that actually convinces.",
            },
          ],
        },
        {
          _type: 'block',
          _key: keyId(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: keyId(),
              marks: [],
              text: 'PRESENTIQ refines AI-generated short films into professional visuals that strengthen your brand, create emotion, and land your message.',
            },
          ],
        },
      ],
    })
  )

  // twoColumnSection "AI Support" intro — leftHeadline.en and rightBody.en
  // were never filled in.
  tx.patch('0bbbd694-15c8-4b86-afd0-b336b5b83c34', (p) =>
    p.set({
      'leftHeadline.en': 'Have an idea you want to turn into compelling design?',
      'rightBody.en': [
        {
          _type: 'block',
          _key: keyId(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: keyId(),
              marks: [],
              text: "AI today offers many ways to quickly generate initial drafts and creative concepts. But what's often missing is precise execution, careful design refinement, and the final polish that turns an idea into a professional result.\n\nPRESENTIQ helps you take AI-generated designs further, refining them and bringing them exactly in line with your vision: professional, on-brand, and with an eye for the details that make the difference.",
            },
          ],
        },
      ],
    })
  )

  // textAndImageSliderServices "Ongoing Support" collaboration — typo fix,
  // not a translation gap: "Work better togethe" -> "Work better together".
  tx.patch('390d14ad-adec-4f33-a154-7e3fc79760c3', (p) =>
    p.set({ 'headline.en': 'Work better together' })
  )

  await tx.commit()
  console.log('Migrated 3 document(s): textAndPicture body, twoColumnSection leftHeadline+rightBody, textAndImageSliderServices headline typo.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

// One-off: fill in missing/placeholder English copy for the service-page
// family + case studies (storytelling/templates/companyPresentations/
// presentationDesign/wordAndAdobePdf and the 6 generic `service` documents
// were already fully translated to a high standard — left untouched here).
// Translated by hand from the German source to match the site's existing
// English voice (confident, editorial, US spelling).
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/translate-service-casestudy-en.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

function k() {
  return Math.random().toString(36).slice(2, 12)
}

function para(text: string, marks: string[] = []) {
  return {
    _type: 'block',
    _key: k(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: k(), text, marks }],
  }
}

function bulletPara(text: string) {
  return {
    _type: 'block',
    _key: k(),
    style: 'normal',
    level: 1,
    listItem: 'bullet',
    markDefs: [],
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
  }
}

async function run() {
  const tx = client.transaction()

  // --- aiDesign: processSteps (title + bullets per step) ---
  tx.patch('aiDesign', (p) =>
    p.set({
      'processSteps.steps[0].title.en': 'IDEATION',
      'processSteps.steps[0].bullets[0].en': 'Variants',
      'processSteps.steps[0].bullets[1].en': 'Visual worlds',
      'processSteps.steps[0].bullets[2].en': 'Visual directions',
      'processSteps.steps[1].title.en': 'REFINEMENT',
      'processSteps.steps[1].bullets[0].en': 'Selection',
      'processSteps.steps[1].bullets[1].en': 'Polish',
      'processSteps.steps[1].bullets[2].en': 'Corporate design',
      'processSteps.steps[2].title.en': 'FINALIZATION',
      'processSteps.steps[2].bullets[0].en': 'Visuals',
      'processSteps.steps[2].bullets[1].en': 'Infographics',
      'processSteps.steps[2].bullets[2].en': 'AI-powered assets',
    })
  )

  // --- caseStudy: 8715d1d2... (PowerPoint to Google Slides) ---
  tx.patch('8715d1d2-90c5-4f55-8c74-bdd4b2464a58', (p) =>
    p.set({
      'title.en': 'PowerPoint to Google Slides',
      'headline.en': 'PowerPoint to Google Slides',
      'subheadline.en': 'PRESENTATION TRANSFORMATION FOR A LARGE GERMAN CORPORATION',
      'challenge.leftHeading.en': 'The Challenge',
      'challenge.leftBody.en': [
        para(
          'A large German corporation was moving its working environment from Microsoft Office to Google Workspace. That meant its core PowerPoint presentations also had to be transferred to Google Slides and optimized for the new environment.'
        ),
        para(
          'The transformation had to happen fast, without compromising the existing design quality, presentation logic or corporate design guidelines.'
        ),
      ],
      'solution.leftHeading.en': 'The Solution',
      'solution.leftBody.en': [
        para(
          "PRESENTIQ carried out the transformation together with K16, turning key PowerPoint presentations into professional, fully editable Google Slides presentations."
        ),
        para(
          'This was never just a technical conversion. Existing layouts, graphics, charts, tables and design elements were reviewed, adapted and rebuilt professionally for Google Slides.'
        ),
        para(
          "The client relied on PRESENTIQ and K16's long-standing expertise in presentation design and PowerPoint."
        ),
        para(
          'To meet the tight deadline, PRESENTIQ brought in additional design capacity, handling a large volume of presentations within the given timeframe.'
        ),
      ],
      'result.leftHeading.en': 'The Result',
      'result.leftBody.en': [
        para(
          'A large number of core presentations were successfully transformed from PowerPoint to Google Slides and made available for ongoing collaboration in Google Workspace.'
        ),
        para(
          'This case shows that even large-scale presentation migrations from Microsoft PowerPoint to Google Slides can be handled professionally, efficiently and under serious time pressure.'
        ),
      ],
      'facts[0].label.en': 'Service',
      'facts[0].value.en': 'PowerPoint → Google Slides transformation',
      'facts[1].label.en': 'Technology',
      'facts[1].value.en': 'Google Slides / Google Workspace',
      'facts[2].label.en': 'Collaboration',
      'facts[2].value.en': 'PRESENTIQ × K16',
      'facts[3].label.en': 'Client',
      'facts[3].value.en': 'Large German corporation (NDA)',
      'facts[4].label.en': 'Focus',
      'facts[4].value.en': 'Presentation design | Migration | \u000bAdaptation and scalable delivery',
    })
  )

  // --- caseStudy: d05ee05e... (Corporate Presentations) ---
  tx.patch('d05ee05e-d2b0-4d73-88c2-03684a1ae6e2', (p) =>
    p.set({
      'title.en': 'Corporate Presentations',
      'headline.en': 'Corporate Presentations',
      'subheadline.en':
        'WHEN THE POWERPOINT VERSION NEEDS TO BECOME A SALES TOOL — "A CORPORATE PRESENTATION SHOULD NEVER BE THE POWERPOINT VERSION OF YOUR WEBSITE."',
      'challenge.leftHeading.en': 'The Key Question: What Is This Presentation For?',
      'challenge.leftBody.en': [
        bulletPara(
          "PRESENTIQ doesn't start with the first slide — it starts with the questions:\nWhat should the presentation achieve? Who's on the other side of the table, and what should they think or do afterward?"
        ),
        bulletPara(
          'Because company information is available anytime today, through websites\nand AI. A sales presentation has to do more\nthan inform: it has to be relevant and persuasive.'
        ),
      ],
      'challenge.rightHeading.en': "The Solution: Thinking from the Customer's Perspective",
      'challenge.rightBody.en': [
        para('PRESENTIQ analyzes the goal, audience and sales context, then builds the argument from there:'),
        para('What problem are we solving?', ['strong']),
        para('What value do we offer?', ['strong']),
        para('What sets us apart?', ['strong']),
        para('What builds trust?', ['strong']),
        para('And what leads to the next step?', ['strong']),
        para(
          "Only then do the storyline and presentation design take shape. Existing content isn't simply carried over — it's assessed, prioritized and consistently aligned with the audience and the goal."
        ),
      ],
      'result.leftHeading.en': 'The Result',
      'result.leftBody.en': [
        para('A corporate presentation becomes a strategic sales tool.'),
        para(
          'Instead of repeating who the company is, the presentation shows why it matters to the customer and what value it brings. It supports the sales conversation, strengthens the pitch and drives toward a clear next step.'
        ),
      ],
      'facts[0].label.en': 'Service',
      'facts[0].value.en': 'Consulting | Content | Storytelling | Presentation design',
      'facts[1].label.en': 'Audience',
      'facts[1].value.en': 'B2B companies & SMEs',
      'facts[2].label.en': 'Focus areas',
      'facts[2].value.en': 'Customer value | Positioning | \u000bValue proposition | Storyline | PowerPoint',
      'facts[3].label.en': 'The PRESENTIQ principle',
      'facts[3].value.en': "Don't translate your website into PowerPoint — develop the presentation for its actual purpose.",
    })
  )

  // --- caseStudy: de25bc77... (Pitch & Investor Presentations for SMEs) ---
  tx.patch('de25bc77-2f7f-4e69-b885-30dc600cef90', (p) =>
    p.set({
      'title.en': 'Pitch and Investor Presentations for SMEs',
      'headline.en': 'Pitch and Investor Presentations for SMEs',
      'subheadline.en': 'AN OUTSIDE PERSPECTIVE MAKES ALL THE DIFFERENCE',
      'challenge.leftHeading.en': 'The Challenge',
      'challenge.leftBody.en': [
        para(
          "For important pitches, corporate or investor presentations, good design alone isn't enough. Story, argument, content and visual execution all have to work together for a presentation to be clear, build trust and convince."
        ),
      ],
      'challenge.rightHeading.en': 'The Goal',
      'challenge.rightBody.en': [
        para(
          "PRESENTIQ can't guarantee the success of a pitch or a company. What we can do is improve the odds: with clear content, a convincing argument and professional presentation design."
        ),
      ],
      'solution.leftHeading.en': 'The Solution',
      'solution.leftBody.en': [
        para(
          "That's why PRESENTIQ starts before the design work begins. We analyze every presentation consistently from the audience's point of view:"
        ),
        para('Is the message clear?', ['strong']),
        para('Is the argument coherent?', ['strong']),
        para('Is it clear why the company or the solution matters?', ['strong']),
        para(
          'From there, we sharpen the content, refine the storyline and structure, and translate complex information into a clear visual narrative. The result is a professional, on-brand PowerPoint presentation, complete with charts, infographics and visuals.'
        ),
      ],
      'result.leftHeading.en': 'The Result',
      'result.leftBody.en': [
        para(
          'A clearly structured, professionally designed presentation\nthat brings your company, services or investment story convincingly to the point.'
        ),
      ],
      'facts[0].label.en': 'Service',
      'facts[0].value.en': 'Analysis | Consulting | Storytelling | Presentation design',
      'facts[1].label.en': 'Audiences',
      'facts[1].value.en': 'SMEs | Management | Sales | Founders',
      'facts[2].label.en': 'Use cases',
      'facts[2].value.en': 'Pitch decks | Investor | Corporate \u000b| Sales presentations',
      'facts[3].label.en': 'Focus areas',
      'facts[3].value.en': 'Content | Storyline | Argument \u000b| Visualization | Corporate design | PowerPoint',
    })
  )

  // --- caseStudy: e9de51cd... (International Automotive Group) ---
  tx.patch('e9de51cd-e315-4ac0-9cd5-63c636d0fd43', (p) =>
    p.set({
      'title.en': 'International Automotive Group',
      'headline.en': 'International Automotive Group',
      'subheadline.en': '25 PRESENTATIONS FOR ONE INTERNATIONAL EVENT',
      'challenge.leftHeading.en': 'The Challenge',
      'challenge.leftBody.en': [
        para(
          "Every two years, an international automotive group holds a major event where internal and external guests experience the company's latest developments, innovations and achievements. The event called for up to 25 PowerPoint presentations, ranging from high-profile C-level presentations to technically demanding specialist talks. The particular challenge: the existing presentation design needed a fresh, innovative, attention-grabbing interpretation for the event, while still fully complying with the group's strict corporate design guidelines."
        ),
      ],
      'challenge.rightHeading.en': 'The Solution',
      'challenge.rightBody.en': [
        para(
          'Together with the client, PRESENTIQ developed a new, modern presentation design that stayed true to the existing brand world while giving the event noticeably more energy and visual identity of its own. On that foundation, we delivered up to 25 individual PowerPoint presentations and brought them all to a consistent level of quality. The work went well beyond classic presentation design: complex content was visualized, graphics and charts were redesigned from scratch, and sophisticated animations and dynamic transitions made the presentations land on stage.'
        ),
      ],
      'result.leftHeading.en': 'The Result',
      'result.leftBody.en': [
        para(
          'A consistent yet varied presentation experience across an international automotive event, from C-level communication to technical specialist talks. The result combined full corporate design compliance with innovative presentation design, creative visuals and professional animation, so every presentation read as part of one unified event. Service: PowerPoint presentation design and execution'
        ),
      ],
      'facts[0].label.en': 'Service',
      'facts[0].value.en': 'Automotive',
      'facts[1].label.en': 'Scope',
      'facts[1].value.en': 'Up to 25 presentations',
      'facts[2].label.en': 'Audiences',
      'facts[2].value.en': 'C-level | Management | Departments \u000band external guests',
      'facts[3].label.en': 'Focus areas',
      'facts[3].value.en': 'Corporate design | Presentation design \u000b| Visualization | Animation | Event communications',
      'facts[4].label.en': 'Special note',
      'facts[4].value.en': 'High presentation volume within a very tight timeframe',
    })
  )

  await tx.commit()
  console.log('Done: aiDesign processSteps + 4 case studies translated to English.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

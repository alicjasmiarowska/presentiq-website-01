// One-off content fill: SEO meta title/description (EN+DE) for every
// page-level document, plus real alt text for content photos and
// identifiable partner logos (previously empty, degrading gracefully via
// code fallbacks but with no actual copy). Written by hand after reading
// each page's real content and viewing each image/logo directly — not
// generated mechanically.
//
// Run once, from the project root, authenticated as yourself:
//   npx sanity exec scripts/fill-seo-and-alt-text.ts --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

type Seo = { metaTitle: { en: string; de: string }; metaDescription: { en: string; de: string } }

const SEO: Record<string, Seo> = {
  contact: {
    metaTitle: { en: "Contact Presentiq | Let's Talk About Your Project", de: 'Kontakt zu Presentiq | Sprechen Sie mit uns' },
    metaDescription: {
      en: "Get in touch with Presentiq's presentation design team. Tell us about your project and we'll show you what focused expertise can do.",
      de: 'Nehmen Sie Kontakt zu Presentiq auf. Erzählen Sie uns von Ihrem Projekt – wir zeigen Ihnen, was fokussierte Expertise bewirkt.',
    },
  },
  about: {
    metaTitle: { en: 'About Presentiq | A Studio Focused on Presentations', de: 'Über Presentiq | Fokussiert auf Präsentationen' },
    metaDescription: {
      en: 'Most design studios do everything. Presentiq does presentations — and everything around them. Meet the team and the focus behind our work.',
      de: 'Die meisten Design-Studios machen alles. Presentiq macht Präsentationen – und alles, was dazugehört. Lernen Sie unser Team kennen.',
    },
  },
  howWeWork: {
    metaTitle: { en: "How We Work | Presentiq's Presentation Process", de: 'So arbeiten wir | Unser Präsentationsprozess' },
    metaDescription: {
      en: 'From first draft to final polish: see how Presentiq turns scattered content into presentations that are clear, structured and built to convince.',
      de: 'Vom ersten Entwurf bis zum letzten Schliff: So macht Presentiq aus unstrukturierten Inhalten Präsentationen, die überzeugen.',
    },
  },
  portfolio: {
    metaTitle: { en: 'Portfolio | Presentiq Presentation Design Work', de: 'Portfolio | Präsentationsdesign von Presentiq' },
    metaDescription: {
      en: "Pitch decks that move investors. Sales presentations that close deals. Explore Presentiq's work across corporate, pitch and investor presentations.",
      de: 'Pitch Decks, die Investoren bewegen. Vertriebspräsentationen, die Deals abschließen. Entdecken Sie unsere Arbeiten bei Presentiq.',
    },
  },
  homepage: {
    metaTitle: { en: 'Presentiq | Presentation Design Agency for Decision-Makers', de: 'Presentiq | Präsentationsagentur für Entscheider' },
    metaDescription: {
      en: 'Professional business presentations — from corporate and sales decks to pitch decks, templates and day-to-day presentation support.',
      de: 'Professionelle Business-Präsentationen – von Unternehmens- und Sales-Präsentationen bis zu Pitch Decks, Templates und täglichem Support.',
    },
  },
  storytelling: {
    metaTitle: { en: 'Storytelling | Presentations With Strategic Impact', de: 'Storytelling | Präsentationen mit Wirkung' },
    metaDescription: {
      en: 'Great presentations need more than design. Presentiq combines AI efficiency with human creativity to build narratives that move audiences.',
      de: 'Gute Präsentationen brauchen mehr als Design. Presentiq verbindet KI-Effizienz mit menschlicher Kreativität für Geschichten, die wirken.',
    },
  },
  templates: {
    metaTitle: { en: 'Templates | PowerPoint & Office Templates That Work', de: 'Vorlagen | PowerPoint- und Office-Templates' },
    metaDescription: {
      en: "Technically reliable, on-brand and easy to use: Presentiq designs PowerPoint and Office templates built for your team's everyday work.",
      de: 'Technisch zuverlässig, markenkonform und einfach nutzbar: Presentiq gestaltet PowerPoint- und Office-Vorlagen für den Arbeitsalltag.',
    },
  },
  companyPresentations: {
    metaTitle: { en: 'Corporate Presentations | Presentiq', de: 'Unternehmenspräsentationen | Presentiq' },
    metaDescription: {
      en: 'First impressions matter. Presentiq designs corporate presentations that build trust and deliver your message clearly to clients and investors.',
      de: 'Der erste Eindruck zählt. Presentiq gestaltet Unternehmenspräsentationen, die Vertrauen schaffen und Ihre Botschaft klar vermitteln.',
    },
  },
  presentationDesign: {
    metaTitle: { en: 'Presentation Design Support | Presentiq', de: 'Präsentationsdesign-Support | Presentiq' },
    metaDescription: {
      en: 'Fast, flexible, reliable design support when deadlines are tight. Presentiq helps you finish presentations to a professional standard, on time.',
      de: 'Schneller, flexibler Designsupport, wenn es eng wird. Presentiq bringt Ihre Präsentation termingerecht auf professionelles Niveau.',
    },
  },
  wordAndAdobePdf: {
    metaTitle: { en: 'Word & PDF Design | Presentiq', de: 'Word & PDF Gestaltung | Presentiq' },
    metaDescription: {
      en: 'Professionally designed Word documents and interactive PDFs that stay on-brand and communicate clearly — built by Presentiq.',
      de: 'Professionell gestaltete Word-Dokumente und interaktive PDFs, markenkonform und klar kommuniziert – von Presentiq.',
    },
  },
  aiDesign: {
    metaTitle: { en: 'AI Design Support | Presentiq', de: 'AI Design Support | Presentiq' },
    metaDescription: {
      en: 'AI gets you a first draft fast. Presentiq refines AI-generated designs into polished, on-brand presentations with the details that matter.',
      de: 'KI liefert schnell erste Entwürfe. Presentiq verfeinert AI-generierte Designs zu professionellen, markenkonformen Präsentationen.',
    },
  },
  // Generic `service` documents — superseded by the bespoke pages above for
  // routing, but still live Sanity data; filled for completeness.
  '0f3047df-c55e-4982-802f-4c27b0611bdd': {
    metaTitle: { en: 'Word & Adobe PDF | Presentiq', de: 'Word & Adobe PDF | Presentiq' },
    metaDescription: {
      en: 'Presentiq designs Word documents and PDFs that are professional, on-brand and built for how your team actually works.',
      de: 'Presentiq gestaltet Word-Dokumente und PDFs, die professionell, markenkonform und alltagstauglich sind.',
    },
  },
  '3ff1ec4b-eaa8-4686-a3da-849966bb9bde': {
    metaTitle: { en: 'Templates | Presentiq', de: 'Vorlagen | Presentiq' },
    metaDescription: {
      en: 'Office templates built to save time and keep every deck on-brand. See how Presentiq designs templates teams actually use.',
      de: 'Office-Vorlagen, die Zeit sparen und jede Präsentation markenkonform halten. So gestaltet Presentiq Vorlagen für den Alltag.',
    },
  },
  '7f12b97d-c73a-4143-b299-edc1965112a9': {
    metaTitle: { en: 'Presentation Design | Presentiq', de: 'Präsentationsdesign | Presentiq' },
    metaDescription: {
      en: "Presentiq's presentation design service: fast, reliable support that gets your deck to a professional standard, on deadline.",
      de: 'Der Präsentationsdesign-Service von Presentiq: schneller, zuverlässiger Support für professionelle Präsentationen – termingerecht.',
    },
  },
  'b6efd9c5-4a98-4728-abdf-b10e3544e9bb': {
    metaTitle: { en: 'AI Design | Presentiq', de: 'AI Design | Presentiq' },
    metaDescription: {
      en: 'From AI-generated draft to polished, on-brand presentation — see how Presentiq refines AI design into something that actually convinces.',
      de: 'Vom KI-generierten Entwurf zur fertigen, markenkonformen Präsentation – so verfeinert Presentiq AI Design.',
    },
  },
  'd1767573-c952-4e15-ad2f-898431083324': {
    metaTitle: { en: 'Company Presentations | Presentiq', de: 'Unternehmenspräsentationen | Presentiq' },
    metaDescription: {
      en: 'Presentiq designs company presentations that build trust at first glance and communicate your message with clarity and impact.',
      de: 'Presentiq gestaltet Unternehmenspräsentationen, die auf den ersten Blick Vertrauen schaffen und klar überzeugen.',
    },
  },
  'fb2d5428-86ce-4b4a-a9ea-16704c4f062e': {
    metaTitle: { en: 'Storytelling | Presentiq', de: 'Storytelling | Presentiq' },
    metaDescription: {
      en: 'Structure, key messages and emotional resonance: see how Presentiq builds presentations around a story that actually lands.',
      de: 'Struktur, Kernbotschaften und emotionale Wirkung: So baut Presentiq Präsentationen rund um eine Geschichte, die ankommt.',
    },
  },
  // Case studies
  '8715d1d2-90c5-4f55-8c74-bdd4b2464a58': {
    metaTitle: { en: 'Case Study: PowerPoint to Google Slides | Presentiq', de: 'Case Study: PowerPoint zu Google Slides' },
    metaDescription: {
      en: 'How Presentiq and K16 transformed a major German corporation\'s core PowerPoint presentations into professional, editable Google Slides decks.',
      de: 'Wie Presentiq und K16 zentrale PowerPoint-Präsentationen eines deutschen Großkonzerns in professionelle Google-Slides-Decks überführten.',
    },
  },
  'd05ee05e-d2b0-4d73-88c2-03684a1ae6e2': {
    metaTitle: { en: 'Case Study: Corporate Presentations | Presentiq', de: 'Case Study: Unternehmenspräsentationen' },
    metaDescription: {
      en: 'How Presentiq turned a standard company deck into a strategic sales tool that shows clients why the company matters to them.',
      de: 'Wie Presentiq aus einer Unternehmenspräsentation ein strategisches Vertriebsinstrument gemacht hat, das beim Kunden wirkt.',
    },
  },
  'de25bc77-2f7f-4e69-b885-30dc600cef90': {
    metaTitle: { en: 'Case Study: Pitch & Investor Decks for SMEs', de: 'Case Study: Pitch- und Investorenpräsentationen' },
    metaDescription: {
      en: "How Presentiq's outside perspective sharpened the story, argument and design of a pitch and investor presentation for an SME.",
      de: 'Wie der Blick von außen Story, Argumentation und Design einer Pitch- und Investorenpräsentation für ein KMU geschärft hat.',
    },
  },
  'e9de51cd-e315-4ac0-9cd5-63c636d0fd43': {
    metaTitle: { en: 'Case Study: International Automotive Group', de: 'Case Study: Internationaler Automotive-Konzern' },
    metaDescription: {
      en: '25 presentations, one international event: how Presentiq delivered a consistent, on-brand presentation experience for a global automotive group.',
      de: 'Wie Presentiq für ein internationales Automotive-Event einen konsistenten Markenauftritt über 25 Präsentationen hinweg geliefert hat.',
    },
  },
}

// Intro photo alt text — written after actually viewing each downloaded
// image, not guessed from field names.
const INTRO_ALT: Record<string, Record<string, string>> = {
  storytelling: { cdf4z5etvq: 'Hands holding a tablet showing an AI-generated glowing human figure with flowing light trails' },
  templates: { f30d8fb355f4: 'Abstract illustration of a flowing ribbon connecting translucent dashboard cards with charts and content blocks' },
  companyPresentations: { nqehemu2ph: 'Abstract aurora-like light streaks rising above a glowing spotlight on a dark stage' },
  presentationDesign: { e3a2197c48f3: 'Translucent glass-style dashboard cards with charts, a gallery and lists floating together' },
  wordAndAdobePdf: {
    '3b9e0b469768': 'Translucent document and checklist icons connected by thin circuit-style lines, in teal tones',
    '90e31c0b9b51': 'Translucent document icon with a dark QR-style icon and thin connecting lines, in teal and purple tones',
  },
}

// Logo alt text — 10 identified by viewing the actual logo image; the
// remaining 22 render only as vector path data with no embedded text and
// no local SVG rasterizer was available to view them reliably, so they get
// an honest generic fallback rather than a guessed company name.
const LOGO_ALT: Record<string, string> = {
  '19629fd01119': 'Scholz & Friends logo',
  '1e37a2da3098': 'PAHNKE Group logo',
  c62d71b5b2a4: 'Luther logo',
  d18dcdd53822: 'GfK logo',
  bc077d1fbca2: 'Content Fleet logo',
  '135bb32c116e': 'RE/MAX logo',
  '7a932d64345d': 'Franklin Templeton logo',
  c6e76c130f74: 'Westenergie logo',
  b7b8b57b8be7: 'Westconnect logo',
  d195160f1e41: 'Westnetz logo',
}
const LOGO_FALLBACK = 'Partner company logo'
const ALL_LOGO_KEYS = [
  '7f0d9051c686', '08ed5841eb8a', '1435a2effa9d', '92144f2b52ea', '1c3595023d90', '725aa21fe266',
  '3943924e0d91', '19629fd01119', '1e37a2da3098', 'd8d7850ff0d1', 'e66e42b761cd', 'c62d71b5b2a4',
  'f6716d39b560', 'f1ee7b9f1981', 'af5cad0e4143', 'd0f55825e975', 'eaac1cc67251', '4ca2fe77980d',
  'd18dcdd53822', '58ce4d81192b', 'bc077d1fbca2', '135bb32c116e', 'ce0792532388', 'a56ab21a15d1',
  '5f1c6bb454ef', '7a932d64345d', 'c6e76c130f74', 'e9db7b3f4e56', 'b7b8b57b8be7', 'a0bfb91c5a21',
  'd195160f1e41', 'fb6789dc9442',
]

async function run() {
  const tx = client.transaction()
  let count = 0

  for (const [id, seo] of Object.entries(SEO)) {
    tx.patch(id, (p) =>
      p.set({
        'seo.metaTitle': seo.metaTitle,
        'seo.metaDescription': seo.metaDescription,
      })
    )
    count++
  }

  for (const [type, alts] of Object.entries(INTRO_ALT)) {
    for (const [key, alt] of Object.entries(alts)) {
      tx.patch(type, (p) => p.set({ [`intro[_key=="${key}"].image.alt`]: alt }))
      count++
    }
  }

  const logoWallId = '6f83705c-3e4e-4ca7-bbe6-def53e3bcf79'
  for (const key of ALL_LOGO_KEYS) {
    const alt = LOGO_ALT[key] || LOGO_FALLBACK
    tx.patch(logoWallId, (p) => p.set({ [`logos[_key=="${key}"].alt`]: alt }))
    count++
  }

  await tx.commit()
  console.log(`Wrote ${count} field(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

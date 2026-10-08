// Typographic clean-up for CMS text, applied on the server before
// hyphenation (see hyphenate.ts). Editors type plain keyboard characters;
// this turns them into the conventions of each language so the site reads
// like set type, and keeps things together that must not be split across
// lines (DIN 5008 for German; the same rules serve English).

export const NBSP = ' '
const NARROW_NBSP = ' '

const QUOTES = {
  de: ['„', '“'],
  en: ['“', '”'],
} as const

export function typeset(text: string, locale: 'en' | 'de', { isSpan = false } = {}): string {
  // Invisible separators pasted in from Word/Pages (vertical tab, Unicode
  // line/paragraph separator): Chrome shows them as a space, Safari as
  // nothing ("KLARGESTALTET") or a box. Make them an ordinary line break,
  // which renders as a space wherever line breaks aren't kept.
  let t = text.replace(/[\v\u2028\u2029]/g, '\n')

  // Collapse runs of spaces ("PowerPoint,  Google Slides"), including a
  // pasted no-break space next to a normal one. Portable Text spans keep
  // their edge spaces — they separate them from the next span.
  t = t.replace(/[ \t\u00A0]{2,}/g, ' ')
  if (!isSpan) t = t.trim()

  // Quotes and apostrophes: "…" → „…“ (DE) / “…” (EN), it's → it’s.
  const [open, close] = QUOTES[locale]
  t = t.replace(/"([^"\n]*)"/g, `${open}$1${close}`)
  t = t.replace(/(\p{L})'(\p{L})/gu, '$1’$2')

  // Dashes and ellipsis: ranges get an en dash ("3–5"), a spaced hyphen
  // becomes a spaced en dash, three dots become one character.
  t = t.replace(/(?<![\d.,])(\d{1,4}) ?- ?(\d{1,4})(?![\d.,])/g, '$1–$2')
  t = t.replace(/ - /g, ' – ')
  t = t.replace(/\.\.\./g, '…')

  // Keep together what reads as one unit:
  // abbreviations ("z. B.", "d. h.") get a narrow no-break space inside…
  t = t.replace(/\b([zdusoa])\. ?([BhaTgÄä])\./g, `$1.${NARROW_NBSP}$2.`)
  // …a number stays with the word it counts ("25 Präsentationen"),
  t = t.replace(/(\d) (?=[\p{L}%€$])/gu, `$1${NBSP}`)
  // …"© 2026", "1 = best", and phone numbers never break.
  t = t.replace(/© /g, `©${NBSP}`)
  t = t.replace(/(\d) = /g, `$1${NBSP}=${NBSP}`)
  t = t.replace(/\+\d[\d ]{6,}\d/g, (phone) => phone.replace(/ /g, NBSP))

  return t
}

// Removes the last-pair no-break space that hyphenate.ts's finishLine adds,
// for headings: they use text-balance, which already prevents a lone last
// word, and a glued pair of large uppercase words ("FOLLOWS CONTENT.") can be
// wider than a narrow column, which would force a mid-word break. A number
// stays with its word ("25 Präsentationen").
export function releaseLastPair(text: string): string {
  return text
    .split(/(<br\s*\/?>)/i)
    .map((line) => line.replace(/(?<!\d)\u00A0(?=\S+\s*$)/, ' '))
    .join('')
}

// Editorial checks for bilingual (en/de) fields, shown in Studio as
// warnings — they never block publishing, they just catch the mistakes
// that slip through by hand: a forgotten translation, a leftover "EN:" note,
// a "du" in German copy that addresses clients with "Sie".
//
// Typography (quotes, dashes, no-break spaces) is fixed automatically when
// the site renders (src/lib/typography.ts), so it isn't checked here.

type Blocks = { children?: { text?: string }[] }[]
type Localized = { en?: string | Blocks; de?: string | Blocks }

const toText = (v: string | Blocks | undefined): string =>
  typeof v === 'string' ? v : (v ?? []).map((b) => (b.children ?? []).map((c) => c.text ?? '').join('')).join('\n')

// Informal address in German copy. "Sie/Ihr" (capitalised, formal) is fine.
const DE_INFORMAL =
  /\b(du|dich|dir|dein|deine|deinen|deinem|deiner|euch|euer|eure|euren|seid|kannst|bist|hast|willst|musst|erfahre|lerne|entdecke|kontaktiere|schau)\b/i

function check(text: string, lang: 'en' | 'de'): string[] {
  const issues: string[] = []
  if (/[ \u00A0]{2,}/.test(text)) issues.push('podwójna spacja')
  if (/[\v\u2028\u2029]/.test(text)) issues.push('niewidoczny znak złamania linii (wklejony z Worda/Pages) – Safari może go nie pokazać')
  if (text !== text.trim()) issues.push('spacja na początku lub końcu')
  if (/(^|\s)(EN|DE)\s*:/.test(text) || /\b(TODO|lorem ipsum)\b/i.test(text)) issues.push('roboczy dopisek (np. „EN:”, „TODO”)')
  if (lang === 'de') {
    const informal = text.match(DE_INFORMAL)
    if (informal) issues.push(`forma „du/ihr” („${informal[0]}”) – na stronie piszemy per „Sie”`)
  }
  return issues
}

export function localeWarnings(value: Localized | undefined): true | string {
  if (!value) return true
  const en = toText(value.en).trim()
  const de = toText(value.de).trim()
  const issues: string[] = []

  if (en && !de) issues.push('DE: brak tłumaczenia (strona pokaże tekst angielski)')
  if (de && !en) issues.push('EN: brak tłumaczenia')
  if (en && de && en === de && en.length > 3) issues.push('DE i EN są identyczne – czy na pewno przetłumaczone?')

  if (en) issues.push(...check(toText(value.en), 'en').map((i) => `EN: ${i}`))
  if (de) issues.push(...check(toText(value.de), 'de').map((i) => `DE: ${i}`))

  return issues.length ? issues.join(' · ') : true
}

// For schema objects with en/de fields: `validation: localeValidation`.
export const localeValidation = (Rule: any) => Rule.custom(localeWarnings).warning()

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
  if (/[ \u00A0]{2,}/.test(text)) issues.push('double space')
  if (/[\v\u2028\u2029]/.test(text)) issues.push('invisible line-break character (pasted from Word/Pages) – Safari may not render it')
  if (text !== text.trim()) issues.push('leading or trailing space')
  if (/(^|\s)(EN|DE)\s*:/.test(text) || /\b(TODO|lorem ipsum)\b/i.test(text)) issues.push('leftover draft note (e.g. "EN:", "TODO")')
  if (lang === 'de') {
    const informal = text.match(DE_INFORMAL)
    if (informal) issues.push(`informal "du/ihr" ("${informal[0]}") – the site addresses visitors as "Sie"`)
  }
  return issues
}

export function localeWarnings(value: Localized | undefined): true | string {
  if (!value) return true
  const en = toText(value.en).trim()
  const de = toText(value.de).trim()
  const issues: string[] = []

  if (en && !de) issues.push('DE: missing translation (the page will show the English text)')
  if (de && !en) issues.push('EN: missing translation')
  if (en && de && en === de && en.length > 3) issues.push('DE and EN are identical – are they actually translated?')

  if (en) issues.push(...check(toText(value.en), 'en').map((i) => `EN: ${i}`))
  if (de) issues.push(...check(toText(value.de), 'de').map((i) => `DE: ${i}`))

  return issues.length ? issues.join(' · ') : true
}

// For schema objects with en/de fields: `validation: localeValidation`.
export const localeValidation = (Rule: any) => Rule.custom(localeWarnings).warning()

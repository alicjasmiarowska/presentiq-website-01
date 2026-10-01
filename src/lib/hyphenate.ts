import { hyphenateSync as hyphenateDe } from 'hyphen/de'
import { hyphenateSync as hyphenateEn } from 'hyphen/en'
import { compoundSeams } from './germanCompounds'
import { NBSP, typeset } from './typography'

// Dictionary-correct hyphenation, done on the server.
//
// CSS `hyphens: auto` alone isn't reliable on phones — iOS Safari often
// won't break long German compounds (especially in uppercase headings), so
// "PRÄSENTATIONSAGENTUR" overflows and the page scrolls sideways. Instead we
// insert soft hyphens (U+00AD) at the correct syllable breaks before the
// text reaches the browser: every browser honours them, they stay invisible
// unless a line actually breaks there, and the patterns never ship to the
// client. CharReveal relies on them too, since it splits headings into
// per-character spans and leaves the browser nothing to hyphenate.

export const SOFT_HYPHEN = '\u00AD'

// Words shorter than this are never broken ("Adobe", "company").
const MIN_WORD_LENGTH = 8
// Never leave fewer than this many letters on either side of a break.
const MIN_FRAGMENT = 3
// In a German compound, a part this long may additionally break at its
// syllables; shorter parts stay whole so the compound seam is the only
// break a reader sees.
const DE_LONG_PART = 16

const cache = new Map<string, string>()

// Break offsets inside a single run of letters.
function breakOffsets(word: string, locale: 'en' | 'de'): number[] {
  const fn = locale === 'de' ? hyphenateDe : hyphenateEn
  const syllables: number[] = []
  let pos = 0
  for (const part of fn(word, { minWordLength: MIN_WORD_LENGTH }).split(SOFT_HYPHEN).slice(0, -1)) {
    pos += part.length
    syllables.push(pos)
  }
  const edgeSafe = (from: number, to: number) => (p: number) => p - from >= MIN_FRAGMENT && to - p >= MIN_FRAGMENT

  if (locale === 'de') {
    // German compounds break between their words first
    // ("Präsentations-agentur", "Kunden-zufriedenheit"); see germanCompounds.ts.
    const seams = compoundSeams(word)
    if (seams.length) {
      const bounds = [0, ...seams, word.length]
      const inner = syllables.filter((p) =>
        bounds.slice(1).some((to, i) => {
          const from = bounds[i]
          return p > from && p < to && to - from >= DE_LONG_PART && edgeSafe(from, to)(p)
        })
      )
      return [...seams, ...inner].sort((a, b) => a - b)
    }
  }
  return syllables.filter(edgeSafe(0, word.length))
}

// Words the patterns get wrong: brand names that must never break, and
// English terms used in German copy, which German patterns would split by
// German syllables ("Desi-gner", "Gui-de-lines"). "|" marks allowed breaks.
const EXCEPTIONS: Record<string, string> = {
  presentiq: 'presentiq',
  powerpoint: 'powerpoint',
  designer: 'designer',
  templates: 'tem|plates',
  template: 'tem|plate',
  guidelines: 'guide|lines',
  storytelling: 'story|telling',
  workspace: 'work|space',
  business: 'busi|ness',
  copyright: 'copy|right',
  keynotes: 'key|notes',
}

function hyphenateWord(word: string, locale: 'en' | 'de'): string {
  if (word.length < MIN_WORD_LENGTH) return word
  const exception = EXCEPTIONS[word.toLowerCase()]
  if (exception) {
    let pos = 0
    return exception
      .split('|')
      .map((part) => word.slice(pos, (pos += part.length)))
      .join(SOFT_HYPHEN)
  }
  // CamelCase is a product name ("PowerPoint", "InDesign") — keep it whole.
  if (/\p{Ll}\p{Lu}/u.test(word)) return word
  let out = ''
  let pos = 0
  for (const p of breakOffsets(word, locale)) {
    out += word.slice(pos, p) + SOFT_HYPHEN
    pos = p
  }
  return out + word.slice(pos)
}

// A line's last word stays whole and on the same line as the word before
// it, so no paragraph or heading ends on a hyphenated fragment or a lone
// word. Long words are exempt: on a narrow phone they may still need to
// break.
const LAST_WORD_MAX = 12
const LAST_PAIR_MAX = 20
const letters = (w: string) => w.replace(/[^\p{L}\d]/gu, '').length

function finishLine(line: string): string {
  const words = line.trim().split(' ').filter(Boolean).length
  return line.replace(/(?:([^ ]+) )?([^ ]+?)( *)$/, (match, prev: string | undefined, last: string, trail: string) => {
    if (letters(last) > LAST_WORD_MAX) return match
    const lastWhole = stripSoftHyphens(last)
    if (!prev) return lastWhole + trail
    const glue = words >= 3 && letters(prev) + letters(last) <= LAST_PAIR_MAX ? NBSP : ' '
    return prev + glue + lastWhole + trail
  })
}

export function hyphenate(text: string, locale: 'en' | 'de', { isSpan = false } = {}): string {
  if (!text) return text
  const clean = typeset(stripSoftHyphens(text), locale, { isSpan })
  const key = locale + (isSpan ? 'span:' : '') + clean
  const hit = cache.get(key)
  if (hit !== undefined) return hit

  // Leave anything that isn't plain prose alone: e-mail addresses, URLs,
  // and the <br> line-break marker editors type into headings. Within a
  // token, each run of letters is a word — so "Business-Präsentationen"
  // keeps its real hyphen and each half is handled on its own.
  let result = clean.replace(/[^\s<>]+/g, (token) =>
    /[@/:.]\S/.test(token) ? token : token.replace(/\p{L}+/gu, (word) => hyphenateWord(word, locale))
  )
  // Portable Text spans are fragments of a paragraph, so they have no
  // line ending of their own to finish.
  if (!isSpan) result = result.split(/(\n|<br\s*\/?>)/i).map(finishLine).join('')

  if (cache.size > 5000) cache.clear()
  cache.set(key, result)
  return result
}

export function stripSoftHyphens<T extends string | undefined>(text: T): T {
  return (text ? text.replace(/\u00AD/g, '') : text) as T
}

// Walks a Sanity query result and typesets + hyphenates every localized
// string:
// the value under an `en` / `de` key, and Portable Text span `text` inside
// one. Everything else (slugs, hrefs, asset refs, _type, marks, …) is left
// untouched.
export function hyphenateLocalized<T>(value: T, lang: 'en' | 'de' | null = null, key?: string): T {
  if (typeof value === 'string') {
    return (lang && (key === 'en' || key === 'de' || key === 'text') ? hyphenate(value, lang, { isSpan: key === 'text' }) : value) as T
  }
  if (Array.isArray(value)) {
    return value.map((item) => hyphenateLocalized(item, lang, key)) as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) {
      const childLang = k === 'en' || k === 'de' ? k : lang
      out[k] = k.startsWith('_') ? v : hyphenateLocalized(v, childLang, k)
    }
    return out as T
  }
  return value
}

// JSON-LD for search engines must not carry soft hyphens.
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/\u00AD/g, '')
}

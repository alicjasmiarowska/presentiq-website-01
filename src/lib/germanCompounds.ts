// Splits German compounds into the words they're built from, so long words
// break at the seam a reader expects ("Präsentations-agentur",
// "Kunden-zufriedenheit") rather than at whatever syllable happens to fit
// ("Präsentati-onsagentur").
//
// Hyphenation patterns only know syllables, not where one word ends and the
// next begins, so we match against a list of known word stems instead. The
// list covers every compound currently on the site plus common
// presentation/agency vocabulary. A word built from parts that aren't listed
// still hyphenates, just at its syllables — to teach it a new compound, add
// the parts (lowercase, base form) to STEMS.

const STEMS = new Set([
  'ablauf', 'agentur', 'amts', 'anfrage', 'angebot', 'anhalt', 'animation',
  'ansprüche', 'arbeit', 'arbeits', 'archiv', 'argument', 'argumentations',
  'arten', 'aufenthalts', 'aufmerksamkeits', 'aufsichts', 'auftrag',
  'auskunfts', 'aussage', 'ausschluss', 'behelfs', 'behörde', 'beispiel',
  'beratung', 'bereit', 'bericht', 'beschwerde', 'betreiber', 'betriebs',
  'bezogen', 'bibliothek', 'bild', 'botschaft', 'branche', 'broschüre',
  'computer', 'corporate', 'datei', 'daten', 'dauer', 'deck', 'design',
  'diagramm', 'dokument', 'druck', 'einsatz', 'entwurf', 'erfolg', 'erfolgs',
  'event', 'fach', 'fähig', 'fähigkeit', 'faktor', 'farb', 'farbe', 'fertig',
  'film', 'finanz', 'firma', 'flyer', 'folie', 'folien', 'format',
  'forschungs', 'foto', 'führer', 'führung', 'funktions', 'geber', 'gericht',
  'geschäfts', 'gesellschaft', 'gesetz', 'gestaltung', 'grafik', 'grund',
  'gruppen', 'haftungs', 'handbuch', 'handels', 'haupt', 'idee',
  'identifikations', 'identität', 'illustration', 'implementierungs',
  'impressum', 'infografik', 'information', 'informations', 'inhalt',
  'inhalts', 'instrument', 'investor', 'jahres', 'katalog', 'kern',
  'keynote', 'kiste', 'kolleg', 'kommunikation', 'kommunikations',
  'komposition', 'konferenz', 'konform', 'konformität', 'kontakt', 'konzept',
  'konzern', 'kosten', 'kräftig', 'kunde', 'kunden', 'lage', 'last',
  'layout', 'leistungs', 'leitfaden', 'liefer', 'logik', 'logo', 'lösch',
  'lücken', 'management', 'marke', 'marken', 'marketing', 'materialien',
  'messe', 'mittelstand', 'möglichkeit', 'nacht', 'nummer', 'orts',
  'personen', 'pflicht', 'pitch', 'plakat', 'plan', 'pläne', 'platz',
  'präsentation', 'priorität', 'problem', 'produkt', 'produktions',
  'projekt', 'prozess', 'punkt', 'punkte', 'qualität', 'quartal', 'quartals',
  'rahmen', 'recht', 'rechte', 'rechtlich', 'rechts', 'register', 'reif',
  'richtlinie', 'schrift', 'schulung', 'schutz', 'seiten', 'service',
  'sicherheits', 'speicher', 'sprache', 'stand', 'stark', 'steuer', 'story',
  'storytelling', 'strategie', 'struktur', 'studio', 'support', 'symbol',
  'system', 'tabelle', 'tagen', 'tages', 'team', 'text', 'training',
  'transformation', 'typen', 'übertrag', 'umsatz', 'unions', 'unternehmens',
  'urheber', 'urteils', 'verkauf', 'vermögen', 'versammlungs', 'vertriebs',
  'verwaltungs', 'video', 'vorlag', 'vorlage', 'vorstands', 'weise', 'werbe',
  'werkzeug', 'widerspruchs', 'widrig', 'wirkung', 'wochenend', 'workshop',
  'würdig', 'zahlen', 'zeit', 'ziel', 'zielgruppe', 'zufriedenheit',
  'zugang', 'zusammen', 'zweck',
  'ausrichtung', 'bewertung', 'dienst', 'direkt', 'einwilligung',
  'entscheidung', 'erklärung', 'erzähl', 'findung', 'leistung', 'verarbeitung',
  'verletzung', 'verordnung', 'visualisierung', 'werbung',
  // base forms of linked parts above, for when they end a compound
  'unternehmen', 'vertrieb', 'vorstand', 'versammlung', 'umgebung',
])

// Linking elements ("Fugen") that may join a part to the next one:
// Präsentation-s-agentur, Kunde-n-zufriedenheit.
const LINKS = ['', 's', 'es', 'n', 'en', 'ns']
// Inflection/derivation endings allowed on the last part:
// …präsentation-en, …vorlag-en, …lösch-ung.
const ENDINGS = ['', 'e', 'en', 'n', 's', 'es', 'er', 'ern', 'em', 'ung']
// Every part must be at least this long, so a short syllable is never
// mistaken for a word.
const MIN_PART = 4

const hasStem = (s: string, suffixes: string[]) =>
  suffixes.some(
    (x) => s.endsWith(x) && s.length - x.length >= MIN_PART && STEMS.has(s.slice(0, s.length - x.length))
  )

const memo = new Map<string, number[] | null>()

// Offsets where `word` (lowercase) splits into compound parts, or null when
// it isn't a known compound.
function seams(word: string): number[] | null {
  const cached = memo.get(word)
  if (cached !== undefined) return cached

  let plain: number[] | null = null
  let linked: number[] | null = null
  // Longest first part wins; a plain join ("Umsatz|steuer") beats one that
  // needs a linking element ("Umsatzs|teuer").
  for (let q = word.length - MIN_PART; q >= MIN_PART; q--) {
    const rest = word.slice(q)
    const restSeams = hasStem(rest, ENDINGS) ? [] : seams(rest)
    if (!restSeams) continue
    const found = [q, ...restSeams.map((s) => s + q)]
    const left = word.slice(0, q)
    if (STEMS.has(left)) {
      plain = found
      break
    }
    if (!linked && hasStem(left, LINKS)) linked = found
  }

  const result = plain ?? linked
  memo.set(word, result)
  return result
}

// Fixed breaks the stem list can't express: any part starting with the key
// breaks after `at` letters ("Unter-nehmen", "Unter-nehmens-präsentation").
const FIXED_BREAKS: [string, number][] = [['unternehm', 5]]

export function compoundSeams(word: string): number[] {
  const w = word.toLowerCase()
  const found = seams(w) ?? []
  const fixed = [0, ...found].flatMap((start) =>
    FIXED_BREAKS.filter(([key]) => w.startsWith(key, start)).map(([, at]) => start + at)
  )
  return [...new Set([...found, ...fixed])].sort((a, b) => a - b)
}

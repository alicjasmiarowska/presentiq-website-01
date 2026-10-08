// Resolves a localized field: the requested locale, then English, then an
// empty string.
export function resolveLocale<T = string>(
  field: { en?: T; de?: T } | null | undefined,
  locale: 'en' | 'de'
): T | '' {
  return field?.[locale] || field?.en || ''
}

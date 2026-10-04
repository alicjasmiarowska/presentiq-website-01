// Shared locale-field resolver: every component/page redefined this same
// three-line fallback inline (`de`/`en` value, falling back to English,
// falling back to an empty string) — one function instead of 40+ copies.
export function resolveLocale<T = string>(
  field: { en?: T; de?: T } | null | undefined,
  locale: 'en' | 'de'
): T | '' {
  return field?.[locale] || field?.en || ''
}

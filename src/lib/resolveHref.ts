interface ButtonPage {
  type?: string
  slug?: string
}

export function resolveButtonHref(
  locale: string,
  buttonPage?: ButtonPage | null,
  buttonHref?: string
): string | undefined {
  if (buttonPage?.type === 'homepage') return `/${locale}`
  // Case studies live at the site root too, same as every other page, so
  // no special-casing needed beyond the generic slug branch below.
  if (buttonPage?.slug) return `/${locale}/${buttonPage.slug}`
  if (buttonHref) return buttonHref.startsWith('http') ? buttonHref : `/${locale}${buttonHref}`
  return undefined
}

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
  if (buttonPage?.slug) return `/${locale}/${buttonPage.slug}`
  if (buttonHref) return buttonHref.startsWith('http') ? buttonHref : `/${locale}${buttonHref}`
  return undefined
}

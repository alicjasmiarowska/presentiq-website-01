// Shared shapes for two patterns that were typed ad hoc as `any` all over
// the component tree: a Sanity image field (asset ref + our custom alt/
// aiGenerated fields) and a localized Portable Text body.

export interface SanityImageValue {
  asset?: {
    _ref?: string
    _type?: string
    url?: string
  }
  alt?: string
  aiGenerated?: boolean
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  [key: string]: unknown
}

export interface PortableTextLocaleValue {
  en?: any[]
  de?: any[]
}

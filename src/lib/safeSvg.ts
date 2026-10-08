// Gatekeeper for SVG markup fetched from the CMS and inlined into the page
// (features.tsx tints icons with currentColor that way). An uploaded SVG
// can carry <script>, on* handlers or javascript: links that would run for
// every visitor, so instead of trying to clean a file we only accept one
// built entirely from plain drawing elements and attributes on these
// allowlists — anything else is rejected and the icon is simply left out.

const ALLOWED_ELEMENTS = new Set([
  'svg', 'g', 'path', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'rect',
  'defs', 'clippath', 'mask', 'lineargradient', 'radialgradient', 'stop',
  'title', 'desc', 'symbol', 'use',
])

const ALLOWED_ATTRIBUTES = new Set([
  'xmlns', 'xmlns:xlink', 'version', 'id', 'class', 'viewbox', 'width', 'height',
  'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'd', 'points',
  'fill', 'fill-rule', 'fill-opacity', 'clip-rule', 'clip-path', 'mask', 'opacity',
  'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
  'stroke-dasharray', 'stroke-dashoffset', 'stroke-opacity', 'transform',
  'gradientunits', 'gradienttransform', 'offset', 'stop-color', 'stop-opacity',
  'preserveaspectratio', 'maskunits', 'clippathunits', 'href', 'xlink:href',
  'aria-hidden', 'role', 'focusable',
])

export function safeSvg(markup: string): string | null {
  // Doctype/entity declarations can define their own markup; CDATA hides it.
  if (/<!(?!--)/.test(markup)) return null
  const body = markup.replace(/^\s*<\?xml[^>]*\?>/, '').replace(/<!--[\s\S]*?-->/g, '')
  if (/<\?/.test(body)) return null

  for (const [, name, attrs] of body.matchAll(/<\s*([^\s/>]+)([^>]*)>/g)) {
    if (!ALLOWED_ELEMENTS.has(name.toLowerCase())) return null
    for (const [, attr, value = ''] of attrs.matchAll(/([^\s=/]+)\s*(?:=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g)) {
      if (!ALLOWED_ATTRIBUTES.has(attr.toLowerCase())) return null
      const v = value.replace(/^["']|["']$/g, '').trim()
      // Links may only point inside the same SVG ("#gradient").
      if (/^(xlink:)?href$/i.test(attr) && !v.startsWith('#')) return null
      // url() references, likewise, only to fragments in this document.
      if (/url\(\s*['"]?(?!#)/i.test(v)) return null
    }
  }
  // Closing tags must also be allowed elements (catches "</script>" et al.).
  for (const [, name] of body.matchAll(/<\/\s*([^\s>]+)\s*>/g)) {
    if (!ALLOWED_ELEMENTS.has(name.toLowerCase())) return null
  }
  return body.trim()
}

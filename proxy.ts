import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'de']

// Content Security Policy with a fresh nonce per request. Only scripts that
// carry the nonce (Next.js's own, and next/script tags given it in the root
// layout) may run, plus whatever those load ('strict-dynamic') — an injected
// <script> or inline event handler is blocked even if markup slips through.
// Every page renders per request (force-dynamic), so the nonce costs nothing.
// Styles stay 'unsafe-inline': the site sets style attributes, which a
// nonce can't cover, and injected CSS can't run code.
// Studio (/studio) is excluded: it injects its own inline scripts.
const isDev = process.env.NODE_ENV === 'development'
// The cookie banner (Usercentrics) loads its UI and talks to its API from
// these hosts once a settings id is configured.
const consentHosts = process.env.NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID ? ' https://*.usercentrics.eu' : ''

function contentSecurityPolicy(nonce: string): string {
  return `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline'${consentHosts};
    img-src 'self' data: blob: https://cdn.sanity.io${consentHosts};
    font-src 'self' data:${consentHosts};
    connect-src 'self'${consentHosts};
    media-src 'self' https://cdn.sanity.io;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim()
}

// German is the primary language: the bare domain and unprefixed paths
// resolve to /de.
const defaultLocale = 'de'

// Signatures of vulnerability scanners / scraping tools, not legitimate
// browsers or search engines. Safe to reject outright.
const BLOCKED_USER_AGENTS =
  /sqlmap|nikto|nessus|nmap|masscan|zgrab|openvas|w3af|acunetix|netsparker|dirbuster|gobuster|wpscan/i

// Best-effort rate limiting. This holds state in memory per server instance,
// so it resets on cold start and isn't shared across regions/instances — it
// blunts casual scripted abuse but is NOT a substitute for edge-level IP
// blocking. For real IP blocking/DDoS protection, configure Vercel's
// Firewall (Project Settings > Firewall) or put Cloudflare in front.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 180
const requestCounts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (requestCounts.size > 5000) {
    for (const [key, entry] of requestCounts) {
      if (entry.resetAt <= now) requestCounts.delete(key)
    }
  }

  const entry = requestCounts.get(ip)
  if (!entry || entry.resetAt <= now) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get('user-agent') ?? ''

  if (BLOCKED_USER_AGENTS.test(userAgent)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' },
    })
  }

  const matchedLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (matchedLocale) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const csp = contentSecurityPolicy(nonce)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', matchedLocale)
    // Next.js reads the nonce from the request's CSP header and stamps it on
    // its own scripts; the layout reads x-nonce for next/script.
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set('Content-Security-Policy', csp)
    const response = NextResponse.next({ request: { headers: requestHeaders } })
    response.headers.set('Content-Security-Policy', csp)
    return response
  }

  // Single hop to the localized URL: "/" → "/de", not "/de/" → "/de".
  const target = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  return NextResponse.redirect(new URL(target, request.url))
}

export const config = {
  matcher: ['/((?!_next|studio|api|.*\\..*).*)'],
}

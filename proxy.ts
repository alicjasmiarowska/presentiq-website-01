import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'de']
const defaultLocale = 'en'

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
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', matchedLocale)
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  )
}

export const config = {
  matcher: ['/((?!_next|studio|api|.*\\..*).*)'],
}

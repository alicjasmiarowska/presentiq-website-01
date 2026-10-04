'use server'

import { headers } from 'next/headers'
import { graphConfig, sendMail } from '@/src/lib/mail/graph'
import { validateContact, type ContactErrors, type ContactValues } from '@/src/lib/contactForm'

export interface ContactState {
  status: 'idle' | 'success' | 'invalid' | 'error'
  errors?: ContactErrors
}

// Bots fill forms in well under this; people don't.
const MIN_FILL_MS = 3000
// Per-IP limit. Kept in memory, so on serverless it's per instance — a
// speed bump for scripted floods, not a hard guarantee.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }
const recent = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
  hits.push(now)
  recent.set(ip, hits)
  if (recent.size > 1000) recent.clear()
  return hits.length > RATE_LIMIT.max
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function messageHtml(v: ContactValues, locale: string): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${label}</td><td style="padding:6px 0">${value}</td></tr>`
  const sentAt = new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  }).format(new Date())

  return `<div style="font-family:Segoe UI,Arial,sans-serif;font-size:15px;color:#000023">
  <p>Neue Anfrage über das Kontaktformular auf presentiq.de:</p>
  <table style="border-collapse:collapse">
    ${row('Name', escapeHtml(v.name))}
    ${row('E-Mail', `<a href="mailto:${escapeHtml(v.email)}">${escapeHtml(v.email)}</a>`)}
    ${v.phone ? row('Telefon', escapeHtml(v.phone)) : ''}
    ${row('Sprache', locale === 'de' ? 'Deutsch' : 'Englisch')}
    ${row('Gesendet', sentAt)}
  </table>
  <p style="margin-top:20px;padding:16px;background:#f3f5fb;border-radius:8px;white-space:pre-wrap">${escapeHtml(v.message)}</p>
  <p style="color:#666;font-size:13px">Einfach auf „Antworten“ klicken – die Antwort geht direkt an ${escapeHtml(v.name)}.</p>
</div>`
}

export async function sendContactMessage(
  locale: 'en' | 'de',
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values: ContactValues = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    privacyConsent: formData.get('privacyConsent') === 'on',
  }

  // Spam traps: a hidden field only bots fill in, and a form submitted
  // faster than a person could type. Bots get a fake success so they
  // don't learn to adapt.
  const honeypot = String(formData.get('website') ?? '')
  const startedAt = Number(formData.get('startedAt') ?? 0)
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: 'success' }
  }

  const errors = validateContact(values, locale)
  if (Object.keys(errors).length) return { status: 'invalid', errors }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) return { status: 'error' }

  const config = graphConfig()
  if (!config) {
    // Local development without Microsoft 365 credentials: show the message
    // in the terminal instead of sending it. In production a missing
    // configuration is an error, never a silent success.
    if (process.env.NODE_ENV !== 'production') {
      console.info('[contact] MS Graph not configured – message not sent:', values)
      return { status: 'success' }
    }
    console.error('[contact] MS Graph not configured – set MS_GRAPH_* and CONTACT_FROM')
    return { status: 'error' }
  }

  const to = (process.env.CONTACT_TO || config.sender)
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean)

  try {
    await sendMail(config, {
      to,
      subject: `Kontaktanfrage von ${values.name}`,
      html: messageHtml(values, locale),
      replyTo: { name: values.name, address: values.email },
    })
    return { status: 'success' }
  } catch (err) {
    console.error('[contact] sending failed:', err)
    return { status: 'error' }
  }
}

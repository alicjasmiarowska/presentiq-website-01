// Sends e-mail through Microsoft Graph from the client's own Microsoft 365
// mailbox. presentiq.de's mail runs on Exchange Online and its SPF record
// only allows Microsoft's servers, so mail sent this way passes SPF/DKIM,
// lands in the inbox instead of spam, and a copy stays in "Sent Items".
// (SMTP with a password is not an option: Exchange Online has retired
// basic auth for SMTP.)
//
// Uses an Entra ID app registration with the application permission
// Mail.Send (client-credentials flow). Setup steps for the client's admin
// are in docs/kontaktformular-microsoft-365.md. Server-only: the secret
// must never reach the browser.

interface GraphConfig {
  tenantId: string
  clientId: string
  clientSecret: string
  sender: string
}

export function graphConfig(): GraphConfig | null {
  const tenantId = process.env.MS_GRAPH_TENANT_ID
  const clientId = process.env.MS_GRAPH_CLIENT_ID
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET
  const sender = process.env.CONTACT_FROM
  if (!tenantId || !clientId || !clientSecret || !sender) return null
  return { tenantId, clientId, clientSecret, sender }
}

let cachedToken: { value: string; expiresAt: number } | null = null

async function accessToken(config: GraphConfig): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value

  const res = await fetch(`https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`Microsoft login failed (${res.status}): ${await res.text()}`)
  }
  const data = (await res.json()) as { access_token: string; expires_in: number }
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 }
  return data.access_token
}

export interface MailMessage {
  to: string[]
  subject: string
  html: string
  replyTo?: { name: string; address: string }
}

export async function sendMail(config: GraphConfig, message: MailMessage): Promise<void> {
  const token = await accessToken(config)
  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.sender)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: {
        subject: message.subject,
        body: { contentType: 'HTML', content: message.html },
        toRecipients: message.to.map((address) => ({ emailAddress: { address } })),
        replyTo: message.replyTo
          ? [{ emailAddress: { name: message.replyTo.name, address: message.replyTo.address } }]
          : [],
      },
      saveToSentItems: true,
    }),
    cache: 'no-store',
  })
  // Graph answers 202 Accepted with an empty body on success.
  if (res.status !== 202) {
    throw new Error(`Microsoft Graph sendMail failed (${res.status}): ${await res.text()}`)
  }
}

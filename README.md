# Presentiq website

Marketing website of Presentiq GmbH, a presentation design agency — [presentiq.de](https://presentiq.de), in English and German.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Sanity 6](https://www.sanity.io) as the CMS, with the Studio mounted at `/studio`
- Microsoft Graph (Microsoft 365) for the contact form

## Getting started

Requires Node.js 22.12 or later.

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000) and redirects to `/en`. Content is edited in the Studio at [http://localhost:3000/studio](http://localhost:3000/studio) (Sanity account required).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

## Environment variables

Set in `.env.local` for development and in the hosting environment for production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, e.g. `https://presentiq.de` (canonical links, sitemap, link previews) |
| `NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID` | Usercentrics cookie banner; optional |
| `MS_GRAPH_TENANT_ID` | Microsoft 365 tenant of the mailbox that sends contact form mail |
| `MS_GRAPH_CLIENT_ID` | Entra ID app registration for the contact form |
| `MS_GRAPH_CLIENT_SECRET` | Secret of that app registration (server only) |
| `CONTACT_FROM` | Mailbox the contact form sends from |
| `CONTACT_TO` | Recipients, comma-separated; defaults to `CONTACT_FROM` |

`NEXT_PUBLIC_*` values are embedded at build time, so changing them requires a new deployment. Without the Microsoft 365 variables, the contact form logs messages to the terminal in development and reports an error in production. Setup steps for the client's Microsoft 365 admin: [docs/kontaktformular-microsoft-365.md](docs/kontaktformular-microsoft-365.md).

The Sanity project ID and dataset are set in `sanity/env.ts`.

## Project structure

```
app/                  Routes: [locale] pages, Studio, sitemap, robots, manifest
src/components/       atoms → molecules → organisms
src/lib/              Typography and hyphenation, metadata, image loader, mail
src/styles/           Design tokens (colours, type scale)
sanity/               Studio schemas, structure and data fetching
scripts/              One-off content migration scripts (npx sanity exec …)
docs/                 Operational documentation
public/               Static assets, icons, llms.txt
```

## Notes

- **Layout tiers:** phones and portrait tablets share one stacked layout; the desktop layout starts at 1104px. See the comment at the top of `app/globals.css` for the breakpoints.
- **Images** are resized and compressed by the Sanity CDN (`src/lib/imageLoader.ts`), not by the Next.js image optimizer.
- **Security headers:** a per-request nonce Content Security Policy is set in `proxy.ts`; the remaining headers are in `next.config.ts`.
- **CMS text** is typeset and hyphenated on the server (`src/lib/typography.ts`, `src/lib/hyphenate.ts`) so long German words wrap correctly on every device.

## Deployment

Any Node.js host that runs `next start` (e.g. Vercel). Before going live: set the environment variables above, add the production domain to the Sanity project's CORS origins, and redirect `www.presentiq.de` to `presentiq.de`.

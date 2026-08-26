import type { MetadataRoute } from 'next'
import { siteUrl } from '../src/lib/siteUrl'

// AI crawlers that scrape content for model *training* — blocked.
// AI crawlers that fetch pages for real-time search/citation (e.g. ChatGPT
// Search, Perplexity answers) are intentionally left allowed under the
// wildcard rule below, since being cited by AI assistants is desirable here.
const AI_TRAINING_BOTS = [
  'GPTBot',
  'Google-Extended',
  'CCBot',
  'ClaudeBot',
  'anthropic-ai',
  'Bytespider',
  'Meta-ExternalAgent',
  'Applebot-Extended',
  'Timpibot',
  'omgili',
  'omgilibot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/studio',
      },
      ...AI_TRAINING_BOTS.map((userAgent) => ({
        userAgent,
        disallow: '/',
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

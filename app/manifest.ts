import type { MetadataRoute } from 'next'

// Name, colours and icons used when the site is added to a phone's home
// screen (Android; iOS reads app/apple-icon.png).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Presentiq',
    short_name: 'Presentiq',
    start_url: '/',
    display: 'browser',
    background_color: '#000023',
    theme_color: '#000023',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

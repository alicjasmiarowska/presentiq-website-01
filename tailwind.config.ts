import type { Config } from 'tailwindcss'
import { colors, typography } from './src/styles/design-tokens'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      fontSize: typography.fontSize,
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
      },
      fontWeight: {
      'semibold': '600',
      'bold': '700',
      'extrabold': '800',
    },
    },
  },
  plugins: [],
}

export default config

export const colors = {
  primary: {
    dark: '#000023',
    blue: '#0055FF',
    yellow: '#FFC300',
  },
  neutral: {
    white: '#FFFFFF',
    light: '#E5E5E5',
  },
  text: {
    primary: '#000023',
    secondary: '#666666',
  },
  bg: {
    light: '#FFFFFF',
    dark: '#000023',
  },
}

// Shared page-content width cap: every section's readable content lines up
// to this, even when its own background bleeds full-bleed to the true
// viewport edge (see `edgeGutter` below). Keep in sync with the "1680px"
// literals in `edgeGutter` — they can't reference this value directly
// because Tailwind needs each full class string present verbatim in the
// source to generate it (no interpolation inside an arbitrary value).
export const layout = {
  maxWidth: '1680px',
  // For a full-width color block split into side-by-side cells (e.g. a
  // two- or four-column section where each cell's background should reach
  // the true viewport edge): apply `left`/`right` to whichever cell edge
  // faces that outer viewport edge. It behaves exactly like the site's
  // normal px-6/md:px-12/lg:px-20 gutter on every screen up to 1680px wide;
  // only past that width does it grow further, so outer text keeps lining
  // up with the page's normal max-w-[1680px] content instead of drifting
  // toward the screen edge. The opposite (inner/shared) side should just
  // use the plain px-6/md:px-12/lg:px-20 scale.
  edgeGutter: {
    left: 'pl-6 md:pl-[max(48px,calc((100vw_-_1680px)/2))] lg:pl-[max(80px,calc((100vw_-_1680px)/2))]',
    right: 'pr-6 md:pr-[max(48px,calc((100vw_-_1680px)/2))] lg:pr-[max(80px,calc((100vw_-_1680px)/2))]',
  },
}

export const typography = {
  fontFamily: {
    sans: ['Roboto', 'sans-serif'],
    display: ['"Red Hat Display"', 'sans-serif'],
  },
  fontSize: {
    xs: ['12px', { lineHeight: '16px' }],
    sm: ['18px', { lineHeight: '20px' }],
    base: ['22px', { lineHeight: '28px' }],
    lg: ['28px', { lineHeight: '32px' }],
    xl: ['36px', { lineHeight: '28px' }],
    '2xl': ['24px', { lineHeight: '32px' }],
    '3xl': ['30px', { lineHeight: '36px' }],
    '4xl': ['36px', { lineHeight: '40px' }],
    '5xl': ['48px', { lineHeight: '52px' }],
    '6xl': ['60px', { lineHeight: '68px' }],
  },
  // Responsive per-level sizes for the Heading atom's default variant
  // (h1–h5; h6 reuses `base` above). Three steps matching the site's
  // mobile/md/lg breakpoints — kept size-only (no bundled line-height) since
  // Heading applies its own `leading-*` utility on top.
  headingSize: {
    h1: '48px',
    'h1-md': '72px',
    'h1-lg': '112px',
    h2: '36px',
    'h2-md': '56px',
    'h2-lg': '84px',
    h3: '28px',
    'h3-md': '36px',
    'h3-lg': '48px',
    h4: '22px',
    'h4-md': '26px',
    'h4-lg': '32px',
    h5: '18px',
    'h5-md': '20px',
    'h5-lg': '24px',
  },
  // The site-wide "section heading" look (Heading's `variant="section"`):
  // one fluid clamp size applied via inline style, so it scales smoothly
  // instead of stepping at breakpoints like the scale above.
  sectionHeading: {
    fontSize: 'clamp(28px, 3.5vw, 40px)',
  },
}
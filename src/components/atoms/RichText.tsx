import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react'
import { SECTION_VARIANT_CLASSES, SECTION_VARIANT_STYLE } from './Heading'

interface RichTextProps {
  value: PortableTextBlock[] | null | undefined
  className?: string
  // "secondary" (navy text, the default) for light backgrounds; "primary"
  // (white text) for navy sections such as PhotoTextSplit and
  // CollaborationSection.
  color?: 'primary' | 'secondary'
}

function buildComponents(color: 'primary' | 'secondary'): PortableTextComponents {
  const textColor = color === 'primary' ? 'text-white' : 'text-primary-dark'
  const quoteColor = color === 'primary' ? 'text-white/70' : 'text-gray-600'

  return {
    block: {
      h2: ({ children }) => (
        <h2
          className={`${SECTION_VARIANT_CLASSES} ${textColor} mt-12 mb-4 first:mt-0 text-balance hyphens-manual`}
          style={SECTION_VARIANT_STYLE}
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          className={`${SECTION_VARIANT_CLASSES} ${textColor} mt-8 mb-3 text-balance hyphens-manual`}
          style={SECTION_VARIANT_STYLE}
        >
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className={`border-l-4 border-primary-blue pl-6 italic ${quoteColor} my-6 text-pretty hyphens-manual`}>
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className={`max-w-[70ch] text-base ${textColor} leading-relaxed mb-4 text-pretty hyphens-manual whitespace-pre-line`}>{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="[list-style-type:square] pl-6 mb-4 space-y-2">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className={`max-w-[70ch] text-base ${textColor} leading-relaxed text-pretty hyphens-manual`}>{children}</li>,
      number: ({ children }) => <li className={`max-w-[70ch] text-base ${textColor} leading-relaxed text-pretty hyphens-manual`}>{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => {
        const href = value?.href || '#'
        const isExternal = href.startsWith('http')
        return (
          <a
            href={href}
            className="text-primary-blue underline hover:no-underline"
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {children}
          </a>
        )
      },
    },
  }
}

export default function RichText({ value, className = '', color = 'secondary' }: RichTextProps) {
  if (!value || value.length === 0) return null

  return (
    <div className={className}>
      <PortableText value={value} components={buildComponents(color)} />
    </div>
  )
}

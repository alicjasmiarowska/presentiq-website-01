import { PortableText, type PortableTextComponents } from '@portabletext/react'

interface RichTextProps {
  value: any
  className?: string
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-[32px] font-bold text-primary-dark mt-12 mb-4 first:mt-0 text-balance hyphens-auto">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl font-bold text-primary-dark mt-8 mb-3 text-balance hyphens-auto">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-blue pl-6 italic text-gray-600 my-6 text-pretty hyphens-auto">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base text-primary-dark leading-relaxed mb-4 text-pretty hyphens-auto">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base text-primary-dark leading-relaxed text-pretty hyphens-auto">{children}</li>,
    number: ({ children }) => <li className="text-base text-primary-dark leading-relaxed text-pretty hyphens-auto">{children}</li>,
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

export default function RichText({ value, className = '' }: RichTextProps) {
  if (!value || value.length === 0) return null

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}

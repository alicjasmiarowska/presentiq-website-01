interface TextProps {
  text: string
  size?: 'sm' | 'base' | 'lg' | 'xl'
  color?: 'primary' | 'secondary'
  className?: string
}

export default function Text({ 
  text, 
  size = 'base', 
  color = 'primary',
  className = ''
}: TextProps) {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  const colors = {
    primary: 'text-white',
    secondary: 'text-primary-dark',
  }

  return (
    <p className={`${sizes[size]} ${colors[color]} leading-relaxed whitespace-pre-line text-pretty hyphens-auto ${className}`}>
      {text}
    </p>
  )
}
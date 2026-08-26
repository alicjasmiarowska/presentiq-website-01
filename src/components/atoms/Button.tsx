import Link from 'next/link'

interface ButtonProps {
  text: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'secondary-light'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Button({
  text,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = ''
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-200'

  const variants = {
    primary: 'bg-primary-blue text-white hover:scale-110 active:scale-105',
    secondary: 'border-2 border-white text-white hover:scale-110 active:bg-white active:text-primary-blue active:scale-105',
    'secondary-light': 'border-2 border-primary-blue text-primary-blue hover:scale-110 active:bg-primary-blue active:text-white active:scale-105',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
  }

  const classes = `inline-block text-center ${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {text}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

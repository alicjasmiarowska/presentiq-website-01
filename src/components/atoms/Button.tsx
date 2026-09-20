import Link from 'next/link'

interface ButtonProps {
  text: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'secondary-light' | 'text'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showArrow?: boolean
  arrowClassName?: string
}

function ArrowIcon({ className = 'text-primary-blue' }: { className?: string }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Button({
  text,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  showArrow = false,
  arrowClassName,
}: ButtonProps) {
  const baseStyles = 'transition-all duration-200'

  const variants = {
    primary: 'font-semibold rounded-full bg-primary-blue text-white hover:scale-110 active:scale-105',
    secondary: 'font-semibold rounded-full border-2 border-white text-white hover:scale-110 active:bg-white active:text-primary-blue active:scale-105',
    'secondary-light': 'font-semibold rounded-full border-2 border-primary-blue text-primary-blue hover:scale-110 active:bg-primary-blue active:text-white active:scale-105',
    text: 'font-normal text-white hover:opacity-80',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
  }

  const sizeClasses = variant === 'text' ? 'text-base' : sizes[size]

  const classes = `group inline-flex items-center justify-center gap-2 text-center ${baseStyles} ${variants[variant]} ${sizeClasses} ${className}`

  const content = (
    <>
      <span>{text}</span>
      {showArrow && <ArrowIcon className={arrowClassName} />}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

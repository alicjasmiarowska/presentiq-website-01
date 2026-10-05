import Link from 'next/link'
import ArrowIcon from './ArrowIcon'

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
  disabled?: boolean
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
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'transition-all duration-200'

  const variants = {
    primary: 'font-semibold rounded-full bg-primary-blue text-white hover:scale-110 active:scale-105',
    secondary: 'font-semibold rounded-full border-2 border-white text-white hover:scale-110 active:bg-white active:text-primary-blue active:scale-105',
    'secondary-light': 'font-semibold rounded-full border-2 border-primary-blue text-primary-blue hover:scale-110 active:bg-primary-blue active:text-white active:scale-105',
    text: 'font-normal text-white hover:opacity-80 active:opacity-80',
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
      {showArrow && (
        <ArrowIcon
          size={34}
          className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1 ${arrowClassName || 'text-primary-blue'}`}
        />
      )}
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
      className={`${classes} disabled:opacity-60 disabled:pointer-events-none`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

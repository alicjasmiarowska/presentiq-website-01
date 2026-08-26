interface InputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  required?: boolean
  placeholder?: string
  className?: string
  labelClassName?: string
  value?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  className = '',
  labelClassName = 'text-primary-dark',
  value,
  error,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className={`block text-sm font-medium mb-2 ${labelClassName}`}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-primary-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-neutral-light focus:ring-primary-blue'
        }`}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

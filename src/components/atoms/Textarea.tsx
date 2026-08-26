interface TextareaProps {
  label: string
  name: string
  required?: boolean
  placeholder?: string
  rows?: number
  className?: string
  labelClassName?: string
  value?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({
  label,
  name,
  required = false,
  placeholder,
  rows = 5,
  className = '',
  labelClassName = 'text-primary-dark',
  value,
  error,
  onChange,
  onBlur,
}: TextareaProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className={`block text-sm font-medium mb-2 ${labelClassName}`}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-primary-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${
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

interface InputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  required?: boolean
  autoComplete?: string
  className?: string
  value?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

// Underlined field from the contact page design: the label sits on the line
// like a placeholder and moves up once the field is focused or filled
// (`placeholder=" "` + :placeholder-shown drives that, no JS needed).
export const FIELD_LINE_CLASSES =
  'peer block w-full rounded-none border-0 border-b bg-transparent px-0 pt-1 pb-3 text-lg text-primary-dark outline-none transition-colors placeholder:text-transparent focus:border-b-2 focus:pb-[11px]'
export const FIELD_LABEL_CLASSES =
  'pointer-events-none absolute left-0 top-7 origin-left font-display text-lg uppercase text-black transition-all duration-200 peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary-blue peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm'

export const fieldBorder = (error?: string) =>
  error ? 'border-red-600 focus:border-red-600' : 'border-primary-blue focus:border-primary-blue'

export default function Input({
  label,
  name,
  type = 'text',
  required = false,
  autoComplete,
  className = '',
  value,
  error,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div className={`relative pt-6 ${className}`}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${FIELD_LINE_CLASSES} ${fieldBorder(error)}`}
      />
      <label htmlFor={name} className={FIELD_LABEL_CLASSES}>
        {label}
      </label>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

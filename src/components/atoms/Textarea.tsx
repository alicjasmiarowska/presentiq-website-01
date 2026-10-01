import { FIELD_LABEL_CLASSES, FIELD_LINE_CLASSES, fieldBorder } from './Input'

interface TextareaProps {
  label: string
  name: string
  required?: boolean
  rows?: number
  className?: string
  value?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

// Same underlined look as Input; see the notes there.
export default function Textarea({
  label,
  name,
  required = false,
  rows = 5,
  className = '',
  value,
  error,
  onChange,
  onBlur,
}: TextareaProps) {
  return (
    <div className={`relative pt-6 ${className}`}>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder=" "
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${FIELD_LINE_CLASSES} ${fieldBorder(error)} resize-none leading-snug`}
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

interface CheckboxProps {
  label: React.ReactNode
  name: string
  checked?: boolean
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  className?: string
  labelClassName?: string
}

export default function Checkbox({
  label,
  name,
  checked,
  error,
  onChange,
  onBlur,
  className = '',
  labelClassName = 'text-primary-dark',
}: CheckboxProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="flex items-start gap-3 cursor-pointer select-none">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`mt-0.5 h-4 w-4 shrink-0 rounded border accent-primary-blue ${
            error ? 'border-red-500' : 'border-neutral-light'
          }`}
        />
        <span className={`text-sm leading-relaxed ${labelClassName}`}>{label}</span>
      </label>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 ml-7 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

'use client'

import { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import Input from '../atoms/Input'
import Textarea from '../atoms/Textarea'
import Checkbox from '../atoms/Checkbox'
import Button from '../atoms/Button'
import { contactCopy, validateContact, type ContactErrors, type ContactValues } from '../../lib/contactForm'
import { sendContactMessage, type ContactState } from '../../../app/[locale]/contact/actions'

interface ContactFormProps {
  locale: 'en' | 'de'
  privacyText: string
  // Shown if sending fails, so the enquiry is never lost.
  fallbackEmail: string
}

const initialState: ContactState = { status: 'idle' }

export default function ContactForm({ locale, privacyText, fallbackEmail }: ContactFormProps) {
  const t = contactCopy[locale] || contactCopy.en

  const [values, setValues] = useState<ContactValues>({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacyConsent: false,
  })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [startedAt, setStartedAt] = useState(0)
  const [state, formAction, pending] = useActionState(sendContactMessage.bind(null, locale), initialState)

  // Set after mount (not during render) so the time check in the server
  // action measures how long a real visitor had the form open.
  useEffect(() => setStartedAt(Date.now()), [])

  // The server re-validates; show its messages if they differ from ours.
  useEffect(() => {
    if (state.status === 'invalid' && state.errors) setErrors(state.errors)
  }, [state])

  // The form is replaced by a shorter confirmation, which can end up under
  // the fixed header — bring it into view and focus it for screen readers.
  const thanksRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (state.status !== 'success' || !thanksRef.current) return
    thanksRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    thanksRef.current.focus({ preventScroll: true })
  }, [state.status])

  const validate = (v: ContactValues) => validateContact(v, locale)

  const handleChange =
    (field: keyof ContactValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, privacyConsent: e.target.checked }))
  }

  const handleBlur = (field: keyof ContactValues) => () => {
    setErrors((prev) => ({ ...prev, ...validate(values) } as ContactErrors))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      const formData = new FormData(e.currentTarget)
      startTransition(() => formAction(formData))
    }
  }

  if (state.status === 'success') {
    return (
      <div ref={thanksRef} tabIndex={-1} role="status" className="rounded-2xl border border-white/20 p-8 text-center outline-none">
        <p className="text-lg font-semibold text-white">{t.thanks}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Spam traps, see actions.ts: a field hidden from people that only
          bots fill in, and when the form was opened. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      <Input
        label={t.name}
        name="name"
        required
        value={values.name}
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        error={errors.name}
        labelClassName="text-white"
      />
      <Input
        label={t.email}
        name="email"
        type="email"
        required
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        labelClassName="text-white"
      />
      <Input
        label={t.phone}
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange('phone')}
        onBlur={handleBlur('phone')}
        error={errors.phone}
        labelClassName="text-white"
      />
      <Textarea
        label={t.message}
        name="message"
        required
        value={values.message}
        onChange={handleChange('message')}
        onBlur={handleBlur('message')}
        error={errors.message}
        labelClassName="text-white"
      />

      <div className="flex flex-col sm:flex-row sm:items-start gap-10">
        <Checkbox
          name="privacyConsent"
          label={privacyText}
          checked={values.privacyConsent}
          onChange={handleCheckboxChange}
          onBlur={handleBlur('privacyConsent')}
          error={errors.privacyConsent}
          labelClassName="text-white/80"
          className="flex-1"
        />
        <Button
          text={pending ? t.sending : t.submit}
          type="submit"
          variant="primary"
          size="md"
          className="shrink-0"
          disabled={pending}
        />
      </div>

      {state.status === 'error' && (
        <p role="alert" className="text-base text-white">
          {t.failed}{' '}
          <a href={`mailto:${fallbackEmail}`} className="underline hover:no-underline">
            {fallbackEmail}
          </a>
          .
        </p>
      )}
    </form>
  )
}

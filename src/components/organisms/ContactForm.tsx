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

  // Check only the field being left, so untouched fields further down don't
  // show errors before the visitor has reached them.
  const handleBlur = (field: keyof ContactValues) => () => {
    setErrors((prev) => ({ ...prev, [field]: validate(values)[field] }))
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
      <div ref={thanksRef} tabIndex={-1} role="status" className="border-b border-primary-blue pb-8 outline-none">
        <p className="font-display text-lg uppercase text-primary-dark">{t.thanks}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5 md:gap-7">
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
        autoComplete="name"
        value={values.name}
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        error={errors.name}
      />
      <Input
        label={t.email}
        name="email"
        type="email"
        required
        autoComplete="email"
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
      />
      <Input
        label={t.phone}
        name="phone"
        type="tel"
        autoComplete="tel"
        value={values.phone}
        onChange={handleChange('phone')}
        onBlur={handleBlur('phone')}
        error={errors.phone}
      />
      <Textarea
        label={t.message}
        name="message"
        required
        rows={4}
        value={values.message}
        onChange={handleChange('message')}
        onBlur={handleBlur('message')}
        error={errors.message}
      />

      <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-10">
        <Checkbox
          name="privacyConsent"
          label={privacyText}
          checked={values.privacyConsent}
          onChange={handleCheckboxChange}
          onBlur={handleBlur('privacyConsent')}
          error={errors.privacyConsent}
          labelClassName="text-primary-dark/80"
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
        <p role="alert" className="text-base text-primary-dark">
          {t.failed}{' '}
          <a href={`mailto:${fallbackEmail}`} className="text-primary-blue underline hover:no-underline">
            {fallbackEmail}
          </a>
          .
        </p>
      )}
    </form>
  )
}

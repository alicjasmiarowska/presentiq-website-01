'use client'

import { useState } from 'react'
import Input from '../atoms/Input'
import Textarea from '../atoms/Textarea'
import Checkbox from '../atoms/Checkbox'
import Button from '../atoms/Button'

interface ContactFormProps {
  locale: 'en' | 'de'
  privacyText: string
}

interface FormValues {
  name: string
  email: string
  phone: string
  message: string
  privacyConsent: boolean
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const copy = {
  en: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    submit: 'Send message',
    thanks: "Thanks — we'll be in touch soon.",
    errors: {
      nameRequired: 'Please enter your name.',
      emailRequired: 'Please enter your email.',
      emailInvalid: 'Please enter a valid email address.',
      phoneInvalid: 'Please enter a valid phone number.',
      messageRequired: 'Please enter a message.',
      messageTooShort: 'Message should be at least 10 characters.',
      privacyRequired: 'Please accept the privacy policy to continue.',
    },
  },
  de: {
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    message: 'Nachricht',
    submit: 'Nachricht senden',
    thanks: 'Danke — wir melden uns in Kürze.',
    errors: {
      nameRequired: 'Bitte gib deinen Namen ein.',
      emailRequired: 'Bitte gib deine E-Mail-Adresse ein.',
      emailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
      phoneInvalid: 'Bitte gib eine gültige Telefonnummer ein.',
      messageRequired: 'Bitte gib eine Nachricht ein.',
      messageTooShort: 'Die Nachricht sollte mindestens 10 Zeichen lang sein.',
      privacyRequired: 'Bitte akzeptiere die Datenschutzerklärung, um fortzufahren.',
    },
  },
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,}$/

export default function ContactForm({ locale, privacyText }: ContactFormProps) {
  const t = copy[locale] || copy.en

  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacyConsent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (v: FormValues): FormErrors => {
    const next: FormErrors = {}

    if (!v.name.trim()) next.name = t.errors.nameRequired

    if (!v.email.trim()) next.email = t.errors.emailRequired
    else if (!EMAIL_PATTERN.test(v.email.trim())) next.email = t.errors.emailInvalid

    if (v.phone.trim() && !PHONE_PATTERN.test(v.phone.trim())) {
      next.phone = t.errors.phoneInvalid
    }

    if (!v.message.trim()) next.message = t.errors.messageRequired
    else if (v.message.trim().length < 10) next.message = t.errors.messageTooShort

    if (!v.privacyConsent) next.privacyConsent = t.errors.privacyRequired

    return next
  }

  const handleChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, privacyConsent: e.target.checked }))
  }

  const handleBlur = (field: keyof FormValues) => () => {
    setErrors((prev) => ({ ...prev, ...validate(values) } as FormErrors))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/20 p-8 text-center">
        <p className="text-lg font-semibold text-white">{t.thanks}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
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
        <Button text={t.submit} type="submit" variant="primary" size="md" className="shrink-0" />
      </div>
    </form>
  )
}

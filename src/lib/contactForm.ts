// Contact form copy and validation, shared by the form (instant feedback)
// and the server action (the check that actually counts — anything the
// browser sends can be forged).

export interface ContactValues {
  name: string
  email: string
  phone: string
  message: string
  privacyConsent: boolean
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export const contactCopy = {
  en: {
    name: 'Name',
    email: 'Email address',
    phone: 'Phone number',
    message: 'Message',
    submit: 'Send message',
    sending: 'Sending…',
    thanks: 'Thank you – your message has arrived. We’ll get back to you shortly.',
    failed: 'Your message couldn’t be sent. Please try again or write to us directly at',
    errors: {
      nameRequired: 'Please enter your name.',
      emailRequired: 'Please enter your email.',
      emailInvalid: 'Please enter a valid email address.',
      phoneInvalid: 'Please enter a valid phone number.',
      messageRequired: 'Please enter a message.',
      messageTooShort: 'Message should be at least 10 characters.',
      tooLong: 'This is too long.',
      privacyRequired: 'Please accept the privacy policy to continue.',
    },
  },
  de: {
    name: 'Name',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    message: 'Nachricht',
    submit: 'Nachricht senden',
    sending: 'Wird gesendet …',
    thanks: 'Vielen Dank – Ihre Nachricht ist bei uns angekommen. Wir melden uns in Kürze.',
    failed: 'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an',
    errors: {
      nameRequired: 'Bitte geben Sie Ihren Namen ein.',
      emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      phoneInvalid: 'Bitte geben Sie eine gültige Telefonnummer ein.',
      messageRequired: 'Bitte geben Sie eine Nachricht ein.',
      messageTooShort: 'Die Nachricht sollte mindestens 10 Zeichen lang sein.',
      tooLong: 'Dieser Text ist zu lang.',
      privacyRequired: 'Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.',
    },
  },
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+\d][\d\s()/-]{6,}$/
const MAX = { name: 200, email: 254, phone: 40, message: 5000 }

export function validateContact(v: ContactValues, locale: 'en' | 'de'): ContactErrors {
  const e = (contactCopy[locale] ?? contactCopy.en).errors
  const errors: ContactErrors = {}

  if (!v.name.trim()) errors.name = e.nameRequired
  else if (v.name.length > MAX.name) errors.name = e.tooLong

  if (!v.email.trim()) errors.email = e.emailRequired
  else if (v.email.length > MAX.email || !EMAIL_PATTERN.test(v.email.trim())) errors.email = e.emailInvalid

  if (v.phone.trim() && (v.phone.length > MAX.phone || !PHONE_PATTERN.test(v.phone.trim()))) {
    errors.phone = e.phoneInvalid
  }

  if (!v.message.trim()) errors.message = e.messageRequired
  else if (v.message.trim().length < 10) errors.message = e.messageTooShort
  else if (v.message.length > MAX.message) errors.message = e.tooLong

  if (!v.privacyConsent) errors.privacyConsent = e.privacyRequired

  return errors
}

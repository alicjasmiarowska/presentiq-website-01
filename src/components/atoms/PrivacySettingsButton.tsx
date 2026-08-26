'use client'

interface PrivacySettingsButtonProps {
  label: string
  className?: string
}

declare global {
  interface Window {
    UC_UI?: { showSecondLayer: () => void }
  }
}

export default function PrivacySettingsButton({ label, className = '' }: PrivacySettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.UC_UI?.showSecondLayer()}
      className={className}
    >
      {label}
    </button>
  )
}

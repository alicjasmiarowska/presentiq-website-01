'use client'

import { useId, useState } from 'react'

interface FaqAccordionItemProps {
  question: string
  answer: string
}

export default function FaqAccordionItem({ question, answer }: FaqAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="border-b border-neutral-light">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-display text-lg font-semibold text-white">
          {question}
        </span>
        <span className="relative shrink-0 w-5 h-5" aria-hidden="true">
          <span className="absolute inset-0 m-auto h-0.5 w-full rounded-full bg-primary-blue" />
          <span
            className={`absolute inset-0 m-auto h-full w-0.5 rounded-full bg-primary-blue transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          />
        </span>
      </button>
      <div
        id={panelId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-6 text-base leading-relaxed text-white whitespace-pre-line">
          {answer}
        </p>
      </div>
    </div>
  )
}

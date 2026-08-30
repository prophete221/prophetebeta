'use client'

import { useState } from 'react'

export default function CopyableCode({
  code,
  className = '',
  displayClassName = '',
  showCode = true,
}: {
  code: string
  className?: string
  displayClassName?: string
  showCode?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }
    setCopied(true)
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} data-promo-code={code}>
      {showCode && (
        <button
          type="button"
          onClick={copy}
          className={`cursor-pointer font-bold transition-colors ${displayClassName}`}
          aria-label={`Copier le code promo ${code}`}
        >
          {code}
        </button>
      )}
      <button
        type="button"
        onClick={copy}
        className={`inline-flex min-h-8 items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-bold transition-all ${
          copied
            ? 'border-[#22C55E]/40 bg-[#22C55E]/15 text-[#22C55E]'
            : 'border-white/15 bg-white/[.04] text-[#A7B0C0] hover:border-[#F5C518]/40 hover:text-[#F5C518]'
        }`}
        aria-label={copied ? 'Code copié' : `Copier ${code}`}
        aria-live="polite"
      >
        {copied ? '✓ Copié' : 'Copier'}
      </button>
    </span>
  )
}

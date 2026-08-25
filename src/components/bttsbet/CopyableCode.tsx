'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CopyableCode({ code, className = '', displayClassName = '' }: { code: string; className?: string; displayClassName?: string }) {
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
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} data-promo-code={code}>
      <motion.button type="button" onClick={copy} whileTap={{ scale: 0.96 }} className={`cursor-pointer font-bold transition-colors ${displayClassName}`} aria-label={`Copier le code promo ${code}`}>
        {code}
      </motion.button>
      <motion.button type="button" onClick={copy} whileTap={{ scale: 0.9 }} className="inline-flex min-h-7 items-center gap-1 rounded-md border border-current/20 px-1.5 text-[10px] font-bold transition-colors" style={{ color: copied ? '#00e676' : 'currentColor' }} aria-label={`Copier ${code}`} aria-live="polite">
        {copied ? <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg> Copié</> : <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg> Copier</>}
      </motion.button>
    </span>
  )
}

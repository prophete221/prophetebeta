'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_KEY = 'bttsbet_cookie_consent'
const COOKIE_TYPES = [
  { id: 'essential', label: 'Essentiels', description: 'Fonctionnement et sécurité du site.', required: true },
  { id: 'analytics', label: 'Mesure d’audience', description: 'Comprendre les visites et améliorer le parcours.', required: false },
  { id: 'advertising', label: 'Publicitaires', description: 'Mesurer les campagnes et les liens partenaires.', required: false },
] as const

type Preferences = { essential: boolean; analytics: boolean; advertising: boolean }

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const [customize, setCustomize] = useState(false)
  const [preferences, setPreferences] = useState<Preferences>({ essential: true, analytics: false, advertising: false })

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) setShow(true)
    const handleReopen = () => { setCustomize(true); setShow(true) }
    window.addEventListener('cookie-consent-reopen', handleReopen)
    return () => window.removeEventListener('cookie-consent-reopen', handleReopen)
  }, [])

  const save = (status: string, values: Preferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status, preferences: values, timestamp: new Date().toISOString() }))
    setShow(false)
  }

  const toggle = (id: keyof Preferences) => {
    if (id === 'essential') return
    setPreferences((current) => ({ ...current, [id]: !current[id] }))
  }

  return <AnimatePresence>{show && <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ duration: .25 }} className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#070b09]/[.98] p-3 shadow-[0_-18px_50px_rgba(0,0,0,.4)] backdrop-blur-xl sm:p-5" role="dialog" aria-modal="true" aria-label="Préférences de confidentialité"><div className="mx-auto max-w-5xl"><div className="flex items-start gap-3"><div className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#35f17f]/20 bg-[#35f17f]/[.08] text-[#35f17f] sm:flex" aria-hidden="true">◌</div><div className="min-w-0"><p className="text-sm font-extrabold text-white">Votre confidentialité, simplement.</p><p className="mt-1 max-w-3xl text-xs leading-5 text-[#91a09b]">Les cookies essentiels assurent le fonctionnement. Les autres sont facultatifs et peuvent être modifiés à tout moment.</p></div></div>{customize && <div className="mt-4 grid gap-2 rounded-xl border border-white/10 bg-white/[.025] p-3 sm:grid-cols-3">{COOKIE_TYPES.map((cookie) => <label key={cookie.id} className="flex cursor-pointer items-start gap-2 rounded-lg p-2 hover:bg-white/[.03]"><input type="checkbox" className="mt-1 accent-[#19d66b]" checked={preferences[cookie.id]} disabled={cookie.required} onChange={() => toggle(cookie.id)} /><span><span className="block text-xs font-bold text-white">{cookie.label}{cookie.required && <span className="ml-1 text-[10px] font-medium text-[#71817d]">requis</span>}</span><span className="mt-1 block text-[11px] leading-4 text-[#71817d]">{cookie.description}</span></span></label>)}</div>}<div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setCustomize(!customize)} className="text-left text-xs font-bold text-[#9aa9a4] underline underline-offset-4 hover:text-white">{customize ? 'Masquer les options' : 'Personnaliser'}</button><div className="grid grid-cols-2 gap-2 sm:flex"><button type="button" onClick={() => save('refused', { essential: true, analytics: false, advertising: false })} className="min-h-10 rounded-lg border border-white/10 px-4 text-xs font-bold text-[#9aa9a4] transition hover:border-white/20 hover:text-white">Refuser</button>{customize && <button type="button" onClick={() => save(preferences.analytics || preferences.advertising ? 'customized' : 'refused', preferences)} className="min-h-10 rounded-lg border border-[#35f17f]/25 px-4 text-xs font-bold text-[#35f17f] transition hover:bg-[#35f17f]/[.08]">Enregistrer</button>}<button type="button" onClick={() => save('accepted', { essential: true, analytics: true, advertising: true })} className="col-span-2 min-h-10 rounded-lg bg-[#19d66b] px-5 text-xs font-extrabold text-[#031b0d] transition hover:bg-[#35f17f] sm:col-span-1">Accepter</button></div></div></div></motion.div>}</AnimatePresence>
}

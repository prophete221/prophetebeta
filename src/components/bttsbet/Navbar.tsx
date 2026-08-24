'use client'

import { useEffect, useState } from 'react'
import { NAV_LINKS, SITE, AFFILIATE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`linebet-nav ${scrolled ? 'linebet-nav-scrolled' : ''}`}>
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)} aria-label="BttsBet, accueil">
          <span className="linebet-brand-mark"><img src="/logos/linebet-icon.svg" alt="" className="h-5 w-5" /></span>
          <span className="truncate text-base font-black tracking-tight text-white">{SITE.name}<span className="text-[#35f17f]">/LINEBET</span></span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.filter((link) => link.label !== 'Accueil').map((link) => <a key={link.href} href={link.href} className="linebet-nav-link">{link.label}</a>)}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-lg border border-[#35f17f]/20 bg-[#35f17f]/[.06] px-2.5 py-1.5 text-xs font-black text-[#35f17f] sm:block"><CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" /></div>
          <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="hidden items-center gap-2 rounded-lg bg-[#19d66b] px-3.5 py-2.5 text-xs font-extrabold text-[#031b0d] transition hover:bg-[#35f17f] active:scale-[.98] sm:inline-flex"><img src="/logos/linebet-icon.svg" alt="" className="h-4 w-4 rounded" /> Ouvrir Linebet</a>
          <button type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="mobile-menu" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden">
            <span className="sr-only">Menu</span><span aria-hidden="true" className="text-xl leading-none">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && <div id="mobile-menu" className="border-t border-white/10 bg-[#07100b]/98 px-5 py-4 shadow-2xl backdrop-blur-xl lg:hidden">
        <div className="mx-auto max-w-6xl space-y-1">
          {NAV_LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#cfdbd6] transition hover:bg-white/[.05] hover:text-white">{link.label}</a>)}
          <div className="mt-3 border-t border-white/10 pt-3"><div className="mb-3 flex items-center justify-between rounded-lg border border-[#35f17f]/20 bg-[#35f17f]/[.06] px-3 py-3 text-sm"><span className="text-[#91a09b]">Code partenaire</span><CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" /></div><a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#19d66b] px-4 py-3 text-sm font-extrabold text-[#031b0d]"><img src="/logos/linebet-icon.svg" alt="" className="h-5 w-5 rounded" /> S’inscrire sur Linebet</a></div>
        </div>
      </div>}
    </header>
  )
}

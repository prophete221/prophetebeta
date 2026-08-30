'use client'

import { useEffect, useState } from 'react'
import { AFFILIATE, NAV_LINKS, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={scrolled ? 'bt-nav is-scrolled' : 'bt-nav'}>
      <nav aria-label="Navigation principale" className="bt-nav-shell">
        <a href="/" className="bt-brand" onClick={() => setOpen(false)} aria-label="BttsBet, accueil">
          <span className="bt-brand-mark"><img src="/logos/linebet-icon.png" alt="" /></span>
          <span className="bt-brand-name">BttsBet<strong>/PRO</strong></span>
        </a>

        <div className="bt-nav-links">
          {NAV_LINKS.filter((link) => link.label !== 'Accueil').map((link) => <a key={link.href} href={link.href} className="bt-nav-link">{link.label}</a>)}
        </div>

        <div className="bt-nav-actions">
          <div className="bt-nav-code"><CopyableCode code={SITE.promoCode} displayClassName="text-[#c8f36b]" /></div>
          <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="bt-button bt-button-primary hidden !min-h-10 !px-3.5 !text-xs sm:inline-flex">Utiliser le code</a>
          <button type="button" className="bt-menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="bt-mobile-menu"><MenuIcon open={open} /></button>
        </div>
      </nav>

      {open && (
        <div id="bt-mobile-menu" className="bt-mobile-menu">
          <div className="bt-mobile-menu-inner">
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="bt-mobile-link">{link.label}</a>)}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="bt-nav-code !block"><CopyableCode code={SITE.promoCode} displayClassName="text-[#c8f36b]" /></div>
              <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} onClick={() => setOpen(false)} className="bt-button bt-button-primary flex-1 !min-h-11 !text-xs">Utiliser VISION221</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

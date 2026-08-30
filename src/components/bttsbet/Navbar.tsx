'use client'

import { useEffect, useState } from 'react'
import { NAV_LINKS, SITE, AFFILIATE } from '@/lib/constants'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`bb-nav ${scrolled ? 'bb-nav-scrolled' : ''}`}>
      <nav aria-label="Navigation principale" className="bb-nav-inner">
        <a href="/" className="bb-logo" onClick={() => setOpen(false)} aria-label="BttsBet, accueil">
          <span className="bb-logo-mark">
            <img src="/logos/linebet-icon.png" alt="" width={20} height={20} />
          </span>
          <span className="bb-logo-text">
            {SITE.name}
            <span className="bb-logo-accent">/PRO</span>
          </span>
        </a>

        <div className="bb-nav-links">
          {NAV_LINKS.filter((l) => l.label !== 'Accueil').map((link) => (
            <a key={link.href} href={link.href} className="bb-nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="bb-nav-actions">
          <a href="/code-promo-linebet" className="bb-btn bb-btn-ghost bb-btn-sm hidden sm:inline-flex">
            Guide
          </a>
          <a
            href={AFFILIATE.linebet}
            target="_blank"
            rel={AFFILIATE.rel}
            className="bb-btn bb-btn-primary bb-btn-sm hidden sm:inline-flex"
          >
            UTILISER VISION221 →
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="bb-menu-btn"
          >
            <span aria-hidden="true">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="bb-mobile-menu">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="bb-mobile-link">
              {link.label}
            </a>
          ))}
          <a
            href={AFFILIATE.linebet}
            target="_blank"
            rel={AFFILIATE.rel}
            onClick={() => setOpen(false)}
            className="bb-btn bb-btn-primary w-full mt-3"
          >
            UTILISER VISION221 →
          </a>
        </div>
      )}
    </header>
  )
}

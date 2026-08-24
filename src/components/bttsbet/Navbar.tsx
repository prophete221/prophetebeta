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
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)} aria-label="BttsBet, accueil">
          <span className="linebet-brand-mark">
            <img src="/logos/linebet-icon.png" alt="" className="h-5 w-5" />
          </span>
          <span className="truncate text-base font-black tracking-tight text-white">
            {SITE.name}
            <span className="text-[#35f17f]">/PREMIUM</span>
          </span>
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.filter((link) => link.label !== 'Accueil').map((link) => (
            <a key={link.href} href={link.href} className="linebet-nav-link">{link.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-xl border border-[#35f17f]/25 bg-[#35f17f]/[.08] px-3 py-1.5 text-xs font-black text-[#35f17f] shadow-[0_0_20px_rgba(53,241,127,.12)] sm:block">
            <CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" />
          </div>
          <a
            href={AFFILIATE.linebet}
            target="_blank"
            rel={AFFILIATE.rel}
            className="hidden items-center gap-2 rounded-xl bg-gradient-to-b from-[#31ef80] to-[#19d66b] px-4 py-2.5 text-xs font-extrabold text-[#031b0d] shadow-[0_8px_24px_rgba(25,214,107,.28)] transition hover:from-[#4aff95] hover:to-[#31ef80] active:scale-[.98] sm:inline-flex"
          >
            <img src="/logos/linebet-icon.png" alt="" className="h-4 w-4 rounded" />
            Ouvrir Linebet
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[.03] text-white lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true" className="text-xl leading-none">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-[#050706]/98 px-5 py-5 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="mx-auto max-w-6xl space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3.5 text-sm font-semibold text-[#cfdbd6] transition hover:bg-white/[.05] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between rounded-xl border border-[#35f17f]/25 bg-[#35f17f]/[.08] px-4 py-3.5 text-sm">
                <span className="text-[#91a09b]">Code premium</span>
                <CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" />
              </div>
              <a
                href={AFFILIATE.linebet}
                target="_blank"
                rel={AFFILIATE.rel}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#31ef80] to-[#19d66b] px-4 py-3.5 text-sm font-extrabold text-[#031b0d] shadow-[0_8px_24px_rgba(25,214,107,.3)]"
              >
                <img src="/logos/linebet-icon.png" alt="" className="h-5 w-5 rounded" />
                S’inscrire sur Linebet
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

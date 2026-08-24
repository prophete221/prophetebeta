'use client'

import { AFFILIATE, LEGAL, SITE } from '@/lib/constants'

function reopenCookieSettings() {
  localStorage.removeItem('bttsbet_cookie_consent')
  window.dispatchEvent(new CustomEvent('cookie-consent-reopen'))
}

export default function Footer() {
  return (
    <>
      <div className="linebet-mobile-cta sm:hidden">
        <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#19d66b] px-3 text-xs font-extrabold text-[#031b0d]"><img src="/logos/linebet-icon.svg" alt="" className="h-4 w-4 rounded" /> Ouvrir Linebet</a>
        <a href="#code" className="flex min-h-12 items-center justify-center rounded-lg border border-[#35f17f]/25 bg-[#35f17f]/[.07] px-3 text-xs font-extrabold text-[#35f17f]">VISION221</a>
      </div>

      <footer className="border-t border-white/10 bg-[#030504] px-5 pb-10 pt-14 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_.8fr_.9fr]">
          <div><a href="/" className="text-lg font-black tracking-tight text-white">{SITE.name}<span className="text-[#35f17f]">/LINEBET</span></a><p className="mt-4 max-w-sm text-sm leading-6 text-[#84928d]">Guide indépendant consacré au code partenaire Linebet Afrique VISION221, à l’inscription et à la lecture des conditions d’offre.</p><a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#35f17f] hover:text-white">Accéder au partenaire <span aria-hidden="true">↗</span></a></div>
          <div><h2 className="text-xs font-extrabold uppercase tracking-[.18em] text-white">Explorer</h2><div className="mt-4 grid gap-3 text-sm text-[#84928d]"><a href="/code-promo-linebet" className="hover:text-[#35f17f]">Code promo Linebet</a><a href="/linebet-inscription" className="hover:text-[#35f17f]">Inscription Linebet</a><a href="/linebet-afrique" className="hover:text-[#35f17f]">Linebet en Afrique</a><a href="/code-promo-888starz" className="hover:text-[#ffd4df]">Code promo 888starz</a><a href="/#faq" className="hover:text-[#35f17f]">FAQ</a></div></div>
          <div><h2 className="text-xs font-extrabold uppercase tracking-[.18em] text-white">Transparence</h2><div className="mt-4 grid gap-3 text-sm text-[#84928d]"><a href="/mentions-legales" className="hover:text-[#35f17f]">Mentions légales</a><a href="/politique-confidentialite" className="hover:text-[#35f17f]">Confidentialité</a><a href="/jouer-responsable" className="hover:text-[#35f17f]">Jouer responsable</a><a href="/cgu" className="hover:text-[#35f17f]">CGU</a><button type="button" onClick={reopenCookieSettings} className="text-left hover:text-[#35f17f]">Paramètres cookies</button></div></div>
        </div>
        <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs leading-6 text-[#66736e]"><p><strong className="text-[#a8b5b0]">Affiliation :</strong> BttsBet peut recevoir une commission si vous utilisez le lien partenaire. Nous ne sommes pas Linebet, ne gérons aucun compte et ne collectons aucun dépôt.</p><p className="mt-2">{LEGAL.disclaimer} {LEGAL.responsible}</p><p className="mt-4 text-[#4e5a55]">{LEGAL.copyright}</p></div>
      </footer>
    </>
  )
}

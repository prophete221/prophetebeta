'use client'

import { AFFILIATE, LEGAL, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

function reopenCookieSettings() {
  localStorage.removeItem('bttsbet_cookie_consent')
  window.dispatchEvent(new CustomEvent('cookie-consent-reopen'))
}

export default function Footer() {
  return (
    <>
      <div className="linebet-mobile-cta sm:hidden">
        <div className="linebet-mobile-code">
          <span>Code</span>
          <CopyableCode code={SITE.promoCode} displayClassName="text-[#00e676]" />
        </div>
        <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="btn-platform btn-platform-green flex-1 !min-h-11 !text-xs">
          <img src="/logos/linebet-icon.png" alt="" className="h-4 w-4 rounded object-cover" />
          Linebet ↗
        </a>
      </div>

      <footer className="border-t border-white/10 bg-[#020403] px-5 pb-12 pt-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_.75fr_.9fr]">
          <div>
            <a href="/" className="text-lg font-black tracking-tight text-white">
              {SITE.name}<span className="text-[#00e676]">/PRO</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#84928d]">
              Plateforme premium — <strong className="text-[#cfe0d8]">meilleur code promo Linebet Afrique VISION221</strong> + freebets. Aussi 888starz <strong className="text-[#fca5a5]">btts221</strong>.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="rounded-xl border border-[#00e676]/30 bg-[#00e676]/[.1] px-3.5 py-2.5 text-xs font-black text-[#00e676]">
                <CopyableCode code={SITE.promoCode} displayClassName="text-[#00e676]" />
              </div>
              <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="text-sm font-bold text-[#00e676] transition hover:text-white">
                Ouvrir Linebet ↗
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-[11px] font-extrabold uppercase tracking-[.2em] text-white">Parcours</h2>
            <div className="mt-5 grid gap-3.5 text-sm text-[#84928d]">
              <a href="/code-promo-linebet" className="transition hover:text-[#00e676]">Meilleur code Linebet Afrique</a>
              <a href="/linebet-inscription" className="transition hover:text-[#00e676]">Inscription Linebet</a>
              <a href="/#applications" className="transition hover:text-[#00e676]">Applications</a>
              <a href="/code-promo-888starz" className="transition hover:text-[#f87171]">Code 888starz btts221</a>
              <a href="/ar/code-promo-888starz" className="transition hover:text-[#f87171]">الدليل العربي 888starz</a>
            </div>
          </div>
          <div>
            <h2 className="text-[11px] font-extrabold uppercase tracking-[.2em] text-white">Confiance</h2>
            <div className="mt-5 grid gap-3.5 text-sm text-[#84928d]">
              <a href="/linebet-afrique" className="transition hover:text-[#00e676]">Linebet en Afrique</a>
              <a href="/#faq" className="transition hover:text-[#00e676]">FAQ</a>
              <a href="/mentions-legales" className="transition hover:text-[#00e676]">Mentions légales</a>
              <a href="/politique-confidentialite" className="transition hover:text-[#00e676]">Confidentialité</a>
              <a href="/jouer-responsable" className="transition hover:text-[#00e676]">Jouer responsable</a>
              <a href="/cgu" className="transition hover:text-[#00e676]">CGU</a>
              <button type="button" onClick={reopenCookieSettings} className="text-left transition hover:text-[#00e676]">Cookies</button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-6xl border-t border-white/10 pt-7 text-xs leading-6 text-[#66736e]">
          <p><strong className="text-[#a8b5b0]">Affiliation :</strong> BttsBet peut recevoir une commission via les liens partenaires. Nous ne gérons aucun compte ni dépôt.</p>
          <p className="mt-2">{LEGAL.disclaimer} {LEGAL.responsible}</p>
          <p className="mt-5 text-[#4e5a55]">{LEGAL.copyright}</p>
        </div>
      </footer>
    </>
  )
}

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
      <div className="bb-sticky-cta sm:hidden" role="region" aria-label="Accès rapide code promo">
        <div className="bb-sticky-code">
          <CopyableCode code={SITE.promoCode} displayClassName="text-[#F5C518] text-sm tracking-wide" />
        </div>
        <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="bb-btn bb-btn-primary bb-btn-sm flex-1">
          UTILISER
        </a>
      </div>

      <footer className="bb-footer">
        <div className="bb-footer-grid">
          <div>
            <a href="/" className="bb-logo-text text-lg">
              {SITE.name}
              <span className="bb-logo-accent">/PRO</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#A7B0C0]">
              Plateforme d’information sur le code promo Linebet <strong className="text-white">VISION221</strong>.
              Site indépendant — affiliation transparente.
            </p>
            <div className="mt-4">
              <CopyableCode code={SITE.promoCode} displayClassName="text-[#F5C518]" />
            </div>
          </div>

          <div>
            <h2 className="bb-footer-title">Linebet</h2>
            <div className="bb-footer-links">
              <a href="/code-promo-linebet">Code promo VISION221</a>
              <a href="/linebet-inscription">Inscription</a>
              <a href="/linebet-afrique">Afrique</a>
              <a href="/#comment-ca-marche">Comment ça marche</a>
            </div>
          </div>

          <div>
            <h2 className="bb-footer-title">Informations</h2>
            <div className="bb-footer-links">
              <a href="/#faq">FAQ</a>
              <a href="/jouer-responsable">Jouer responsable</a>
              <a href="/politique-confidentialite">Confidentialité</a>
              <a href="/cgu">CGU</a>
              <a href="/mentions-legales">Mentions légales</a>
              <button type="button" onClick={reopenCookieSettings} className="text-left">
                Cookies
              </button>
            </div>
          </div>

          <div>
            <h2 className="bb-footer-title">Transparence</h2>
            <p className="text-sm leading-relaxed text-[#A7B0C0]">
              BttsBet n’est ni Linebet ni 888starz. Certains liens sont partenaires et peuvent générer une commission
              sans coût pour vous.
            </p>
            <a href="/code-promo-888starz" className="mt-3 inline-block text-sm font-semibold text-[#A7B0C0] hover:text-white">
              Offre 888starz btts221 →
            </a>
          </div>
        </div>

        <div className="bb-footer-bottom">
          <p>
            <strong className="text-[#A7B0C0]">18+</strong> — {LEGAL.disclaimer}
          </p>
          <p className="mt-2">{LEGAL.responsible}</p>
          <p className="mt-4 text-[#5A6577]">{LEGAL.copyright}</p>
        </div>
      </footer>
    </>
  )
}

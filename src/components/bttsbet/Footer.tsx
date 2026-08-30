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
      <div className="bt-mobile-cta sm:hidden">
        <div className="bt-mobile-code"><span>Code Linebet</span><CopyableCode code={SITE.promoCode} displayClassName="text-[#c8f36b]" /></div>
        <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="bt-button bt-button-primary">Activer VISION221</a>
      </div>

      <footer className="bt-footer">
        <div className="bt-footer-inner">
          <div className="bt-footer-grid">
            <div className="bt-footer-copy">
              <a href="/" className="bt-brand" aria-label="BttsBet, accueil"><span className="bt-brand-mark"><img src="/logos/linebet-icon.png" alt="" /></span><span className="bt-brand-name">BttsBet<strong>/PRO</strong></span></a>
              <p>Le guide indépendant pour retrouver les codes promo Linebet et 888starz en Afrique. <strong>Les offres et conditions sont toujours confirmées chez le partenaire.</strong></p>
            </div>
            <div>
              <p className="bt-footer-title">Parcours</p>
              <div className="bt-footer-links"><a href="/code-promo-linebet">Code promo Linebet</a><a href="/linebet-inscription">Guide inscription</a><a href="/linebet-afrique">Linebet en Afrique</a><a href="/#applications">Applications</a></div>
            </div>
            <div>
              <p className="bt-footer-title">Confiance</p>
              <div className="bt-footer-links"><a href="/code-promo-888starz">Bonus 888starz</a><a href="/jouer-responsable">Jouer responsable</a><a href="/mentions-legales">Mentions légales</a><a href="/politique-confidentialite">Confidentialité</a><a href="/cgu">CGU</a><button type="button" onClick={reopenCookieSettings}>Cookies</button></div>
            </div>
          </div>
          <div className="bt-footer-bottom"><p><strong>Affiliation :</strong> BttsBet peut recevoir une commission via les liens partenaires. Nous ne gérons aucun compte ni dépôt.</p><p>{LEGAL.disclaimer} {LEGAL.responsible}</p><p>{LEGAL.copyright}</p></div>
        </div>
      </footer>
    </>
  )
}

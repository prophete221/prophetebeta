'use client'

import { motion } from 'framer-motion'
import { AFFILIATE, FAQ_ITEMS, OFFERS_888, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

const steps = [
  { number: '01', title: 'Ouvrir le lien', text: 'Cliquez sur Utiliser VISION221 (parcours officiel).' },
  { number: '02', title: 'Saisir VISION221', text: 'Code en majuscules dans le champ promo Linebet.' },
  { number: '03', title: 'Profiter', text: 'Vérifiez freebets et offres sur votre compte.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function LinebetLanding() {
  return (
    <div className="linebet-shell v46">
      <section className="hx-hero" aria-labelledby="hero-title">
        <div className="hx-bg" aria-hidden="true" />
        <div className="hx-wrap">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="hx-top">
            <div className="hx-badge">
              <span className="hx-dot" />
              Meilleur code promo Linebet · Afrique
            </div>
            <h1 id="hero-title" className="hx-title">
              Code promo Linebet <span className="hx-gold">VISION221</span>
            </h1>
            <p className="hx-sub">
              Le code promo Linebet n°1 en Afrique. Freebets via le parcours partenaire officiel.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} className="hx-card">
            <div className="hx-card-brand">
              <img src="/logos/linebet-icon.png" alt="Linebet" className="hx-brand-icon" />
              <div>
                <p className="hx-brand-name">Linebet</p>
                <p className="hx-brand-tag">Meilleur code promo Linebet Afrique</p>
              </div>
              <span className="hx-18">18+</span>
            </div>

            <div className="hx-code-block">
              <span className="hx-code-label">Code promo Linebet</span>
              <div className="hx-code-row">
                <CopyableCode code={SITE.promoCode} className="hx-code-copy" displayClassName="hx-code-value" />
              </div>
            </div>

            <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="hx-cta">
              <img src="/logos/linebet-icon.png" alt="" className="hx-cta-icon" />
              Utiliser VISION221
              <span aria-hidden="true">→</span>
            </a>

            <div className="hx-trust">
              <span>Freebets</span>
              <i aria-hidden="true" />
              <span>Inscription rapide</span>
              <i aria-hidden="true" />
              <span>Partenaire officiel</span>
            </div>
          </motion.div>

          {/* 888starz offer card — clear benefits */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="hx-offer888">
            <div className="hx-offer888-head">
              <img src="/logos/888starz-icon.png" alt="888starz" className="hx-sec-icon" />
              <div>
                <p className="hx-sec-name">Bonus 888starz · Code {OFFERS_888.code}</p>
                <p className="hx-offer888-title">Offre d’inscription claire</p>
              </div>
            </div>
            <ul className="hx-offer888-list">
              <li>
                <strong>100 tours</strong> Lucky Wheel gratuits à l’inscription
              </li>
              <li>
                <strong>Freebet 1 €</strong> chaque lundi
              </li>
            </ul>
            <div className="hx-offer888-actions">
              <div className="hx-offer888-code">
                <span>Code</span>
                <CopyableCode code={OFFERS_888.code} displayClassName="hx-sec-code" />
              </div>
              <a href={AFFILIATE.star888} target="_blank" rel={AFFILIATE.rel} className="hx-sec-link">
                Activer btts221 ↗
              </a>
            </div>
            <p className="hx-offer888-note">
              Offres partenaires 888starz — conditions et disponibilité selon pays, confirmées à l’inscription.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="hx-strip" aria-label="Pourquoi ce code">
        <div className="hx-wrap hx-strip-grid">
          {[
            { n: '01', t: 'Meilleur code Linebet', d: 'VISION221 — focus Afrique' },
            { n: '02', t: 'Bonus 888starz clair', d: '100 tours + freebet 1€/lundi' },
            { n: '03', t: 'Parcours officiel', d: 'Liens partenaires sécurisés' },
          ].map((item) => (
            <div key={item.n} className="hx-strip-item">
              <span className="hx-strip-n">{item.n}</span>
              <div>
                <strong>{item.t}</strong>
                <p>{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="comment-ca-marche" className="hx-section" aria-labelledby="steps-title">
        <div className="hx-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <p className="hx-kicker">3 ÉTAPES</p>
            <h2 id="steps-title" className="hx-h2">Activer le code promo Linebet</h2>
          </motion.div>
          <div className="hx-steps">
            {steps.map((step) => (
              <motion.article key={step.number} className="hx-step" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-30px' }} variants={fadeUp}>
                <span className="hx-step-n">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="applications" className="hx-section" aria-labelledby="apps-title">
        <div className="hx-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <p className="hx-kicker">APPLICATIONS</p>
            <h2 id="apps-title" className="hx-h2">Apps Linebet & 888starz</h2>
          </motion.div>
          <div className="hx-apps">
            <a href={AFFILIATE.linebetDownload} target="_blank" rel={AFFILIATE.rel} className="hx-app hx-app-lb">
              <img src="/logos/linebet-icon.png" alt="Linebet" className="hx-app-icon" />
              <div>
                <p className="hx-app-tag">App + code VISION221</p>
                <h3>Linebet</h3>
              </div>
              <span className="hx-app-go">Télécharger →</span>
            </a>
            <a href={AFFILIATE.star888Download} target="_blank" rel={AFFILIATE.rel} className="hx-app hx-app-88">
              <img src="/logos/888starz-icon.png" alt="888starz" className="hx-app-icon" />
              <div>
                <p className="hx-app-tag">App + code btts221</p>
                <h3>888starz</h3>
              </div>
              <span className="hx-app-go hx-app-go-red">Télécharger →</span>
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="hx-section hx-faq-sec" aria-labelledby="faq-title">
        <div className="hx-wrap hx-faq">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="hx-kicker">FAQ</p>
            <h2 id="faq-title" className="hx-h2">Code promo Linebet & bonus 888starz</h2>
          </motion.div>
          <div className="hx-faq-list">
            {FAQ_ITEMS.map((item) => (
              <motion.details key={item.q} className="hx-faq-item" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-20px' }} variants={fadeUp}>
                <summary>{item.q}<span aria-hidden="true">+</span></summary>
                <p>{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

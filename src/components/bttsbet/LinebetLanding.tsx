'use client'

import { motion } from 'framer-motion'
import { AFFILIATE, FAQ_ITEMS, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

const steps = [
  { number: '01', title: 'Ouvrir Linebet', text: 'Cliquez sur le bouton partenaire officiel.' },
  { number: '02', title: 'Saisir VISION221', text: 'Entrez le code en majuscules dans le champ promo.' },
  { number: '03', title: 'Profiter', text: 'Vérifiez l’offre et les freebets sur Linebet.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function LinebetLanding() {
  return (
    <div className="linebet-shell v46">
      {/* ===== HERO — product card, not blog ===== */}
      <section className="hx-hero" aria-labelledby="hero-title">
        <div className="hx-bg" aria-hidden="true" />
        <div className="hx-wrap">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="hx-top">
            <div className="hx-badge">
              <span className="hx-dot" />
              Linebet Afrique · Partenaire officiel
            </div>
            <h1 id="hero-title" className="hx-title">
              Code promo <span className="hx-gold">VISION221</span>
            </h1>
            <p className="hx-sub">
              Freebets réguliers via le parcours partenaire. Copiez, activez, profitez.
            </p>
          </motion.div>

          {/* Product card — the code is the product */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="hx-card">
            <div className="hx-card-brand">
              <img src="/logos/linebet-icon.png" alt="" className="hx-brand-icon" />
              <div>
                <p className="hx-brand-name">Linebet</p>
                <p className="hx-brand-tag">Meilleur code Afrique</p>
              </div>
              <span className="hx-18">18+</span>
            </div>

            <div className="hx-code-block">
              <span className="hx-code-label">Code promo</span>
              <div className="hx-code-row">
                <CopyableCode code={SITE.promoCode} className="hx-code-copy" displayClassName="hx-code-value" />
              </div>
            </div>

            <a
              href={AFFILIATE.linebet}
              target="_blank"
              rel={AFFILIATE.rel}
              className="hx-cta"
            >
              <img src="/logos/linebet-icon.png" alt="" className="hx-cta-icon" />
              Utiliser VISION221
              <span aria-hidden="true">→</span>
            </a>

            <div className="hx-trust">
              <span>Freebets</span>
              <i aria-hidden="true" />
              <span>Inscription rapide</span>
              <i aria-hidden="true" />
              <span>Parcours officiel</span>
            </div>
          </motion.div>

          {/* Secondary code — compact */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="hx-secondary">
            <div className="hx-sec-left">
              <img src="/logos/888starz-icon.png" alt="" className="hx-sec-icon" />
              <div>
                <p className="hx-sec-name">888starz</p>
                <CopyableCode code="btts221" displayClassName="hx-sec-code" />
              </div>
            </div>
            <a href={AFFILIATE.star888} target="_blank" rel={AFFILIATE.rel} className="hx-sec-link">
              Ouvrir ↗
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="hx-strip" aria-label="Points clés">
        <div className="hx-wrap hx-strip-grid">
          {[
            { n: '01', t: 'Meilleur code Afrique', d: 'VISION221 mis en avant' },
            { n: '02', t: 'Freebets réguliers', d: 'Parcours partenaire officiel' },
            { n: '03', t: 'Conditions claires', d: 'Vérifiées sur Linebet' },
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

      {/* ===== STEPS ===== */}
      <section id="comment-ca-marche" className="hx-section" aria-labelledby="steps-title">
        <div className="hx-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <p className="hx-kicker">3 ÉTAPES</p>
            <h2 id="steps-title" className="hx-h2">Comment activer le code</h2>
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

      {/* ===== APPS ===== */}
      <section id="applications" className="hx-section" aria-labelledby="apps-title">
        <div className="hx-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <p className="hx-kicker">APPLICATIONS</p>
            <h2 id="apps-title" className="hx-h2">Télécharger l’app</h2>
          </motion.div>
          <div className="hx-apps">
            <a href={AFFILIATE.linebetDownload} target="_blank" rel={AFFILIATE.rel} className="hx-app hx-app-lb">
              <img src="/logos/linebet-icon.png" alt="Linebet" className="hx-app-icon" />
              <div>
                <p className="hx-app-tag">App Linebet</p>
                <h3>Linebet</h3>
              </div>
              <span className="hx-app-go">Télécharger →</span>
            </a>
            <a href={AFFILIATE.star888Download} target="_blank" rel={AFFILIATE.rel} className="hx-app hx-app-88">
              <img src="/logos/888starz-icon.png" alt="888starz" className="hx-app-icon" />
              <div>
                <p className="hx-app-tag">App 888starz</p>
                <h3>888starz</h3>
              </div>
              <span className="hx-app-go hx-app-go-red">Télécharger →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="hx-section hx-faq-sec" aria-labelledby="faq-title">
        <div className="hx-wrap hx-faq">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="hx-kicker">FAQ</p>
            <h2 id="faq-title" className="hx-h2">Questions</h2>
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

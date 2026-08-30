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
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function LinebetLanding() {
  return (
    <div className="linebet-shell v45">
      {/* ===== HERO ===== */}
      <section className="pv-hero" aria-labelledby="hero-title">
        <div className="pv-hero-bg" aria-hidden="true" />
        <div className="pv-container">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="pv-hero-content">
            <div className="pv-badge">
              <span className="pv-dot" /> PLATEFORME PREMIUM · LINEBET AFRIQUE
            </div>
            <h1 id="hero-title" className="pv-hero-title">
              Meilleur code promo Linebet Afrique : <span className="pv-gold">VISION221</span>
            </h1>
            <p className="pv-hero-sub">
              <strong className="text-white">VISION221</strong> — freebets réguliers via le parcours partenaire officiel. Copiez le code, activez-le, profitez.
            </p>

            <div className="pv-hero-actions">
              <a
                href={AFFILIATE.linebet}
                target="_blank"
                rel={AFFILIATE.rel}
                className="pv-cta pv-cta-gold"
              >
                <img src="/logos/linebet-icon.png" alt="" className="pv-cta-icon" />
                Utiliser VISION221
                <span aria-hidden="true" className="pv-cta-arrow">→</span>
              </a>
              <div className="pv-code-pill">
                <span className="pv-code-label">Code</span>
                <CopyableCode code={SITE.promoCode} displayClassName="text-white" />
              </div>
            </div>

            <div className="pv-meta">
              <span>18+</span><i>·</i><span>Freebets</span><i>·</i><span>Partenaire officiel</span>
            </div>
          </motion.div>

          {/* ===== CODE CARD ===== */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="pv-code-card">
            <div className="pv-code-card-head">
              <div>
                <p className="pv-mini-label">CODES PLATEFORME</p>
                <h2 className="pv-code-card-title">Copier le code</h2>
              </div>
              <span className="pv-18">18+</span>
            </div>
            <div className="pv-code-list">
              <div className="pv-code-row pv-code-row-primary">
                <div>
                  <p className="pv-code-name">Linebet Afrique</p>
                  <p className="pv-code-note">Meilleur code · Freebets</p>
                </div>
                <CopyableCode code={SITE.promoCode} displayClassName="text-[#f5c518]" />
              </div>
              <div className="pv-code-row pv-code-row-secondary">
                <div>
                  <p className="pv-code-name">888starz</p>
                  <p className="pv-code-note">Code secondaire</p>
                </div>
                <CopyableCode code="btts221" displayClassName="text-[#f87171]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="pv-trust" aria-label="Points clés">
        <div className="pv-container pv-trust-grid">
          {[
            { n: '01', t: 'Meilleur code Afrique', d: 'VISION221 mis en avant' },
            { n: '02', t: 'Freebets réguliers', d: 'Parcours partenaire officiel' },
            { n: '03', t: 'Conditions claires', d: 'Vérifiées sur Linebet' },
          ].map((item) => (
            <div key={item.n} className="pv-trust-item">
              <span className="pv-trust-num">{item.n}</span>
              <div>
                <strong>{item.t}</strong>
                <p>{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STEPS ===== */}
      <section id="comment-ca-marche" className="pv-section" aria-labelledby="steps-title">
        <div className="pv-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="pv-section-head">
            <p className="pv-kicker">3 ÉTAPES</p>
            <h2 id="steps-title" className="pv-section-title">Comment activer le code</h2>
          </motion.div>
          <div className="pv-steps">
            {steps.map((step) => (
              <motion.article key={step.number} className="pv-step-card" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
                <span className="pv-step-num">{step.number}</span>
                <h3 className="pv-step-title">{step.title}</h3>
                <p className="pv-step-text">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPS ===== */}
      <section id="applications" className="pv-section" aria-labelledby="apps-title">
        <div className="pv-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} className="pv-section-head">
            <p className="pv-kicker">APPLICATIONS</p>
            <h2 id="apps-title" className="pv-section-title">Télécharger l’app</h2>
          </motion.div>
          <div className="pv-apps">
            <a href={AFFILIATE.linebetDownload} target="_blank" rel={AFFILIATE.rel} className="pv-app-card pv-app-linebet">
              <span className="pv-app-icon"><img src="/logos/linebet-icon.png" alt="Linebet" className="pv-app-img" /></span>
              <div className="pv-app-body">
                <p className="pv-app-tag">App Linebet</p>
                <h3>Linebet</h3>
              </div>
              <span className="pv-app-dl pv-app-dl-gold">Télécharger →</span>
            </a>
            <a href={AFFILIATE.star888Download} target="_blank" rel={AFFILIATE.rel} className="pv-app-card pv-app-888">
              <span className="pv-app-icon"><img src="/logos/888starz-icon.png" alt="888starz" className="pv-app-img" /></span>
              <div className="pv-app-body">
                <p className="pv-app-tag">App 888starz</p>
                <h3>888starz</h3>
              </div>
              <span className="pv-app-dl pv-app-dl-red">Télécharger →</span>
            </a>
          </div>

          {/* ===== 888starz code strip ===== */}
          <motion.div className="pv-888strip" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <div className="pv-888strip-left">
              <span className="pv-app-icon pv-app-icon-sm"><img src="/logos/888starz-icon.png" alt="888starz" className="pv-app-img" /></span>
              <div>
                <p className="pv-kicker" style={{ color: '#f87171' }}>888STARZ</p>
                <h2 className="pv-888-title">Code <span className="text-[#f87171]">btts221</span></h2>
              </div>
            </div>
            <div className="pv-888-code">
              <CopyableCode code="btts221" displayClassName="text-[#f87171]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="pv-section pv-faq-section" aria-labelledby="faq-title">
        <div className="pv-container pv-faq">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="pv-kicker">FAQ</p>
            <h2 id="faq-title" className="pv-section-title">Questions</h2>
          </motion.div>
          <div className="pv-faq-list">
            {FAQ_ITEMS.map((item) => (
              <motion.details key={item.q} className="pv-faq-item" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-20px' }} variants={fadeUp}>
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

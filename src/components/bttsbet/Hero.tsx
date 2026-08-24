'use client'

import { motion } from 'framer-motion'
import { AFFILIATE, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

const METHOD_ITEMS = [
  { label: 'Source', value: 'Fixtures publiques ESPN', tone: 'cyan' },
  { label: 'Modèle', value: 'Poisson + profil de ligue', tone: 'green' },
  { label: 'Transparence', value: 'Taux non publié', tone: 'gold' },
]

export default function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="home-hero__grid" aria-hidden="true" />
      <div className="home-hero__orb home-hero__orb--one" aria-hidden="true" />
      <div className="home-hero__orb home-hero__orb--two" aria-hidden="true" />

      <div className="home-hero__inner">
        <motion.div
          className="home-hero__copy"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="home-hero__eyebrow">
            <span className="home-hero__status-dot" aria-hidden="true" />
            <span>Données du jour</span>
            <span className="home-hero__timezone">Africa/Dakar · UTC+0</span>
          </div>

          <h1 id="hero-title" className="home-hero__title">
            Pronostics BTTS du jour,
            <span> lisibles avant le coup d’envoi.</span>
          </h1>

          <p className="home-hero__lead">
            Une lecture claire des marchés <strong>BTTS</strong> et <strong>Over 2,5</strong>, construite à partir des fixtures publiques et publiée avec sa date et son heure.
          </p>

          <div className="home-hero__actions">
            <a className="home-hero__primary" href="#free-predictions">
              Voir les pronostics du jour
              <span aria-hidden="true">↗</span>
            </a>
            <a className="home-hero__secondary" href="#vip">
              Découvrir le VIP
            </a>
          </div>

          <div className="home-hero__partner-note">
            <span>Code partenaire</span>
            <CopyableCode code={SITE.promoCode} displayClassName="home-hero__code" />
            <a href={AFFILIATE.linebet} rel="sponsored noopener" target="_blank">
              Inscription Linebet
            </a>
          </div>
        </motion.div>

        <motion.aside
          className="home-hero__panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
          aria-label="Résumé de la méthode"
        >
          <div className="home-hero__panel-topline">
            <span className="home-hero__panel-kicker">FIL DU JOUR</span>
            <span className="home-hero__panel-badge">PUBLIC</span>
          </div>
          <div className="home-hero__panel-title">Une méthode visible. Des limites assumées.</div>
          <p className="home-hero__panel-text">
            Les informations absentes restent indiquées comme indisponibles. Aucun taux de réussite ni aucune cote n’est affiché sans source vérifiable.
          </p>

          <div className="home-hero__method-list">
            {METHOD_ITEMS.map((item) => (
              <div className="home-hero__method-item" key={item.label}>
                <span className={`home-hero__method-marker home-hero__method-marker--${item.tone}`} aria-hidden="true" />
                <span>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

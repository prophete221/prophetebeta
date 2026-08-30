'use client'

import { motion } from 'framer-motion'
import { AFFILIATE, AFRICA_COUNTRIES, FAQ_ITEMS, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

const steps = [
  {
    n: '01',
    title: 'Ouvrir le parcours',
    text: 'Cliquez sur Utiliser VISION221 pour accéder au parcours partenaire Linebet.',
  },
  {
    n: '02',
    title: 'Créer son compte',
    text: 'Inscrivez-vous sur Linebet en suivant les étapes affichées sur leur plateforme.',
  },
  {
    n: '03',
    title: 'Saisir VISION221',
    text: 'Entrez le code en majuscules dans le champ promo, puis vérifiez les conditions.',
  },
]

const reasons = [
  {
    title: 'Code clairement identifié',
    text: 'VISION221 est toujours affiché de façon visible, prêt à copier.',
  },
  {
    title: 'Parcours simple',
    text: 'Accès direct au parcours partenaire, sans étapes superflues.',
  },
  {
    title: 'Informations transparentes',
    text: 'Les conditions exactes se vérifient auprès de Linebet, pas sur des promesses.',
  },
  {
    title: 'Compatible mobile',
    text: 'Interface conçue d’abord pour smartphone, lecture rapide.',
  },
]

export default function LinebetLanding() {
  return (
    <div className="bb-shell">
      {/* HERO */}
      <section className="bb-hero" aria-labelledby="hero-title">
        <div className="bb-hero-glow" aria-hidden="true" />
        <div className="bb-container bb-hero-inner">
          <motion.div initial="hidden" animate="show" variants={fade} className="bb-hero-copy">
            <div className="bb-badge">
              <span className="bb-badge-dot" />
              CODE PROMO · LINEBET
            </div>
            <h1 id="hero-title" className="bb-hero-title">
              Code promo Linebet
              <span className="bb-hero-code">VISION221</span>
            </h1>
            <p className="bb-hero-sub">
              Découvrez comment utiliser VISION221 et vérifier les offres disponibles dans votre pays.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fade} className="bb-code-card">
            <div className="bb-code-card-head">
              <img src="/logos/linebet-icon.png" alt="Linebet" className="bb-brand-icon" width={40} height={40} />
              <div>
                <p className="bb-code-card-label">CODE PROMO LINEBET</p>
                <p className="bb-code-card-brand">Linebet · Parcours partenaire</p>
              </div>
              <span className="bb-pill-18">18+</span>
            </div>

            <div className="bb-code-display">
              <span className="bb-code-giant" aria-label="Code promo VISION221">
                {SITE.promoCode}
              </span>
              <CopyableCode code={SITE.promoCode} showCode={false} className="bb-copy-standalone" />
            </div>

            <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="bb-btn bb-btn-primary bb-btn-lg w-full">
              <img src="/logos/linebet-icon.png" alt="" width={20} height={20} className="rounded" />
              UTILISER VISION221 →
            </a>

            <div className="bb-trust-row">
              <span>✓ Parcours partenaire</span>
              <span>✓ Code clairement affiché</span>
              <span>✓ Vérification des conditions</span>
              <span>18+</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STEPS */}
      <section id="comment-ca-marche" className="bb-section" aria-labelledby="steps-title">
        <div className="bb-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={fade}>
            <p className="bb-kicker">GUIDE</p>
            <h2 id="steps-title" className="bb-h2">
              Utiliser VISION221 en 3 étapes
            </h2>
          </motion.div>
          <div className="bb-steps">
            {steps.map((s) => (
              <motion.article
                key={s.n}
                className="bb-step-card"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20px' }}
                variants={fade}
              >
                <span className="bb-step-n">{s.n}</span>
                <h3 className="bb-step-title">{s.title}</h3>
                <p className="bb-step-text">{s.text}</p>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="bb-btn bb-btn-primary">
              UTILISER VISION221 →
            </a>
            <a href="/code-promo-linebet" className="bb-btn bb-btn-ghost">
              Guide détaillé
            </a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bb-section bb-section-alt" aria-labelledby="why-title">
        <div className="bb-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <p className="bb-kicker">CLARTÉ</p>
            <h2 id="why-title" className="bb-h2">
              Pourquoi utiliser VISION221 ?
            </h2>
          </motion.div>
          <div className="bb-why-grid">
            {reasons.map((r) => (
              <article key={r.title} className="bb-why-card">
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AFRICA */}
      <section id="afrique" className="bb-section" aria-labelledby="africa-title">
        <div className="bb-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <p className="bb-kicker">INTERNATIONAL</p>
            <h2 id="africa-title" className="bb-h2">
              VISION221 en Afrique
            </h2>
            <p className="bb-lead">
              Disponibilité selon le pays et les règles Linebet. Vérifiez toujours les conditions à l’inscription.
            </p>
          </motion.div>
          <div className="bb-country-grid">
            {AFRICA_COUNTRIES.map((c) => (
              <a key={c.name} href={c.href} className="bb-country-pill">
                {c.name}
              </a>
            ))}
          </div>
          <a href="/linebet-afrique" className="mt-6 inline-flex text-sm font-semibold text-[#F5C518] hover:underline">
            Voir le guide Afrique →
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bb-section bb-section-alt" aria-labelledby="about-title">
        <div className="bb-container bb-about">
          <p className="bb-kicker">TRANSPARENCE</p>
          <h2 id="about-title" className="bb-h2">
            À propos de BttsBet
          </h2>
          <p className="bb-lead">
            BttsBet est un site indépendant d’information et d’affiliation. Nous ne sommes pas Linebet ni 888starz.
            Certains liens présents sur le site sont des liens partenaires et peuvent générer une commission sans coût
            supplémentaire pour l’utilisateur.
          </p>
        </div>
      </section>

      {/* 888 SECONDARY */}
      <section className="bb-section" aria-labelledby="alt-title">
        <div className="bb-container">
          <p className="bb-kicker">AUTRE OFFRE</p>
          <h2 id="alt-title" className="bb-h2">
            Une autre offre partenaire
          </h2>
          <div className="bb-alt-card">
            <div className="bb-alt-left">
              <img src="/logos/888starz-icon.png" alt="888starz" width={40} height={40} className="rounded-lg" />
              <div>
                <p className="text-sm font-bold text-white">888starz</p>
                <p className="text-xs text-[#A7B0C0]">
                  Code <strong className="text-[#F87171]">btts221</strong> — conditions selon le partenaire
                </p>
              </div>
            </div>
            <a href="/code-promo-888starz" className="bb-btn bb-btn-ghost bb-btn-sm">
              Découvrir l’offre
            </a>
          </div>
        </div>
      </section>

      {/* RESPONSIBLE */}
      <section className="bb-responsible" aria-label="Jouer responsable">
        <div className="bb-container bb-responsible-inner">
          <span className="bb-pill-18">18+</span>
          <p>
            Les paris sportifs comportent des risques financiers. Ne misez jamais plus que ce que vous pouvez vous
            permettre de perdre.{' '}
            <a href="/jouer-responsable" className="font-semibold text-[#F5C518] hover:underline">
              Jouer responsable
            </a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bb-section" aria-labelledby="faq-title">
        <div className="bb-container bb-faq">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <p className="bb-kicker">FAQ</p>
            <h2 id="faq-title" className="bb-h2">
              Questions fréquentes
            </h2>
          </motion.div>
          <div className="bb-faq-list">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="bb-faq-item">
                <summary>
                  {item.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bb-section bb-final-cta" aria-label="Call to action">
        <div className="bb-container text-center">
          <h2 className="bb-h2">Prêt à utiliser VISION221 ?</h2>
          <p className="bb-lead mx-auto">
            Copiez le code, ouvrez le parcours partenaire, vérifiez les conditions affichées par Linebet.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <CopyableCode code={SITE.promoCode} displayClassName="text-[#F5C518] text-lg" />
            <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="bb-btn bb-btn-primary bb-btn-lg">
              UTILISER VISION221 →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

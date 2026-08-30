'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Clock3, Globe2, ShieldCheck } from 'lucide-react'
import { AFFILIATE, FAQ_ITEMS, OFFERS_888, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

const steps = [
  { number: '01', title: 'Ouvrir le parcours officiel', text: 'Utilisez le bouton Linebet pour arriver sur le parcours partenaire dédié.' },
  { number: '02', title: 'Ajouter VISION221', text: 'Saisissez le code exactement comme affiché, en majuscules.' },
  { number: '03', title: 'Vérifier les conditions', text: 'Les freebets et critères sont confirmés par Linebet selon votre pays.' },
]

const regions = ['Sénégal', 'Côte d’Ivoire', 'Cameroun', 'Mali', 'Bénin', 'Afrique francophone']

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: .48, ease: 'easeOut' as const } },
}

export default function LinebetLanding() {
  return (
    <div className="bt-root">
      <section className="bt-hero" aria-labelledby="hero-title">
        <div className="bt-hero-grid" aria-hidden="true" />
        <div className="bt-hero-wrap">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="bt-hero-copy">
            <p className="bt-eyebrow">Guide partenaire · Afrique · 18+</p>
            <h1 id="hero-title" className="bt-hero-title">Le bon code, <em>au bon moment.</em></h1>
            <p className="bt-hero-lead">Le code promo Linebet <strong className="text-[#f4f8ef]">VISION221</strong>, expliqué simplement pour commencer avec le bon parcours partenaire.</p>
            <div className="bt-hero-actions">
              <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="bt-button bt-button-primary">Utiliser VISION221 <ArrowUpRight /></a>
              <a href="#comment-ca-marche" className="bt-button bt-button-quiet">Voir les étapes</a>
            </div>
            <div className="bt-hero-note"><span><ShieldCheck /> Lien partenaire identifié</span><span><Clock3 /> Inscription rapide</span><span><Globe2 /> Disponibilité selon le pays</span></div>
          </motion.div>

          <div className="bt-offers">
            <motion.article initial="hidden" animate="show" variants={fadeUp} transition={{ delay: .08 }} className="bt-offer bt-offer-main">
              <div className="bt-offer-head"><img src="/logos/linebet-icon.png" alt="Linebet" className="bt-offer-logo" /><div><p className="bt-offer-kicker">Offre principale</p><p className="bt-offer-title">Code promo Linebet Afrique</p></div><span className="bt-age">18+</span></div>
              <div className="bt-code-panel"><div><p className="bt-code-label">Votre code partenaire</p><CopyableCode code={SITE.promoCode} displayClassName="bt-code-value" /></div></div>
              <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="bt-offer-cta"><img src="/logos/linebet-icon.png" alt="" /> Activer le parcours Linebet <ArrowUpRight /></a>
              <div className="bt-offer-foot"><span>Freebets</span><i aria-hidden="true" /><span>Parcours officiel</span><i aria-hidden="true" /><span>Conditions à vérifier</span></div>
            </motion.article>

            <motion.aside initial="hidden" animate="show" variants={fadeUp} transition={{ delay: .16 }} className="bt-offer bt-offer-secondary">
              <div className="bt-secondary-head"><img src="/logos/888starz-icon.png" alt="888starz" className="bt-offer-logo" /><div><p className="bt-offer-kicker !text-[#ffb5c0]">Alternative partenaire</p><p className="bt-secondary-title">Bonus 888starz</p></div><span className="bt-secondary-code">{OFFERS_888.code}</span></div>
              <ul className="bt-secondary-list"><li><strong>100 tours</strong> Lucky Wheel à l’inscription</li><li><strong>Freebet 1 €</strong> chaque lundi</li></ul>
              <div className="bt-secondary-bottom"><CopyableCode code={OFFERS_888.code} displayClassName="text-[#ff7d91] font-mono text-sm" /><a href={AFFILIATE.star888} target="_blank" rel={AFFILIATE.rel} className="bt-secondary-link">Activer btts221 <ArrowUpRight className="inline h-3.5 w-3.5" /></a></div>
              <p className="bt-disclaimer">Offres et disponibilité selon le pays, confirmées par 888starz au moment de l’inscription.</p>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="bt-proof" aria-label="Repères du service">
        <div className="bt-proof-inner"><div className="bt-proof-item"><span className="bt-proof-number">01</span><div><strong>VISION221 en clair</strong><p>Copie en un clic, sans détour.</p></div></div><div className="bt-proof-item"><span className="bt-proof-number">02</span><div><strong>Deux parcours partenaires</strong><p>Linebet et 888starz séparés.</p></div></div><div className="bt-proof-item"><span className="bt-proof-number">03</span><div><strong>Transparence d’affiliation</strong><p>Pas de compte ni dépôt géré ici.</p></div></div></div>
      </section>

      <section id="comment-ca-marche" className="bt-section" aria-labelledby="steps-title">
        <div className="bt-section-inner">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }} variants={fadeUp} className="bt-section-heading"><p className="bt-section-kicker">Le parcours en 3 étapes</p><h2 id="steps-title" className="bt-section-title">Simple à suivre. Facile à vérifier.</h2><p className="bt-section-intro">Le code ouvre un parcours partenaire. Les conditions exactes dépendent toujours de votre pays et de ce que Linebet affiche au moment de l’inscription.</p></motion.div>
          <div className="bt-steps">{steps.map((step) => <motion.article key={step.number} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-30px' }} variants={fadeUp} className="bt-step"><span className="bt-step-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p>{step.number === '01' && <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel}>Ouvrir Linebet <ArrowUpRight /></a>}</motion.article>)}</div>
        </div>
      </section>

      <section className="bt-section" aria-labelledby="coverage-title"><div className="bt-section-inner"><p className="bt-section-kicker">Pensé pour l’Afrique</p><h2 id="coverage-title" className="bt-section-title">Un guide local, pas une promesse universelle.</h2><p className="bt-section-intro">La disponibilité des plateformes, des moyens de paiement et des promotions varie selon la juridiction. Utilisez votre pays comme premier point de contrôle.</p><div className="bt-regions">{regions.map((region) => <span key={region} className="bt-region">{region}</span>)}</div></div></section>

      <section id="applications" className="bt-section" aria-labelledby="apps-title"><div className="bt-section-inner"><p className="bt-section-kicker">Applications</p><h2 id="apps-title" className="bt-section-title">Retrouver les apps officielles.</h2><p className="bt-section-intro">Téléchargez depuis le parcours partenaire et reprenez le code affiché lors de votre inscription.</p><div className="bt-app-grid"><a href={AFFILIATE.linebetDownload} target="_blank" rel={AFFILIATE.rel} className="bt-app"><img src="/logos/linebet-icon.png" alt="Linebet" /><div><p className="bt-app-label">App + code VISION221</p><h3>Linebet</h3></div><span className="bt-app-go">Télécharger <ArrowUpRight className="inline h-3.5 w-3.5" /></span></a><a href={AFFILIATE.star888Download} target="_blank" rel={AFFILIATE.rel} className="bt-app bt-app-pink"><img src="/logos/888starz-icon.png" alt="888starz" /><div><p className="bt-app-label">App + code btts221</p><h3>888starz</h3></div><span className="bt-app-go">Télécharger <ArrowUpRight className="inline h-3.5 w-3.5" /></span></a></div></div></section>

      <section id="faq" className="bt-section bt-faq-section" aria-labelledby="faq-title"><div className="bt-section-inner bt-faq"><p className="bt-section-kicker">Questions fréquentes</p><h2 id="faq-title" className="bt-section-title">Tout vérifier avant de s’inscrire.</h2><div className="bt-faq-list">{FAQ_ITEMS.map((item) => <details key={item.q} className="bt-faq-item"><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
    </div>
  )
}

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AFFILIATE, FAQ_ITEMS, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

const steps = [
  { number: '01', title: 'Ouvrir Linebet', text: 'Cliquez sur le bouton partenaire.' },
  { number: '02', title: 'Saisir VISION221', text: 'Code en majuscules dans le champ promo.' },
  { number: '03', title: 'Freebets', text: 'Vérifiez l’offre sur Linebet.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function LinebetLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className={`btn-platform btn-platform-green ${className}`}>
      <img src="/logos/linebet-icon.png" alt="" className="h-5 w-5 rounded object-cover" />
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export default function LinebetLanding() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35])

  return (
    <div className="linebet-shell">
      <section ref={heroRef} className="linebet-hero" aria-labelledby="hero-title">
        <div className="linebet-grid-overlay" aria-hidden="true" />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="linebet-kicker"><span className="linebet-status-dot" /> PLATEFORME PREMIUM · LINEBET AFRIQUE</div>
            <h1 id="hero-title" className="mt-4 max-w-3xl text-4xl font-black leading-[.96] tracking-[-.055em] text-white sm:text-5xl lg:text-6xl">
              Meilleur code promo Linebet Afrique : <span className="linebet-gradient-text">VISION221</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#aab8b4] sm:text-lg">
              <strong className="text-white">VISION221</strong> — freebets réguliers. Copiez le code, puis activez sur Linebet.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinebetLink>Utiliser VISION221</LinebetLink>
              <span className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[.04] px-5 py-3.5 text-sm font-bold text-white">
                <CopyableCode code={SITE.promoCode} displayClassName="text-white" />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#71817d]">
              <span>18+</span><span>·</span><span>Freebets</span><span>·</span><span>Partenaire officiel</span>
            </div>
          </motion.div>

          <motion.div id="code" initial="hidden" animate="show" variants={fadeUp} className="linebet-code-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="linebet-mini-label">CODES PLATEFORME</p>
                <h2 className="mt-1.5 text-2xl font-black tracking-tight text-white">Copier le code</h2>
              </div>
              <span className="linebet-secure-badge">18+</span>
            </div>
            <div className="mt-5 space-y-2.5">
              <div className="linebet-code-row linebet-code-row-primary">
                <div>
                  <p className="linebet-code-name">Linebet Afrique</p>
                  <p className="linebet-code-note">Meilleur code · Freebets</p>
                </div>
                <div className="linebet-code-value">
                  <CopyableCode code={SITE.promoCode} displayClassName="text-[#ffb800]" />
                </div>
              </div>
              <div className="linebet-code-row linebet-code-row-secondary">
                <div>
                  <p className="linebet-code-name">888starz</p>
                  <p className="linebet-code-note">Code secondaire</p>
                </div>
                <div className="linebet-code-value">
                  <CopyableCode code="btts221" displayClassName="text-[#f87171]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="linebet-trust-strip" aria-label="Points clés">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8">
          {[
            { n: '01', t: 'Meilleur code Afrique', d: 'VISION221 mis en avant.' },
            { n: '02', t: 'Freebets réguliers', d: 'Via le parcours partenaire.' },
            { n: '03', t: 'Conditions claires', d: 'Vérifiées sur Linebet.' },
          ].map((item) => (
            <div key={item.n} className="flex gap-3">
              <span className="linebet-trust-icon">{item.n}</span>
              <div>
                <strong>{item.t}</strong>
                <p>{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="comment-ca-marche" className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="steps-title">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="max-w-xl">
          <p className="linebet-kicker">3 ÉTAPES</p>
          <h2 id="steps-title" className="mt-2 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Comment activer le code</h2>
        </motion.div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <motion.article key={step.number} className="linebet-step-card platform-card-3d" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
              <span className="linebet-step-number">{step.number}</span>
              <h3 className="mt-6 text-lg font-extrabold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#91a09b]">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="applications" className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20" aria-labelledby="apps-title">
        <motion.div className="linebet-apps-panel" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
          <p className="linebet-kicker">APPLICATIONS</p>
          <h2 id="apps-title" className="mt-2 text-2xl font-black tracking-[-.03em] text-white sm:text-3xl">Télécharger</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={AFFILIATE.linebetDownload} target="_blank" rel={AFFILIATE.rel} className="linebet-app-card linebet-app-linebet platform-card-3d">
              <div className="flex items-center gap-3">
                <span className="linebet-app-icon"><img src="/logos/linebet-icon.png" alt="Linebet" className="h-full w-full object-cover" /></span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[.12em] text-[#7f938b]">App</p>
                  <h3 className="mt-0.5 text-lg font-extrabold text-white">Linebet</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-[#ffb800]">Télécharger</span>
                <span className="text-[#ffb800]">↗</span>
              </div>
            </a>
            <a href={AFFILIATE.star888Download} target="_blank" rel={AFFILIATE.rel} className="linebet-app-card linebet-app-888 platform-card-3d platform-card-3d-red">
              <div className="flex items-center gap-3">
                <span className="linebet-app-icon"><img src="/logos/888starz-icon.png" alt="888starz" className="h-full w-full object-cover" /></span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[.12em] text-[#b98898]">App</p>
                  <h3 className="mt-0.5 text-lg font-extrabold text-white">888starz</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-[#f87171]">Télécharger</span>
                <span className="text-[#f87171]">↗</span>
              </div>
            </a>
          </div>
        </motion.div>
      </section>

      <section id="partenaires" className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20">
        <motion.div className="linebet-secondary-card platform-card-3d platform-card-3d-red" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="linebet-partner-logo"><img src="/logos/888starz-icon.png" alt="888starz" className="h-full w-full object-cover" /></span>
              <div>
                <p className="linebet-kicker" style={{ color: '#f87171' }}>888STARZ</p>
                <h2 className="mt-0.5 text-xl font-black text-white">Code <span className="text-[#f87171]">btts221</span></h2>
              </div>
            </div>
            <div className="rounded-xl border border-[#ef4444]/35 bg-black/30 px-4 py-2.5">
              <CopyableCode code="btts221" displayClassName="text-[#f87171]" />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="faq" className="linebet-faq-section" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="linebet-kicker">FAQ</p>
            <h2 id="faq-title" className="mt-2 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Questions</h2>
          </motion.div>
          <div className="mt-7 space-y-3">
            {FAQ_ITEMS.map((item) => (
              <motion.details key={item.q} className="linebet-faq-item" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-20px' }} variants={fadeUp}>
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

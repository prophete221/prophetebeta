'use client'

import { motion } from 'framer-motion'
import { AFFILIATE, FAQ_ITEMS, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

const steps = [
  { number: '01', title: 'Ouvrir Linebet', text: 'Cliquez sur le bouton partenaire officiel.' },
  { number: '02', title: 'Saisir VISION221', text: 'Code en majuscules dans le champ promo.' },
  { number: '03', title: 'Freebets', text: 'Vérifiez l’offre et les conditions Linebet.' },
]

function LinebetLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={AFFILIATE.linebet}
      target="_blank"
      rel={AFFILIATE.rel}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#31ef80] to-[#19d66b] px-5 py-3.5 text-sm font-extrabold text-[#031b0d] shadow-[0_12px_32px_rgba(25,214,107,.25)] transition duration-200 hover:-translate-y-0.5 hover:from-[#4aff95] hover:to-[#31ef80] active:scale-[.98] ${className}`}
    >
      <img src="/logos/linebet-icon.svg" alt="" className="h-5 w-5 rounded object-contain" />
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export default function LinebetLanding() {
  return (
    <div className="linebet-shell">
      {/* HERO */}
      <section className="linebet-hero" aria-labelledby="hero-title">
        <div className="linebet-grid-overlay" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
            <div className="linebet-kicker"><span className="linebet-status-dot" /> MEILLEUR CODE · LINEBET AFRIQUE</div>
            <h1 id="hero-title" className="mt-4 max-w-3xl text-4xl font-black leading-[.96] tracking-[-.055em] text-white sm:text-6xl lg:text-7xl">
              Code promo <span className="linebet-gradient-text">VISION221</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#aab8b4] sm:text-lg">
              Le code partenaire n°1 pour Linebet en Afrique. Freebets réguliers. Copiez et activez en quelques secondes.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinebetLink>Utiliser VISION221</LinebetLink>
              <span className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[.04] px-5 py-3.5 text-sm font-bold text-white">
                <CopyableCode code={SITE.promoCode} displayClassName="text-white" />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#71817d]">
              <span>18+</span><span>·</span><span>Freebets</span><span>·</span><span>Partenaire Linebet</span>
            </div>
          </motion.div>

          <motion.div id="code" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06, duration: .45 }} className="linebet-code-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="linebet-mini-label">CODES PREMIUM</p>
                <h2 className="mt-1.5 text-2xl font-black tracking-tight text-white">Copier · Activer</h2>
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
                  <CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" />
                </div>
              </div>
              <div className="linebet-code-row linebet-code-row-secondary">
                <div>
                  <p className="linebet-code-name">888starz</p>
                  <p className="linebet-code-note">Code secondaire</p>
                </div>
                <div className="linebet-code-value">
                  <CopyableCode code="btts221" displayClassName="text-[#ffd4df]" />
                </div>
              </div>
            </div>
            <LinebetLink className="mt-4 w-full">Activer VISION221</LinebetLink>
          </motion.div>
        </div>
      </section>

      {/* TRUST */}
      <section className="linebet-trust-strip" aria-label="Points clés">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8">
          <div><span className="linebet-trust-icon">01</span><strong>Meilleur code Afrique</strong><p>VISION221 mis en avant.</p></div>
          <div><span className="linebet-trust-icon">02</span><strong>Freebets réguliers</strong><p>Via le parcours partenaire.</p></div>
          <div><span className="linebet-trust-icon">03</span><strong>Conditions claires</strong><p>Toujours vérifiées sur Linebet.</p></div>
        </div>
      </section>

      {/* STEPS */}
      <section id="comment-ca-marche" className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="steps-title">
        <div className="max-w-xl">
          <p className="linebet-kicker">3 ÉTAPES</p>
          <h2 id="steps-title" className="mt-2 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Comment activer le code</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="linebet-step-card">
              <span className="linebet-step-number">{step.number}</span>
              <h3 className="mt-6 text-lg font-extrabold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#91a09b]">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* APPS */}
      <section id="applications" className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20" aria-labelledby="apps-title">
        <div className="linebet-apps-panel">
          <p className="linebet-kicker">APPLICATIONS</p>
          <h2 id="apps-title" className="mt-2 text-2xl font-black tracking-[-.03em] text-white sm:text-3xl">Télécharger</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={AFFILIATE.linebetDownload} target="_blank" rel={AFFILIATE.rel} className="linebet-app-card linebet-app-linebet">
              <div className="flex items-center gap-3">
                <span className="linebet-app-icon"><img src="/logos/linebet-icon.svg" alt="" className="h-7 w-7 rounded object-contain" /></span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[.12em] text-[#7f938b]">App</p>
                  <h3 className="mt-0.5 text-lg font-extrabold text-white">Linebet</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-[#35f17f]">Télécharger</span>
                <span className="text-[#35f17f]">↗</span>
              </div>
            </a>
            <a href={AFFILIATE.star888Download} target="_blank" rel={AFFILIATE.rel} className="linebet-app-card linebet-app-888">
              <div className="flex items-center gap-3">
                <span className="linebet-app-icon"><img src="/logos/888starz-icon.svg" alt="" className="h-7 w-7 object-contain" /></span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[.12em] text-[#b98898]">App</p>
                  <h3 className="mt-0.5 text-lg font-extrabold text-white">888starz</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-[#ffd4df]">Télécharger</span>
                <span className="text-[#ffd4df]">↗</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 888 SECONDARY */}
      <section id="partenaires" className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20">
        <div className="linebet-secondary-card">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="linebet-partner-logo"><img src="/logos/888starz-icon.svg" alt="" className="h-8 w-8 object-contain" /></span>
              <div>
                <p className="linebet-kicker" style={{ color: '#ffd4df' }}>888STARZ</p>
                <h2 className="mt-0.5 text-xl font-black text-white">Code <span className="text-[#f5a3bd]">btts221</span></h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-lg border border-[#f5a3bd]/25 bg-black/20 px-4 py-2">
                <CopyableCode code="btts221" displayClassName="text-[#ffd4df]" />
              </div>
              <a href={AFFILIATE.star888} target="_blank" rel={AFFILIATE.rel} className="inline-flex items-center gap-2 rounded-xl border border-[#f5a3bd]/35 bg-[#f5a3bd]/10 px-4 py-2.5 text-sm font-extrabold text-[#ffd4df] transition hover:bg-[#f5a3bd]/15">
                Voir 888starz ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="linebet-faq-section" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="linebet-kicker">FAQ</p>
          <h2 id="faq-title" className="mt-2 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Questions</h2>
          <div className="mt-7 space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="linebet-faq-item">
                <summary>{item.q}<span aria-hidden="true">+</span></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="linebet-final-cta text-center">
          <p className="linebet-kicker">PRÊT ?</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">
            Activez <span className="text-[#35f17f]">VISION221</span>
          </h2>
          <LinebetLink className="mt-6">Accéder à Linebet</LinebetLink>
        </div>
      </section>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { AFFILIATE, FAQ_ITEMS, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

const regions = [
  { name: 'Afrique de l’Ouest', countries: 'Bénin · Burkina Faso · Cap-Vert · Côte d’Ivoire · Gambie · Ghana · Guinée · Guinée-Bissau · Liberia · Mali · Mauritanie · Niger · Nigeria · Sénégal · Sierra Leone · Togo' },
  { name: 'Afrique centrale', countries: 'Angola · Burundi · Cameroun · Centrafrique · Congo · RDC · Gabon · Guinée équatoriale · São Tomé-et-Príncipe · Tchad' },
  { name: 'Afrique du Nord', countries: 'Algérie · Égypte · Libye · Maroc · Soudan · Tunisie' },
  { name: 'Afrique de l’Est', countries: 'Comores · Djibouti · Érythrée · Éthiopie · Kenya · Madagascar · Malawi · Maurice · Mozambique · Seychelles · Somalie · Soudan du Sud · Tanzanie · Ouganda · Zambie · Zimbabwe' },
  { name: 'Afrique australe', countries: 'Afrique du Sud · Botswana · Eswatini · Lesotho · Namibie' },
]

const steps = [
  { number: '01', title: 'Ouvrez le lien Linebet', text: 'Accédez au parcours d’inscription depuis le bouton officiel affiché sur cette page.' },
  { number: '02', title: 'Ajoutez VISION221', text: 'Saisissez le code dans le champ promotionnel prévu, si celui-ci est disponible pour votre pays et votre compte.' },
  { number: '03', title: 'Vérifiez avant de déposer', text: 'Lisez les conditions de l’offre, le minimum éventuel, les limites et l’éligibilité directement auprès de Linebet.' },
]

function LinebetLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={AFFILIATE.linebet}
      target="_blank"
      rel={AFFILIATE.rel}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#19d66b] px-5 py-3.5 text-sm font-extrabold text-[#031b0d] shadow-[0_12px_32px_rgba(25,214,107,.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#31ef80] active:scale-[.98] ${className}`}
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
      <section className="linebet-hero" aria-labelledby="hero-title">
        <div className="linebet-grid-overlay" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
            <div className="linebet-kicker"><span className="linebet-status-dot" /> GUIDE PARTENAIRE AFRIQUE · VISION221</div>
            <h1 id="hero-title" className="mt-5 max-w-3xl text-4xl font-black leading-[.98] tracking-[-.055em] text-white sm:text-6xl lg:text-7xl">
              Le code promo Linebet Afrique <span className="linebet-gradient-text">à connaître.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#aab8b4] sm:text-lg">
              Retrouvez le code partenaire <strong className="text-white">VISION221</strong>, les étapes d’inscription et les points à vérifier avant toute utilisation de Linebet dans votre pays.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinebetLink>Ouvrir Linebet</LinebetLink>
              <a href="#code" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[.04] px-5 py-3.5 text-sm font-bold text-white transition hover:border-[#19d66b]/40 hover:bg-white/[.07]">Voir le code</a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#71817d]">
              <span>18+ uniquement</span><span>•</span><span>Site indépendant</span><span>•</span><span>Conditions à vérifier</span>
            </div>
          </motion.div>

          <motion.div id="code" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .5 }} className="linebet-code-card">
            <div className="flex items-start justify-between gap-5">
              <div><p className="linebet-mini-label">CODE PARTENAIRE</p><h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">Votre point de départ</h2></div>
              <span className="linebet-secure-badge">Vérifier</span>
            </div>
            <div className="mt-8 rounded-2xl border border-[#19d66b]/25 bg-[#031b0d]/80 px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.07)] sm:px-6">
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#7f938b]">Code Linebet Afrique</p>
              <div className="mt-2 text-4xl font-black tracking-[.18em] text-[#35f17f] sm:text-5xl"><CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" /></div>
              <p className="mt-3 text-xs leading-5 text-[#8fa19b]">Touchez le code pour le copier. Son acceptation et ses conditions sont déterminées par Linebet.</p>
            </div>
            <LinebetLink className="mt-5 w-full">S’inscrire avec VISION221</LinebetLink>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#6f7d79]">Lien d’affiliation rémunéré · BttsBet n’est pas Linebet</p>
          </motion.div>
        </div>
      </section>

      <section className="linebet-trust-strip" aria-label="Informations essentielles">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8">
          <div><span className="linebet-trust-icon">01</span><strong>Code clairement affiché</strong><p>VISION221 est visible avant le clic.</p></div>
          <div><span className="linebet-trust-icon">02</span><strong>Parcours documenté</strong><p>Étapes simples, sans faux compteur ni promesse.</p></div>
          <div><span className="linebet-trust-icon">03</span><strong>Conditions transparentes</strong><p>Les règles finales appartiennent à Linebet.</p></div>
        </div>
      </section>

      <section id="comment-ca-marche" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="steps-title">
        <div className="max-w-2xl"><p className="linebet-kicker">UN PARCOURS SANS DÉTOUR</p><h2 id="steps-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Comment utiliser le code promo Linebet ?</h2><p className="mt-4 text-base leading-7 text-[#94a49e]">Nous séparons ce qui dépend de notre guide de ce qui doit être confirmé par le partenaire.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => <article key={step.number} className="linebet-step-card"><span className="linebet-step-number">{step.number}</span><h3 className="mt-8 text-xl font-extrabold text-white">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#91a09b]">{step.text}</p></article>)}
        </div>
      </section>

      <section id="afrique" className="linebet-region-section" aria-labelledby="region-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div><p className="linebet-kicker">LINEBET EN AFRIQUE</p><h2 id="region-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Un guide pensé pour les recherches africaines.</h2><p className="mt-5 text-base leading-7 text-[#94a49e]">Les offres et l’accès peuvent varier selon la localisation. Sélectionnez votre région pour lire les points importants, puis vérifiez votre éligibilité sur Linebet.</p><LinebetLink className="mt-7">Vérifier sur Linebet</LinebetLink></div>
          <div className="grid gap-3 sm:grid-cols-2">{regions.map((region, index) => <article key={region.name} className="linebet-region-card"><span className="text-xs font-bold text-[#35f17f]">0{index + 1}</span><h3 className="mt-5 text-lg font-extrabold text-white">{region.name}</h3><p className="mt-2 text-sm leading-6 text-[#8e9e98]">{region.countries}</p><p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-5 text-[#677872]">Disponibilité, conditions et moyens de paiement à vérifier au moment de l’inscription.</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="why-title">
        <div className="linebet-editorial-card"><div className="max-w-2xl"><p className="linebet-kicker">POURQUOI VISION221 EST MIS EN AVANT</p><h2 id="why-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Un code unique, un guide qui ne cache pas les conditions.</h2><p className="mt-5 text-sm leading-7 text-[#99aaa3] sm:text-base">BttsBet met en avant le code VISION221 parce qu’il correspond à son lien partenaire Linebet. Nous ne présentons pas un bonus comme garanti et nous n’imitons pas le site officiel. Avant toute action, comparez les conditions affichées par Linebet avec votre situation.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-3"><div><strong className="text-white">Pas de chiffre inventé</strong><p className="mt-2 text-sm leading-6 text-[#81918b]">Aucun montant, taux ou délai n’est présenté comme acquis sans source partenaire.</p></div><div><strong className="text-white">Pas de compte géré ici</strong><p className="mt-2 text-sm leading-6 text-[#81918b]">L’inscription et la vérification restent sur Linebet.</p></div><div><strong className="text-white">Pas de collecte de fonds</strong><p className="mt-2 text-sm leading-6 text-[#81918b]">BttsBet ne reçoit ni dépôt ni mise.</p></div></div></div>
      </section>

      <section id="faq" className="linebet-faq-section" aria-labelledby="faq-title">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24"><p className="linebet-kicker">RÉPONSES DIRECTES</p><h2 id="faq-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">FAQ code promo Linebet</h2><div className="mt-8 space-y-3">{FAQ_ITEMS.map((item) => <details key={item.q} className="linebet-faq-item"><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"><div className="linebet-final-cta"><p className="linebet-kicker">PRÊT À VÉRIFIER ?</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Gardez <span className="text-[#35f17f]">VISION221</span> sous la main.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#9aa9a4]">Ouvrez le parcours Linebet, ajoutez le code si le champ est disponible, puis lisez toutes les conditions avant de poursuivre.</p><LinebetLink className="mt-7">Accéder au partenaire Linebet</LinebetLink></div></section>
    </div>
  )
}

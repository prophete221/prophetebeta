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
  { number: '01', title: 'Ouvrez le lien Linebet', text: 'Cliquez sur le bouton officiel pour accéder au parcours d’inscription partenaire.' },
  { number: '02', title: 'Saisissez VISION221', text: 'Entrez le code VISION221 (majuscules) dans le champ promo pour activer freebets et offres.' },
  { number: '03', title: 'Vérifiez & déposez', text: 'Lisez les conditions, freebets et limites affichés par Linebet avant tout dépôt.' },
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
            <div className="linebet-kicker"><span className="linebet-status-dot" /> MEILLEUR CODE PROMO AFRIQUE · LINEBET</div>
            <h1 id="hero-title" className="mt-5 max-w-3xl text-4xl font-black leading-[.98] tracking-[-.055em] text-white sm:text-6xl lg:text-7xl">
              Meilleur code promo Linebet Afrique : <span className="linebet-gradient-text">VISION221</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#aab8b4] sm:text-lg">
              <strong className="text-white">VISION221</strong> est le code partenaire n°1 recommandé pour Linebet en Afrique. Freebets réguliers, inscription rapide, parcours clair. Copiez le code et activez votre offre en quelques secondes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinebetLink>Utiliser VISION221</LinebetLink>
              <span className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[.04] px-5 py-3.5 text-sm font-bold text-white transition hover:border-[#19d66b]/40 hover:bg-white/[.07]"><CopyableCode code={SITE.promoCode} displayClassName="text-white" /></span>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#71817d]">
              <span>18+ uniquement</span><span>•</span><span>Freebets réguliers</span><span>•</span><span>Partenaire Linebet</span>
            </div>
          </motion.div>

          <motion.div id="code" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .5 }} className="linebet-code-card">
            <div className="flex items-start justify-between gap-4"><div><p className="linebet-mini-label">CODES PARTENAIRES PREMIUM</p><h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">Un code. Un clic.</h2></div><span className="linebet-secure-badge">18+</span></div>
            <div className="mt-6 space-y-2.5">
              <div className="linebet-code-row linebet-code-row-primary"><div><p className="linebet-code-name">Linebet Afrique</p><p className="linebet-code-note">Meilleur code promo · Freebets</p></div><div className="linebet-code-value"><CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" /></div></div>
              <div className="linebet-code-row linebet-code-row-secondary"><div><p className="linebet-code-name">888starz</p><p className="linebet-code-note">Code promo 888starz</p></div><div className="linebet-code-value"><CopyableCode code="btts221" displayClassName="text-[#ffd4df]" /></div></div>
            </div>
            <LinebetLink className="mt-4 w-full">Activer VISION221 + Freebets</LinebetLink>
            <p className="mt-3 text-center text-[11px] leading-5 text-[#6f7d79]">Copiez le code, ouvrez Linebet, vérifiez les conditions chez le partenaire.</p>
          </motion.div>
        </div>
      </section>

      <section className="linebet-trust-strip" aria-label="Informations essentielles">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8">
          <div><span className="linebet-trust-icon">01</span><strong>Meilleur code Afrique</strong><p>VISION221 mis en avant comme code partenaire principal.</p></div>
          <div><span className="linebet-trust-icon">02</span><strong>Freebets réguliers</strong><p>Offres et freebets accessibles via le parcours partenaire.</p></div>
          <div><span className="linebet-trust-icon">03</span><strong>Conditions transparentes</strong><p>Les règles finales appartiennent toujours à Linebet.</p></div>
        </div>
      </section>

      <section id="applications" className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="apps-title"><div className="linebet-apps-panel"><div className="max-w-2xl"><p className="linebet-kicker">ACCÈS MOBILE</p><h2 id="apps-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Téléchargez l’application de votre choix.</h2><p className="mt-3 text-sm leading-6 text-[#94a49e]">Utilisez le bouton correspondant à votre partenaire. Le téléchargement et la disponibilité de l’application peuvent varier selon le pays, le système et la boutique utilisée.</p></div><div className="mt-7 grid gap-3 sm:grid-cols-2"><a href={AFFILIATE.linebetDownload} target="_blank" rel={AFFILIATE.rel} className="linebet-app-card linebet-app-linebet"><div className="flex items-center gap-3"><span className="linebet-app-icon"><img src="/logos/linebet-icon.svg" alt="" className="h-7 w-7 rounded object-contain" /></span><div><p className="text-xs font-black uppercase tracking-[.15em] text-[#7f938b]">Application</p><h3 className="mt-1 text-lg font-extrabold text-white">Télécharger Linebet</h3></div></div><div className="mt-5 flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-sm font-bold text-[#35f17f]"><img src="/logos/android.svg" alt="" className="h-4 w-4" /> Accéder au téléchargement</span><span aria-hidden="true" className="text-[#35f17f]">↗</span></div></a><a href={AFFILIATE.star888Download} target="_blank" rel={AFFILIATE.rel} className="linebet-app-card linebet-app-888"><div className="flex items-center gap-3"><span className="linebet-app-icon"><img src="/logos/888starz-icon.svg" alt="" className="h-7 w-7 object-contain" /></span><div><p className="text-xs font-black uppercase tracking-[.15em] text-[#b98898]">Application</p><h3 className="mt-1 text-lg font-extrabold text-white">Télécharger 888starz</h3></div></div><div className="mt-5 flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-sm font-bold text-[#ffd4df]"><img src="/logos/android.svg" alt="" className="h-4 w-4" /> Accéder au téléchargement</span><span aria-hidden="true" className="text-[#ffd4df]">↗</span></div></a></div></div></section>

      <section id="comment-ca-marche" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="steps-title">
        <div className="max-w-2xl"><p className="linebet-kicker">UN PARCOURS SANS DÉTOUR</p><h2 id="steps-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Comment utiliser le meilleur code promo Linebet ?</h2><p className="mt-4 text-base leading-7 text-[#94a49e]">3 étapes simples pour activer VISION221 et accéder aux freebets.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => <article key={step.number} className="linebet-step-card"><span className="linebet-step-number">{step.number}</span><h3 className="mt-8 text-xl font-extrabold text-white">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#91a09b]">{step.text}</p></article>)}
        </div>
      </section>

      <section id="afrique" className="linebet-region-section" aria-labelledby="region-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div><p className="linebet-kicker">LINEBET EN AFRIQUE</p><h2 id="region-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Le code VISION221 pensé pour l’Afrique.</h2><p className="mt-5 text-base leading-7 text-[#94a49e]">Couverture large : Afrique de l’Ouest, centrale, de l’Est, du Nord et australe. Vérifiez toujours l’éligibilité selon votre pays sur Linebet.</p><LinebetLink className="mt-7">Vérifier sur Linebet</LinebetLink></div>
          <div className="grid gap-3 sm:grid-cols-2">{regions.map((region, index) => <article key={region.name} className="linebet-region-card"><span className="text-xs font-bold text-[#35f17f]">0{index + 1}</span><h3 className="mt-5 text-lg font-extrabold text-white">{region.name}</h3><p className="mt-2 text-sm leading-6 text-[#8e9e98]">{region.countries}</p><p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-5 text-[#677872]">Disponibilité et freebets à vérifier au moment de l’inscription.</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="why-title">
        <div className="linebet-editorial-card"><div className="max-w-2xl"><p className="linebet-kicker">POURQUOI VISION221</p><h2 id="why-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Le code premium mis en avant pour Linebet Afrique.</h2><p className="mt-5 text-sm leading-7 text-[#99aaa3] sm:text-base">BttsBet positionne <strong className="text-white">VISION221</strong> comme le meilleur code promo Linebet Afrique parce qu’il correspond à son lien partenaire officiel. Freebets et promotions sont accessibles via ce parcours. Avant toute action, comparez les conditions affichées par Linebet avec votre situation.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-3"><div><strong className="text-white">Code clair</strong><p className="mt-2 text-sm leading-6 text-[#81918b]">VISION221 visible et copiable en 1 clic.</p></div><div><strong className="text-white">Freebets</strong><p className="mt-2 text-sm leading-6 text-[#81918b]">Offres régulières via le parcours partenaire.</p></div><div><strong className="text-white">Transparence</strong><p className="mt-2 text-sm leading-6 text-[#81918b]">BttsBet ne gère aucun compte ni dépôt.</p></div></div></div>
      </section>

      <section id="partenaires" className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="secondary-partner-title"><div className="linebet-secondary-card"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><span className="linebet-partner-logo"><img src="/logos/888starz-icon.svg" alt="" className="h-8 w-8 object-contain" /></span><div><p className="linebet-kicker">AUTRE PARTENAIRE · 888STARZ</p><h2 id="secondary-partner-title" className="mt-1 text-2xl font-black tracking-[-.03em] text-white">Code promo <span className="text-[#f5a3bd]">btts221</span></h2></div></div><a href={AFFILIATE.star888} target="_blank" rel={AFFILIATE.rel} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#f5a3bd]/35 bg-[#f5a3bd]/10 px-5 py-3 text-sm font-extrabold text-[#ffd4df] transition hover:border-[#f5a3bd]/60 hover:bg-[#f5a3bd]/15 active:scale-[.98]">Voir 888starz <span aria-hidden="true">↗</span></a></div><div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm leading-6 text-[#91a09b] sm:flex-row sm:items-center sm:justify-between"><p>Code partenaire à saisir en minuscules si le champ est proposé. Vérifiez l’offre, le pays et les conditions directement auprès de 888starz.</p><div className="shrink-0 rounded-lg border border-[#f5a3bd]/25 bg-black/20 px-4 py-2"><CopyableCode code="btts221" displayClassName="text-[#ffd4df]" /></div></div></div></section>

      <section id="faq" className="linebet-faq-section" aria-labelledby="faq-title">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24"><p className="linebet-kicker">RÉPONSES DIRECTES</p><h2 id="faq-title" className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">FAQ meilleur code promo Linebet</h2><div className="mt-8 space-y-3">{FAQ_ITEMS.map((item) => <details key={item.q} className="linebet-faq-item"><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"><div className="linebet-final-cta"><p className="linebet-kicker">PRÊT À ACTIVER ?</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">Gardez <span className="text-[#35f17f]">VISION221</span> sous la main.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#9aa9a4]">Ouvrez le parcours Linebet, saisissez le code, activez les freebets disponibles et lisez toutes les conditions avant de poursuivre.</p><LinebetLink className="mt-7">Accéder au partenaire Linebet</LinebetLink></div></section>
    </div>
  )
}

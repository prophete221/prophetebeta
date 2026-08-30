import type { Metadata } from 'next'
import { AFFILIATE, SITE } from '@/lib/constants'
import { CookieConsent, Footer, Navbar } from '@/components/bttsbet'
import CopyableCodeClient from '@/components/bttsbet/CopyableCode'

export const metadata: Metadata = {
  title: 'Code promo Linebet VISION221 — Meilleur code promo Linebet Afrique',
  description:
    'Code promo Linebet VISION221 : le meilleur code promo Linebet Afrique. Freebets et inscription via le parcours partenaire officiel. Copiez VISION221 et activez votre offre.',
  keywords: [
    'code promo Linebet',
    'meilleur code promo Linebet',
    'code promo Linebet Afrique',
    'VISION221',
    'bonus Linebet',
    'freebet Linebet',
  ],
  alternates: { canonical: 'https://bttsbet.online/code-promo-linebet' },
  openGraph: {
    title: 'Code promo Linebet VISION221 — Meilleur code Afrique',
    description: 'VISION221 : meilleur code promo Linebet Afrique. Freebets via parcours officiel.',
    url: 'https://bttsbet.online/code-promo-linebet',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function CodePromoLinebetPage() {
  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#f5c518]">Code promo Linebet</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Meilleur code promo Linebet <span className="text-[#f5c518]">VISION221</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#8b95a5]">
          <strong className="text-white">VISION221</strong> est le code promo Linebet mis en avant pour l’Afrique :
          freebets et parcours partenaire officiel.
        </p>

        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-[#0c0f14] p-4">
          <div className="flex items-center gap-3">
            <img src="/logos/linebet-icon.png" alt="Linebet" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="text-sm font-bold text-white">Linebet Afrique</p>
              <p className="text-xs text-[#8b95a5]">Code promo officiel partenaire</p>
            </div>
            <span className="ml-auto rounded-md border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-[#f5c518]">18+</span>
          </div>
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-black/35 px-3 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b95a5]">Code promo Linebet</p>
            <div className="mt-1">
              <CopyableCodeClient code={SITE.promoCode} displayClassName="text-[#f5c518] text-2xl font-extrabold tracking-wide" />
            </div>
          </div>
          <a
            href={AFFILIATE.linebet}
            target="_blank"
            rel={AFFILIATE.rel}
            className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 text-sm font-extrabold text-[#0c0a02] shadow-lg shadow-amber-500/25"
          >
            <img src="/logos/linebet-icon.png" alt="" className="h-5 w-5 rounded object-cover" />
            Utiliser VISION221 →
          </a>
        </div>

        <div className="mt-8 space-y-3 text-sm leading-relaxed text-[#8b95a5]">
          <h2 className="text-lg font-bold text-white">Pourquoi VISION221 ?</h2>
          <p>
            Sur {SITE.name}, le <strong className="text-white">meilleur code promo Linebet</strong> pour l’Afrique est
            VISION221. Il ouvre le parcours partenaire : freebets et promotions selon les règles Linebet de votre pays.
          </p>
          <p>
            Bonus 888starz ? Voir le <a href="/code-promo-888starz" className="font-semibold text-[#f87171]">code promo 888starz btts221</a> (100 tours Lucky Wheel + freebet 1 €/lundi).
          </p>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

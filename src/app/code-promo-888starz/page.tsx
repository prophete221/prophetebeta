import type { Metadata } from 'next'
import { AFFILIATE, OFFERS_888, SITE } from '@/lib/constants'
import { CookieConsent, Footer, Navbar } from '@/components/bttsbet'
import CopyableCodeClient from '@/components/bttsbet/CopyableCode'

export const metadata: Metadata = {
  title: 'Code promo 888starz btts221 — 100 tours + freebet 1€',
  description:
    'Bonus 888starz avec le code promo btts221 : 100 tours Lucky Wheel gratuits à l’inscription et freebet de 1 € chaque lundi. Meilleur code 888starz via BttsBet.',
  keywords: [
    'code promo 888starz',
    'bonus 888starz',
    'btts221',
    '888starz lucky wheel',
    '100 tours 888starz',
    'freebet 888starz',
    'freebet 1 euro 888starz',
  ],
  alternates: { canonical: 'https://bttsbet.online/code-promo-888starz' },
  openGraph: {
    title: 'Code promo 888starz btts221 — 100 tours + freebet 1€/lundi',
    description: 'btts221 : 100 tours Lucky Wheel à l’inscription + freebet 1 € chaque lundi.',
    url: 'https://bttsbet.online/code-promo-888starz',
    siteName: 'BttsBet',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function CodePromo888Page() {
  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#f87171]">Bonus 888starz</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Code promo 888starz <span className="text-[#f87171]">btts221</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#8b95a5]">
          Activez le <strong className="text-white">meilleur parcours bonus 888starz</strong> avec le code{' '}
          <strong className="text-[#f87171]">btts221</strong>.
        </p>

        <div className="mt-6 rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-950/40 to-[#0c0f14] p-4">
          <div className="flex items-center gap-3">
            <img src="/logos/888starz-icon.png" alt="888starz" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="text-sm font-bold text-white">Offre d’inscription</p>
              <p className="text-xs text-[#8b95a5]">Via le code partenaire {OFFERS_888.code}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-[#d4d8de]">
            <li className="rounded-lg border border-white/5 bg-black/30 px-3 py-2.5">
              <strong className="text-[#f87171]">100 tours</strong> Lucky Wheel gratuits à l’inscription
            </li>
            <li className="rounded-lg border border-white/5 bg-black/30 px-3 py-2.5">
              <strong className="text-[#f87171]">Freebet 1 €</strong> chaque lundi
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8b95a5]">
              Code <CopyableCodeClient code={OFFERS_888.code} displayClassName="text-[#f87171] text-base" />
            </div>
            <a
              href={AFFILIATE.star888}
              target="_blank"
              rel={AFFILIATE.rel}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-b from-red-400 to-red-600 px-4 text-sm font-extrabold text-white shadow-lg shadow-red-500/25"
            >
              Utiliser btts221 →
            </a>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[#6b7580]">
            Offres définies par 888starz. Disponibilité et conditions (pays, mises) confirmées sur le site partenaire à l’inscription. 18+.
          </p>
        </div>

        <div className="mt-8 space-y-3 text-sm leading-relaxed text-[#8b95a5]">
          <h2 className="text-lg font-bold text-white">Comment activer le bonus 888starz</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Cliquez sur « Utiliser btts221 ».</li>
            <li>Créez votre compte 888starz.</li>
            <li>Saisissez le code promo <strong className="text-white">btts221</strong>.</li>
            <li>Profitez des 100 tours Lucky Wheel et du freebet 1 € chaque lundi selon les règles affichées.</li>
          </ol>
          <p>
            Vous cherchez aussi le <a href="/" className="font-semibold text-[#f5c518]">code promo Linebet VISION221</a> ? C’est le code mis en avant pour Linebet Afrique sur {SITE.name}.
          </p>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

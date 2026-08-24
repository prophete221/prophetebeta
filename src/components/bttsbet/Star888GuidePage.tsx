import { AFFILIATE } from '@/lib/constants'
import CopyableCode from './CopyableCode'
import Footer from './Footer'
import Navbar from './Navbar'
import CookieConsent from './CookieConsent'

const steps = [
  { n: '01', t: 'Ouvrir 888starz', d: 'Cliquez sur le bouton partenaire ci-dessous.' },
  { n: '02', t: 'Saisir btts221', d: 'Entrez le code en minuscules dans le champ promo.' },
  { n: '03', t: 'Vérifier l’offre', d: 'Lisez conditions et disponibilité sur 888starz.' },
]

export default function Star888GuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Code promo 888starz btts221',
    description: 'Code partenaire 888starz btts221 — inscription et conditions à vérifier.',
  }

  return (
    <div className="min-h-screen bg-[#050706]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden" style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 10%, rgba(245,163,189,.12), transparent 55%), #050706' }}>
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
            <p className="text-[.68rem] font-black tracking-[.18em] text-[#ffd4df]">CODE PROMO 888STARZ</p>
            <h1 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.05em] text-white sm:text-5xl lg:text-6xl">
              Code promo <span className="text-[#f5a3bd]">btts221</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#aab8b4] sm:text-lg">
              Code partenaire 888starz. Copiez, inscrivez-vous, vérifiez les conditions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={AFFILIATE.star888}
                target="_blank"
                rel={AFFILIATE.rel}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f5a3bd] px-5 py-3.5 text-sm font-extrabold text-[#270914] shadow-[0_12px_32px_rgba(245,163,189,.2)] transition hover:bg-[#ffd4df] active:scale-[.98]"
              >
                <img src="/logos/888starz-icon.png" alt="" className="h-5 w-5 object-contain" />
                Ouvrir 888starz
                <span aria-hidden="true">↗</span>
              </a>
              <div className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#f5a3bd]/25 bg-[#f5a3bd]/[.08] px-5 py-3.5 text-sm font-bold text-[#ffd4df]">
                <CopyableCode code="btts221" displayClassName="text-[#ffd4df]" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-[#10090c]">
          <div className="mx-auto grid max-w-5xl gap-4 px-5 py-12 sm:grid-cols-3 sm:px-8 sm:py-16">
            {steps.map((s) => (
              <article key={s.n} className="linebet-step-card" style={{ borderColor: 'rgba(245,163,189,.15)' }}>
                <span className="linebet-step-number" style={{ color: '#ffd4df' }}>{s.n}</span>
                <h2 className="mt-6 text-xl font-extrabold text-white">{s.t}</h2>
                <p className="mt-3 text-sm leading-6 text-[#c3abb2]">{s.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="linebet-secondary-card text-center">
            <p className="linebet-kicker" style={{ color: '#ffd4df' }}>À RETENIR</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-white">888starz · btts221</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#c3abb2]">
              Code en minuscules. Conditions et disponibilité uniquement sur 888starz.
            </p>
            <a
              href={AFFILIATE.star888}
              target="_blank"
              rel={AFFILIATE.rel}
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#f5a3bd]/35 bg-[#f5a3bd]/10 px-5 py-3.5 text-sm font-extrabold text-[#ffd4df] transition hover:bg-[#f5a3bd]/15"
            >
              Vérifier sur 888starz <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-5 text-sm">
              <a href="/ar/code-promo-888starz" className="font-bold text-[#ffd4df] underline">
                اقرأ الدليل باللغة العربية ←
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}

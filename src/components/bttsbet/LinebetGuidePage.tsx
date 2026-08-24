import type { ReactNode } from 'react'
import { AFFILIATE, FAQ_ITEMS, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'
import Footer from './Footer'
import Navbar from './Navbar'
import CookieConsent from './CookieConsent'

type GuideVariant = 'promo' | 'signup' | 'africa' | 'senegal'

const content: Record<GuideVariant, { kicker: string; title: ReactNode; intro: string; steps: { n: string; t: string; d: string }[] }> = {
  promo: {
    kicker: 'CODE PROMO LINEBET · PREMIUM',
    title: <>Meilleur code promo Linebet Afrique : <span className="linebet-gradient-text">VISION221</span></>,
    intro: 'VISION221 est le code partenaire n°1 recommandé pour Linebet en Afrique. Freebets réguliers. Copiez, inscrivez-vous, activez.',
    steps: [
      { n: '01', t: 'Ouvrir Linebet', d: 'Cliquez sur le bouton partenaire ci-dessous.' },
      { n: '02', t: 'Saisir VISION221', d: 'Entrez le code en majuscules dans le champ promo.' },
      { n: '03', t: 'Activer les freebets', d: 'Vérifiez l’offre et les conditions affichées par Linebet.' },
    ],
  },
  signup: {
    kicker: 'INSCRIPTION LINEBET',
    title: <>Inscription Linebet avec <span className="linebet-gradient-text">VISION221</span></>,
    intro: 'Parcours rapide : ouvrir le lien, créer le compte, saisir le code, vérifier freebets et conditions.',
    steps: [
      { n: '01', t: 'Lien partenaire', d: 'Utilisez le bouton BttsBet pour accéder à Linebet.' },
      { n: '02', t: 'Créer le compte', d: 'Inscrivez-vous si Linebet est disponible dans votre pays.' },
      { n: '03', t: 'Code + freebets', d: 'Saisissez VISION221 et lisez les conditions avant de déposer.' },
    ],
  },
  africa: {
    kicker: 'LINEBET AFRIQUE',
    title: <>Linebet Afrique · code <span className="linebet-gradient-text">VISION221</span></>,
    intro: 'Code premium pour l’Afrique de l’Ouest, centrale, de l’Est, du Nord et australe. Disponibilité selon le pays.',
    steps: [
      { n: '01', t: 'Choisir le pays', d: 'Vérifiez que Linebet est accessible depuis votre localisation.' },
      { n: '02', t: 'Activer VISION221', d: 'Saisissez le code lors de l’inscription.' },
      { n: '03', t: 'Freebets', d: 'Les offres varient selon le pays — confirmez sur Linebet.' },
    ],
  },
  senegal: {
    kicker: 'LINEBET SÉNÉGAL',
    title: <>Code promo Linebet Sénégal : <span className="linebet-gradient-text">VISION221</span></>,
    intro: 'Le code VISION221 pour les joueurs au Sénégal. Freebets et conditions à vérifier sur Linebet.',
    steps: [
      { n: '01', t: 'Ouvrir Linebet', d: 'Accédez via le lien partenaire BttsBet.' },
      { n: '02', t: 'Code VISION221', d: 'Saisissez-le en majuscules dans le champ promo.' },
      { n: '03', t: 'Conditions SN', d: 'Vérifiez freebets, dépôt min. et règles locales.' },
    ],
  },
}

function LinebetLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={AFFILIATE.linebet}
      target="_blank"
      rel={AFFILIATE.rel}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#31ef80] to-[#19d66b] px-5 py-3.5 text-sm font-extrabold text-[#031b0d] shadow-[0_12px_32px_rgba(25,214,107,.25)] transition hover:-translate-y-0.5 hover:from-[#4aff95] hover:to-[#31ef80] active:scale-[.98] ${className}`}
    >
      <img src="/logos/linebet-icon.svg" alt="" className="h-5 w-5 rounded object-contain" />
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export default function LinebetGuidePage({ variant }: { variant: GuideVariant }) {
  const c = content[variant]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="min-h-screen bg-[#050706]">
      <Navbar />
      <main>
        <section className="linebet-hero">
          <div className="linebet-grid-overlay" aria-hidden="true" />
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
            <p className="linebet-kicker">{c.kicker}</p>
            <h1 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.05em] text-white sm:text-5xl lg:text-6xl">{c.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#aab8b4] sm:text-lg">{c.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinebetLink>Utiliser VISION221</LinebetLink>
              <div className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#35f17f]/25 bg-[#35f17f]/[.08] px-5 py-3.5 text-sm font-bold text-[#35f17f]">
                <CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-[#080d0a]">
          <div className="mx-auto grid max-w-5xl gap-4 px-5 py-12 sm:grid-cols-3 sm:px-8 sm:py-16">
            {c.steps.map((s) => (
              <article key={s.n} className="linebet-step-card">
                <span className="linebet-step-number">{s.n}</span>
                <h2 className="mt-6 text-xl font-extrabold text-white">{s.t}</h2>
                <p className="mt-3 text-sm leading-6 text-[#91a09b]">{s.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="linebet-final-cta text-center">
            <p className="linebet-kicker">PRÊT ?</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">
              Activez <span className="text-[#35f17f]">VISION221</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#9aa9a4]">
              Copiez le code, ouvrez Linebet, saisissez-le et vérifiez freebets + conditions.
            </p>
            <LinebetLink className="mt-7">Accéder à Linebet</LinebetLink>
          </div>
        </section>

        {variant === 'promo' && (
          <section id="faq" className="linebet-faq-section">
            <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
              <p className="linebet-kicker">FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">Questions rapides</h2>
              <div className="mt-8 space-y-3">
                {FAQ_ITEMS.slice(0, 5).map((item) => (
                  <details key={item.q} className="linebet-faq-item">
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
        )}
      </main>
      <Footer />
      <CookieConsent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}

import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/bttsbet'

const SITE_URL = 'https://bttsbet.online'

export const metadata: Metadata = {
  title: 'Statistiques des pronostics | BttsBet',
  description: 'État des statistiques publiques BttsBet : les taux sont publiés uniquement lorsque les scores finaux sont vérifiés.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/statistiques` },
}

export default function StatistiquesPage() {
  return (
    <div className="min-h-screen bg-midnight text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <header className="text-center">
          <span className="eyebrow">Transparence des données</span>
          <h1 className="section-title mt-3 mb-4">Statistiques publiques</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Aucun taux de réussite ni ROI n’est publié tant que les scores finaux ne sont pas confirmés par une source vérifiable. Les performances passées ne garantissent pas les résultats futurs.
          </p>
        </header>
        <section className="squircle-xl p-6 mt-8 border border-edge bg-panel/40 text-center">
          <div className="text-3xl font-bold text-gold">N/D</div>
          <h2 className="text-lg font-semibold text-white mt-2">Historique en attente de vérification</h2>
          <p className="text-sm text-gray-400 leading-relaxed mt-3">
            Les fixtures et estimations du jour sont disponibles sur la page des pronostics. Cette page sera enrichie lorsque des résultats finaux vérifiés pourront être reliés aux prédictions publiées.
          </p>
          <a href="/#free-predictions" className="inline-flex mt-5 px-4 py-2 rounded-lg bg-gold text-midnight font-bold text-sm">
            Voir les pronostics
          </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}

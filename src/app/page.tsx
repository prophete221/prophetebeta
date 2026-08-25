import type { Metadata } from 'next'
import { FAQ_ITEMS, SITE } from '@/lib/constants'
import { CookieConsent, Footer, Navbar } from '@/components/bttsbet'
import LinebetLanding from '@/components/bttsbet/LinebetLanding'

export const metadata: Metadata = {
  title: 'Meilleur code promo Linebet Afrique : VISION221 | BttsBet',
  description: 'VISION221 — le meilleur code promo Linebet Afrique. Freebets réguliers, inscription rapide, parcours premium. Copiez le code et activez votre offre.',
  alternates: { canonical: 'https://bttsbet.online/' },
  openGraph: {
    title: 'Meilleur code promo Linebet Afrique : VISION221',
    description: 'Le code VISION221 est le code partenaire Linebet n°1 en Afrique. Freebets et inscription claire.',
    url: 'https://bttsbet.online/',
    siteName: 'BttsBet',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Meilleur code promo Linebet Afrique VISION221' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meilleur code promo Linebet Afrique : VISION221',
    description: 'Freebets + code VISION221. Activez votre offre Linebet en quelques clics.',
    images: ['/og-linebet.svg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.tagline,
      inLanguage: ['fr', 'en', 'ar'],
      publisher: { '@id': `${SITE.url}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/favicon.svg`,
      description: 'Plateforme premium du meilleur code promo Linebet Afrique VISION221 et freebets.',
      areaServed: 'Africa',
      knowsAbout: [
        'meilleur code promo Linebet Afrique',
        'VISION221',
        'freebet Linebet',
        'code promo Linebet',
        'inscription Linebet',
        'code promo 888starz',
        'btts221',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0c10]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#00e676] focus:px-4 focus:py-3 focus:font-bold focus:text-[#003d1f]">Aller au contenu principal</a>
      <Navbar />
      <main id="main-content"><LinebetLanding /></main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

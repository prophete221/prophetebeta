import type { Metadata } from 'next'
import { FAQ_ITEMS, SITE } from '@/lib/constants'
import { CookieConsent, Footer, Navbar } from '@/components/bttsbet'
import LinebetLanding from '@/components/bttsbet/LinebetLanding'

export const metadata: Metadata = {
  title: 'Code promo Linebet VISION221 — Meilleur code Afrique',
  description:
    'Meilleur code promo Linebet Afrique : VISION221. Freebets Linebet + bonus 888starz btts221 (100 tours Lucky Wheel à l’inscription, freebet 1€ chaque lundi). Copiez le code, inscrivez-vous, profitez.',
  keywords: [
    'code promo Linebet',
    'meilleur code promo Linebet',
    'code promo Linebet Afrique',
    'VISION221',
    'bonus Linebet',
    'freebet Linebet',
    'inscription Linebet',
    'code promo 888starz',
    'bonus 888starz',
    'btts221',
    '888starz lucky wheel',
    'freebet 888starz',
  ],
  alternates: { canonical: 'https://bttsbet.online/' },
  openGraph: {
    title: 'Code promo Linebet VISION221 — Meilleur code Afrique',
    description:
      'VISION221 : meilleur code promo Linebet Afrique. Aussi bonus 888starz btts221 — 100 tours Lucky Wheel + freebet 1€ chaque lundi.',
    url: 'https://bttsbet.online/',
    siteName: 'BttsBet — Code promo Linebet',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Code promo Linebet VISION221' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code promo Linebet VISION221 | Bonus 888starz btts221',
    description: 'Meilleur code promo Linebet Afrique + 100 tours Lucky Wheel 888starz et freebet 1€/lundi.',
    images: ['/og-linebet.svg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'BttsBet — Code promo Linebet',
      url: SITE.url,
      description: SITE.tagline,
      inLanguage: ['fr', 'en', 'ar'],
      publisher: { '@id': `${SITE.url}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE.url}/code-promo-linebet`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: 'BttsBet',
      url: SITE.url,
      logo: `${SITE.url}/favicon.svg`,
      description:
        'Plateforme du meilleur code promo Linebet Afrique VISION221 et du bonus 888starz btts221 (100 tours Lucky Wheel, freebet 1€ chaque lundi).',
      areaServed: 'Africa',
      knowsAbout: [
        'code promo Linebet',
        'meilleur code promo Linebet Afrique',
        'VISION221',
        'bonus Linebet',
        'freebet Linebet',
        'code promo 888starz',
        'bonus 888starz',
        'btts221',
        'Lucky Wheel 888starz',
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
    <div className="min-h-screen bg-[#07090d]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#f5c518] focus:px-4 focus:py-3 focus:font-bold focus:text-[#0c0a02]">Aller au contenu principal</a>
      <Navbar />
      <main id="main-content"><LinebetLanding /></main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

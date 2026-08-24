import type { Metadata } from 'next'
import { FAQ_ITEMS, SITE } from '@/lib/constants'
import { CookieConsent, Footer, Navbar } from '@/components/bttsbet'
import LinebetLanding from '@/components/bttsbet/LinebetLanding'

export const metadata: Metadata = {
  title: 'Code promo Linebet Afrique VISION221 | BttsBet',
  description: 'Guide clair du code promo Linebet Afrique VISION221 : inscription, utilisation du code, vérification des conditions et accès au lien partenaire.',
  alternates: { canonical: 'https://bttsbet.online/' },
  openGraph: {
    title: 'Code promo Linebet Afrique VISION221',
    description: 'Le guide BttsBet pour comprendre et utiliser le code partenaire Linebet VISION221, avec conditions à vérifier selon votre pays.',
    url: 'https://bttsbet.online/',
    siteName: 'BttsBet',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Code promo Linebet Afrique VISION221' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code promo Linebet Afrique VISION221',
    description: 'Guide d’inscription et conditions à vérifier pour le code partenaire Linebet VISION221.',
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
      description: 'Site indépendant d’information et d’affiliation consacré au code partenaire Linebet VISION221.',
      areaServed: 'Africa',
      knowsAbout: ['code promo Linebet', 'inscription Linebet', 'Linebet Afrique'],
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
    <div className="min-h-screen bg-[#050706]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#35f17f] focus:px-4 focus:py-3 focus:font-bold focus:text-[#031b0d]">Aller au contenu principal</a>
      <Navbar />
      <main id="main-content"><LinebetLanding /></main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

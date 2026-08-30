import type { Metadata } from 'next'
import { FAQ_ITEMS, SITE } from '@/lib/constants'
import { CookieConsent, Footer, Navbar } from '@/components/bttsbet'
import LinebetLanding from '@/components/bttsbet/LinebetLanding'

export const metadata: Metadata = {
  title: 'Code promo Linebet VISION221 — Guide clair Afrique',
  description:
    'Code promo Linebet VISION221 : comment l’utiliser, vérifier les offres selon votre pays et accéder au parcours partenaire. Guide transparent BttsBet.',
  alternates: { canonical: 'https://bttsbet.online/' },
  openGraph: {
    title: 'Code promo Linebet VISION221',
    description: 'Guide clair pour utiliser VISION221 et vérifier les conditions Linebet selon votre pays.',
    url: 'https://bttsbet.online/',
    siteName: 'BttsBet',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Code promo Linebet VISION221' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code promo Linebet VISION221',
    description: 'Comment utiliser VISION221 — guide transparent Afrique.',
    images: ['/og-linebet.svg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'BttsBet',
      url: SITE.url,
      description: SITE.tagline,
      inLanguage: ['fr', 'ar'],
      publisher: { '@id': `${SITE.url}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: 'BttsBet',
      url: SITE.url,
      logo: `${SITE.url}/favicon.svg`,
      description:
        'Site indépendant d’information et d’affiliation sur le code promo Linebet VISION221.',
      areaServed: 'Africa',
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
    <div className="min-h-screen bg-[#05070B]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#F5C518] focus:px-4 focus:py-3 focus:font-bold focus:text-[#05070B]"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">
        <LinebetLanding />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

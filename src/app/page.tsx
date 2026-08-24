'use client'

import {
  Navbar,
  Hero,
  HowItWorks,
  FreePredictions,
  PromoVip,
  Footer,
  CookieConsent,
  ScrollProgressBar,
  ErrorBoundary,
  MobileTabBar,
  StickyCTABar,
} from '@/components/bttsbet'

// JSON-LD WebSite — SearchAction for Google SERP
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BttsBet',
  url: 'https://bttsbet.online',
  description: "Pronostics football BTTS et Over 2,5 fondés sur un modèle Poisson et des fixtures ESPN. Données horodatées et aucune garantie de gain.",
  inLanguage: 'fr',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://bttsbet.online/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'BttsBet',
    url: 'https://bttsbet.online',
    logo: {
      '@type': 'ImageObject',
      url: 'https://bttsbet.online/favicon.svg',
    },
  },
}

// JSON-LD FAQPage — Google SERP rich results
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Qu'est-ce que le BTTS ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "BTTS signifie Both Teams To Score (les deux équipes marquent). C'est un type de pari où vous pariez que les deux équipes marqueront au moins un but durant le match, quelle que soit l'issue finale.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment fonctionne l'IA de BttsBet ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le modèle public utilise les fixtures ESPN et des profils de ligue pour calculer des estimations BTTS et Over 2,5 avec une loi de Poisson. Les xG d’équipe, les blessures, la météo et les cotes ne sont pas inventés lorsqu’ils ne sont pas disponibles. Aucun taux de réussite n’est publié sans résultats finaux vérifiés.",
      },
    },
    {
      '@type': 'Question',
      name: 'Comment utiliser le code promo VISION221 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Inscrivez-vous sur Linebet via notre lien de parrainage, puis saisissez le code promo VISION221 lors de votre inscription ou dans la section Code Promo de votre compte pour recevoir un bonus exclusif sur votre premier dépôt.",
      },
    },
    {
      '@type': 'Question',
      name: 'Les pronostics gratuits sont-ils fiables ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les pronostics gratuits sont des estimations statistiques publiées avec leur date, leur heure et les limites connues du modèle. Ils ne constituent pas une garantie de gain et les performances passées ne préjugent pas des résultats futurs.",
      },
    },
  ],
}

// JSON-LD Organization — E-E-A-T entity recognition
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BttsBet',
  url: 'https://bttsbet.online',
  logo: 'https://bttsbet.online/favicon.svg',
  description: "Plateforme de pronostics football BTTS et Over 2,5 fondés sur un modèle Poisson et des fixtures ESPN.",
  areaServed: ['SN', 'CI', 'CM', 'ML', 'BF', 'FR'],
  knowsAbout: ['BTTS', 'Over 2.5', 'paris sportifs', 'modèle Poisson', 'football'],
}

// JSON-LD BreadcrumbList — breadcrumbs in SERP
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://bttsbet.online/' },
    { '@type': 'ListItem', position: 2, name: 'Pronostics', item: 'https://bttsbet.online/#free-predictions' },
    { '@type': 'ListItem', position: 3, name: 'VIP', item: 'https://bttsbet.online/#vip' },
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-midnight relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold focus:text-midnight focus:font-bold focus:rounded-lg"
      >
        Aller au contenu principal
      </a>

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Parcours principal : proposition de valeur → pronostics → VIP → méthode → liens utiles. */}
      <main id="main-content" className="relative z-10">
        <ErrorBoundary><Navbar /></ErrorBoundary>
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><FreePredictions /></ErrorBoundary>
        <ErrorBoundary><PromoVip /></ErrorBoundary>
        <ErrorBoundary><HowItWorks /></ErrorBoundary>
        <ErrorBoundary><Footer /></ErrorBoundary>
      </main>

      {/* Mobile Tab Bar — bottom navigation */}
      <MobileTabBar />

      {/* Sticky CTA Bar — mobile only, appears after 60% scroll */}
      <StickyCTABar />

      {/* Cookie Consent Banner (RGPD) */}
      <CookieConsent />
    </div>
  )
}

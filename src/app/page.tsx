'use client'

import {
  Navbar,
  Hero,
  FreePredictions,
  PromoVip,
  WinHistory,
  Footer,
  CookieConsent,
  AgeVerification,
  FloatingElements,
  CursorEffect,
} from '@/components/bttsbet'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900 relative">
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-emerald focus:text-dark-900 focus:font-bold focus:rounded-lg"
      >
        Aller au contenu principal
      </a>

      {/* Floating Elements Layer */}
      <FloatingElements />

      {/* Cursor Glow Effect */}
      <CursorEffect />

      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        <Navbar />
        <Hero />
        <FreePredictions />
        <PromoVip />
        <WinHistory />
        <Footer />
      </main>

      {/* Age Verification Modal (18+) */}
      <AgeVerification />

      {/* Cookie Consent Banner (RGPD) */}
      <CookieConsent />
    </div>
  )
}

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FreePredictions from './components/predictions/FreePredictions'
import PromoVip from './components/PromoVip'
import WinHistory from './components/WinHistory'
import Footer from './components/Footer'
import CursorEffect from './components/CursorEffect'
import FloatingElements from './components/FloatingElements'
import ErrorBoundary from './components/ErrorBoundary'
import CookieConsent from './components/CookieConsent'
import AgeVerification from './components/AgeVerification'
import { MentionsLegales, PolitiqueConfidentialite, JouerResponsable, CGU } from './pages/LegalPages'

// Lazy-loaded 3D Scene (desktop only, with fallback)
const Scene3D = lazy(() => import('./components/Scene3D'))

// Lazy-loaded pages (code splitting)
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'))

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="inline-block w-10 h-10 border-3 border-neon/30 border-t-neon rounded-full animate-spin" />
    </div>
  )
}

// Three.js loading fallback (invisible)
function Scene3DFallback() {
  return null
}

function HomePage() {
  return (
    <>
      <Helmet>
        <title>BttsBet – Pronostics BTTS & Over 2,5 | Précision IA ~78%</title>
      </Helmet>
      {/* Zone 1 : Hero — compact, bold, sportif */}
      <Hero />
      {/* Zone 2 : Predictions Dashboard — LA star du site */}
      <FreePredictions />
      {/* Zone 3 : VIP + Promo combiné */}
      <PromoVip />
      {/* Zone 4 : Historique des gains */}
      <WinHistory />
    </>
  )
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-2">Page non trouvée</p>
        <p className="text-gray-500 mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <a
          href="/"
          className="px-8 py-3 bg-gradient-to-r from-emerald to-gold text-dark-900 font-bold rounded-full hover:shadow-lg hover:shadow-emerald/30 transition-all"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark-900 relative">
        {/* 3D Background Layer — desktop only for performance */}
        <Suspense fallback={<Scene3DFallback />}>
          {typeof window !== 'undefined' && window.innerWidth >= 768 && <Scene3D />}
        </Suspense>

        {/* Floating Elements Layer */}
        <FloatingElements />

        {/* Cursor Glow Effect */}
        <CursorEffect />

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/jouer-responsable" element={<JouerResponsable />} />
              <Route path="/cgu" element={<CGU />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>

        {/* Age Verification Modal (18+) */}
        <AgeVerification />

        {/* Cookie Consent Banner (RGPD) */}
        <CookieConsent />
      </div>
    </ErrorBoundary>
  )
}

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { StatsSection as Stats, HowItWorks, WhyLinebet, Testimonials, BlogSection, SeoBlock } from './components/Sections'
import PromoBanner from './components/PromoBanner'
import FreePredictions from './components/predictions/FreePredictions'
import LockedCoupons from './components/predictions/LockedCoupons'
import FaqAccordion from './components/FaqAccordion'
import WinHistory from './components/WinHistory'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import CursorEffect from './components/CursorEffect'
import FloatingElements from './components/FloatingElements'
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
      {/* Bloc 1 : Hero (promesse + preuve rapide + CTA) */}
      <Hero />
      <SectionDivider type="wave" color="#0B1020" />
      {/* Bloc 2 : Pronostics Gratuits du Jour (MIS EN AVANT - première section visible) */}
      <FreePredictions />
      <SectionDivider type="mountain" color="#0B1020" />
      {/* Bloc 3 : Pronostics Premium (VIP) - après les pronostics gratuits */}
      <LockedCoupons />
      <SectionDivider type="mountain" color="#0B1020" />
      {/* Bloc 4 : Historique des gains vérifiés */}
      <WinHistory />
      <SectionDivider type="curve" flip color="#050816" />
      {/* Bloc 5 : Stats clés (précision, matchs analysés, ligues) */}
      <Stats />
      <SectionDivider type="curve" flip color="#050816" />
      {/* Bloc 6 : Bonus Linebet */}
      <PromoBanner />
      <SectionDivider type="curve" flip color="#050816" />
      {/* Bloc 7 : Why Linebet */}
      <WhyLinebet />
      <SectionDivider type="curve" flip color="#050816" />
      {/* Bloc 8 : Social proof (avis) */}
      <Testimonials />
      <SectionDivider type="wave" color="#0B1020" />
      {/* Bloc 9 : Blog */}
      <BlogSection />
      <SectionDivider type="curve" flip color="#050816" />
      {/* Bloc 10 : SEO content */}
      <SeoBlock />
      <SectionDivider type="wave" color="#0B1020" />
      {/* Bloc 11 : Comment ça marche */}
      <HowItWorks />
      <SectionDivider type="curve" flip color="#050816" />
      {/* Bloc 12 : FAQ */}
      <FaqAccordion />
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
          className="px-8 py-3 bg-gradient-to-r from-neon to-neon-purple text-dark-900 font-bold rounded-full hover:shadow-lg hover:shadow-neon/30 transition-all"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-dark-900 relative">
      {/* 3D Background Layer */}
      <Suspense fallback={<Scene3DFallback />}>
        <Scene3D />
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
    </div>
  )
}

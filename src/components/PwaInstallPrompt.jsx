import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── PWA Install Prompt Component ───
// Shows a custom install banner when the app is installable
export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show prompt after a short delay (don't be aggressive)
      setTimeout(() => setShowPrompt(true), 5000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Don't show again for 3 days
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString())
  }

  // Check if dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa_prompt_dismissed')
    if (dismissed) {
      const threeDays = 3 * 24 * 60 * 60 * 1000
      if (Date.now() - parseInt(dismissed) < threeDays) {
        setShowPrompt(false)
      }
    }
  }, [])

  if (isInstalled || !showPrompt) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40"
      >
        <div className="bg-panel border border-emerald/20 rounded-2xl p-4 shadow-2xl shadow-black/40">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-midnight/60 text-gray-500 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="w-10 h-10 bg-emerald/10 border border-emerald/20 rounded-xl flex items-center justify-center text-emerald flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white mb-0.5">Installer BttsBet</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Accédez rapidement à vos pronostics depuis votre écran d'accueil, même hors connexion.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleInstall}
                  className="px-4 py-2 bg-gradient-to-r from-emerald to-emerald-dark text-midnight font-bold rounded-lg text-xs hover:shadow-lg hover:shadow-emerald/30 transition-all"
                >
                  Installer
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-2 text-gray-500 hover:text-gray-300 text-xs transition-colors"
                >
                  Plus tard
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

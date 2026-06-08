import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useAnimations'
import TiltCard from './TiltCard'

export default function WinHistory() {
  const [ref, isVisible] = useScrollAnimation()
  const [showAll, setShowAll] = useState(false)
  const [winData, setWinData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/win-history.json')
      .then((r) => r.json())
      .then((data) => {
        setWinData(data)
        setLoading(false)
      })
      .catch(() => {
        setWinData(null)
        setLoading(false)
      })
  }, [])

  // Calculer les stats à partir des données réelles (toujours cohérent)
  const computedStats = useMemo(() => {
    if (!winData || !winData.history || winData.history.length === 0) return null

    const history = winData.history
    const total = history.length
    const won = history.filter(h => h.result === 'Gagné').length
    const rate = total > 0 ? ((won / total) * 100).toFixed(1) : '0.0'

    // Derniers 30 jours
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const last30 = history.filter(h => new Date(h.date) >= thirtyDaysAgo)
    const last30Won = last30.filter(h => h.result === 'Gagné').length
    const last30Rate = last30.length > 0 ? ((last30Won / last30.length) * 100).toFixed(0) : '—'

    return { total, won, rate: `${rate}%`, last30Rate: `${last30Rate}%` }
  }, [winData])

  if (loading) {
    return (
      <section id="win-history" className="py-10 px-4 bg-dark-800/50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block w-8 h-8 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  if (!winData || !winData.history || winData.history.length === 0 || !computedStats) {
    return null
  }

  const { history } = winData
  const displayedHistory = showAll ? history : history.slice(0, 5)

  return (
    <section ref={ref} id="win-history" className="py-10 px-4 bg-dark-800/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 6 }}
          animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'center bottom' }}
          className="text-center mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Historique des <span className="text-emerald neon-glow">Résultats</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Résultats vérifiés par notre IA
          </p>
        </motion.div>

        {/* Stats Summary — computed from data, always coherent */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {[
            { value: computedStats.total, label: 'Analysés', color: 'text-white' },
            { value: computedStats.won, label: 'Gagnants', color: 'text-emerald' },
            { value: computedStats.rate, label: 'Réussite', color: 'text-emerald' },
            { value: computedStats.last30Rate, label: '30 jours', color: 'text-gold' },
          ].map((item, i) => (
            <TiltCard key={i} maxTilt={4}>
              <div className="glass-3d rounded-lg p-3 text-center stat-card-animated">
                <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                <div className="text-[10px] text-gray-500">{item.label}</div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Results Table — compact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-3d rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="hidden sm:grid grid-cols-6 gap-3 px-3 py-2 bg-white/5 text-gray-500 text-[10px] font-semibold uppercase tracking-wider border-b border-emerald/10">
            <span>Date</span>
            <span>Match</span>
            <span>Type</span>
            <span>Pronostic</span>
            <span>Score</span>
            <span className="text-right">Résultat</span>
          </div>

          {/* Rows */}
          {displayedHistory.map((item, i) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-6 gap-1 sm:gap-3 px-3 py-2.5 border-t border-white/5 hover:bg-emerald/5 transition-colors items-center"
            >
              <div className="text-[10px] text-gray-500 sm:text-xs">{item.date}</div>
              <div>
                <div className="text-white font-semibold text-xs sm:text-sm">{item.match}</div>
                <div className="text-[10px] text-gray-500 sm:hidden">{item.league} • {item.type}</div>
                <div className="text-[10px] text-gray-500 hidden sm:block">{item.league}</div>
              </div>
              <div className="hidden sm:block">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  item.type === 'BTTS'
                    ? 'bg-emerald/10 text-emerald'
                    : 'bg-gold/10 text-gold'
                }`}>
                  {item.type}
                </span>
              </div>
              <div className="text-xs text-white font-semibold">{item.prediction}</div>
              <div className="text-xs text-gray-300 font-mono">{item.score}</div>
              <div className="text-right">
                <span className={`font-bold text-xs ${
                  item.result === 'Gagné' ? 'text-emerald' : 'text-red-400'
                }`}>
                  {item.result}
                </span>
                <span className="text-[10px] text-gray-500 ml-1 hidden sm:inline">
                  {item.confidence}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More */}
        {history.length > 5 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-1.5 glass-3d text-emerald text-xs font-semibold rounded-full hover:bg-emerald/10 transition-all hover-lift"
            >
              {showAll ? 'Voir moins ↑' : 'Voir plus ↓'}
            </button>
          </div>
        )}

        {/* Verification Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="text-center mt-4"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 bg-emerald rounded-full animate-pulse" />
            <span className="text-[10px] text-gray-500">
              Résultats vérifiés par l'IA — mis à jour quotidiennement
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

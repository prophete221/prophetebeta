import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useAnimations'
import { AFFILIATE } from '../../data/constants'

function formatTime(dateStr, timeStr) {
  if (!dateStr && !timeStr) return ''
  const d = dateStr ? ` ${dateStr}` : ''
  return `${timeStr || ''}${d}`
}

function formatDateShort(dateStr) {
  if (!dateStr) return ''
  try {
    // V18: dateStr is in Europe/Paris timezone (YYYY-MM-DD)
    // Now we show the actual match date, which may be in the future.
    // Display format: "10/06" or "11/06 Jeu" (with day of week for future dates)
    const d = new Date(dateStr + 'T12:00:00')
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const today = new Date()
    today.setHours(12, 0, 0, 0)
    const matchDate = new Date(dateStr + 'T12:00:00')
    const diffDays = Math.round((matchDate - today) / (1000 * 60 * 60 * 24))

    // If match is today, show "Auj."
    // If match is tomorrow, show "Dem."
    // If match is further, show day/month + short weekday
    if (diffDays === 0) return `Auj. ${day}/${month}`
    if (diffDays === 1) return `Dem. ${day}/${month}`
    const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    const weekday = weekdays[d.getDay()]
    return `${weekday} ${day}/${month}`
  } catch {
    return dateStr
  }
}

// ─── Prediction Badge Component ───
function PredBadge({ type, prediction, expanded }) {
  const isBtts = type === 'BTTS'
  const isPositive = prediction === 'Oui'
  const color = isBtts ? 'emerald' : 'gold'
  const label = isBtts ? 'BTTS' : 'O2.5'

  if (expanded) {
    return (
      <div className={`flex-1 rounded-xl p-3 sm:p-4 border transition-all ${
        isPositive
          ? isBtts
            ? 'bg-emerald/8 border-emerald/20 hover:bg-emerald/12'
            : 'bg-gold/8 border-gold/20 hover:bg-gold/12'
          : 'bg-red-500/5 border-red-500/15 hover:bg-red-500/8'
      }`}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold">
            {isBtts ? 'Les deux marquent' : 'Plus de 2.5 buts'}
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isPositive
              ? isBtts
                ? 'bg-emerald/15 text-emerald'
                : 'bg-gold/15 text-gold'
              : 'bg-red-500/15 text-red-400'
          }`}>
            {prediction}
          </span>
        </div>
        <div className={`text-lg sm:text-xl font-extrabold ${
          isPositive
            ? isBtts ? 'text-emerald' : 'text-gold'
            : 'text-red-400'
        }`}>
          {isBtts ? 'BTTS' : 'Over 2.5'}
        </div>
        {/* Signal bar */}
        <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isPositive ? '75%' : '25%' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`h-full rounded-full ${
              isPositive
                ? isBtts
                  ? 'bg-gradient-to-r from-emerald-dark to-emerald'
                  : 'bg-gradient-to-r from-gold-dark to-gold'
                : 'bg-red-500/40'
            }`}
          />
        </div>
        <div className="text-[10px] text-gray-500 mt-1">
          {isPositive ? 'Signal positif' : 'Signal négatif'}
        </div>
      </div>
    )
  }

  // Compact badge
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg ${
      isPositive
        ? isBtts
          ? 'bg-emerald/10 text-emerald'
          : 'bg-gold/10 text-gold'
        : 'bg-red-500/10 text-red-400'
    }`}>
      <span className={`w-1 h-1 rounded-full ${
        isPositive
          ? isBtts ? 'bg-emerald' : 'bg-gold'
          : 'bg-red-400'
      }`} />
      {label} {prediction}
    </span>
  )
}

// ─── Single Match Row (Hybrid Card-Line) ───
function MatchRow({ match, index, isVisible }) {
  const [expanded, setExpanded] = useState(false)

  // Split match name into two teams
  const teams = match.match ? match.match.split(' vs ') : ['', '']
  const team1 = teams[0]?.trim() || match.match
  const team2 = teams[1]?.trim() || ''
  const initials1 = team1.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const initials2 = team2.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformOrigin: 'center bottom' }}
      className="relative"
    >
      <motion.div
        layout
        onClick={() => setExpanded(!expanded)}
        className={`relative rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden ${
          expanded
            ? 'bg-panel border-emerald/20 shadow-lg shadow-emerald/5'
            : 'bg-panel/60 border-edge hover:border-emerald/15 hover:bg-panel/80'
        }`}
      >
        {/* Top accent line on expand */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald via-gold to-emerald origin-left"
            />
          )}
        </AnimatePresence>

        {/* ── COMPACT ROW ── */}
        <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5">
          {/* Time badge */}
          <div className="flex-shrink-0 text-center min-w-[42px] sm:min-w-[48px]">
            <div className="text-white font-bold text-sm sm:text-base">{match.time || '--:--'}</div>
            <div className="text-gray-500 text-[10px]">{match.date ? formatDateShort(match.date) : ''}</div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-edge flex-shrink-0" />

          {/* Match info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="text-white font-semibold text-sm truncate" data-match-semantic={match.matchSemantic}>
                {match.match}
              </div>
            </div>
            <div className="text-gray-500 text-[11px] mt-0.5 truncate">{match.league}</div>
          </div>

          {/* Prediction badges (compact) */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {match.btts && <PredBadge type="BTTS" prediction={match.btts.prediction} expanded={false} />}
            {match.over25 && <PredBadge type="O2.5" prediction={match.over25.prediction} expanded={false} />}
          </div>

          {/* Expand chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 text-gray-500"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </div>

        {/* ── EXPANDED CARD ── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 border-t border-edge/50 pt-4">
                {/* Teams face-to-face */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 text-center">
                    <div className="w-11 h-11 rounded-xl bg-emerald/8 border border-emerald/15 flex items-center justify-center text-emerald font-bold text-xs mx-auto mb-1.5">
                      {initials1}
                    </div>
                    <div className="text-white font-semibold text-sm truncate max-w-[100px] sm:max-w-[140px] mx-auto">
                      {team1}
                    </div>
                  </div>

                  <div className="flex-shrink-0 px-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-gray-400 text-xs font-bold">VS</span>
                    </div>
                  </div>

                  <div className="flex-1 text-center">
                    <div className="w-11 h-11 rounded-xl bg-royal/8 border border-royal/15 flex items-center justify-center text-royal font-bold text-xs mx-auto mb-1.5">
                      {initials2}
                    </div>
                    <div className="text-white font-semibold text-sm truncate max-w-[100px] sm:max-w-[140px] mx-auto">
                      {team2}
                    </div>
                  </div>
                </div>

                {/* Prediction cards */}
                <div className="flex gap-3 mb-4">
                  {match.btts && <PredBadge type="BTTS" prediction={match.btts.prediction} expanded={true} />}
                  {match.over25 && <PredBadge type="O2.5" prediction={match.over25.prediction} expanded={true} />}
                  {!match.btts && !match.over25 && (
                    <div className="flex-1 text-center text-gray-500 text-sm py-4">
                      Aucune prédiction disponible
                    </div>
                  )}
                </div>

                {/* CTA Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-500">IA BttsBet</span>
                  </div>
                  <a
                    href={AFFILIATE.linebet}
                    rel={AFFILIATE.rel}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-gradient-to-r from-emerald to-emerald-dark text-midnight font-bold rounded-lg text-xs hover:shadow-lg hover:shadow-emerald/20 transition-all hover:brightness-110"
                  >
                    Parier sur Linebet →
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── Main FreePredictions Component ───
export default function FreePredictions() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [ref, isVisible] = useScrollAnimation()

  useEffect(() => {
    fetch('/predictions.json')
      .then((r) => r.json())
      .then((data) => {
        setPredictions(data.predictions || [])
        setLoading(false)
      })
      .catch(() => {
        setPredictions([])
        setLoading(false)
      })
  }, [])

  // Group predictions by match
  const groupedPredictions = predictions.reduce((groups, p) => {
    const key = `${p.match}|${p.date || ''}|${p.time || ''}`
    if (!groups[key]) {
      groups[key] = {
        match: p.match,
        league: p.league,
        date: p.date,
        time: p.time,
        matchSemantic: p.matchSemantic,
        btts: null,
        over25: null,
      }
    }
    if (p.type === 'BTTS') {
      groups[key].btts = { prediction: p.prediction, confidence: p.confidence }
    } else if (p.type === 'Over 2.5') {
      groups[key].over25 = { prediction: p.prediction, confidence: p.confidence }
    }
    return groups
  }, {})

  const matchList = Object.values(groupedPredictions)

  return (
    <section ref={ref} id="free-predictions" className="section-spacing px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 6 }}
          animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'center bottom' }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Pronostics <span className="text-emerald neon-glow">Gratuits</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Sélection gratuite générée par notre IA — matchs des 7 prochains jours
          </p>
          {/* Live indicator */}
          <div className="inline-flex items-center gap-2 bg-emerald/8 border border-emerald/15 rounded-full px-4 py-1.5 mt-4">
            <span className="w-1.5 h-1.5 bg-emerald rounded-full animate-pulse" />
            <span className="text-xs text-emerald font-medium">
              {matchList.length} match{matchList.length !== 1 ? 's' : ''} analysé{matchList.length !== 1 ? 's' : ''} aujourd'hui
            </span>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" />
          </div>
        ) : matchList.length === 0 ? (
          <div className="text-center py-12">
            <div className="glass-3d rounded-2xl p-8 max-w-sm mx-auto">
              <div className="w-16 h-16 bg-edge rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⚽</div>
              <p className="text-gray-400">Aucun pronostic disponible aujourd'hui. Revenez demain !</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {matchList.map((m, i) => (
              <MatchRow key={`${m.match}-${m.date}-${m.time}`} match={m} index={i} isVisible={isVisible} />
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-xs text-gray-600">
            Pronostics générés par IA — vraies dates des matchs vérifiées
          </p>
        </div>
      </div>
    </section>
  )
}

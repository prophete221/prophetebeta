import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useAnimations'
import TiltCard from '../TiltCard'

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr + 'T00:00:00')
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    return `${day}/${month}`
  } catch {
    return dateStr
  }
}

function formatFullDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr + 'T00:00:00')
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  } catch {
    return dateStr
  }
}

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

  // Grouper les pronostics par match (BTTS + Over 2.5 ensemble)
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
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 6 }}
          animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'center bottom' }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Pronostics <span className="text-emerald neon-glow">Gratuits du Jour</span>
          </h2>
          <p className="text-gray-400">
            Sélection gratuite générée par notre IA — mise à jour quotidienne
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" />
          </div>
        ) : matchList.length === 0 ? (
          <div className="text-center py-12">
            <TiltCard>
              <div className="card card-3d">
                <div className="p-8">
                  <div className="w-16 h-16 bg-dark-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⚽</div>
                  <p className="text-gray-400">Aucun pronostic disponible aujourd'hui. Revenez demain !</p>
                </div>
              </div>
            </TiltCard>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table Header (desktop) */}
            <div className="hidden sm:grid grid-cols-11 gap-3 px-5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <span className="col-span-4">Match</span>
              <span className="col-span-2">Compétition</span>
              <span className="col-span-2">BTTS</span>
              <span className="col-span-2">Over 2.5</span>
              <span className="col-span-3 text-right">Date / Heure</span>
            </div>

            {/* Prediction Cards — une seule carte par match */}
            {matchList.map((m, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15, scale: 0.98, rotateX: 4 }}
                  animate={isVisible ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  <TiltCard maxTilt={4}>
                    <div
                      className="card card-3d p-4 sm:p-5"
                    >
                      {/* Desktop Layout */}
                      <div className="hidden sm:grid grid-cols-11 gap-3 items-center">
                        <div className="col-span-4">
                          <div className="text-white font-semibold text-sm" data-match-semantic={m.matchSemantic}>
                            {m.match}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-gray-500 text-xs">{m.league}</div>
                        </div>
                        <div className="col-span-2">
                          {m.btts ? (
                            <span className={`font-semibold text-sm ${
                              m.btts.prediction === 'Oui' ? 'text-emerald' : 'text-red-400'
                            }`}>
                              BTTS {m.btts.prediction}
                            </span>
                          ) : (
                            <span className="text-gray-600 text-xs">—</span>
                          )}
                        </div>
                        <div className="col-span-2">
                          {m.over25 ? (
                            <span className={`font-semibold text-sm ${
                              m.over25.prediction === 'Oui' ? 'text-gold' : 'text-red-400'
                            }`}>
                              O2.5 {m.over25.prediction}
                            </span>
                          ) : (
                            <span className="text-gray-600 text-xs">—</span>
                          )}
                        </div>
                        <div className="col-span-3 text-right">
                          <span className="text-gray-400 text-xs font-medium">
                            {m.date ? formatFullDate(m.date) : ''}
                          </span>
                          <span className="text-gray-500 text-xs ml-1">{m.time}</span>
                        </div>
                      </div>

                      {/* Mobile Layout */}
                      <div className="sm:hidden">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {m.btts && (
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg bg-emerald/10 text-emerald`}>
                                BTTS {m.btts.prediction}
                              </span>
                            )}
                            {m.over25 && (
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg bg-gold/10 text-gold`}>
                                O2.5 {m.over25.prediction}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 font-medium">
                            {m.date ? formatDate(m.date) : ''} • {m.time}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="text-xs text-gray-500 mb-0.5">{m.league}</div>
                          <div className="text-white font-semibold text-sm" data-match-semantic={m.matchSemantic}>
                            {m.match}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {m.btts && (
                              <span className={`text-sm font-semibold ${
                                m.btts.prediction === 'Oui' ? 'text-emerald' : 'text-red-400'
                              }`}>
                                BTTS : {m.btts.prediction}
                              </span>
                            )}
                            {m.over25 && (
                              <span className={`text-sm font-semibold ${
                                m.over25.prediction === 'Oui' ? 'text-gold' : 'text-red-400'
                              }`}>
                                O2.5 : {m.over25.prediction}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-xs text-gray-600">
            Pronostics générés par IA — mis à jour quotidiennement à 00h00 UTC
          </p>
        </div>
      </div>
    </section>
  )
}

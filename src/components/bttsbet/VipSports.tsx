'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useAnimations'

/**
 * The site currently has a verified public model only for BTTS and Over 2.5.
 * Multi-sport selections are intentionally not rendered until a real feed is
 * connected; this prevents synthetic fixtures, odds and success rates from
 * being presented as live VIP data.
 */
export default function VipSports() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} id="vip-sports" className="section-pad">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="squircle-xl p-5 sm:p-7 border border-edge bg-panel/40"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="eyebrow">Marchés complémentaires</span>
              <h2 className="section-title mt-3">Autres sports</h2>
            </div>
            <span className="badge badge-mint">Bientôt disponible</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mt-4 max-w-2xl">
            Les sélections publiques actuelles sont limitées au BTTS et à l’Over 2,5. Les marchés tennis, basket, NFL, MMA et handball ne sont pas publiés tant qu’une source vérifiable de fixtures et de cotes n’est pas connectée.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5" aria-label="Marchés non disponibles">
            {['Tennis', 'Basket', 'NFL', 'MMA', 'Handball'].map((sport) => (
              <div key={sport} className="rounded-xl border border-edge/60 bg-midnight/40 px-3 py-2 text-center">
                <span className="text-xs text-gray-500">{sport}</span>
                <span className="block text-[10px] text-gray-600 mt-1">Non publié</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

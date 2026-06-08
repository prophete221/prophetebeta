import { motion } from 'framer-motion'
import { SITE, HERO_STATS, AFFILIATE } from '../data/constants'
import { useParallax, useParallaxMouse } from '../hooks/useParallax'
import TiltCard from './TiltCard'

const statIcons = {
  target: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  ),
}

export default function Hero() {
  const [bgRef, bgStyle] = useParallax(0.15)
  const { containerRef: heroContainerRef, style: heroParallaxStyle } = useParallaxMouse(8)

  return (
    <section className="relative overflow-hidden">
      {/* Subtle Background with parallax */}
      <div ref={bgRef} style={bgStyle} className="absolute inset-0">
        <div className="absolute inset-0 bg-dark-900" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-dark/2 rounded-full blur-[80px]" />
      </div>

      <div ref={heroContainerRef} style={heroParallaxStyle} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left – Text + CTA */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'center bottom' }}
              className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
              <span className="text-xs text-neon-green font-medium">Propulsé par l'intelligence artificielle</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25, rotateX: 6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'center bottom', perspective: '1000px' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Pronostics BTTS & Over 2,5{' '}
              <span className="text-neon-green neon-glow">basés sur l'IA</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, rotateX: 4 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'center bottom' }}
              className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {SITE.tagline}. Précision historique d'environ {SITE.accuracy} sur plus de 15 000 pronostics analysés.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="/#free-predictions"
                className="px-8 py-4 bg-neon-green text-dark-900 font-bold rounded-xl text-base hover:shadow-lg hover:shadow-neon-green/25 transition-all hover:brightness-110 hover-lift"
              >
                Voir les pronostics du jour
              </a>
              <a
                href={AFFILIATE.linebet}
                rel={AFFILIATE.rel}
                target="_blank"
                className="px-8 py-4 border border-white/10 text-white font-semibold rounded-xl text-base hover:bg-white/5 transition-all"
              >
                Rejoindre le VIP
              </a>
            </motion.div>
          </div>

          {/* Right – Stat Block with 3D depth */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'center bottom', perspective: '1000px' }}
            className="w-full lg:w-auto lg:min-w-[340px]"
          >
            <TiltCard maxTilt={6}>
              <div className="glass-3d rounded-2xl p-6 sm:p-8">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400 font-medium">Données en temps réel</span>
                </motion.div>

                <div className="space-y-5">
                  {HERO_STATS.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex items-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.15, type: 'spring', stiffness: 180 }}
                        className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center text-emerald flex-shrink-0"
                      >
                        {statIcons[stat.icon]}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
                      >
                        <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="mt-6 pt-5 border-t border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Code promo exclusif</div>
                      <div className="font-bold text-lg tracking-wider promo-code-shimmer">{SITE.promoCode}</div>
                    </div>
                    <motion.a
                      href={AFFILIATE.linebet}
                      rel={AFFILIATE.rel}
                      target="_blank"
                      whileHover={{ scale: 1.05, brightness: 1.1 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-emerald text-dark-900 font-bold rounded-lg text-sm hover:brightness-110 transition-all"
                    >
                      Bonus 150$
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

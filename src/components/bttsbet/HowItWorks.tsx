'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useAnimations'
import { staggerContainer, staggerChildFadeUp } from '@/lib/motionPresets'

const CARDS = [
  {
    step: '01',
    title: 'Fixtures publiques',
    subtitle: 'Data source',
    description: 'Le pipeline récupère les fixtures disponibles depuis ESPN et affiche la date, l’heure et les équipes lorsqu’elles sont publiées. Les statistiques d’équipe, blessures et cotes ne sont pas inventées.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
        <circle cx="7" cy="14" r="1" fill="currentColor" />
        <circle cx="11" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="14" r="1" fill="currentColor" />
        <circle cx="20" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
    stats: [
      { label: 'Source des fixtures', value: 'ESPN' },
      { label: 'Données d’équipe', value: 'N/D' },
    ],
  },
  {
    step: '02',
    title: 'Modèles Poisson calibrés',
    subtitle: 'Statistical engine',
    description: 'Le moteur applique une loi de Poisson à des paramètres de ligue pour produire des estimations BTTS et Over 2,5. Cette approche reste indicative lorsque les paramètres propres aux équipes ne sont pas disponibles.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 a10 10 0 0 1 10 10 l-10 0 z" fill="currentColor" fillOpacity="0.2" />
        <path d="M8 12 a4 4 0 0 1 8 0" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    stats: [
      { label: 'Modèle', value: 'Poisson' },
      { label: 'Paramètres équipe', value: 'N/D' },
    ],
  },
  {
    step: '03',
    title: 'Limites et historique',
    subtitle: 'Quality layer',
    description: 'Les estimations sont publiées avec leurs limites connues. Un résultat n’est ajouté à l’historique qu’après confirmation d’un score final par une source vérifiable.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    stats: [
      { label: 'Taux vérifié', value: 'N/D' },
      { label: 'Score final', value: 'À confirmer' },
    ],
  },
]

export default function HowItWorks() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} id="how-it-works" className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="eyebrow">Méthode IA</span>
          <h2 className="section-title mt-3 mb-4">
            Comment fonctionne <span className="text-success">l'IA BttsBet</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Trois repères pour interpréter les estimations avec prudence.
            Aucune garantie future — les paris sportifs comportent des risques.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-5"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.step}
              variants={staggerChildFadeUp}
              className="squircle-lg p-6 relative group hover:border-success/30 transition-all"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 text-[10px] font-mono text-gray-600 tabular-nums">
                {card.step}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center text-success mb-4 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>

              {/* Subtitle */}
              <span className="text-[10px] font-mono uppercase tracking-widest text-success/70 font-bold">
                {card.subtitle}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mt-1 mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {card.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-edge">
                {card.stats.map((stat, j) => (
                  <div key={j}>
                    <div className="text-sm font-bold text-white tabular-nums">{stat.value}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

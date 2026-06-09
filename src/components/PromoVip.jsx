import { motion } from 'framer-motion'
import { SITE, AFFILIATE } from '../data/constants'
import { useScrollAnimation } from '../hooks/useAnimations'

export default function PromoVip() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section ref={ref} id="vip" className="py-10 sm:py-16 px-4 bg-dark-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ── VIP Section ── */}
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.97 }}
            animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl border border-gold/15 bg-panel/60 overflow-hidden hover-lift group"
          >
            {/* Gold accent top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold" />
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/3 rounded-full blur-[80px]" />

            <div className="relative p-6 sm:p-8">
              {/* Lock icon */}
              <div className="w-12 h-12 bg-gold/10 border border-gold/15 rounded-xl flex items-center justify-center text-gold mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                PRONOSTICS <span className="text-gold">VIP</span>
              </h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Accédez aux pronostics premium : plus de matchs, des marchés exclus, et un suivi personnalisé via WhatsApp.
              </p>

              {/* Preview — blurred matches */}
              <div className="space-y-2 mb-6">
                {[
                  { match: 'Man City vs Chelsea', league: 'Premier League' },
                  { match: 'Barcelona vs Atletico', league: 'La Liga' },
                  { match: 'PSG vs Lyon', league: 'Ligue 1' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-dark-900/40 rounded-lg px-3 py-2.5 border border-edge/30">
                    <div className="w-1.5 h-1.5 bg-gold/40 rounded-full" />
                    <span className="text-gray-500 text-xs font-medium flex-1 blur-[3px] group-hover:blur-[2px] select-none">{item.match}</span>
                    <span className="text-gray-600 text-[10px]">{item.league}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark-900 font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-gold/30 transition-all hover:brightness-110 w-full"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Rejoindre le VIP
              </a>
            </div>
          </motion.div>

          {/* ── Promo Section ── */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.97 }}
            animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-xl border border-emerald/15 bg-panel/60 overflow-hidden hover-lift"
          >
            {/* Emerald accent top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald via-gold to-emerald" />
            {/* Background glow */}
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald/3 rounded-full blur-[80px]" />

            <div className="relative p-6 sm:p-8">
              {/* Gift icon */}
              <div className="w-12 h-12 bg-emerald/10 border border-emerald/15 rounded-xl flex items-center justify-center text-emerald mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
                </svg>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                BONUS <span className="text-emerald">EXCLUSIF</span>
              </h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Inscrivez-vous avec le code promo et recevez jusqu'à 150$ sur votre premier dépôt.
              </p>

              {/* Promo code display */}
              <div className="bg-dark-900/60 border border-edge rounded-xl p-4 mb-5 text-center">
                <div className="text-xs text-gray-500 mb-1">Code promo exclusif</div>
                <div className="text-2xl sm:text-3xl font-bold tracking-[0.2em] promo-code-shimmer">{SITE.promoCode}</div>
              </div>

              {/* Features mini-grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {[
                  { icon: '💰', label: 'Bonus 150$' },
                  { icon: '⚡', label: 'Dépôt instantané' },
                  { icon: '📱', label: 'App mobile' },
                  { icon: '🔒', label: 'Paiement sécurisé' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-dark-900/40 rounded-lg px-3 py-2 border border-edge/30">
                    <span className="text-sm">{f.icon}</span>
                    <span className="text-xs text-gray-400">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={AFFILIATE.linebet}
                  rel={AFFILIATE.rel}
                  target="_blank"
                  className="flex-1 text-center px-5 py-3 bg-gradient-to-r from-emerald to-emerald-dark text-dark-900 font-bold rounded-xl text-sm hover:shadow-lg hover:shadow-emerald/30 transition-all hover:brightness-110"
                >
                  S'inscrire
                </a>
                <a
                  href={AFFILIATE.linebetDownload}
                  rel={AFFILIATE.rel}
                  target="_blank"
                  className="flex-1 text-center px-5 py-3 border border-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/5 transition-all"
                >
                  Télécharger
                </a>
              </div>

              <p className="text-[10px] text-gray-600 mt-3 text-center">
                Bonus soumis aux conditions (mise x5, cote min. 1,40)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useAnimations'
import { AFFILIATE, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'

// ─── Quantum Stadium V16 PRO palette ────────────────────────────────────
const C = {
  bg:          '#0B0E14',
  card:        '#151A28',
  cardHover:   '#1E2538',
  border:      '#252D3D',
  borderGold:  '#3D3518',
  ultra:       '#00E0FF',
  ultraDark:   '#00B8D4',
  gold:        '#FFB800',
  goldLight:   '#FFD54F',
  success:     '#00E5A0',
  lose:        '#FF4D6D',
  text:        '#FFFFFF',
  textSec:     '#8B95A5',
  textMute:    '#5A6577',
}

// ─── Data ────────────────────────────────────────────────────────────────
const ANALYSIS_STEPS = [
  'Fixture ESPN', 'Profil de ligue', 'Modèle Poisson', 'BTTS', 'Over 2.5',
]

// ═══════════════════════════════════════════════════════════════════════
// NeuralNetworkCanvas — subtle particles
// ═══════════════════════════════════════════════════════════════════════
function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let rafId: number; let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 15 : 25; const maxDist = isMobile ? 80 : 110
    type P = { x: number; y: number; vx: number; vy: number }
    let particles: P[] = []
    const init = () => {
      const parent = canvas.parentElement; if (!parent) return
      const w = parent.offsetWidth, h = parent.offsetHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.scale(dpr, dpr)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
      }))
    }
    const draw = () => {
      if (!running) return
      const w = canvas.width / dpr, h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 224, 255, 0.12)'; ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = 'rgba(0, 224, 255, ' + ((1 - dist / maxDist) * 0.05) + ')'
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      rafId = requestAnimationFrame(draw)
    }
    init(); draw()
    const onVis = () => { running = !document.hidden; if (running) rafId = requestAnimationFrame(draw); else cancelAnimationFrame(rafId) }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('resize', init)
    return () => { cancelAnimationFrame(rafId); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('resize', init) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}

// ═══════════════════════════════════════════════════════════════════════
// Main Hero — Quantum Stadium V16 PRO Mobile-First
// ═══════════════════════════════════════════════════════════════════════
export default function Hero() {
  const [sectionRef, isVisible] = useScrollAnimation(0.05)
  const [progress, setProgress] = useState(0)
  const [revealedSteps, setRevealedSteps] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const duration = 3500; const startTime = performance.now(); let rafId: number
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const p = Math.min(100, eased * 100)
      setProgress(p)
      setRevealedSteps(Math.min(ANALYSIS_STEPS.length, Math.floor((p / 100) * ANALYSIS_STEPS.length) + 1))
      if (p < 100) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: C.bg, paddingTop: '24px', paddingBottom: '16px' }}>
      <NeuralNetworkCanvas />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 80% at 50% -10%, rgba(0, 224, 255, 0.09), transparent 60%)' }} />

      <div className="relative z-10 max-w-[420px] mx-auto px-4 flex flex-col gap-4">

        {/* ═══ BADGE IA ACTIVE ═══ */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={isVisible ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 self-start px-3 h-[28px] rounded-full"
          style={{ backgroundColor: '#102A2E', border: '1px solid rgba(0, 224, 255, 0.2)' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.ultra, boxShadow: '0 0 8px ' + C.ultra }} />
          <span className="font-mono text-[10px] font-bold tracking-[0.14em] live-text" style={{ color: C.ultra }}>DONNÉES DU JOUR</span>
        </motion.div>

        {/* ═══ TITRE ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={isVisible ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.5, delay: 0.1 }}>
          <h1 className="font-display font-bold leading-[1.05] tracking-tight text-white" style={{ fontSize: '28px' }}>
            Plateforme de Prédictions Football par <span style={{ color: C.ultra }}>Intelligence Artificielle</span>
          </h1>
          <p className="mt-2 text-[13px] font-medium leading-[1.4]" style={{ color: C.textSec }}>
            Fixtures du jour récupérées depuis une source sportive publique.
          </p>
          <p className="mt-1 text-[14px] leading-[1.6]" style={{ color: C.textSec, maxWidth: '320px' }}>
            Consultez des estimations BTTS et Over 2,5 documentées. Inscrivez-vous sur Linebet avec le code{' '}
            <CopyableCode code={SITE.promoCode} displayClassName="font-bold" />{' '}pour débloquer l'accès VIP.
          </p>
        </motion.div>

        {/* ═══ CARTE ANALYSE IA ═══ */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={isVisible ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-[20px] overflow-hidden"
          style={{ backgroundColor: C.card, border: '1px solid ' + C.border, boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)' }}>
          {/* Header */}
          <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold tracking-wide" style={{ color: C.textSec }}>Analyse IA en cours...</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 h-[22px] rounded-full" style={{ backgroundColor: '#2A1216', border: '1px solid rgba(255, 45, 85, 0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#FF2D55' }} />
              <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: '#FF2D55' }}>LIVE</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="px-4 pb-3">
            <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ backgroundColor: '#1C2333' }}>
              <div className="h-full rounded-full" style={{ width: progress + '%', backgroundColor: C.ultra, boxShadow: '0 0 12px rgba(0, 224, 255, 0.6)' }} />
            </div>
          </div>
          {/* Checklist */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-4">
            {ANALYSIS_STEPS.map((step, i) => {
              const visible = i < revealedSteps
              return (
                <motion.div key={step} initial={{ opacity: 0.15 }} animate={visible ? { opacity: 1 } : { opacity: 0.15 }} transition={{ duration: 0.25 }}
                  className="flex items-center gap-2.5">
                  <motion.div initial={{ scale: 0 }} animate={visible ? { scale: 1 } : { scale: 0 }} transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-[20px] h-[20px] rounded-[6px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#132A32', border: '1px solid rgba(0, 224, 255, 0.2)' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.ultra} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </motion.div>
                  <span className="text-[12px] font-medium tracking-tight" style={{ color: visible ? 'rgba(255,255,255,0.9)' : 'rgba(90,102,122,0.5)' }}>{step}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ═══ CARTE TRANSFERTS ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={isVisible ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-[20px] px-4 py-4"
          style={{ backgroundColor: C.card, border: '1px solid ' + C.border, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.14em]" style={{ color: C.textMute }}>DERNIERS TRANSFERTS</span>
            <span className="font-mono text-[10px] flex items-center gap-1.5" style={{ color: C.textMute }}>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: C.success }} /> Mis à jour quotidien
            </span>
          </div>
        </motion.div>

        {/* ═══ CARTE MÉTHODE ET LIMITES ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={isVisible ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-[20px] px-4 pt-4 pb-4"
          style={{ backgroundColor: C.card, border: '1px solid ' + C.border, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold text-white">Méthode publique</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: C.ultra }}>Transparente</span>
          </div>
          <p className="text-[11px] leading-relaxed" style={{ color: C.textSec }}>
            Estimations BTTS et Over 2,5 calculées à partir des fixtures ESPN, d’un profil de ligue et d’une loi de Poisson. Les données d’équipe, les blessures et les cotes ne sont pas inventées lorsqu’elles ne sont pas disponibles.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="rounded-xl px-3 py-2" style={{ backgroundColor: '#121620', border: '1px solid #1E2636' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.textMute }}>Marchés</div>
              <div className="text-xs font-semibold text-white mt-1">BTTS · Over 2,5</div>
            </div>
            <div className="rounded-xl px-3 py-2" style={{ backgroundColor: '#121620', border: '1px solid #1E2636' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.textMute }}>Taux vérifié</div>
              <div className="text-xs font-semibold text-white mt-1">Non publié</div>
            </div>
          </div>
        </motion.div>

        {/* ═══ CTA — 1 action principale (vert) + 1 ghost ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={isVisible ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col gap-2.5">
          {/* CTA principal — VERT, seul bouton coloré */}
          <motion.a href={AFFILIATE.linebet} rel="sponsored noopener" target="_blank"
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0, 229, 160, 0.4)' }} whileTap={{ scale: 0.98 }}
            className="w-full h-[56px] rounded-[14px] font-display font-bold text-[15px] flex items-center justify-center gap-2"
            style={{ backgroundColor: C.success, color: '#04070A', boxShadow: '0 0 0 1px rgba(0,229,160,.4), 0 8px 32px rgba(0,229,160,.22)' }}
            aria-label="S'inscrire sur Linebet avec le code promo VISION221"
            data-cta="hero-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            S'inscrire sur Linebet
          </motion.a>
          {/* CTA secondaire — ghost, atténué */}
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => document.getElementById('free-predictions')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full h-[48px] rounded-[14px] font-medium text-[13px] flex items-center justify-center gap-2"
            style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
            data-cta="hero-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            Voir les pronostics du jour
          </motion.button>
        </motion.div>

        {/* ═══ MEMBRES VIP ═══ */}
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : undefined} transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-[11px] mt-1" style={{ color: C.textMute }}>
          18+ · Les paris comportent des risques · Les résultats passés ne garantissent rien
        </motion.div>
      </div>
    </section>
  )
}

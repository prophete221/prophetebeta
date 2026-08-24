'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SITE, AFFILIATE } from '@/lib/constants'
import { useScrollAnimation } from '@/hooks/useAnimations'
import PremiumButton from './PremiumButton'
import CopyableCode from './CopyableCode'
import VipUnlockModal from './VipUnlockModal'

const DISPLAY_TZ = 'Africa/Dakar'

type VipMatch = {
  match: string
  homeTeam: string
  awayTeam: string
  league: string
  date: string
  time: string
  homeLogo: string
  awayLogo: string
  status: 'live' | 'upcoming'
}

function todayISO() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: DISPLAY_TZ })
}

function getStatus(date: string, time?: string): 'live' | 'upcoming' | 'finished' {
  const today = todayISO()
  if (!date || date < today) return 'finished'
  if (date > today || !time || !/^\d{2}:\d{2}$/.test(time)) return 'upcoming'
  const timestamp = Date.parse(`${date}T${time}:00Z`)
  if (!Number.isFinite(timestamp)) return 'upcoming'
  const delta = timestamp - Date.now()
  if (delta < 0 && delta > -2.5 * 60 * 60 * 1000) return 'live'
  return delta < 0 ? 'finished' : 'upcoming'
}

function formatDay(date: string) {
  if (date === todayISO()) return "Aujourd’hui"
  try {
    return new Intl.DateTimeFormat('fr-FR', { timeZone: DISPLAY_TZ, day: '2-digit', month: 'short' }).format(new Date(`${date}T12:00:00Z`))
  } catch {
    return date
  }
}

function MatchRow({ match }: { match: VipMatch }) {
  const teams = (
    <div className="vip-refresh__teams" aria-label="Match verrouillé">
      {match.homeLogo ? <img src={match.homeLogo} alt="" loading="lazy" /> : <span className="vip-refresh__team-mark" aria-hidden="true" />}
      <strong>{match.homeTeam}</strong>
      <span className="vip-refresh__versus">VS</span>
      <strong>{match.awayTeam}</strong>
      {match.awayLogo ? <img src={match.awayLogo} alt="" loading="lazy" /> : <span className="vip-refresh__team-mark" aria-hidden="true" />}
    </div>
  )

  return (
    <div className="vip-refresh__match">
      <div className="vip-refresh__match-meta">
        <span>{match.status === 'live' ? 'LIVE' : match.time}</span>
        <small>{formatDay(match.date)} · {match.league}</small>
      </div>
      <div className="vip-refresh__locked-content">
        {teams}
        <span className="vip-refresh__lock" aria-label="Marché verrouillé">⌑</span>
      </div>
    </div>
  )
}

export default function PromoVip() {
  const [ref, isVisible] = useScrollAnimation()
  const [showVipModal, setShowVipModal] = useState(false)
  const [vipMatches, setVipMatches] = useState<VipMatch[]>([])

  useEffect(() => {
    let cancelled = false
    fetch('/predictions.json')
      .then((response) => response.json())
      .then((data) => {
        if (cancelled || !Array.isArray(data?.predictions)) return
        const unique = new Map<string, VipMatch>()
        for (const prediction of data.predictions) {
          const status = getStatus(prediction.date, prediction.time)
          if (status === 'finished' || unique.has(prediction.match)) continue
          const [homeTeam, awayTeam] = String(prediction.match || '').split(/\s+vs?\s+/i)
          unique.set(prediction.match, {
            match: prediction.match,
            homeTeam: homeTeam?.trim() || 'Équipe domicile',
            awayTeam: awayTeam?.trim() || 'Équipe extérieure',
            league: prediction.league || 'Compétition non précisée',
            date: prediction.date,
            time: prediction.time || '--:--',
            homeLogo: prediction.homeLogo || '',
            awayLogo: prediction.awayLogo || '',
            status,
          })
        }
        const ordered = [...unique.values()].sort((a, b) => {
          if (a.status === 'live' && b.status !== 'live') return -1
          if (b.status === 'live' && a.status !== 'live') return 1
          return `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)
        })
        setVipMatches(ordered.slice(0, 5))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  return (
    <>
      <section ref={ref} id="vip" className="vip-refresh" aria-labelledby="vip-title">
        <div className="vip-refresh__inner">
          <motion.div
            className="vip-refresh__header"
            initial={{ opacity: 0, y: 12 }}
            animate={isVisible ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4 }}
          >
            <div className="vip-refresh__eyebrow"><span aria-hidden="true">◆</span> Accès premium</div>
            <h2 id="vip-title">Le combiné VIP du jour.</h2>
            <p>Les fixtures sont visibles. Les marchés et sélections restent verrouillés jusqu’à l’activation.</p>
          </motion.div>

          <div className="vip-refresh__layout">
            <motion.div
              className="vip-refresh__card"
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <div className="vip-refresh__card-head">
                <div>
                  <span className="vip-refresh__label">SÉLECTIONS DU JOUR</span>
                  <h3>Combiné VIP <span>· {formatDay(todayISO())}</span></h3>
                </div>
                <span className="vip-refresh__status"><i /> Verrouillé</span>
              </div>

              <div className="vip-refresh__list">
                {vipMatches.length > 0 ? vipMatches.map((match) => <MatchRow key={`${match.match}-${match.date}`} match={match} />) : (
                  <div className="vip-refresh__empty">Les fixtures du jour sont en cours de récupération.</div>
                )}
              </div>

              <div className="vip-refresh__card-foot">
                <span>Marché principal masqué</span>
                <span>Source : fixtures publiques</span>
              </div>
              <button type="button" className="vip-refresh__unlock" onClick={() => setShowVipModal(true)}>
                Débloquer le combiné VIP <span aria-hidden="true">→</span>
              </button>
              <p className="vip-refresh__fineprint">L’activation est enregistrée localement dans ce navigateur après la procédure.</p>
            </motion.div>

            <motion.aside
              className="vip-refresh__partner"
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.16 }}
              aria-label="Codes et liens partenaires"
            >
              <span className="vip-refresh__label">LIEN PARTENAIRE</span>
              <h3>Un code, des conditions à vérifier.</h3>
              <p>Le code est fourni à titre informatif. Les conditions d’offre, de dépôt et d’éligibilité appartiennent au bookmaker.</p>
              <div className="vip-refresh__code-row">
                <CopyableCode code={SITE.promoCode} displayClassName="vip-refresh__code" />
                <span>Copier</span>
              </div>
              <div className="vip-refresh__partner-actions">
                <PremiumButton variant="linebet" href={AFFILIATE.linebet} fullWidth size="sm">Ouvrir Linebet</PremiumButton>
                <PremiumButton variant="star888" href={AFFILIATE.star888} fullWidth size="sm">Ouvrir 888starz</PremiumButton>
              </div>
              <small>18+ · Jouez de manière responsable · Liens affiliés</small>
            </motion.aside>
          </div>
        </div>
      </section>

      <VipUnlockModal isOpen={showVipModal} onClose={() => setShowVipModal(false)} />
    </>
  )
}

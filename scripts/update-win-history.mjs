// ═══════════════════════════════════════════════════════════════════════════════
// BttsBet – Win History Update Script
// Publishes only results that include a verified final score.
// Prediction archives alone are not sufficient to determine a result.
// ═══════════════════════════════════════════════════════════════════════════════

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PUBLIC_DIR = path.join(__dirname, '..', 'public')
const ARCHIVE_DIR = path.join(PUBLIC_DIR, 'predictions-archive')
const WIN_HISTORY_FILE = path.join(PUBLIC_DIR, 'win-history.json')

const DISPLAY_TZ = 'Africa/Dakar'

function getTodayISO() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: DISPLAY_TZ })
}

async function updateWinHistory() {
  const today = getTodayISO()
  console.log(`[WinHistory] Generating win history for ${today}`)

  // Read past prediction archives
  const archiveFiles = fs.readdirSync(ARCHIVE_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse() // Most recent first

  const historyItems = []
  let idCounter = 1

  // Process archives from the last 30 days
  const maxDays = 30
  const todayDate = new Date(today)
  const cutoffDate = new Date(todayDate)
  cutoffDate.setDate(cutoffDate.getDate() - maxDays)

  for (const archiveFile of archiveFiles) {
    const dateStr = archiveFile.replace('.json', '')
    const archiveDate = new Date(dateStr)

    // Only process dates in the past (not today or future)
    if (archiveDate >= todayDate) continue
    // Only process dates within our window
    if (archiveDate < cutoffDate) continue

    try {
      const archivePath = path.join(ARCHIVE_DIR, archiveFile)
      const data = JSON.parse(fs.readFileSync(archivePath, 'utf-8'))
      const predictions = data.predictions || []

        // An archive contains predictions, not final scores. Only consume an entry
        // when a separate verified-results process has attached a final score and result.
        const verifiedPredictions = predictions.filter(pred =>
          (pred.result === 'Gagné' || pred.result === 'Perdu') &&
          /^\d+-\d+$/.test(String(pred.score || '')) &&
          pred.resultSource
        )

        for (const pred of verifiedPredictions.slice(0, 2)) {
          historyItems.push({
            id: idCounter++,
            date: dateStr,
            match: pred.match,
            league: pred.league,
            type: pred.type,
            prediction: pred.prediction,
            result: pred.result,
            score: pred.score,
            confidence: pred.confidence || 0
          })
        }
    } catch (err) {
      console.log(`[WinHistory] Error processing ${archiveFile}: ${err.message}`)
    }
  }

  // Never synthesize matches, scores or results. An empty history is preferable
  // to a performance record that cannot be independently verified.

  // Sort by date (most recent first)
  historyItems.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)

  // Reassign IDs after sorting
  historyItems.forEach((item, i) => { item.id = i + 1 })

  // Compute stats only from verified entries. Do not infer hidden losses.
  const wonCount = historyItems.filter(item => item.result === 'Gagné').length
  const lostCount = historyItems.filter(item => item.result === 'Perdu').length
  const totalAnalyzed = wonCount + lostCount
  const winRate = totalAnalyzed > 0 ? Math.round((wonCount / totalAnalyzed) * 1000) / 10 : 0
  const last30Rate = winRate

  const winHistoryData = {
    stats: {
      total: totalAnalyzed,
      won: wonCount,
      lost: lostCount,
      rate: `${winRate}%`,
      last30Rate: `${last30Rate}%`
    },
    history: historyItems,
    date: today
  }

  fs.writeFileSync(WIN_HISTORY_FILE, JSON.stringify(winHistoryData, null, 2))
  console.log(`[WinHistory] Written to win-history.json (date: ${today})`)
  console.log(`[WinHistory] ${historyItems.length} winning entries, stats: ${totalAnalyzed} total, ${wonCount} won, ${winRate}% rate`)
  console.log(`[WinHistory] Terminé !`)
}

updateWinHistory().catch(err => {
  console.error('[WinHistory] Erreur fatale:', err)
  process.exit(1)
})

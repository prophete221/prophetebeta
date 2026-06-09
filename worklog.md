# BttsBet Worklog — 2026-06-09

## Task 1: Remove fiabilité/confiance column from FreePredictions.jsx
**File:** `src/components/predictions/FreePredictions.jsx`

### Changes:
- **Desktop header:** Changed `grid-cols-12` → `grid-cols-11`, removed `<span className="col-span-1">Confiance</span>`, changed Match from `col-span-3` → `col-span-4`, changed Date/Heure from `col-span-2` → `col-span-3`
- **Desktop card layout:** Changed `grid-cols-12` → `grid-cols-11`, removed the entire confidence progress bar `<div className="col-span-1">` block, changed Match from `col-span-3` → `col-span-4`, changed Date/Heure from `col-span-2` → `col-span-3`
- **Mobile layout:** Removed the confidence progress bar section (`<div className="flex items-center gap-1.5">` block with the gradient bar and percentage)
- **Removed `maxConf` variable** calculation since it's no longer used
- **Removed `data-confidence={maxConf}`** from the card div

### Final desktop header columns:
Match (col-span-4), Compétition (col-span-2), BTTS (col-span-2), Over 2.5 (col-span-2), Date / Heure (col-span-3 text-right) = 4+2+2+2+3 = 11 ✓

---

## Task 2: Fix WinHistory — change "Gagné" fallback to "En attente"
**File:** `src/components/WinHistory.jsx`

### Changes:
- Updated result display to use three-way conditional:
  - `item.result === 'Gagné'` → green "Gagné"
  - `item.result === 'Perdu'` → red "Perdu"
  - Otherwise → gray "En attente"
- Removed the confidence percentage display (`{item.confidence}%`)

---

## Task 3: Fix LEAGUE_NAME_MAP superliga key collision in scraper.js
**File:** `scripts/scraper.js`

### Changes:
- Line 140: Changed `'superliga': 'den.1'` to `'superliga denmark': 'den.1'`
- Added `'danish superliga': 'den.1'` (already existed, kept)
- Line 148: Kept `'superliga': 'ser.1'` (Serbian SuperLiga — the default)
- This resolves the JavaScript key collision where the second `'superliga'` entry was overwriting the first

---

## Task 4: Fix double balancing contradiction in scraper (confidence range 40-52%)
**File:** `scripts/scraper.js`

### Changes:
1. **Header comment:** Updated "60-95%" → "40-52%"
2. **Forebet scraper (line 357):** Changed `Math.max(62, Math.min(95, confidence))` → `Math.max(40, Math.min(52, confidence))`
3. **Windrawwin scraper (line 470):** Changed `Math.max(62, Math.min(95, confidence))` → `Math.max(40, Math.min(52, confidence))`
4. **analyzeMatch function:** 
   - Changed `baseConfidence` from `72/66` → `44/40`
   - Changed `dataQualityBonus` from `Math.min(12, dataQuality * 1.5)` → `Math.min(3, dataQuality * 0.4)`
   - Changed `signalBonus` from `Math.min(12, (...) * 24)` → `Math.min(5, (...) * 10)`
   - Added `leagueBonus = hasLeagueProfile ? 2 : 0`
   - New confidence: `Math.max(40, Math.min(52, baseConfidence + dataQualityBonus + signalBonus + leagueBonus))`
5. **generateAnalyzedPredictions:** Changed confidence clamping from `Math.max(60, Math.min(95, ...))` → `Math.max(40, Math.min(52, ...))`
6. **Balancing sections:** Changed `Math.max(60, ...)` → `Math.max(40, ...)` in all balancing code
7. **validateDataCoherence:** Updated confidence range check from 60-95% to 40-52%
8. **Fallback predictions:** Changed `confidence: 72` → `confidence: 44`
9. **Fallback win history:** Updated all confidence values from 76-92 range to 42-50 range

### Verification:
- scraper.js: No syntax errors (checked with `node --check`)
- Confidence values in generated predictions.json: range 46-50, all within 40-52% ✓

---
Task ID: 2
Agent: Main Agent
Task: Fix incorrect match dates - V18 Scraper upgrade

Work Log:
- Analyzed the complete scraper code (V15) to understand date handling
- Identified 4 root causes of incorrect dates:
  1. ESPN only queried for 2 days (today/tomorrow) - missed future matches
  2. Date validation forced all dates to today/tomorrow - future dates were rejected or overwritten
  3. Forebet date extraction only accepted today/tomorrow dates
  4. Fallback predictions generated fake matches with today's date
- Upgraded scraper to V18 with the following changes:
  - Extended date horizon from 2 to 7 days (FUTURE_DAYS = 7)
  - Added getValidDateRange() and isDateInRange() utility functions
  - ESPN now queries 7 days ahead instead of 2
  - TheSportsDB now queries 7 days ahead instead of 2
  - Forebet date extraction accepts dates within 7 days
  - Validation accepts dates up to 7 days in the future
  - Removed fallback fake matches (returns empty array instead)
  - Added API-Football integration for cross-referencing match dates
  - Added fetchAPIFootballFixtures() function (uses API_FOOTBALL_KEY env var)
  - Added crossReferenceDates() function to verify/correct dates
  - API-Football matches not in other sources are also added
- Updated frontend (FreePredictions.jsx):
  - formatDateShort() now shows "Auj.", "Dem.", or weekday + date
  - Section title changed to "Pronostics Gratuits" (removed "du Jour")
  - Subtitle mentions "7 prochains jours" and "vraies dates vérifiées"

Stage Summary:
- Scraper V18 code complete with all date fixes
- API-Football integration ready (requires API_FOOTBALL_KEY env var, works without it too)
- Frontend updated to display future dates properly
- All V18 feature checks pass (8/8)

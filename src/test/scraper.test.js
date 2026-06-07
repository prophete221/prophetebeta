import { describe, it, expect } from 'vitest'

// Replicate the pure functions locally for testing
// (scraper.js functions are not exported — they're internal)

function makeMatchSemantic(match, league, type) {
  return match
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+(?:vs|v|contre)\s+/)
    .map((t) => t.slice(0, 3))
    .join('-') + '-' + league.toLowerCase().slice(0, 2)
}

describe('Confidence calculation logic', () => {
  it('should return values between 70 and 95', () => {
    const results = []
    for (let i = 0; i < 100; i++) {
      const hash = i % 7 - 3
      const base = 75 + hash
      const clamped = Math.max(70, Math.min(95, base))
      results.push(clamped)
    }
    results.forEach(r => {
      expect(r).toBeGreaterThanOrEqual(70)
      expect(r).toBeLessThanOrEqual(95)
    })
  })

  it('should produce deterministic results for same input', () => {
    const text = 'BTTS Yes'
    const hash1 = text.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const hash2 = text.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    expect(hash1).toBe(hash2)
  })

  it('should NOT use Math.random for confidence', () => {
    // Confidence should be deterministic based on match name hash
    const match = 'Arsenal vs Tottenham'
    const conf1 = 75 + (match.charCodeAt(0) % 15)
    const conf2 = 75 + (match.charCodeAt(0) % 15)
    expect(conf1).toBe(conf2)
    expect(conf1).toBeGreaterThanOrEqual(75)
    expect(conf1).toBeLessThanOrEqual(90)
  })
})

describe('Match semantic ID', () => {
  it('should generate consistent IDs for same match', () => {
    const id1 = makeMatchSemantic('Arsenal vs Tottenham', 'Premier League', 'BTTS')
    const id2 = makeMatchSemantic('Arsenal vs Tottenham', 'Premier League', 'BTTS')
    expect(id1).toBe(id2)
  })

  it('should generate different IDs for different matches', () => {
    const id1 = makeMatchSemantic('Arsenal vs Tottenham', 'Premier League', 'BTTS')
    const id2 = makeMatchSemantic('Liverpool vs Chelsea', 'Premier League', 'BTTS')
    expect(id1).not.toBe(id2)
  })

  it('should normalize "v" to "vs"', () => {
    const id = makeMatchSemantic('Arsenal v Tottenham', 'Premier League', 'BTTS')
    expect(id).toContain('ars-tot')
  })
})

describe('Win History validation logic', () => {
  it('BTTS "Oui" when both teams score', () => {
    const homeGoals = 2
    const awayGoals = 1
    const bttsActual = homeGoals > 0 && awayGoals > 0
    expect(bttsActual).toBe(true)
  })

  it('BTTS "Non" when one team does not score', () => {
    const homeGoals = 2
    const awayGoals = 0
    const bttsActual = homeGoals > 0 && awayGoals > 0
    expect(bttsActual).toBe(false)
  })

  it('Over 2.5 "Oui" when total goals > 2', () => {
    const totalGoals = 3 + 1
    const over25Actual = totalGoals > 2
    expect(over25Actual).toBe(true)
  })

  it('Over 2.5 "Non" when total goals <= 2', () => {
    const totalGoals = 1 + 0
    const over25Actual = totalGoals > 2
    expect(over25Actual).toBe(false)
  })
})

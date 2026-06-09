import { describe, it, expect } from 'vitest'
import { SITE, AFFILIATE, NAV_LINKS, FAQ_ITEMS, BLOG_ARTICLES, LEGAL, HERO_STATS, HOW_IT_WORKS } from '../data/constants'

describe('SITE constants', () => {
  it('has all required fields', () => {
    expect(SITE.name).toBe('BttsBet')
    expect(SITE.url).toBe('https://bttsbet.online')
    expect(SITE.promoCode).toBe('VISION221')
    expect(SITE.whatsapp).toBeTruthy()
    expect(SITE.accuracy).toBeTruthy()
  })

  it('uses the correct domain', () => {
    expect(SITE.url).toContain('bttsbet.online')
    expect(SITE.url).not.toContain('bttsbet.com')
  })
})

describe('AFFILIATE', () => {
  it('has proper rel attributes for SEO', () => {
    expect(AFFILIATE.rel).toBe('sponsored nofollow')
  })

  it('has linebet URLs', () => {
    expect(AFFILIATE.linebet).toBeTruthy()
    expect(AFFILIATE.linebetDownload).toBeTruthy()
    expect(AFFILIATE.linebetSocial.length).toBeGreaterThan(0)
  })
})

describe('NAV_LINKS', () => {
  it('has navigation links', () => {
    expect(NAV_LINKS.length).toBeGreaterThan(0)
    NAV_LINKS.forEach(link => {
      expect(link.label).toBeTruthy()
      expect(link.href || link.scrollTarget).toBeTruthy()
    })
  })
})

describe('FAQ_ITEMS', () => {
  it('has at least 4 questions with answers', () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(4)
    FAQ_ITEMS.forEach(item => {
      expect(item.q).toBeTruthy()
      expect(item.a.length).toBeGreaterThan(50)
    })
  })
})

describe('BLOG_ARTICLES', () => {
  it('has 5 articles with all required fields', () => {
    expect(BLOG_ARTICLES.length).toBe(5)
    BLOG_ARTICLES.forEach(article => {
      expect(article.id).toBeTruthy()
      expect(article.slug).toBeTruthy()
      expect(article.title).toBeTruthy()
      expect(article.excerpt).toBeTruthy()
      expect(article.category).toBeTruthy()
      expect(article.readTime).toBeTruthy()
      expect(article.date).toBeTruthy()
      expect(article.metaDescription).toBeTruthy()
      expect(article.content.length).toBeGreaterThan(100)
    })
  })

  it('has unique slugs', () => {
    const slugs = BLOG_ARTICLES.map(a => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('LEGAL', () => {
  it('has 4 legal links', () => {
    expect(LEGAL.links.length).toBe(4)
    const hrefs = LEGAL.links.map(l => l.href)
    expect(hrefs).toContain('/mentions-legales')
    expect(hrefs).toContain('/politique-confidentialite')
    expect(hrefs).toContain('/jouer-responsable')
    expect(hrefs).toContain('/cgu')
  })

  it('has disclaimer and responsible text', () => {
    expect(LEGAL.disclaimer.length).toBeGreaterThan(50)
    expect(LEGAL.responsible.length).toBeGreaterThan(30)
  })
})

describe('HERO_STATS', () => {
  it('has 3 stats', () => {
    expect(HERO_STATS.length).toBe(3)
    HERO_STATS.forEach(stat => {
      expect(stat.value).toBeTruthy()
      expect(stat.label).toBeTruthy()
      expect(stat.icon).toBeTruthy()
    })
  })
})

describe('HOW_IT_WORKS', () => {
  it('has 3 steps', () => {
    expect(HOW_IT_WORKS.length).toBe(3)
    HOW_IT_WORKS.forEach(step => {
      expect(step.step).toBeTruthy()
      expect(step.title).toBeTruthy()
      expect(step.desc).toBeTruthy()
    })
  })
})

#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://bttsbet.online'
const TODAY = new Date().toISOString().split('T')[0]
const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly', title: 'BttsBet — Code promo Linebet Afrique VISION221' },
  { path: '/code-promo-linebet', priority: '0.95', changefreq: 'weekly', title: 'Code promo Linebet Afrique VISION221' },
  { path: '/code-promo-linebet-senegal', priority: '0.8', changefreq: 'weekly', title: 'Code promo Linebet Sénégal VISION221' },
  { path: '/linebet-inscription', priority: '0.9', changefreq: 'weekly', title: 'Inscription Linebet avec VISION221' },
  { path: '/linebet-afrique', priority: '0.9', changefreq: 'weekly', title: 'Linebet Afrique — code promo VISION221' },
  { path: '/code-promo-888starz', priority: '0.8', changefreq: 'weekly', title: 'Code promo 888starz btts221' },
  { path: '/jouer-responsable', priority: '0.4', changefreq: 'yearly', title: 'Jouer responsable' },
  { path: '/mentions-legales', priority: '0.3', changefreq: 'yearly', title: 'Mentions légales BttsBet' },
  { path: '/politique-confidentialite', priority: '0.3', changefreq: 'yearly', title: 'Politique de confidentialité BttsBet' },
  { path: '/cgu', priority: '0.3', changefreq: 'yearly', title: 'Conditions générales BttsBet' },
]

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${PAGES.map((page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${SITE_URL}${page.path}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${page.path}"/>
    <image:image><image:loc>${SITE_URL}/${page.path === '/code-promo-888starz' ? 'og-888starz.svg' : 'og-linebet.svg'}</image:loc><image:title>${escapeXml(page.title)}</image:title></image:image>
  </url>`).join('\n')}
</urlset>
`

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(outputPath, xml, 'utf8')
console.log(`[sitemap] ${PAGES.length} URLs écrites dans ${outputPath}`)

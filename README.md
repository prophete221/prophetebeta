# BttsBet — Plateforme de Pronostics Football IA

Site web de pronostics football BTTS (Both Teams To Score) et Over 2.5 générés par intelligence artificielle.

## Stack Technique

| Technologie | Version | Usage |
|---|---|---|
| React | 18.3 | Framework UI |
| Vite | 6.0 | Build tool |
| Tailwind CSS | 4.0 | Styles |
| Framer Motion | 11.15 | Animations |
| React Router | 7.1 | Navigation SPA |
| React Helmet | 2.0 | SEO dynamique |
| Puppeteer | 25.1 | Scraping (CI) |

## Structure du Projet

```
├── public/               # Fichiers statiques
│   ├── predictions.json  # Pronostics du jour (généré par scraper)
│   ├── win-history.json  # Historique des résultats (généré par scraper)
│   ├── sitemap.xml       # Sitemap SEO (généré automatiquement)
│   ├── robots.txt        # Configuration crawlers
│   ├── og-image.png      # Image Open Graph
│   └── logo.png          # Logo du site
├── scripts/
│   ├── scraper.js        # Scraper quotidien (Puppeteer)
│   └── generate-sitemap.js # Générateur sitemap.xml
├── src/
│   ├── App.jsx           # Routes + composition
│   ├── main.jsx          # Point d'entrée React
│   ├── index.css         # Tailwind + thème custom
│   ├── data/constants.js # Données centralisées
│   ├── hooks/            # Hooks réutilisables
│   ├── components/       # Composants React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Sections.jsx
│   │   ├── PromoBanner.jsx
│   │   ├── FaqAccordion.jsx
│   │   ├── Footer.jsx
│   │   ├── WinHistory.jsx
│   │   ├── BlogContent.jsx
│   │   └── predictions/
│   │       ├── FreePredictions.jsx
│   │       └── LockedCoupons.jsx
│   └── pages/
│       ├── BlogPage.jsx
│       ├── BlogArticlePage.jsx
│       └── LegalPages.jsx
├── .github/workflows/
│   ├── main.yml          # Déploiement FTP (push → build → FTP)
│   └── scraper.yml       # Cron quotidien (minuit UTC)
├── index.html            # HTML + Schema.org JSON-LD
└── vite.config.js        # Configuration Vite + prerendering
```

## Commandes

```bash
npm run dev       # Serveur de développement
npm run build     # Build de production (inclut sitemap + prerendering)
npm run preview   # Prévisualisation du build
npm run scrape    # Lancer le scraper manuellement
npm run sitemap   # Régénérer le sitemap
```

## CI/CD

- **Déploiement** : Automatique via GitHub Actions (FTP) à chaque push sur `main`
- **Scraper** : Cron quotidien à minuit UTC, scrape les pronostics et résultats, commit les JSON
- **Sitemap** : Généré automatiquement avant chaque build

## SEO

- Schema.org JSON-LD (7 blocs : Organization, WebSite, WebPage, SoftwareApplication, FAQPage, BreadcrumbList, BlogPosting)
- Meta tags complets (OG, Twitter Card, canonical)
- Sitemap XML avec namespaces image + news
- Prerendering pour les crawlers JavaScript
- Pages légales (mentions légales, confidentialité, jeu responsable, CGU)

## Domaine

Le site est déployé sur **bttsbet.online**

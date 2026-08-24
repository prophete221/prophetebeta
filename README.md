# BttsBet — Code promo Linebet Afrique

BttsBet est désormais une plateforme éditoriale indépendante consacrée en priorité au code partenaire Linebet Afrique **VISION221**, avec une page séparée pour le code 888starz **btts221**. Le site ne publie plus de matchs, de pronostics, de résultats, de marchés VIP ou de contenus Aviator/FIFA. Son objectif est de présenter clairement le code, le parcours d’inscription et les points à vérifier avant toute utilisation de Linebet.

Le domaine public est [bttsbet.online](https://bttsbet.online). Les liens vers Linebet et 888starz sont des liens d’affiliation qualifiés `sponsored nofollow`. BttsBet n’est pas Linebet, ne gère aucun compte, ne collecte aucun dépôt et ne garantit ni bonus, ni éligibilité, ni résultat financier. Les conditions affichées par Linebet dans le pays de l’utilisateur font foi.

## Stack et fonctionnement

| Technologie | Usage |
|---|---|
| Next.js 16 | App Router et export statique |
| React 19 | Interface interactive mobile-first |
| TypeScript | Pages et composants typés |
| Tailwind CSS 4 | Styles et responsive design |
| Framer Motion | Micro-animations sobres, compatibles réduction de mouvement |
| GitHub Actions | Build, contrôles et déploiement FTP LWS |

Le build produit `out/`. L’hébergement de production est assuré par FTP via `.github/workflows/main.yml`. Aucun compte, aucune base de données et aucune API de cotes ne sont nécessaires.

## Routes indexables

| Route | Rôle |
|---|---|
| `/` | Landing premium et CTA Linebet VISION221 |
| `/code-promo-linebet` | Page pilier du code promo Linebet Afrique |
| `/code-promo-linebet-senegal` | Variante locale Sénégal |
| `/linebet-inscription` | Guide d’inscription et de vérification |
| `/linebet-afrique` | Guide régional Afrique |
| `/code-promo-888starz` | Guide séparé du code 888starz btts221 |
| `/jouer-responsable` | Prévention et limites |
| `/mentions-legales` | Identité et affiliation |
| `/politique-confidentialite` | Cookies et données techniques |
| `/cgu` | Conditions générales |

Les anciennes URLs de matchs, de pronostics, de VIP, de jeux et de blog sont consolidées par redirection 301 vers `/code-promo-linebet` lorsqu’elles sont encore demandées. Les autres chemins inconnus restent de vrais 404. Les règles sont dupliquées dans `public/.htaccess` et `public/_redirects` pour l’hébergement LWS et les environnements compatibles.

## Assets SEO et validation

- `public/sitemap.xml` est généré par `node scripts/generate-sitemap.mjs` et ne contient que les pages réellement publiables.
- `public/robots.txt` autorise l’exploration générale, exclut la page 404 et déclare le sitemap.
- `public/og-linebet.svg` remplace l’ancien visuel Open Graph lié aux prédictions.
- `public/og-888starz.svg` est réservé à la page secondaire du code 888starz btts221.
- `public/googlecbd8cccd08774ec4.html` est le fichier de validation Google à la racine publique. Son contenu doit rester exactement : `google-site-verification: googlecbd8cccd08774ec4.html`.

La stratégie SEO privilégie une page pilier forte, des guides complémentaires distincts et un maillage interne utile. Elle n’utilise pas de pages pays quasi identiques, de keyword stuffing, de fausses positions ou de promesses « numéro 1 ». Les liens affiliés sont clairement signalés et qualifiés.

## Installation et contrôles

```bash
npm ci --legacy-peer-deps
npm run build
node scripts/verify-seo.mjs
npm run lint
npx tsc --noEmit
git diff --check
```

Le script de sitemap peut être relancé avec :

```bash
node scripts/generate-sitemap.mjs
```

Le script `verify-seo.mjs` ignore uniquement les fichiers techniques sans métadonnées de page, dont le fichier de validation Google, puis contrôle les titres, descriptions et anciennes marques sur les HTML exportés.

## CI/CD

Le workflow `.github/workflows/main.yml` s’exécute sur les pull requests vers `main` pour les validations sans FTP, puis sur les pushes vers `main` pour le build et le déploiement. Il vérifie également la présence du fichier Google dans `public/` et `out/`. Le transfert utilise `SamKirkland/FTP-Deploy-Action@4.3.0`.

Secrets attendus : `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` et éventuellement `FTP_SERVER_DIR`. Aucun token GitHub ne doit être placé dans le dépôt ou dans un message.

## Transparence éditoriale

Les expressions « meilleur code promo » ou « bonus garanti » ne sont pas utilisées comme des faits non démontrés. BttsBet peut expliquer pourquoi VISION221 est le code principal mis en avant sur son lien partenaire. Le code 888starz btts221 est présenté séparément. Seuls les partenaires concernés peuvent confirmer l’offre, le pays éligible, les moyens de paiement, le dépôt minimum, les conditions de mise et les règles de retrait.

Le jeu d’argent est réservé aux personnes majeures et comporte un risque financier. Consultez la page [Jouer responsable](/jouer-responsable) et la réglementation de votre pays avant toute action.

# BttsBet

BttsBet est une plateforme statique de consultation d’estimations football **BTTS** (Both Teams To Score) et **Over 2,5**. Les pages publiques affichent la date et l’heure des fixtures, la source disponible et les limites connues du modèle. Les paris sportifs comportent un risque financier : **aucune estimation ne constitue une garantie de gain**.

Le domaine public est [bttsbet.online](https://bttsbet.online). Les liens partenaires et le code promotionnel `VISION221` sont présentés comme des informations d’affiliation ; les conditions d’inscription, de dépôt et de bonus doivent être vérifiées directement auprès du partenaire.

## Stack technique

| Technologie | Usage |
|---|---|
| Next.js 16 | App Router et export statique |
| React 19 | Interface utilisateur |
| TypeScript | Composants typés et scripts d’interface |
| Tailwind CSS 4 | Système de styles |
| Framer Motion | Animations avec respect de la préférence de mouvement réduit |
| Node.js | Scripts de génération et de validation des données |
| ESPN public feed | Fixtures utilisées par le générateur actuel |
| Prisma / SQLite | Schéma de développement uniquement ; aucun compte n’est actif en production statique |

Le build produit le dossier `out/`. L’hébergement de production est assuré par FTP sur LWS via GitHub Actions.

## Structure utile

```text
src/
├── app/
│   ├── page.tsx                         # Accueil et données structurées
│   ├── layout.tsx                       # Domaine canonique, SEO global et PWA
│   ├── statistiques/                    # État des statistiques, non indexé sans résultats vérifiés
│   ├── historique/                      # Consultation de l’historique public
│   ├── btts-c-est-quoi/                 # Guide explicatif BTTS
│   ├── code-promo-linebet-senegal/      # Page d’information partenaire
│   ├── bonus-888starz/                  # Page d’information partenaire
│   ├── prediction-aviator/              # Route conservée, non indexée
│   ├── faille-fifa/                     # Route conservée, non indexée
│   ├── blog/                            # Articles éditoriaux
│   └── pages légales                    # CGU, mentions, confidentialité, jeu responsable
├── components/bttsbet/                  # Composants actifs de l’accueil
├── contexts/AuthContext.jsx             # Auth Firebase uniquement si configurée
├── lib/constants.ts                     # Domaine, liens et textes centraux
└── data/constants.js                    # Corpus historique de composants hérités

public/
├── predictions.json                     # Feed public généré
├── predictions-archive/                 # Archives de prédictions
├── win-history.json                     # Résultats confirmés uniquement
├── sitemap.xml                          # Sitemap généré
├── robots.txt                            # Directives robots
├── manifest.json                        # Manifest PWA
├── .htaccess                             # Routage et cache LWS
└── logos/                               # Logos partenaires et sports

scripts/
├── quick-update-predictions.mjs         # Fixtures ESPN + modèle Poisson
├── update-win-history.mjs               # Historique réservé aux scores vérifiés
└── generate-sitemap.mjs                 # Génération du sitemap public
```

## Installation et commandes

```bash
npm ci --legacy-peer-deps
npm run dev
npm run build
npm run start
npm run lint
npx tsc --noEmit
```

Les commandes Prisma sont réservées au développement local :

```bash
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:reset
```

Avant toute livraison, vérifier également :

```bash
git diff --check
node scripts/quick-update-predictions.mjs
node scripts/update-win-history.mjs
node scripts/generate-sitemap.mjs
```

## Pipeline de données

Le générateur actuel récupère les fixtures depuis le feed public ESPN, les dédoublonne, les date dans le fuseau métier `Africa/Dakar` et applique une estimation de loi de Poisson à partir de profils de ligue. Il ne revendique pas systématiquement des xG d’équipe, des blessures, une météo ou des cotes de bookmaker lorsqu’elles ne sont pas disponibles.

Le feed public peut publier les marchés BTTS et Over 2,5 avec les probabilités calculées par le script. Les données manquantes restent explicitement indisponibles dans l’interface ; aucun fallback d’équipe n’est fabriqué côté client.

`win-history.json` n’ajoute une ligne que si une prédiction contient un score final au format valide, un résultat `Gagné` ou `Perdu` et une source de résultat. Tant qu’aucune ligne ne satisfait ces critères, les statistiques restent à zéro et l’interface l’indique clairement. Les matchs, scores et taux synthétiques ne doivent jamais être ajoutés pour améliorer artificiellement la performance affichée.

## CI/CD et déploiement

Deux workflows sont actifs :

| Workflow | Déclencheur | Rôle |
|---|---|---|
| `.github/workflows/main.yml` | Push sur `main` ou lancement manuel | Génération, validations, build statique et FTP |
| `.github/workflows/auto-update.yml` | Cron `06:00`, `14:00` et `22:00` UTC ou lancement manuel | Mise à jour planifiée, build statique et FTP |

Les deux workflows utilisent `npm ci`, bloquent le déploiement si la génération des données ou le build échoue, empêchent deux déploiements de production concurrents et utilisent `FTP-Deploy-Action@4.4.0`. Les fichiers nécessaires au routage LWS sont copiés dans `out/` avant le transfert.

Secrets GitHub nécessaires au déploiement : `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` et, si nécessaire, `FTP_SERVER_DIR`. Aucune clé privée ou base de données locale ne doit être committée. Utiliser `.env.example` comme modèle de développement.

## SEO et indexation

Le domaine canonique est `https://bttsbet.online`. Les métadonnées globales, Open Graph, Twitter Cards, manifest et JSON-LD décrivent uniquement les marchés BTTS et Over 2,5 ainsi que la méthode publique ESPN/Poisson. Le sitemap est généré par `scripts/generate-sitemap.mjs` et exclut les pages FIFA/Aviator tant que leur contenu n’est pas suffisamment vérifié. Ces routes portent aussi `noindex`.

Les pages légales et la page `jouer-responsable` restent accessibles. `robots.txt` autorise l’exploration générale et déclare `https://bttsbet.online/sitemap.xml`. Le fichier `.htaccess` désactive le cache HTML, conserve un cache long pour les assets versionnés et fournit le routage des URLs propres.

## Sécurité et confidentialité

Le fallback local de l’ancien contexte d’authentification a été désactivé : aucun mot de passe n’est stocké dans `localStorage`. Une authentification réelle nécessite une configuration Firebase valide. L’activation VIP actuellement présente dans l’interface est un état local du navigateur ; elle ne vérifie pas un compte bookmaker et ne doit pas être présentée comme une validation externe.

Les identifiants saisis dans le modal VIP sont hashés localement avant stockage. Le site ne doit pas demander ni conserver de mot de passe bookmaker. Toute évolution vers des comptes utilisateurs ou une validation serveur nécessite un backend sécurisé et une décision d’architecture séparée.

## Limites connues

Les taux de réussite et ROI ne sont pas publiés sans résultats finaux vérifiés. Les cartes multi-sports affichent un état d’attente tant qu’aucun feed vérifiable de fixtures et de cotes n’est connecté. Les routes historiques FIFA/Aviator sont conservées pour éviter les liens cassés, mais ne sont pas proposées aux moteurs de recherche.

Les liens d’affiliation sont externes et soumis aux conditions de leurs opérateurs. BttsBet ne prend pas de paris, ne collecte pas de fonds et ne garantit ni l’éligibilité à une offre partenaire ni le résultat d’un pari.

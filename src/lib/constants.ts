// ═══════════════════════════════════════════════════════════════
// BttsBet – Centralized Data & Constants
// ═══════════════════════════════════════════════════════════════

export const SITE = {
  name: 'BttsBet',
  url: 'https://bttsbet.online',
  tagline: "Pronostics football BTTS & Over 2,5 basés sur l'IA pour parieurs sérieux",
  promoCode: 'VISION221',
  accuracy: 'N/D',

  vipAccuracy: 'N/D',
  vipMinDeposit: 'Voir les conditions du partenaire',
  historyRate: 'N/D',
  last30Rate: 'N/D',
}

export const AFFILIATE = {
  linebet: 'https://lb-aff.com/L?tag=d_5589568m_22611c_site&site=5589568&ad=22611&r=registration',
  linebetDownload: 'https://lb-aff.com/L?tag=d_5589568m_66803c_apk1&site=5589568&ad=66803',
  linebetSocial: [
    'https://vision221.lineorgs.com/',
    'https://linebet.press/vision221',
    'https://linebetop.com/en?promocode=VISION221',
  ],
  // 888starz — Nouveau partenaire d'affiliation (même code promo VISION221)
  star888: 'https://888ghta.com/8hwF6V',
  star888Download: 'https://888ghta.com/5o6glw',
  rel: 'sponsored nofollow',
}

// Liste des bookmakers affiliés pour itération dans l'UI
export const BOOKMAKERS = [
  {
    id: 'linebet',
    name: 'Linebet',
    signupLink: AFFILIATE.linebet,
    downloadLink: AFFILIATE.linebetDownload,
    promoCode: 'VISION221',
    color: 'emerald',
    bonus: 'Conditions à vérifier',
    description: 'Lien partenaire Linebet — vérifiez les conditions de l’offre avant inscription.',
    logoFull: '/logos/linebet.svg',
    logoIcon: '/logos/linebet-icon.svg',
  },
  {
    id: '888starz',
    name: '888starz',
    signupLink: AFFILIATE.star888,
    downloadLink: AFFILIATE.star888Download,
    promoCode: 'VISION221',
    color: 'gold',
    bonus: 'Conditions à vérifier',
    description: 'Lien partenaire 888starz — vérifiez les conditions de l’offre avant inscription.',
    logoFull: '/logos/888starz.svg',
    logoIcon: '/logos/888starz-icon.svg',
  },
] as const

// Logo Android — utilisé sur les boutons de téléchargement APK
export const ANDROID_LOGO = '/logos/android.svg'

export const NAV_LINKS: Array<{ label: string; href?: string; scrollTarget?: string; highlight?: boolean }> = [
  { label: 'Accueil', href: '/' },
  { label: 'Pronostics', scrollTarget: 'free-predictions' },
  { label: 'Résultats', scrollTarget: 'win-history' },
  { label: 'VIP & Bonus', scrollTarget: 'vip' },
  { label: 'FAQ', scrollTarget: 'faq' },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
      title: 'Le modèle lit les fixtures',
      desc: 'Le modèle utilise les fixtures ESPN et un profil de ligue pour calculer des estimations Poisson. Les données absentes ne sont pas inventées.',
  },
  {
    step: '02',
      title: 'On affiche les estimations',
      desc: 'Les marchés BTTS et Over 2,5 sont affichés avec la date, l’heure et les limites connues du modèle.',
  },
  {
    step: '03',
    title: 'Tu paries en confiance',
    desc: "Utilise nos pronostics sur Linebet ou ton bookmaker habituel. Code promo VISION221 pour un bonus exclusif sur le premier dépôt.",
  },
]

export const HERO_STATS = [
  { value: '2', label: 'Marchés publiés', icon: 'target' },
  { value: 'ESPN', label: 'Source des fixtures', icon: 'chart' },
  { value: 'N/D', label: 'Taux vérifié', icon: 'globe' },
]

export const FAQ_ITEMS = [
  {
    q: "Qu'est-ce que le BTTS ?",
    a: "BTTS signifie \"Both Teams To Score\" (les deux équipes marquent). C'est un type de pari où vous pariez que les deux équipes marqueront au moins un but durant le match, quelle que soit l'issue finale. Ce marché est très populaire car il ne dépend pas du résultat final du match, mais uniquement de la capacité des deux équipes à trouver le chemin des filets. Notre IA analyse les statistiques offensives et défensives pour identifier les matchs où les deux équipes ont une forte probabilité de marquer.",
  },
  {
    q: "Comment fonctionne l'IA de BttsBet ?",
    a: "Le modèle public utilise les fixtures ESPN et des profils de ligue pour calculer des estimations BTTS et Over 2,5 avec une loi de Poisson. Les xG d'équipe, les blessures, la météo et les cotes ne sont pas inventés lorsqu'ils ne sont pas disponibles. Aucun taux de réussite n'est publié sans résultats finaux vérifiés.",
  },
  {
    q: 'Comment utiliser le code promo VISION221 ?',
    a: "Le code VISION221 est présenté comme information de partenaire. Vérifiez directement auprès de Linebet les conditions d'inscription, le dépôt minimal, l'éligibilité et le montant éventuel du bonus avant toute action.",
  },
  {
    q: 'Les pronostics gratuits sont-ils fiables ?',
    a: "Les pronostics gratuits sont des estimations statistiques publiées avec leur date, leur heure et les limites connues du modèle. Les marchés supplémentaires ne sont pas publiés sans source de données vérifiable. Aucun résultat n'est garanti et les performances passées ne préjugent pas des résultats futurs.",
  },
  {
    q: 'Quels championnats sont couverts ?',
    a: "Les fixtures actuellement publiées proviennent du feed ESPN disponible au moment de la génération. La couverture varie selon les compétitions accessibles et la plateforme affiche la source et la date des données plutôt qu'une promesse de couverture fixe.",
  },
  {
    q: 'Comment utiliser les pronostics BttsBet ?',
    a: "Nos pronostics sont des outils d'aide à la décision, pas des garanties de gain. Pour les utiliser au mieux, consultez nos pronostics gratuits chaque jour, vérifiez l'indice de confiance associé, et croisez avec votre propre analyse. Nous vous recommandons de toujours respecter votre gestion de bankroll et de ne jamais miser plus que ce que vous pouvez vous permettre de perdre. Les résultats passés ne garantissent pas les résultats futurs.",
  },
  {
    q: 'Peut-on prédire Aviator ou une faille de cotes FIFA ?',
    a: "Non. Aviator est un jeu 100% aléatoire basé sur un générateur certifié 'provably fair' — aucun outil au monde ne peut prédire le multiplicateur d'un round futur. Nos statistiques Aviator permettent d'observer l'historique des rounds et les tendances passées, mais ne constituent en aucun cas des prédictions. Concernant les 'Value Bets FIFA', il s'agit d'estimations statistiques comparant les cotes des bookmakers à nos probabilités calculées — ce sont des outils d'analyse, pas des garanties de gain. Tout pari comporte un risque de perte.",
  },
]

export const TESTIMONIALS = [
  { name: 'Mamadou D.', city: 'Dakar', text: "L'analyse xG m'aide à filtrer mes matchs. Je parie moins souvent mais avec plus de confiance.", rating: 4 },
  { name: 'Kouassi A.', city: 'Abidjan', text: "Le tableau de bord IA est clair. Les barres de probabilité BTTS me font gagner du temps dans mes analyses.", rating: 4 },
  { name: 'Ibrahim S.', city: 'Bamako', text: "BttsBet a remplacé mes groupes WhatsApp. Les données sont structurées et les sources sont citées.", rating: 5 },
  { name: 'Patrick N.', city: 'Douala', text: "L'historique transparent avec gagnés et perdus m'a donné confiance. Aucune promesse de gain facile.", rating: 4 },
  { name: 'Ousmane B.', city: 'Ouagadougou', text: "L'outil est honnête : 52% de réussite affichée, vérifiable dans l'historique. C'est ce que je cherchais.", rating: 5 },
  { name: 'Fatou M.', city: 'Dakar', text: "Le code VISION221 m'a permis de commencer sur Linebet avec un bonus. L'interface est propre et rapide.", rating: 4 },
]

export const SOCIAL_PROOF = {
  // Aucun compteur d’audience ou de gains n’est mesuré côté produit.
  members: null as number | null,
  winsToday: null as number | null,
  currentStreak: null as number | null,
}

export const VIP_DESCRIPTION = 'VIP : sélections du jour BTTS et Over 2,5 — détails verrouillés'

export const PAYMENT_METHODS = ['Wave', 'Orange Money', 'Free Money']

export const LONASE = { name: 'LONASE', description: 'Loterie Nationale du Sénégal' }

export const URGENCY_MESSAGES = [
  "📊 Données du jour disponibles",
  "🕒 Consulte la date et l’heure de chaque fixture",
  "🎯 Code VISION221 — conditions du partenaire à vérifier avant inscription",
]

export const LEGAL = {
  disclaimer: "Les paris sportifs comportent des risques financiers. Ne misez jamais plus que ce que vous pouvez vous permettre de perdre. Les statistiques de précision de notre IA (environ 52%) sont basées sur des données historiques et ne garantissent pas de résultats futurs. BttsBet est un site informatif et d'affiliation : nous ne prenons pas de paris et ne collectons pas de fonds. Les témoignages présentés sur ce site reflètent des expériences individuelles et ne constituent pas une garantie de résultats. Jouez de manière responsable.",
  responsible: "Si vous ou un proche avez un problème lié aux jeux d'argent, contactez la ligne d'écoute nationale de votre pays. En France : 09-74-75-13-13 (Joueurs Info Service). Au Cameroun : contactez le MINSANT. Au Sénégal : 33 867 22 22. Ressource internationale : https://www.begambleaware.org/",
  copyright: `© ${new Date().getFullYear()} BttsBet. Tous droits réservés.`,
  links: [
    { label: 'Mentions Légales', href: '/mentions-legales' },
    { label: 'Politique de Confidentialité', href: '/politique-confidentialite' },
    { label: 'Jouer Responsable', href: 'https://www.begambleaware.org/' },
    { label: 'CGU', href: '/cgu' },
  ],
}

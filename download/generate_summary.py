# -*- coding: utf-8 -*-
import os, sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Font Registration ──
pdfmetrics.registerFont(TTFont('NotoSerifSC', '/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', '/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
pdfmetrics.registerFont(TTFont('SarasaMonoSC', '/usr/share/fonts/truetype/chinese/SarasaMonoSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('SarasaMonoSC-Bold', '/usr/share/fonts/truetype/chinese/SarasaMonoSC-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Tinos', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'))
pdfmetrics.registerFont(TTFont('Tinos-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')
registerFontFamily('SarasaMonoSC', normal='SarasaMonoSC', bold='SarasaMonoSC-Bold')
registerFontFamily('Tinos', normal='Tinos', bold='Tinos-Bold')

# ── Color Palette ──
ACCENT       = colors.HexColor('#2f97ba')
TEXT_PRIMARY  = colors.HexColor('#201e1d')
TEXT_MUTED    = colors.HexColor('#7f7a73')
BG_SURFACE   = colors.HexColor('#e2ded9')
BG_PAGE      = colors.HexColor('#f4f3f2')

TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT  = colors.white
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = BG_SURFACE

# ── Styles ──
title_style = ParagraphStyle(
    name='MainTitle', fontName='NotoSerifSC', fontSize=28, leading=38,
    alignment=TA_CENTER, textColor=ACCENT, spaceAfter=6
)
subtitle_style = ParagraphStyle(
    name='Subtitle', fontName='NotoSerifSC', fontSize=14, leading=20,
    alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=24
)
h1_style = ParagraphStyle(
    name='H1', fontName='NotoSerifSC', fontSize=18, leading=26,
    textColor=ACCENT, spaceBefore=18, spaceAfter=10
)
h2_style = ParagraphStyle(
    name='H2', fontName='NotoSerifSC', fontSize=14, leading=20,
    textColor=TEXT_PRIMARY, spaceBefore=12, spaceAfter=8
)
h3_style = ParagraphStyle(
    name='H3', fontName='SarasaMonoSC', fontSize=12, leading=18,
    textColor=ACCENT, spaceBefore=8, spaceAfter=6
)
body_style = ParagraphStyle(
    name='Body', fontName='NotoSerifSC', fontSize=10.5, leading=18,
    alignment=TA_LEFT, textColor=TEXT_PRIMARY, wordWrap='CJK',
    spaceBefore=2, spaceAfter=6
)
body_en_style = ParagraphStyle(
    name='BodyEN', fontName='Tinos', fontSize=10.5, leading=18,
    alignment=TA_JUSTIFY, textColor=TEXT_PRIMARY,
    spaceBefore=2, spaceAfter=6
)
meta_style = ParagraphStyle(
    name='Meta', fontName='NotoSerifSC', fontSize=10, leading=16,
    alignment=TA_CENTER, textColor=TEXT_MUTED
)
table_header_style = ParagraphStyle(
    name='TableHeader', fontName='NotoSerifSC', fontSize=10, leading=14,
    alignment=TA_CENTER, textColor=colors.white
)
table_cell_style = ParagraphStyle(
    name='TableCell', fontName='NotoSerifSC', fontSize=9.5, leading=14,
    alignment=TA_LEFT, textColor=TEXT_PRIMARY, wordWrap='CJK'
)
table_cell_center = ParagraphStyle(
    name='TableCellCenter', fontName='NotoSerifSC', fontSize=9.5, leading=14,
    alignment=TA_CENTER, textColor=TEXT_PRIMARY, wordWrap='CJK'
)
bullet_style = ParagraphStyle(
    name='Bullet', fontName='NotoSerifSC', fontSize=10.5, leading=17,
    alignment=TA_LEFT, textColor=TEXT_PRIMARY, wordWrap='CJK',
    leftIndent=20, bulletIndent=6, spaceBefore=2, spaceAfter=4
)
code_style = ParagraphStyle(
    name='Code', fontName='DejaVuSans', fontSize=9, leading=13,
    alignment=TA_LEFT, textColor=TEXT_MUTED, wordWrap='CJK',
    leftIndent=12, spaceBefore=2, spaceAfter=2
)

# ── Helper ──
def make_table(headers, rows, col_ratios=None):
    page_w = A4[0]
    margins = 1.0*inch*2
    avail = page_w - margins
    n_cols = len(headers)
    if col_ratios is None:
        col_ratios = [1.0/n_cols]*n_cols
    col_widths = [r * avail for r in col_ratios]

    header_row = [Paragraph('<b>%s</b>' % h, table_header_style) for h in headers]
    data = [header_row]
    for row in rows:
        data.append([Paragraph(str(c), table_cell_style) for c in row])

    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0,0), (-1,0), TABLE_HEADER_TEXT),
        ('GRID', (0,0), (-1,-1), 0.5, TEXT_MUTED),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]
    for i in range(1, len(data)):
        bg = TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD
        style_cmds.append(('BACKGROUND', (0,i), (-1,i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

def bullet(text):
    return Paragraph('<bullet>&bull;</bullet> ' + text, bullet_style)

# ── Build Document ──
output_path = '/home/z/my-project/download/resume_systeme_prophete221.pdf'
doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=1.0*inch,
    rightMargin=1.0*inch,
    topMargin=1.0*inch,
    bottomMargin=1.0*inch,
    title='Resume du Systeme GitHub prophete221',
    author='Z.ai',
    creator='Z.ai'
)

story = []

# ═══════════════════════ COVER PAGE ═══════════════════════
story.append(Spacer(1, 120))
story.append(Paragraph('<b>Resume du Systeme</b>', title_style))
story.append(Spacer(1, 8))
story.append(Paragraph('<b>GitHub prophete221</b>', ParagraphStyle(
    name='Title2', fontName='NotoSerifSC', fontSize=22, leading=30,
    alignment=TA_CENTER, textColor=ACCENT
)))
story.append(Spacer(1, 24))
story.append(Paragraph('Analyse complete des depots GitHub de l\'utilisateur prophete221', subtitle_style))
story.append(Spacer(1, 36))

# Summary block
summary_data = [
    [Paragraph('<b>Depot principal</b>', table_header_style),
     Paragraph('<b>Langage</b>', table_header_style),
     Paragraph('<b>Statut</b>', table_header_style),
     Paragraph('<b>Type</b>', table_header_style)],
    [Paragraph('prophetebeta', table_cell_center),
     Paragraph('JavaScript / React', table_cell_center),
     Paragraph('Actif', table_cell_center),
     Paragraph('SPA + Scraper', table_cell_center)],
    [Paragraph('pronostic-cdm2026-site', table_cell_center),
     Paragraph('Aucun', table_cell_center),
     Paragraph('README seul', table_cell_center),
     Paragraph('Projet vide', table_cell_center)],
    [Paragraph('pronostic-cdm2026', table_cell_center),
     Paragraph('Aucun', table_cell_center),
     Paragraph('Vide', table_cell_center),
     Paragraph('Depot vide', table_cell_center)],
    [Paragraph('coupon221', table_cell_center),
     Paragraph('Aucun', table_cell_center),
     Paragraph('Vide', table_cell_center),
     Paragraph('Depot vide', table_cell_center)],
]
summary_table = Table(summary_data, colWidths=[140, 120, 80, 100], hAlign='CENTER')
summary_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), TABLE_HEADER_COLOR),
    ('TEXTCOLOR', (0,0), (-1,0), TABLE_HEADER_TEXT),
    ('GRID', (0,0), (-1,-1), 0.5, TEXT_MUTED),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('BACKGROUND', (0,1), (-1,1), TABLE_ROW_EVEN),
    ('BACKGROUND', (0,2), (-1,2), TABLE_ROW_ODD),
    ('BACKGROUND', (0,3), (-1,3), TABLE_ROW_EVEN),
    ('BACKGROUND', (0,4), (-1,4), TABLE_ROW_ODD),
]))
story.append(summary_table)
story.append(Spacer(1, 48))
story.append(Paragraph('Date : 9 juin 2026 | Genere par Z.ai', meta_style))

story.append(PageBreak())

# ═══════════════════════ SECTION 1: VUE D'ENSEMBLE ═══════════════════════
story.append(Paragraph('<b>1. Vue d\'ensemble du systeme</b>', h1_style))
story.append(Paragraph(
    'Le compte GitHub <b>prophete221</b> heberge 4 depots publics. Parmi ceux-ci, seul le depot '
    '<b>prophetebeta</b> contient du code fonctionnel et une application complete. Les trois autres depots '
    '(pronostic-cdm2026-site, pronostic-cdm2026, coupon221) sont soit completement vides, soit ne contiennent '
    'qu\'un fichier README descriptif sans aucune ligne de code executable. L\'ensemble de l\'ecosysteme '
    'est oriente autour d\'une thematique unique : les pronostics sportifs (principalement football) et '
    'l\'affiliation avec la plateforme de paris Linebet via le code promo <b>VISION221</b>.',
    body_style
))
story.append(Paragraph(
    'Le depot principal prophetebeta deploye un site web complet accessible a l\'adresse bttsbet.online. '
    'Il s\'agit d\'une application React monopage (SPA) qui offre des pronostics quotidiens de football '
    'generes automatiquement par un scraper Node.js, le tout deploye via un pipeline CI/CD entierement '
    'automatise grace a GitHub Actions. Le systeme ne possede aucune base de donnees traditionnelle ni '
    'serveur backend : les donnees sont servies sous forme de fichiers JSON statiques, generes chaque '
    'jour par le scraper et deployes sur le serveur FTP hebergeant le site.',
    body_style
))
story.append(Paragraph(
    'L\'architecture globale est donc celle d\'un site statique avec generation de contenu dynamique '
    'cote CI/CD (au moment du build), et non au moment de la requete utilisateur. Ce choix architecturale '
    'elimine le besoin d\'un serveur backend, reduit les couts d\'hebergement au minimum, et garantit '
    'des performances de chargement optimales puisque le site servit est entierement pre-compile.',
    body_style
))

# ═══════════════════════ SECTION 2: DEPOT PRINCIPAL ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>2. Depot principal : prophetebeta (BttsBet)</b>', h1_style))

story.append(Paragraph('<b>2.1 Stack technique</b>', h2_style))
story.append(make_table(
    ['Categorie', 'Technologie', 'Version', 'Role'],
    [
        ['Framework UI', 'React', '18.3.1', 'Framework frontend'],
        ['Build tool', 'Vite', '6.0', 'Bundler + dev server'],
        ['CSS', 'Tailwind CSS', '4.0', 'Styles utilitaires + design system'],
        ['Animations', 'Framer Motion', '11.15', 'Animations declarees + scroll'],
        ['3D', 'Three.js + R3F', '0.184 / 8.18', 'Particules 3D arriere-plan'],
        ['Routing', 'React Router DOM', '7.1.1', 'Navigation SPA'],
        ['SEO', 'React Helmet Async', '2.0.5', 'Meta tags dynamiques'],
        ['Scraping', 'Puppeteer', '25.1 (dev)', 'Scraper web (CI uniquement)'],
        ['Tests', 'Vitest + Testing Library', '4.1.8 / 16.3.2', 'Tests unitaires'],
        ['Hebergement', 'FTP', '-', 'Deploiement sur serveur classique'],
    ],
    col_ratios=[0.15, 0.25, 0.20, 0.40]
))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'Le projet est entierement ecrit en JavaScript (ES Modules, JSX) et constitue une application 100% '
    'frontend sans serveur backend. Le build est assure par Vite 6 avec les plugins React et Tailwind CSS. '
    'Les animations visuelles s\'appuient sur Framer Motion pour les transitions et interactions, et sur '
    'Three.js (via React Three Fiber) pour les effets de particules 3D en arriere-plan, charges uniquement '
    'sur desktop pour preserver les performances mobiles.',
    body_style
))

story.append(Paragraph('<b>2.2 Architecture</b>', h2_style))
story.append(Paragraph(
    'L\'application suit une architecture de type SPA (Single Page Application) deployee en tant que site '
    'statique. Le flux de donnees global se decompose en quatre etapes principales. Premierement, un scraper '
    'Node.js s\'execute quotidiennement via GitHub Actions (cron a 06h UTC) pour collecter les donnees de '
    'matchs depuis l\'API ESPN (couvrant 44 ligues), Forebet et Windrawwin, puis generer les fichiers '
    'predictions.json et win-history.json. Deuxiemement, Vite compile la SPA React en un ensemble de '
    'fichiers statiques dans le dossier dist/. Troisiemement, les fichiers generes sont deployes par FTP '
    'sur le serveur de production (bttsbet.online). Quatriemement, le navigateur client charge la SPA qui '
    'recupere les fichiers JSON au runtime pour afficher les pronostics du jour.',
    body_style
))
story.append(Paragraph(
    'Il est important de noter qu\'il n\'existe aucune API backend : toutes les donnees sont soit statiques '
    '(definies dans constants.js), soit servies sous forme de fichiers JSON generes par le scraper. Le '
    'systeme de "base de donnees" est donc un ensemble de fichiers JSON statiques remplaces quotidiennement, '
    'avec un systeme d\'archives quotidiennes dans le dossier predictions-archive/.',
    body_style
))

story.append(Paragraph('<b>2.3 Structure des composants React</b>', h2_style))
story.append(Paragraph(
    'L\'interface utilisateur est organisee en composants React hierarchiques. Le composant racine App.jsx '
    'contient trois couches visuelles superposees : la couche 3D (Scene3D, chargee en lazy loading et '
    'reservee au desktop), les elements flottants decoratifs (FloatingElements), et l\'effet de halo '
    'suivant le curseur (CursorEffect). La couche de contenu principal inclut la Navbar (avec effet '
    'glassmorphism et navigation sticky), puis les routes de l\'application. La page d\'accueil est la plus '
    'riche avec 12 sections : Hero (avec parallax), FreePredictions (pronostics gratuits), LockedCoupons '
    '(pronostics VIP), WinHistory (historique des resultats), StatsSection, PromoBanner, WhyLinebet, '
    'Testimonials, BlogSection, SeoBlock, HowItWorks, et FaqAccordion.',
    body_style
))
story.append(Paragraph(
    'Les pages supplementaires incluent le Blog (liste d\'articles avec filtres par categorie), les pages '
    'd\'articles individuels, et quatre pages legales (Mentions legales, Politique de confidentialite, '
    'Jouer responsable, CGU). Les donnees statiques (FAQ, articles de blog, temoignages, liens de '
    'navigation, informations d\'affiliation) sont centralisees dans un unique fichier constants.js, '
    'eliminant le besoin d\'un CMS externe.',
    body_style
))

story.append(Paragraph('<b>2.4 Fonctionnalites cles</b>', h2_style))

story.append(Paragraph('<b>Pronostics football IA</b>', h3_style))
story.append(Paragraph(
    'Le coeur fonctionnel du site est la generation de pronostics quotidiens de football, specifiquement '
    'les paris BTTS (Both Teams To Score) et Over 2.5 buts. Le scraper utilise un modele statistique base '
    'sur la distribution de Poisson avec calibration et regression. La calibration applique une correction '
    'de +2% pour les BTTS et +1% pour les Over 2.5 pour compenser le biais inhrent au modele de Poisson. '
    'La regression est moderee (maximum 0.40) vers la moyenne de la ligue pour eviter les predictions '
    'extremes. Chaque pronostic est accompagne d\'un indice de confiance allant de 60 a 95%, calcule a '
    'partir de l\'ecart au seuil decisionnel. Les sources de donnees couvrent 44 ligues via l\'API ESPN, '
    'ainsi que Forebet et Windrawwin comme sources complementaires.',
    body_style
))

story.append(Paragraph('<b>Pronostics Premium (VIP)</b>', h3_style))
story.append(Paragraph(
    'Les pronostics premium sont affiches derriere un overlay visuel de verrouillage. L\'utilisateur est '
    'redirige vers un numero WhatsApp VIP (+1 540 670 4172) pour debloquer l\'acces. Il n\'existe aucune '
    'integration technique d\'authentification : les donnees des pronostics VIP sont statiques et codees '
    'en dur dans le composant LockedCoupons.jsx. La section VIP fonctionne essentiellement comme un CTA '
    '(Call To Action) redirigeant vers WhatsApp.',
    body_style
))

story.append(Paragraph('<b>Historique des resultats</b>', h3_style))
story.append(Paragraph(
    'Le site affiche un tableau des resultats passes avec verification automatique, incluant des statistiques '
    'globales (total analyse, gagnants, taux de reussite, taux sur 30 jours). La coherence mathematique des '
    'statistiques est verifiee cote client. Les donnees d\'historique sont generees par le scraper quotidien '
    'et servies via le fichier win-history.json.',
    body_style
))

story.append(Paragraph('<b>Blog SEO</b>', h3_style))
story.append(Paragraph(
    'Le site integre un blog contenant 5 articles de fond couvrant les strategie BTTS, les mises Over 2.5, '
    'la gestion de bankroll, les meilleurs championnats pour les paris BTTS, et un guide d\'inscription sur '
    'Linebet. Le blog supporte le filtrage par categorie et le rendu HTML securise via un composant '
    'BlogContent qui utilise DOMParser avec une whitelist de tags autorises (h2, h3, p, strong, em, blockquote, '
    'ul, ol, li, a, br), evitant l\'utilisation de dangerouslySetInnerHTML. Les liens reoivent '
    'automatiquement les attributs target="_blank" et rel="noopener noreferrer".',
    body_style
))

story.append(Paragraph('<b>Affiliation Linebet</b>', h3_style))
story.append(Paragraph(
    'Le code promo VISION221 est integre de maniere omnipresente dans l\'interface, avec un bonus annonce de '
    '150$. Trois types de liens d\'affiliation sont utilises : inscription directe, APK Android, et reseaux '
    'sociaux. Les liens sont attribues avec rel="sponsored nofollow" pour la conformite Google. Les CTA sont '
    'presents dans au moins 8 endroits differents de l\'interface : navbar, hero, section stats, footer, '
    'banniere mobile sticky, et au sein des articles de blog. Le code promo est affiche avec une animation '
    'shimmer doree pour attirer l\'attention.',
    body_style
))

story.append(Paragraph('<b>Effets visuels premium</b>', h3_style))
story.append(Paragraph(
    'Le site propose une experience visuelle riche avec un champ de particules 3D anime (200 particules, '
    'Three.js, desktop uniquement en lazy loading), des animations Framer Motion (entrees 3D, stagger, '
    'scroll reveal), des cartes avec effet tilt 3D au survol (TiltCard avec glare), un effet parallax '
    'sur le scroll et la souris (utilisant requestAnimationFrame sans setState pour les performances), '
    'un effet de halo lumineux suivant le curseur (CursorEffect), et du glassmorphism a trois niveaux '
    '(glass, glass-strong, glass-3d). Les animations lourdes sont automatiquement desactivees sur mobile '
    'via des media queries CSS.',
    body_style
))

# ═══════════════════════ SECTION 3: SCRAPER ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>3. Le Scraper V14 : moteur de donnees</b>', h1_style))
story.append(Paragraph(
    'Le scraper est le composant central du systeme, responsable de la generation quotidienne des pronostics. '
    'Il s\'execute dans GitHub Actions via un cron programme a 06h UTC chaque jour. La version actuelle '
    '(V14) implémente un pipeline en quatre phases distinctes.',
    body_style
))

story.append(Paragraph('<b>Phase 1 : Recuperation des matchs</b>', h3_style))
story.append(Paragraph(
    'Le scraper interroge l\'API ESPN pour obtenir la liste des matchs du jour sur 44 ligues couvertes. '
    'Chaque match est extrait avec ses equipes, sa ligue, sa date et son heure. Le scraper effectue un '
    'fuzzy matching d\'equipes via une fonction teamNamesMatch() qui normalise les noms et effectue un '
    'match partiel sur 4 caracteres ou plus pour gerer les differences de nomination entre les sources.',
    body_style
))

story.append(Paragraph('<b>Phase 2 : Recuperation des resultats historiques</b>', h3_style))
story.append(Paragraph(
    'Pour chaque equipe identifiee, le scraper recupere les resultats des matchs precedents depuis '
    'l\'API ESPN. Ces donnees historiques servent de base au calcul des parametres du modele de Poisson '
    '(lambdas home/away), ainsi qu\'a la construction des profils statistiques par ligue (taux BTTS, '
    'taux Over 2.5, moyenne de buts).',
    body_style
))

story.append(Paragraph('<b>Phase 3 : Construction des statistiques</b>', h3_style))
story.append(Paragraph(
    'Les statistiques d\'equipes et de ligues sont agregees a partir des resultats historiques. Chaque '
    'ligue possede un profil statistique incluant le taux BTTS moyen, le taux Over 2.5 moyen, et la '
    'moyenne de buts par match. Ces profils servent de base pour la regression vers la moyenne appliquee '
    'dans la phase d\'analyse.',
    body_style
))

story.append(Paragraph('<b>Phase 4 : Analyse Poisson par match</b>', h3_style))
story.append(Paragraph(
    'Pour chaque match, le modele de Poisson calcule les probabilites BTTS et Over 2.5 a partir des '
    'lambdas (intensites offensives) des equipes a domicile et a l\'exterieur. La calibration applique '
    'une correction de +2% pour le BTTS et +1% pour l\'Over 2.5. La regression vers la moyenne de la '
    'ligue est limitee a un facteur maximum de 0.40 pour eviter les predictions extremes. Le scraper '
    'applique egalement un equilibrage : si plus de 65% des pronostics sont "Non", une correction est '
    'appliquee pour maintenir une repartition entre 40% et 60% de "Oui". Enfin, la validation verifie '
    'la coherence des dates, les heures suspectes, les lambdas identiques, et la coherence des indices '
    'de confiance.',
    body_style
))

story.append(Paragraph('<b>Schema des donnees generees</b>', h3_style))
story.append(Paragraph(
    'Le scraper genere trois types de fichiers JSON : predictions.json (pronostics du jour avec match, '
    'ligue, type de pronostic, prediction, confiance, source, et analyse detaillee incluant bttsProb, '
    'over25Prob, homeLambda, awayLambda, dataQuality, hasRealData), win-history.json (historique des '
    'resultats avec statistiques globales et details par match), et des archives quotidiennes dans '
    'predictions-archive/YYYY-MM-DD.json. Le schema predictions.json inclut un champ analysis avec les '
    'metriques detaillees du modele Poisson, permettant une transparence sur la qualite des donnees '
    'utilisees pour chaque pronostic.',
    body_style
))

# ═══════════════════════ SECTION 4: CI/CD ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>4. Pipeline CI/CD automatise</b>', h1_style))
story.append(Paragraph(
    'Le systeme de deploiement est entierement automatise via deux workflows GitHub Actions distincts '
    'qui assurent a la fois le deploiement continu et la mise a jour quotidienne du contenu.',
    body_style
))

story.append(make_table(
    ['Workflow', 'Declencheur', 'Actions', 'Frequence'],
    [
        ['main.yml', 'Push sur main', 'Build Vite + Deploy FTP', 'A chaque push'],
        ['scraper.yml', 'Cron 06h UTC', 'Scrape + Build + Deploy FTP + Commit JSON', 'Quotidien'],
    ],
    col_ratios=[0.20, 0.22, 0.40, 0.18]
))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'Le workflow main.yml se declenche a chaque push sur la branche main et execute un build Vite suivi '
    'd\'un deploiement FTP en mode "dangerous-clean-slate" (remplacement complet des fichiers du serveur). '
    'Le workflow scraper.yml s\'execute quotidiennement a 06h UTC, lance le scraper pour mettre a jour '
    'les fichiers JSON, effectue un build, deploye par FTP, puis commite les nouveaux fichiers JSON sur '
    'le depot avec le tag [skip ci] pour eviter les boucles infinies de deploiement.',
    body_style
))
story.append(Paragraph(
    'Les secrets GitHub utilises pour le deploiement sont FTP_SERVER, FTP_USERNAME et FTP_PASSWORD. '
    'La variable PUPPETEER_SKIP_DOWNLOAD est positionnee a true dans le workflow scraper pour eviter '
    'le telechargement inutile de Chromium dans l\'environnement CI, Puppeteer n\'etant utilise que '
    'dans le script de scraping execute localement dans le workflow.',
    body_style
))

# ═══════════════════════ SECTION 5: SEO ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>5. Strategie SEO et marketing</b>', h1_style))
story.append(Paragraph(
    'Le site deploie une strategie SEO agressive et structuree, visible a travers plusieurs couches '
    'd\'optimisation qui couvrent a la fois le referencement traditionnel et l\'indexation par les '
    'crawlers d\'IA.',
    body_style
))
story.append(bullet('8 blocs Schema.org JSON-LD dans index.html (Organization, WebSite, WebPage, SoftwareApplication, FAQPage, BreadcrumbList, 5 BlogPosting, Offer)'))
story.append(bullet('Sitemap XML avec namespaces image + news, genere dynamiquement via un script dedie'))
story.append(bullet('robots.txt autorisant explicitement les crawlers IA (GPTBot, ClaudeBot, PerplexityBot, etc.)'))
story.append(bullet('Meta tags complets : Open Graph, Twitter Card, canonical, keywords'))
story.append(bullet('React Helmet Async pour les meta tags dynamiques par page'))
story.append(bullet('5 articles de blog optimises pour le SEO couvrant les requetes cles du domaine'))
story.append(Paragraph(
    'Cette approche multi-couche vise a maximiser la visibilite du site a la fois sur les moteurs de '
    'recherche traditionnels et sur les plateformes d\'IA generative qui indexent le contenu web. '
    'L\'autorisation explicite des crawlers IA est un choix strategique remarquable qui anticipe '
    'l\'evolution du trafic web vers les reponses generees par IA.',
    body_style
))

# ═══════════════════════ SECTION 6: ROUTES ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>6. Routes et pages de l\'application</b>', h1_style))
story.append(make_table(
    ['Route', 'Composant', 'Description'],
    [
        ['/', 'HomePage', 'Page d\'accueil (12 sections)'],
        ['/blog', 'BlogPage', 'Liste des articles avec filtres'],
        ['/blog/:slug', 'BlogArticlePage', 'Article individuel (5 slugs)'],
        ['/mentions-legales', 'MentionsLegales', 'Mentions legales'],
        ['/politique-confidentialite', 'PolitiqueConfidentialite', 'Politique de confidentialite'],
        ['/jouer-responsable', 'JouerResponsable', 'Jeu responsable'],
        ['/cgu', 'CGU', 'Conditions generales'],
        ['*', 'NotFoundPage', 'Page 404'],
    ],
    col_ratios=[0.30, 0.28, 0.42]
))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'Les slugs de blog disponibles sont : comment-analyser-match-btts, strategie-mise-over-2-5, '
    'meilleurs-championnats-btts, gestion-bankroll-paris-sportifs, et guide-linebet-inscription. '
    'La page d\'accueil contient egalement des ancres pour les sections principales : #free-predictions, '
    '#vip, #bonus, #faq, #blog, et #win-history. Les fichiers JSON sont recuperes au runtime via '
    'les routes GET /predictions.json et GET /win-history.json.',
    body_style
))

# ═══════════════════════ SECTION 7: PERFORMANCE ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>7. Optimisations de performance</b>', h1_style))
story.append(Paragraph(
    'Le site implemente un ensemble coherent d\'optimisations de performance qui temoignent d\'une '
    'reflexion approfondie sur l\'experience utilisateur, en particulier sur mobile.',
    body_style
))
story.append(bullet('Lazy loading : Scene3D, BlogPage et BlogArticlePage sont charges via React.lazy() + Suspense'))
story.append(bullet('3D desktop only : Scene3D se desactive automatiquement sur mobile (window.innerWidth >= 1024)'))
story.append(bullet('Animations DOM-direct : useParallax et useParallaxMouse manipulent le DOM via requestAnimationFrame sans setState'))
story.append(bullet('raf throttle : TiltCard et CursorEffect limitent les evenements mouse avec requestAnimationFrame'))
story.append(bullet('Passive event listeners : scroll et mousemove utilisent { passive: true }'))
story.append(bullet('Animations desactivees sur mobile via media queries CSS (shimmer, pulse, stat-card-animated supprimes en @media max-width 767px)'))
story.append(Paragraph(
    'L\'utilisation de requestAnimationFrame pour les animations au lieu de setState est un choix '
    'architectural notable qui evite les re-rendus React inutiles pour les animations a 60fps. '
    'Les effets visuels lourds (3D, parallax, tilt) sont progressivement degrades sur mobile pour '
    'garantir une experience fluide quel que soit l\'appareil.',
    body_style
))

# ═══════════════════════ SECTION 8: DESIGN SYSTEM ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>8. Design System "Aurora Night" v3</b>', h1_style))
story.append(Paragraph(
    'Le site utilise un design system personnalise nomme "Aurora Night" en version 3, construit au-dessus '
    'de Tailwind CSS 4. La palette principale combine un bleu ciel electrique (#38BDF8) avec un orange '
    'flamme (#FB923C) sur des fonds nocturnes, creant un contraste visuel fort adapte a l\'univers des '
    'paris sportifs. Le systeme de tokens CSS custom est defini via la directive @theme de Tailwind v4.',
    body_style
))
story.append(bullet('Glassmorphism a 3 niveaux : glass, glass-strong, glass-3d avec backdrop-filter blur'))
story.append(bullet('Profondeur 3D : 3 niveaux de box-shadow (depth-1, depth-2, depth-3)'))
story.append(bullet('Effet shine au hover via CSS ::after + radial-gradient'))
story.append(bullet('Animation shimmer doree sur le code promo VISION221'))
story.append(bullet('Mobile-first avec enrichissements desktop (grilles conditionnelles hidden sm:grid)'))

# ═══════════════════════ SECTION 9: SECURITE ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>9. Securite et conformite</b>', h1_style))
story.append(Paragraph(
    'Le site ne possede aucun systeme d\'authentification : il est entierement public et statique. '
    'Il n\'existe pas de connexion/inscription utilisateur, de gestion de session, de JWT/cookies '
    'd\'authentification, ni de base de donnees utilisateurs. La section VIP est simplement un lien '
    'WhatsApp vers un numero externe, sans integration technique.',
    body_style
))
story.append(Paragraph(
    'En revanche, le composant BlogContent implemente une securite XSS robuste en evitant '
    'dangerouslySetInnerHTML. Il utilise DOMParser pour analyser le HTML et ne rend que les tags '
    'autorises via une whitelist (h2, h3, p, strong, em, blockquote, ul, ol, li, a, br). Les liens '
    'recoivent automatiquement les attributs target="_blank" et rel="noopener noreferrer". Les liens '
    'd\'affiliation sont marques avec rel="sponsored nofollow" pour la conformite Google.',
    body_style
))
story.append(Paragraph(
    'Les pages legales couvrent les obligations RGPD, le jeu responsable et la limitation de '
    'responsabilite. Le site declare explicitement qu\'il ne s\'agit pas d\'un service de conseil '
    'en paris et que les pronostics sont fournis a titre informatif uniquement.',
    body_style
))

# ═══════════════════════ SECTION 10: AUTRES DEPOTS ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>10. Autres depots (inactifs)</b>', h1_style))

story.append(Paragraph('<b>pronostic-cdm2026-site</b>', h2_style))
story.append(Paragraph(
    'Ce depot contient uniquement un fichier README.md decrivant l\'intention de creer un site statique '
    'HTML pour les pronostics de la Coupe du Monde 2026, avec integration du code promo VISION221. '
    'Il a ete initialise le 8 juin 2026 mais ne contient aucune ligne de code fonctionnelle. Aucun '
    'fichier HTML, CSS ou JavaScript n\'a ete ajoute. Le depot est une coquille vide en attente de '
    'developpement.',
    body_style
))

story.append(Paragraph('<b>pronostic-cdm2026</b>', h2_style))
story.append(Paragraph(
    'Ce depot est completement vide, sans aucun commit ni fichier. Sa description GitHub indique '
    '"Pronostic Coupe du Monde 2026 - Site de pronostics IA avec code promo VISION221 pour Linebet", '
    'mais aucun code n\'a ete pousse. Il semble etre un depot placeholder pour un futur projet.',
    body_style
))

story.append(Paragraph('<b>coupon221</b>', h2_style))
story.append(Paragraph(
    'Ce depot est egalement completement vide, sans aucun commit ni fichier. Le nom suggere un lien '
    'avec le systeme de codes promo (coupon) et le suffixe 221 fait echo au code promo VISION221. '
    'Il s\'agit probablement d\'un depot reserve pour un projet futur lie a la distribution ou la '
    'gestion de codes promotionnels.',
    body_style
))

# ═══════════════════════ SECTION 11: SYNTHESE ═══════════════════════
story.append(Spacer(1, 18))
story.append(Paragraph('<b>11. Synthese et observations</b>', h1_style))
story.append(Paragraph(
    'L\'ecosysteme GitHub de prophete221 est centre sur un projet principal mature et fonctionnel '
    '(prophetebeta/BttsBet), soutenu par un pipeline CI/CD robuste et un scraper statistique '
    'sophistique. Les trois autres depots representent des projets futurs non encore developpes, '
    'tous orientes vers la meme thematique de pronostics sportifs et d\'affiliation Linebet.',
    body_style
))

story.append(Paragraph('<b>Points forts du systeme</b>', h2_style))
story.append(bullet('Architecture sans serveur (serverless) avec generation de contenu cote CI/CD : faible cout, haute performance'))
story.append(bullet('Scraper V14 avec modele Poisson calibre et regression, couvrant 44 ligues via 3 sources de donnees'))
story.append(bullet('Design premium avec effets 3D, glassmorphism et optimisations mobile avancees'))
story.append(bullet('SEO agressif et structure avec 8 blocs Schema.org et autorisation des crawlers IA'))
story.append(bullet('CI/CD entierement automatise avec cron quotidien et deploiement FTP'))
story.append(bullet('Securite XSS robuste via le composant BlogContent avec whitelist de tags'))

story.append(Paragraph('<b>Limites identifiees</b>', h2_style))
story.append(bullet('Absence totale de backend et de base de donnees : le site ne peut pas gerer de comptes utilisateurs ou de donnees personnalisees'))
story.append(bullet('Les pronostics VIP sont statiques et en dur : aucune donnee reelle n\'alimente cette section'))
story.append(bullet('Pas d\'authentification : la section VIP n\'est qu\'un lien WhatsApp, sans veritable systeme d\'acces'))
story.append(bullet('Les 3 depots secondaires sont inactifs, sans aucune base de code'))
story.append(bullet('Dependance a un seul hebergement FTP sans redondance ni CDN'))

# ── Build ──
doc.build(story)
print(f"PDF generated: {output_path}")

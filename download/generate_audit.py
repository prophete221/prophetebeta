#!/usr/bin/env python3
"""Generate BttsBet Site Audit Report - PDF"""

import os, sys, hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, CondPageBreak, Image
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ━━ Color Palette ━━
ACCENT       = colors.HexColor('#4821bf')
TEXT_PRIMARY  = colors.HexColor('#1d1f21')
TEXT_MUTED    = colors.HexColor('#757c82')
BG_SURFACE   = colors.HexColor('#e0e3e7')
BG_PAGE      = colors.HexColor('#f0f1f2')

TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT  = colors.white
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = BG_SURFACE

# Semantic colors
COLOR_GREEN  = colors.HexColor('#16a34a')
COLOR_RED    = colors.HexColor('#dc2626')
COLOR_ORANGE = colors.HexColor('#d97706')
COLOR_BLUE   = colors.HexColor('#2563eb')

# ━━ Font Registration ━━
pdfmetrics.registerFont(TTFont('Microsoft YaHei', '/usr/share/fonts/truetype/chinese/msyh.ttf'))
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('Calibri', '/usr/share/fonts/truetype/english/calibri-regular.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')
registerFontFamily('Calibri', normal='Calibri', bold='Calibri')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ━━ Page setup ━━
PAGE_W, PAGE_H = A4
LEFT_MARGIN = 1.0 * inch
RIGHT_MARGIN = 1.0 * inch
TOP_MARGIN = 0.8 * inch
BOTTOM_MARGIN = 0.8 * inch
AVAILABLE_W = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN

# ━━ Styles ━━
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'CustomTitle', fontName='Times New Roman', fontSize=22, leading=28,
    textColor=ACCENT, spaceBefore=0, spaceAfter=12, alignment=TA_LEFT
)

h1_style = ParagraphStyle(
    'CustomH1', fontName='Times New Roman', fontSize=18, leading=24,
    textColor=TEXT_PRIMARY, spaceBefore=18, spaceAfter=10
)

h2_style = ParagraphStyle(
    'CustomH2', fontName='Times New Roman', fontSize=14, leading=20,
    textColor=ACCENT, spaceBefore=14, spaceAfter=8
)

h3_style = ParagraphStyle(
    'CustomH3', fontName='Times New Roman', fontSize=12, leading=17,
    textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=6
)

body_style = ParagraphStyle(
    'CustomBody', fontName='Times New Roman', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=6, alignment=TA_JUSTIFY
)

bullet_style = ParagraphStyle(
    'CustomBullet', fontName='Times New Roman', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, spaceBefore=2, spaceAfter=4, leftIndent=18,
    bulletIndent=6, alignment=TA_LEFT
)

muted_style = ParagraphStyle(
    'CustomMuted', fontName='Times New Roman', fontSize=9.5, leading=14,
    textColor=TEXT_MUTED, spaceBefore=2, spaceAfter=4
)

header_cell_style = ParagraphStyle(
    'HeaderCell', fontName='Times New Roman', fontSize=10,
    textColor=TABLE_HEADER_TEXT, alignment=TA_CENTER
)

cell_style = ParagraphStyle(
    'CellStyle', fontName='Times New Roman', fontSize=10,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER
)

cell_left_style = ParagraphStyle(
    'CellLeftStyle', fontName='Times New Roman', fontSize=10,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT
)

callout_style = ParagraphStyle(
    'CalloutStyle', fontName='Times New Roman', fontSize=10.5, leading=17,
    textColor=ACCENT, spaceBefore=6, spaceAfter=6, leftIndent=24,
    borderPadding=6, borderColor=ACCENT, borderWidth=0, borderRadius=0
)

# ━━ TOC DocTemplate ━━
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

# ━━ Helpers ━━
def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/><b>%s</b>' % (key, text), style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def p(text):
    return Paragraph(text, body_style)

def bullet(text):
    return Paragraph('<bullet>&bull;</bullet> ' + text, bullet_style)

def make_table(headers, rows, col_ratios=None):
    """Create a styled table with headers and rows."""
    data = []
    header_row = [Paragraph('<b>%s</b>' % h, header_cell_style) for h in headers]
    data.append(header_row)
    for row in rows:
        data.append([Paragraph(str(c), cell_style) for c in row])

    if col_ratios:
        col_widths = [r * AVAILABLE_W for r in col_ratios]
    else:
        col_widths = None

    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
        ('GRID', (0, 0), (-1, -1), 0.5, TEXT_MUTED),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]
    for i in range(1, len(data)):
        bg = TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

def status_badge(status):
    """Return colored status text."""
    mapping = {
        'OK': '<font color="#16a34a"><b>OK</b></font>',
        'WARN': '<font color="#d97706"><b>WARN</b></font>',
        'CRIT': '<font color="#dc2626"><b>CRIT</b></font>',
        'INFO': '<font color="#2563eb"><b>INFO</b></font>',
    }
    return mapping.get(status, status)

# ━━ Document ━━
output_path = '/home/z/my-project/download/audit_bttsbet_site.pdf'
body_path = '/home/z/my-project/download/audit_bttsbet_body.pdf'

doc = TocDocTemplate(
    body_path,
    pagesize=A4,
    leftMargin=LEFT_MARGIN,
    rightMargin=RIGHT_MARGIN,
    topMargin=TOP_MARGIN,
    bottomMargin=BOTTOM_MARGIN,
)

story = []

# ━━ TOC ━━
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle(name='TOCLevel0', fontName='Times New Roman', fontSize=13, leftIndent=20, spaceBefore=8, spaceAfter=4),
    ParagraphStyle(name='TOCLevel1', fontName='Times New Roman', fontSize=11, leftIndent=40, spaceBefore=4, spaceAfter=2),
]
story.append(Paragraph('<b>Table des matieres</b>', title_style))
story.append(Spacer(1, 12))
story.append(toc)
story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════
# SECTION 1: VUE D'ENSEMBLE
# ═══════════════════════════════════════════════════════════════
story.append(add_heading('1. Vue d\'ensemble du site', h1_style, 0))
story.append(Spacer(1, 6))

story.append(p(
    'BttsBet est un site de pronostics football specialise dans les marches BTTS (Both Teams To Score) '
    'et Over 2.5 buts. Le site est construit avec <b>Next.js 16</b> (App Router), <b>Tailwind CSS 4</b>, '
    '<b>Framer Motion</b> pour les animations, et utilise un design system "Dark Emerald Premium" '
    'avec un theme sombre glassmorphism. Le site est deploye en mode standalone et utilise Caddy '
    'comme reverse proxy sur le port 81.'
))
story.append(Spacer(1, 6))

story.append(p(
    'Le site presente une page unique (Single Page Application) avec plusieurs sections : Hero, Pronostics gratuits, '
    'Promo VIP, Historique des resultats, FAQ, et Footer. Il integre egalement un systeme de consentement '
    'aux cookies RGPD, une verification d\'age 18+, et un effet de curseur lumineux sur desktop. '
    'Les donnees de pronostics sont chargees depuis des fichiers JSON statiques heberges dans le dossier public.'
))

story.append(Spacer(1, 12))
story.append(make_table(
    ['Critere', 'Valeur'],
    [
        ['Framework', 'Next.js 16 (App Router)'],
        ['CSS', 'Tailwind CSS 4 + Design System custom'],
        ['Animations', 'Framer Motion 12'],
        ['Build', 'Standalone (output: "standalone")'],
        ['Reverse Proxy', 'Caddy (port 81)'],
        ['Base de donnees', 'SQLite via Prisma (inutilisee)'],
        ['URL officielle', 'https://bttsbet.online'],
        ['Langue', 'Francais (fr)'],
        ['Code promo', 'VISION221'],
    ],
    [0.35, 0.65]
))

# ═══════════════════════════════════════════════════════════════
# SECTION 2: ARCHITECTURE TECHNIQUE
# ═══════════════════════════════════════════════════════════════
story.append(Spacer(1, 18))
story.append(add_heading('2. Architecture technique', h1_style, 0))
story.append(Spacer(1, 6))

story.append(add_heading('2.1 Structure des fichiers', h2_style, 1))
story.append(p(
    'Le projet suit une structure Next.js standard avec le dossier src/ comme racine. '
    'Les composants sont organises dans un dossier dedie bttsbet/ sous components/, et les '
    'utilitaires partages sont dans lib/. Les fichiers de donnees statiques (predictions.json, '
    'win-history.json) sont dans le dossier public/ et servis directement. Cette architecture '
    'est claire et maintenable, avec une bonne separation des responsabilites entre les composants '
    'UI, la logique metier, et les donnees.'
))

story.append(Spacer(1, 8))
story.append(make_table(
    ['Dossier/Fichier', 'Role'],
    [
        ['src/app/', 'Pages et layout (App Router)'],
        ['src/components/bttsbet/', 'Composants metier (11 composants)'],
        ['src/components/ui/', 'Composants shadcn/ui (40+ composants)'],
        ['src/lib/', 'Constantes, utilitaires, DB, logos'],
        ['src/hooks/', 'Hooks custom (animations, mobile, toast)'],
        ['public/', 'Assets statiques, JSON, favicon'],
        ['prisma/', 'Schema Prisma (SQLite)'],
    ],
    [0.40, 0.60]
))

story.append(Spacer(1, 12))
story.append(add_heading('2.2 Problemes d\'architecture identifie', h2_style, 1))

story.append(p(
    '<b>Prisma/SQLite inutilise :</b> Le schema Prisma definit des modeles User et Post, mais '
    'aucune route API ni composant n\'utilise la base de donnees. Le fichier db.ts instancie '
    'un PrismaClient mais n\'est jamais importe dans le code fonctionnel. Cela ajoute un poids '
    'inutile au bundle (prisma client) et complexifie la maintenance. La dependance next-auth '
    'est aussi presente mais non utilisee.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Donnees statiques vs dynamiques :</b> Les pronostics et l\'historique sont servis via des '
    'fichiers JSON statiques dans public/. Cela signifie que pour mettre a jour les pronostics, '
    'il faut redeployer l\'application entiere. Aucun mecanisme de regeneration (ISR, revalidation) '
    'n\'est en place. Pour un site de pronostics qui devrait se mettre a jour quotidiennement, '
    'c\'est une limitation importante.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>API route vide :</b> Le fichier src/app/api/route.ts contient uniquement un "Hello, world!" '
    'sans aucune logique metier. Cela represente une opportunite manquee pour servir des donnees '
    'dynamiques ou implementer des endpoints fonctionnels.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Service worker residuel :</b> Le fichier public/sw.js est un service worker "self-unregistering" '
    'qui nettoie les caches de l\'ancienne version PWA. Bien que fonctionnel, il devrait etre retire '
    'apres une periode de transition suffisante pour eviter toute confusion.'
))

# ═══════════════════════════════════════════════════════════════
# SECTION 3: AUDIT UI/UX & DESIGN SYSTEM
# ═══════════════════════════════════════════════════════════════
story.append(Spacer(1, 18))
story.append(add_heading('3. Audit UI/UX et Design System', h1_style, 0))
story.append(Spacer(1, 6))

story.append(add_heading('3.1 Design System - Points forts', h2_style, 1))
story.append(p(
    'Le design system "Dark Emerald Premium" est bien structure et coherent. Il utilise une palette '
    'de couleurs bien definie avec des tokens semantiques (emerald, gold, royal) et des mappings '
    'legacy pour assurer la retro-compatibilite. Le systeme glassmorphism est implemente avec des '
    'variantes (glass, glass-strong, glass-3d) et des optimisations mobiles qui desactivent les '
    'effets lourds (backdrop-filter, animations) sur les ecrans de moins de 768px. Les animations '
    'sont variées et bien calibrees : pulse-neon, float, enter3d, shimmer3d, statGlow, goldShimmer.'
))

story.append(Spacer(1, 8))
story.append(add_heading('3.2 Problemes identifies', h2_style, 1))

story.append(p(
    '<b>Classes CSS legacy :</b> Le fichier globals.css contient de nombreux tokens "legacy" '
    '(neon, amber, sky, flame, dark-900, etc.) qui sont des alias vers les nouvelles couleurs. '
    'Bien que fonctionnels, ces aliases augmentent la complexite du CSS et creent de la confusion '
    'pour la maintenance. Un nettoyage progressif est recommande pour supprimer les anciens noms '
    'et uniformiser les references dans les composants.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Accessibilite des effets visuels :</b> Certaines couleurs ont un contraste insuffisant '
    'avec le fond sombre. Par exemple, le texte gray-500 sur fond #0B1120 offre un ratio de '
    'contraste d\'environ 3.5:1, ce qui est en dessous du minimum WCAG AA de 4.5:1 pour le texte '
    'courant. Les labels "Championnats", "Analyses", et le texte du bandeau cookie sont particulierement '
    'affectes. De meme, le texte emerald sur fond sombre peut etre difficile a lire selon la taille.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Performance des animations mobiles :</b> Bien que les animations lourdes soient desactivees '
    'sur mobile (card-3d::before, shimmer, pulse-neon), le composant FloatingElements reste actif '
    'avec 6 formes SVG en animation continue. Le composant CursorEffect est correctement desactive '
    'sur ecrans &lt; 1024px, ce qui est une bonne pratique.'
))

# ═══════════════════════════════════════════════════════════════
# SECTION 4: AUDIT DES COMPOSANTS
# ═══════════════════════════════════════════════════════════════
story.append(Spacer(1, 18))
story.append(add_heading('4. Audit des composants', h1_style, 0))
story.append(Spacer(1, 6))

# Composants table
story.append(make_table(
    ['Composant', 'Statut', 'Problemes'],
    [
        ['Navbar', status_badge('OK'), 'Navigation sticky, menu mobile accessible'],
        ['Hero', status_badge('WARN'), 'Pas de section "Comment ca marche" implementee'],
        ['FreePredictions', status_badge('WARN'), 'Confiance barre fixe (78%/25%), pas dynamique'],
        ['PromoVip', status_badge('WARN'), 'Cote artificielle (10.00), donnees non verifiees'],
        ['WinHistory', status_badge('OK'), 'Donnees coherentes, affichage adaptatif'],
        ['Footer', status_badge('WARN'), 'Liens legaux non fonctionnels (span, pas <a>)'],
        ['CookieConsent', status_badge('OK'), 'Conforme RGPD, personnalisation granulaire'],
        ['AgeVerification', status_badge('OK'), 'Modal 18+ avec expiration 24h'],
        ['FloatingElements', status_badge('INFO'), 'Actif sur mobile, impact performance mineur'],
        ['CursorEffect', status_badge('OK'), 'Correctement desactive mobile (<1024px)'],
        ['TiltCard', status_badge('OK'), 'Effet 3D bien optimise avec RAF'],
    ],
    [0.22, 0.12, 0.66]
))

story.append(Spacer(1, 12))
story.append(add_heading('4.1 FreePredictions - Problemes detailles', h2_style, 1))
story.append(p(
    'Le composant FreePredictions est le coeur fonctionnel du site. Il charge les pronostics depuis '
    '/predictions.json et les regroupe par match, puis par date (Aujourd\'hui, Demain, A venir). '
    'Cependant, plusieurs problemes sont identifies :'
))
story.append(Spacer(1, 4))
story.append(bullet(
    '<b>Barre de confiance non dynamique :</b> La barre de progression dans PredBadge utilise '
    'une largeur fixe de 78% pour "Oui" et 25% pour "Non", au lieu d\'utiliser la valeur reelle '
    'du champ confidence du JSON. Cela trompe l\'utilisateur sur la fiabilite reelle du pronostic.'
))
story.append(bullet(
    '<b>Indice de confiance bas :</b> La majorite des pronostics ont un confidence entre 46-51%, '
    'ce qui est proche du hasard (50%). Pour un site qui annonce "~68% de precision", cela pose '
    'un probleme de credibilite lorsque les utilisateurs voient des scores aussi faibles.'
))
story.append(bullet(
    '<b>Donnees de qualite :</b> La plupart des pronostics ont dataQuality=0 et hasRealData=false, '
    'ce qui signifie qu\'ils sont generes sans donnees reelles de match. Seul le match Malaga vs '
    'Las Palmas a des donnees reelles (dataQuality=4).'
))

story.append(Spacer(1, 12))
story.append(add_heading('4.2 PromoVip - Problemes detailles', h2_style, 1))
story.append(p(
    'La section VIP presente un coupon avec des matchs "verrouilles" par un effet blur. '
    'Cependant, la cote totale affichee est toujours exactement 10.00, calculee artificiellement '
    'en repartissant uniformement la cote entre les matchs (cotePerMatch = 10^(1/nbMatchs)). '
    'Cela ne reflete pas des cotes reelles de bookmaker et pourrait etre considere comme trompeur. '
    'De plus, les "pronostics VIP" sont simplement les memes matchs que la section gratuite, '
    'avec un effet blur et un badge "BTTS" ajoute, sans reel contenu supplementaire.'
))

story.append(Spacer(1, 12))
story.append(add_heading('4.3 Footer - Liens non fonctionnels', h2_style, 1))
story.append(p(
    'Les liens legaux dans le Footer (Mentions Legales, Politique de Confidentialite, Jouer Responsable, CGU) '
    'sont implementes comme des elements <span> et non des liens <a>. Ils n\'ont pas d\'attribut href, '
    'ce qui signifie qu\'ils sont totalement non cliquables et ne menent a aucune page. Le sitemap.xml '
    'reference bien ces pages (mentions-legales, politique-confidentialite, jouer-responsable, cgu) '
    'mais aucune route Next.js ne les implemente. C\'est un probleme de conformite legale important.'
))

# ═══════════════════════════════════════════════════════════════
# SECTION 5: AUDIT DES DONNEES
# ═══════════════════════════════════════════════════════════════
story.append(Spacer(1, 18))
story.append(add_heading('5. Audit des donnees', h1_style, 0))
story.append(Spacer(1, 6))

story.append(add_heading('5.1 predictions.json', h2_style, 1))
story.append(p(
    'Le fichier predictions.json contient 42 entrees (21 matchs x 2 types BTTS/Over 2.5) pour '
    'la date du 2026-06-10. Les matchs couvrent principalement des matchs amicaux internationaux '
    'et une seule rencontre de ligue (Segunda Division). L\'analyse des donnees revele plusieurs problemes :'
))
story.append(Spacer(1, 4))

story.append(make_table(
    ['Indicateur', 'Valeur', 'Statut'],
    [
        ['Nombre de matchs', '21', status_badge('OK')],
        ['Confiance moyenne', '47.3%', status_badge('WARN')],
        ['Matchs avec donnees reelles', '1/21 (4.8%)', status_badge('CRIT')],
        ['Matchs dataQuality > 0', '1/21', status_badge('CRIT')],
        ['Matchs sans heure (--:--)', '3/21', status_badge('WARN')],
        ['Diversite des ligues', '2 ligues seulement', status_badge('WARN')],
    ],
    [0.40, 0.30, 0.30]
))

story.append(Spacer(1, 8))
story.append(p(
    '<b>Probleme de credibilite :</b> La quasi-totalite des pronostics (20/21) sont generes '
    'avec des parametres par defaut (homeLambda=1.54, awayLambda=1.08) sans donnees reelles. '
    'Seul le match Malaga vs Las Palmas possede des statistiques reelles. Cela contredit '
    'directement la promesse du site d\'analyser "200 variables statistiques" et "50 000 matchs".'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Predictions incoherentes :</b> Certains matchs ont des predictions BTTS "Oui" avec '
    'une probabilite bttsProb inferieure a 50% (ex: Bolivia vs Algeria, bttsProb=0.49 mais prediction="Oui"). '
    'Le seuil de decision semble arbitraire et non calibre.'
))

story.append(Spacer(1, 12))
story.append(add_heading('5.2 win-history.json', h2_style, 1))
story.append(p(
    'Le fichier win-history.json contient 20 resultats pour le 2026-06-08 avec des stats globales : '
    '140 analyses, 95 gagnes, taux de 67.9% (30 jours: 68%). Les resultats sont coherents avec '
    'le taux annonce de "~68%". Cependant, l\'historique ne contient que 20 entrees au lieu des 140 '
    'annonces dans les statistiques, ce qui signifie que la majorité de l\'historique n\'est pas '
    'visible par l\'utilisateur. De plus, les scores des matchs archives sont exacts et verifiables, '
    'ce qui est un point positif.'
))

# ═══════════════════════════════════════════════════════════════
# SECTION 6: SEO & PERFORMANCE
# ═══════════════════════════════════════════════════════════════
story.append(Spacer(1, 18))
story.append(add_heading('6. Audit SEO et Performance', h1_style, 0))
story.append(Spacer(1, 6))

story.append(add_heading('6.1 SEO - Points forts', h2_style, 1))
story.append(bullet('Metadonnees completes : title, description, keywords, authors, OpenGraph, Twitter Cards'))
story.append(bullet('Sitemap XML bien structure avec hreflang et images')
)
story.append(bullet('robots.txt autorise les crawleurs IA (ChatGPT, Claude, Perplexity)')
)
story.append(bullet('URL canonique definie (metadataBase: bttsbet.online)')
)
story.append(bullet('Balise html lang="fr" correcte')
)
story.append(bullet('Favicon SVG et og-image.png presents')
)

story.append(Spacer(1, 8))
story.append(add_heading('6.2 SEO - Problemes', h2_style, 1))
story.append(p(
    '<b>Pages orphelines dans le sitemap :</b> Le sitemap.xml reference 10 URLs, mais seules '
    'les pages / et /api existent. Les pages /blog, /mentions-legales, /politique-confidentialite, '
    '/jouer-responsable, /cgu et les articles de blog n\'ont pas de route Next.js correspondante. '
    'Cela cree des erreurs 404 qui penaliseront le referencement.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Page unique (SPA) :</b> Le site est une single-page sans routing interne. Les sections '
    'sont accessibles uniquement par scroll, pas par des URLs distinctes. Cela limite considerablement '
    'le SEO car les moteurs de recherche ne peuvent indexer qu\'une seule page.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Contenu dynamique non indexable :</b> Les pronostics charges via fetch() depuis JSON ne '
    'seront pas indexes par les moteurs de recherche puisque le composant est "use client". '
    'La solution serait d\'utiliser des Server Components ou la regeneration ISR pour les pronostics.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>bttsbet2026seo.txt :</b> Un fichier SEO specifique existe dans public/ mais n\'est pas '
    'reference dans le robots.txt ni dans le sitemap. Sa fonction est peu claire.'
))

story.append(Spacer(1, 12))
story.append(add_heading('6.3 Performance', h2_style, 1))

story.append(make_table(
    ['Aspect', 'Evaluation', 'Detail'],
    [
        ['Bundle JS', status_badge('WARN'), 'Framer Motion + 40+ composants shadcn non utilises'],
        ['Images', status_badge('OK'), 'Loading="lazy" sur les logos d\'equipes'],
        ['Fonts', status_badge('OK'), 'Google Fonts avec display=swap'],
        ['CSS', status_badge('WARN'), 'Tailwind CSS 4 non purge des classes inutilisees'],
        ['Animations', status_badge('OK'), 'Desactivees sur mobile (media query)'],
        ['Fetch JSON', status_badge('WARN'), 'Chargement client-side, pas de SSR/ISR'],
    ],
    [0.25, 0.15, 0.60]
))

story.append(Spacer(1, 8))
story.append(p(
    '<b>Poids du bundle :</b> Le site importe Framer Motion (environ 30KB gzip) et plus de '
    '40 composants shadcn/ui, dont la grande majorité n\'est pas utilisee (seuls button, card, '
    'et quelques autres pourraient etre necessaires). Le tree-shaking de Next.js devrait retirer '
    'les composants inutilises, mais les imports barrel (index.ts) peuvent limiter cette optimisation. '
    'Une analyse du bundle avec @next/bundle-analyzer est recommandee.'
))

# ═══════════════════════════════════════════════════════════════
# SECTION 7: SECURITE & CONFORMITE LEGALE
# ═══════════════════════════════════════════════════════════════
story.append(Spacer(1, 18))
story.append(add_heading('7. Securite et conformite legale', h1_style, 0))
story.append(Spacer(1, 6))

story.append(add_heading('7.1 Securite', h2_style, 1))

story.append(make_table(
    ['Element', 'Statut', 'Commentaire'],
    [
        ['NEXTAUTH_SECRET', status_badge('CRIT'), 'Non configure dans .env'],
        ['HTTPS', status_badge('OK'), 'Caddy gere le TLS'],
        ['Liens sortants', status_badge('OK'), 'rel="sponsored nofollow" sur liens affiliés'],
        ['XSS', status_badge('OK'), 'React protege par defaut'],
        ['CSRF', status_badge('INFO'), 'Pas de formulaire POST, pas necessaire'],
        ['Headers securite', status_badge('WARN'), 'Pas de CSP, X-Frame-Options, etc.'],
        ['Donnees personnelles', status_badge('WARN'), 'ID Linebet envoye via WhatsApp (non chiffre)'],
    ],
    [0.25, 0.12, 0.63]
))

story.append(Spacer(1, 8))
story.append(p(
    '<b>NEXTAUTH_SECRET :</b> Bien que next-auth soit dans les dependances mais non utilise, '
    'l\'absence de NEXTAUTH_SECRET est un risque si quelqu\'un active l\'authentification sans '
    'configurer cette variable. Il est recommande de la generer et de l\'ajouter au fichier .env '
    'preventivement, ou de supprimer la dependance next-auth si elle n\'est pas necessaire.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Headers de securite :</b> Aucun header de securite HTTP n\'est configure (Content-Security-Policy, '
    'X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security). Ces headers doivent etre '
    'ajoutes dans la configuration Caddy ou via les middleware Next.js pour proteger contre les '
    'attaques courantes (clickjacking, injection de contenu, etc.).'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Transmission de l\'ID Linebet :</b> Le formulaire VIP envoie l\'ID Linebet de l\'utilisateur '
    'via WhatsApp (URL wa.me avec texte pre-rempli). Ce canal n\'est pas chiffre de bout en bout '
    'dans le contexte web, et les donnees transitent en clair dans l\'URL. Il n\'y a pas de '
    'politique de conservation ou de traitement des donnees personnelles visible.'
))

story.append(Spacer(1, 12))
story.append(add_heading('7.2 Conformite legale', h2_style, 1))
story.append(p(
    '<b>RGPD / Cookies :</b> Le bandeau de consentement aux cookies est bien implemente avec '
    'personnalisation granulaire (essentiels, analytiques, publicitaires). Le consentement est '
    'sauvegarde dans localStorage avec timestamp. Un bouton "Parametres cookies" est disponible '
    'dans le footer pour reouvrir les parametres. C\'est une bonne implementation RGPD.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Verification d\'age :</b> Le modal 18+ est present avec expiration 24h. Le bouton "Je suis mineur" '
    'redirige vers Google. L\'implementation est fonctionnelle mais basique : il n\'y a pas de '
    'verification reelle de l\'age, juste une declaration sur l\'honneur. Cela satisfait les '
    'exigences minimales mais pourrait etre renforce.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Pages legales manquantes :</b> Comme mentionne precedemment, les pages Mentions Legales, '
    'Politique de Confidentialite, Jouer Responsable et CGU sont referencees dans le sitemap et '
    'le footer mais n\'existent pas. C\'est un probleme de conformite legale majeur, en particulier '
    'pour un site de paris sportifs qui traite des donnees personnelles (ID Linebet) et diffuse '
    'du contenu de jeux d\'argent. La loi francaise et les regulations africaines exigent ces pages.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>Avertissement de jeu responsable :</b> Le footer contient un avertissement complet '
    'et des numeros d\'aide (Joueurs Info Service en France, MINSANT au Cameroun, numero au Senegal). '
    'C\'est un point positif. Cependant, l\'avertissement sur les conditions du bonus ("mise x5, '
    'cote min. 1.40") est en tout petit texte (10px), ce qui pourrait etre considere comme '
    'insuffisamment visible au regard des regles de transparence.'
))

# ═══════════════════════════════════════════════════════════════
# SECTION 8: SYNTHESE ET RECOMMANDATIONS
# ═══════════════════════════════════════════════════════════════
story.append(Spacer(1, 18))
story.append(add_heading('8. Synthese des problemes et recommandations', h1_style, 0))
story.append(Spacer(1, 6))

story.append(add_heading('8.1 Problemes critiques', h2_style, 1))

story.append(make_table(
    ['#', 'Probleme', 'Priorite', 'Impact'],
    [
        ['1', 'Pages legales manquantes (Mentions legales, CGU, etc.)', 'CRIT', 'Juridique'],
        ['2', 'Donnees de pronostics sans donnees reelles (95%+)', 'CRIT', 'Credibilite'],
        ['3', 'Barre de confiance non dynamique (78% fixe)', 'CRIT', 'Transparence'],
        ['4', 'Liens du footer non cliquables', 'HIGH', 'Legal/UX'],
        ['5', 'Cote VIP artificielle (10.00 forcee)', 'HIGH', 'Credibilite'],
    ],
    [0.05, 0.50, 0.15, 0.30]
))

story.append(Spacer(1, 12))
story.append(add_heading('8.2 Problemes importants', h2_style, 1))

story.append(make_table(
    ['#', 'Probleme', 'Priorite', 'Impact'],
    [
        ['6', 'NEXTAUTH_SECRET non configure', 'HIGH', 'Securite'],
        ['7', 'Pages orphelines dans le sitemap (404)', 'HIGH', 'SEO'],
        ['8', 'Pronostics non indexables (client-side)', 'MEDIUM', 'SEO'],
        ['9', 'Dependances inutilisees (prisma, next-auth)', 'MEDIUM', 'Performance'],
        ['10', 'Headers de securite HTTP absents', 'MEDIUM', 'Securite'],
    ],
    [0.05, 0.50, 0.15, 0.30]
))

story.append(Spacer(1, 12))
story.append(add_heading('8.3 Recommandations priorisees', h2_style, 1))

story.append(p(
    '<b>1. Creer les pages legales (urgence maximale) :</b> Implementer les 4 pages legales '
    'referencees dans le sitemap et le footer : Mentions Legales, Politique de Confidentialite, '
    'Jouer Responsable, CGU. Ces pages doivent contenir des informations reelles sur l\'editeur '
    'du site, le traitement des donnees personnelles, et les regles du jeu responsable. '
    'Sans ces pages, le site s\'expose a des risques juridiques significatifs, en particulier '
    'dans le contexte des paris sportifs ou la regulation est stricte.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>2. Ameliorer la qualite des pronostics :</b> Utiliser de vraies donnees statistiques '
    'pour generer les pronostics au lieu de parametres par defaut. Integrer une API de donnees '
    'football (API-Football, Football-Data.org) pour obtenir des statistiques reelles (xG, forme, '
    'blesses). Rendre la barre de confiance dynamique en utilisant le champ confidence du JSON '
    'au lieu de valeurs fixees. La credibilite du site depend directement de la qualite des '
    'pronostics affiches.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>3. Dynamiser les donnees :</b> Remplacer les fichiers JSON statiques par un systeme '
    'de donnees dynamique. Options recommandees : (a) ISR (Incremental Static Regeneration) '
    'de Next.js avec revalidation quotidienne, (b) API Routes avec cache, ou (c) Base de donnees '
    'avec Prisma pour stocker et servir les pronostics. Cela permettrait de mettre a jour les '
    'pronostics sans redeployer l\'application entiere.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>4. Nettoyer les dependances :</b> Supprimer les dependances inutilisees : prisma, next-auth, '
    '@prisma/client, et les 40+ composants shadcn/ui non utilises. Cela reduira le temps de build, '
    'la taille du bundle, et la surface d\'attaque. Si l\'authentification est prevue, configurer '
    'correctement NEXTAUTH_SECRET et implementer les routes necessaires.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>5. Ajouter les headers de securite :</b> Configurer les headers HTTP dans Caddy ou '
    'via le middleware Next.js : Content-Security-Policy, X-Frame-Options (DENY), '
    'X-Content-Type-Options (nosniff), Strict-Transport-Security (max-age=31536000), et '
    'Referrer-Policy (strict-origin-when-cross-origin). Ces headers protègent contre les '
    'attaques courantes et sont consideres comme des bonnes pratiques essentielles.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>6. Ameliorer le SEO :</b> Creer des pages distinctes pour les pronostics (/pronostics), '
    'le blog (/blog avec articles reels), et les pages legales. Utiliser des Server Components '
    'pour les pronostics afin qu\'ils soient indexables. Supprimer les URLs du sitemap qui n\'ont '
    'pas de page correspondante. Ajouter un fichier bttsbet2026seo.txt reference dans robots.txt '
    'ou le supprimer s\'il n\'est pas necessaire.'
))
story.append(Spacer(1, 4))
story.append(p(
    '<b>7. Corriger les liens du footer :</b> Transformer les elements <span> en vrais liens <a> '
    'avec des href pointant vers les pages legales une fois creees. Ajouter egalement les pages '
    'de blog referencees dans le footer (Analyse BTTS, Strategie O2.5, Bankroll) qui sont '
    'actuellement des elements non cliquables.'
))

story.append(Spacer(1, 12))
story.append(add_heading('8.4 Score global de l\'audit', h2_style, 1))

story.append(make_table(
    ['Categorie', 'Note /10', 'Commentaire'],
    [
        ['Architecture', '7', 'Bien structuree mais dependances inutiles'],
        ['UI/UX', '8', 'Design premium, animations fluides, responsive'],
        ['Qualite des donnees', '3', 'Donnees fabriquees, confiance fixee, cotes artificielles'],
        ['SEO', '5', 'Bonnes bases mais pages manquantes et contenu non indexable'],
        ['Securite', '5', 'HTTPS OK mais headers absents et NEXTAUTH_SECRET manquant'],
        ['Conformite legale', '3', 'Pages legales absentes, RGPD cookies OK'],
        ['Performance', '7', 'Optimisations mobiles mais bundle potentiellement lourd'],
        ['Accessibilite', '6', 'Labels ARIA presents mais contrastes insuffisants'],
        ['Global', '5.5', 'Site visuellement reussi mais fondations fragiles'],
    ],
    [0.22, 0.12, 0.66]
))

story.append(Spacer(1, 18))
story.append(p(
    '<b>Conclusion :</b> Le site BttsBet presente un design visuellement impressionnant avec un '
    'design system coher et des animations fluides. Cependant, les fondations sont fragiles : '
    'les donnees de pronostics sont majoritairement synthetiques, les pages legales sont absentes, '
    'et plusieurs elements trompent l\'utilisateur (barre de confiance fixee, cote VIP artificielle). '
    'Les recommandations priorisees ci-dessus permettraient de transformer ce site d\'une vitrine '
    'visuelle en une plateforme credible et conforme. L\'urgence maximale est la creation des pages '
    'legales et l\'amelioration de la qualite des pronostics.'
))

# ━━ Build ━━
doc.multiBuild(story)
print(f"Body PDF generated: {body_path}")

import type { Metadata } from 'next'
import LinebetGuidePage from '@/components/bttsbet/LinebetGuidePage'

export const metadata: Metadata = {
  title: 'Inscription Linebet avec le code VISION221',
  description: 'Guide d’inscription Linebet avec VISION221 : ouvrir le lien partenaire, saisir le code et vérifier l’éligibilité avant dépôt.',
  keywords: ['inscription Linebet', 'code promo Linebet inscription', 'VISION221 inscription', 'bonus Linebet'],
  alternates: { canonical: 'https://bttsbet.online/linebet-inscription' },
  openGraph: { title: 'Inscription Linebet avec VISION221', description: 'Les étapes essentielles pour utiliser le code partenaire Linebet VISION221 et vérifier les conditions.', url: 'https://bttsbet.online/linebet-inscription', siteName: 'BttsBet', type: 'article', locale: 'fr_FR', images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Inscription Linebet avec VISION221' }] },
}

export default function LinebetInscriptionPage() { return <LinebetGuidePage variant="signup" /> }

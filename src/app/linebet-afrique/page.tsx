import type { Metadata } from 'next'
import LinebetGuidePage from '@/components/bttsbet/LinebetGuidePage'

export const metadata: Metadata = {
  title: 'Linebet Afrique : code promo VISION221',
  description: 'Guide Linebet Afrique et code promo VISION221 : disponibilité, inscription et conditions à vérifier selon votre pays.',
  keywords: ['Linebet Afrique', 'code promo Linebet Afrique', 'Linebet Sénégal', 'Linebet Cameroun', 'Linebet Côte d’Ivoire', 'VISION221'],
  alternates: { canonical: 'https://bttsbet.online/linebet-afrique' },
  openGraph: { title: 'Linebet Afrique : code promo VISION221', description: 'Guide régional indépendant sur l’inscription Linebet et le code partenaire VISION221.', url: 'https://bttsbet.online/linebet-afrique', siteName: 'BttsBet', type: 'article', locale: 'fr_FR', images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Linebet Afrique et code promo VISION221' }] },
}

export default function LinebetAfriquePage() { return <LinebetGuidePage variant="africa" /> }

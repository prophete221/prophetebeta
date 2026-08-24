import type { Metadata } from 'next'
import LinebetGuidePage from '@/components/bttsbet/LinebetGuidePage'

export const metadata: Metadata = {
  title: 'Code promo Linebet Sénégal VISION221',
  description: 'Guide du code promo Linebet au Sénégal : utilisation de VISION221, inscription et conditions à vérifier avant dépôt.',
  keywords: ['code promo Linebet Sénégal', 'Linebet Sénégal', 'bonus Linebet Sénégal', 'VISION221', 'inscription Linebet'],
  alternates: { canonical: 'https://bttsbet.online/code-promo-linebet-senegal' },
  openGraph: { title: 'Code promo Linebet Sénégal VISION221', description: 'Guide indépendant du code partenaire Linebet VISION221 au Sénégal.', url: 'https://bttsbet.online/code-promo-linebet-senegal', siteName: 'BttsBet', type: 'article', locale: 'fr_SN', images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Code promo Linebet Sénégal VISION221' }] },
}

export default function CodePromoLinebetSenegalPage() { return <LinebetGuidePage variant="senegal" /> }

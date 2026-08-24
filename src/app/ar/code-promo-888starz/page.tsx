import type { Metadata } from 'next'
import Star888ArabicGuidePage from '@/components/bttsbet/Star888ArabicGuidePage'

const SITE_URL = 'https://bttsbet.online'
const FRENCH_URL = `${SITE_URL}/code-promo-888starz`
const ARABIC_URL = `${SITE_URL}/ar/code-promo-888starz`

export const metadata: Metadata = {
  title: 'أفضل كود 888starz الترويجي btts221 | بونص وتسجيل',
  description: 'اكتشف أفضل كود 888starz الترويجي btts221: طريقة التسجيل، تنزيل التطبيق والتحقق من شروط البونص قبل الإيداع.',
  keywords: ['كود ترويجي 888starz', 'بونص 888starz', 'كود 888starz btts221', 'التسجيل في 888starz', '888starz bonus code'],
  alternates: { canonical: ARABIC_URL, languages: { fr: FRENCH_URL, ar: ARABIC_URL, 'x-default': FRENCH_URL } },
  openGraph: { title: 'أفضل كود 888starz الترويجي btts221', description: 'دليل عربي مستقل لكود 888starz btts221 وشروط التسجيل والعرض.', url: ARABIC_URL, siteName: 'BttsBet', type: 'article', locale: 'ar_AR', images: [{ url: '/og-888starz.svg', width: 1200, height: 630, alt: 'كود 888starz الترويجي btts221' }] },
  twitter: { card: 'summary_large_image', title: 'أفضل كود 888starz الترويجي btts221', description: 'طريقة استخدام الكود والتحقق من شروط 888starz.', images: ['/og-888starz.svg'] },
}

export default function Arabic888starzPage() { return <Star888ArabicGuidePage /> }

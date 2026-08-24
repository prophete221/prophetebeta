import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ variable: '--font-display', subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' })
const inter = Inter({ variable: '--font-body', subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://bttsbet.online'),
  title: { default: 'Code promo Linebet Afrique VISION221 | BttsBet', template: '%s | BttsBet' },
  description: 'Guide indépendant du code promo Linebet Afrique VISION221 : inscription, utilisation du code et conditions à vérifier selon votre pays.',
  keywords: ['code promo Linebet', 'code promo Linebet Afrique', 'VISION221', 'inscription Linebet', 'bonus Linebet', 'Linebet Sénégal', 'Linebet Cameroun', 'Linebet Côte d’Ivoire'],
  authors: [{ name: 'BttsBet' }],
  creator: 'BttsBet',
  publisher: 'BttsBet',
  alternates: { canonical: 'https://bttsbet.online/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/favicon.svg', apple: '/icon-192.png' },
  manifest: '/manifest.json',
  openGraph: { title: 'Code promo Linebet Afrique VISION221', description: 'Le guide BttsBet pour utiliser le code partenaire Linebet VISION221 et vérifier les conditions selon votre pays.', url: 'https://bttsbet.online', siteName: 'BttsBet', type: 'website', locale: 'fr_FR', images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Code promo Linebet Afrique VISION221' }] },
  twitter: { card: 'summary_large_image', title: 'Code promo Linebet Afrique VISION221', description: 'Inscription Linebet, code VISION221 et conditions à vérifier.', images: ['/og-linebet.svg'] },
  category: 'finance',
  other: { 'geo.region': 'AF', language: 'fr', rating: 'general', distribution: 'global', 'googlebot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'bingbot': 'index, follow, max-image-preview:large' },
}

export const viewport: Viewport = { themeColor: '#050706', width: 'device-width', initialScale: 1, maximumScale: 5, minimumScale: 1, viewportFit: 'cover', colorScheme: 'dark' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className="dark" suppressHydrationWarning><head><meta name="format-detection" content="telephone=no" /><meta name="apple-mobile-web-app-capable" content="yes" /><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /><meta name="apple-mobile-web-app-title" content="BttsBet Linebet" /><script dangerouslySetInnerHTML={{ __html: `(()=>{try{const v='v35-linebet-relaunch-2026-08-24',k='bttsbet_ver',old=localStorage.getItem(k);if(old!==v){localStorage.setItem(k,v);if('serviceWorker'in navigator)navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()));if(window.caches)caches.keys().then(ns=>ns.forEach(n=>caches.delete(n)));if(old)location.reload()}}catch(e){}})()` }} /></head><body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}>{children}</body></html>
}

import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ variable: '--font-display', subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' })
const inter = Inter({ variable: '--font-body', subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://bttsbet.online'),
  title: {
    default: 'Code promo Linebet VISION221 — Meilleur code Afrique',
    template: '%s | BttsBet',
  },
  description:
    'Meilleur code promo Linebet Afrique : VISION221. Freebets Linebet. Bonus 888starz btts221 : 100 tours Lucky Wheel gratuits à l’inscription + freebet 1 € chaque lundi. Inscrivez-vous via le parcours officiel.',
  keywords: [
    'code promo Linebet',
    'meilleur code promo Linebet',
    'code promo Linebet Afrique',
    'code promo Linebet Sénégal',
    'code promo Linebet Côte d’Ivoire',
    'code promo Linebet Cameroun',
    'VISION221',
    'bonus Linebet',
    'freebet Linebet',
    'inscription Linebet',
    'code promo 888starz',
    'bonus 888starz',
    '888starz btts221',
    '100 tours Lucky Wheel 888starz',
    'freebet 1 euro 888starz',
    'كود برومو 888starz',
    'بونص 888starz',
  ],
  authors: [{ name: 'BttsBet' }],
  creator: 'BttsBet',
  publisher: 'BttsBet',
  alternates: { canonical: 'https://bttsbet.online/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: { icon: '/favicon.svg', apple: '/icon-192.png' },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Code promo Linebet VISION221 — Meilleur code Afrique',
    description:
      'VISION221 : meilleur code promo Linebet. Bonus 888starz btts221 — 100 tours Lucky Wheel + freebet 1€ chaque lundi.',
    url: 'https://bttsbet.online',
    siteName: 'BttsBet — Code promo Linebet',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Code promo Linebet VISION221' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code promo Linebet VISION221 | Bonus 888starz',
    description: 'Meilleur code promo Linebet Afrique + 100 tours Lucky Wheel et freebet 1€/lundi 888starz.',
    images: ['/og-linebet.svg'],
  },
  category: 'finance',
  other: {
    'geo.region': 'AF',
    language: 'fr',
    rating: 'general',
    distribution: 'global',
    googlebot: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    bingbot: 'index, follow, max-image-preview:large',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0c10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Code promo Linebet VISION221" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const v='v47-seo-offers-2026-08-30',k='bttsbet_ver',old=localStorage.getItem(k);if(old!==v){localStorage.setItem(k,v);if('serviceWorker'in navigator)navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()));if(window.caches)caches.keys().then(ns=>ns.forEach(n=>caches.delete(n)));if(old)location.reload()}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

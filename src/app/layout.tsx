import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bttsbet.online'),
  title: {
    default: 'Code promo Linebet VISION221 — Guide clair Afrique',
    template: '%s | BttsBet',
  },
  description:
    'Code promo Linebet VISION221 : guide pour l’utiliser et vérifier les offres selon votre pays. Site d’affiliation indépendant BttsBet.',
  keywords: [
    'code promo Linebet',
    'code promo Linebet Afrique',
    'VISION221',
    'meilleur code promo Linebet',
    'Linebet inscription',
    'code promo Linebet Sénégal',
    'comment utiliser code promo Linebet',
  ],
  authors: [{ name: 'BttsBet' }],
  creator: 'BttsBet',
  publisher: 'BttsBet',
  alternates: { canonical: 'https://bttsbet.online/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: '/favicon.svg', apple: '/icon-192.png' },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Code promo Linebet VISION221',
    description: 'Guide clair pour utiliser VISION221 — disponibilité selon le pays.',
    url: 'https://bttsbet.online',
    siteName: 'BttsBet',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-linebet.svg', width: 1200, height: 630, alt: 'Code promo Linebet VISION221' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code promo Linebet VISION221',
    description: 'Comment utiliser VISION221 — guide transparent.',
    images: ['/og-linebet.svg'],
  },
  category: 'finance',
  other: {
    'geo.region': 'AF',
    language: 'fr',
  },
}

export const viewport: Viewport = {
  themeColor: '#05070B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        <meta name="apple-mobile-web-app-title" content="Code promo Linebet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const v='v50-premium-2026-08-30',k='bttsbet_ver',old=localStorage.getItem(k);if(old!==v){localStorage.setItem(k,v);if('serviceWorker'in navigator)navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()));if(window.caches)caches.keys().then(ns=>ns.forEach(n=>caches.delete(n)));if(old)location.reload()}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

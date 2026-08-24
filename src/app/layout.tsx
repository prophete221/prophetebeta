import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bttsbet.online"),
  title: {
    default: "BttsBet — Pronostics BTTS et Over 2,5 du jour",
    template: "%s | BttsBet",
  },
  description: "Pronostics BTTS et Over 2,5 fondés sur un modèle Poisson et des fixtures ESPN. Données horodatées, méthode documentée et aucune garantie de gain.",
  keywords: [
    "BTTS", "Over 2.5", "pronostics football", "analystes", "experts football",
    "paris sportifs", "VISION221", "BttsBet",
    "bonus paris sportifs",
    "pronostics gratuits", "pronostics Sénégal", "Wave paris sportifs",
  ],
  authors: [{ name: "BttsBet" }],
  creator: "BttsBet",
  publisher: "BttsBet",
  alternates: {
    canonical: "https://bttsbet.online/",
  },
  other: {
    'geo.region': 'SN',
    'geo.placename': 'Dakar',
    'geo.position': '14.6928;-17.4467',
    ICBM: '14.6928, -17.4467',
    'language': 'fr',
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '1 day',
    'googlebot': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'bingbot': 'index, follow, max-image-preview:large',
  },
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
  icons: {
    icon: "/favicon.svg",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "BttsBet — Pronostics BTTS et Over 2,5 du jour",
    description: "Pronostics BTTS et Over 2,5 fondés sur un modèle Poisson et des fixtures ESPN. Données horodatées, méthode documentée et aucune garantie de gain.",
    url: "https://bttsbet.online",
    siteName: "BttsBet",
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BttsBet — Pronostics BTTS et Over 2,5" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BttsBet — Pronostics BTTS et Over 2,5 du jour",
    description: "Pronostics BTTS et Over 2,5 fondés sur un modèle Poisson et des fixtures ESPN. Données horodatées, méthode documentée et aucune garantie de gain.",
    images: ["/og-image.png"],
  },
  category: "sports",
};

export const viewport: Viewport = {
  themeColor: "#0B0E14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-SN" className="dark" suppressHydrationWarning>
      <head>
        {/* Disable automatic telephone number detection */}
        <meta name="format-detection" content="telephone=no" />
        {/* Apple mobile web app — standalone feel */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BttsBet" />
        {/* Service worker cleanup + cache busting — force users to see latest version */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var VERSION = 'v34-total-audit-2026-08-24';
                try {
                  var stored = localStorage.getItem('bttsbet_ver');
                  if(stored !== VERSION){
                    localStorage.setItem('bttsbet_ver', VERSION);
                    // Clear legacy service workers and caches once per release only.
                    if('serviceWorker' in navigator){
                      navigator.serviceWorker.getRegistrations().then(function(regs){
                        regs.forEach(function(reg){ reg.unregister(); });
                      });
                    }
                    if(window.caches){
                      caches.keys().then(function(names){
                        names.forEach(function(name){ caches.delete(name); });
                      });
                    }
                    if(stored){ window.location.reload(); }
                  }
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

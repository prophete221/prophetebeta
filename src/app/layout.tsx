import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bttsbet.online"),
  title: "BttsBet – Pronostics BTTS & Over 2,5 | Précision IA ~87%",
  description: "Pronostics football BTTS & Over 2,5 générés par intelligence artificielle. ~87% de précision sur 15 000+ pronostics analysés. Code promo VISION221 pour un bonus exclusif sur Linebet.",
  keywords: ["BTTS", "Over 2.5", "pronostics football", "IA", "intelligence artificielle", "paris sportifs", "Linebet", "VISION221", "BttsBet"],
  authors: [{ name: "BttsBet" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "BttsBet – Pronostics BTTS & Over 2,5 | Précision IA ~87%",
    description: "Pronostics football BTTS & Over 2,5 générés par IA. ~87% de précision. Code promo VISION221.",
    url: "https://bttsbet.online",
    siteName: "BttsBet",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BttsBet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BttsBet – Pronostics BTTS & Over 2,5",
    description: "Pronostics IA BTTS & Over 2,5. ~87% précision. Code VISION221.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if('serviceWorker' in navigator){
                navigator.serviceWorker.getRegistrations().then(function(regs){
                  regs.forEach(function(reg){ reg.unregister(); });
                });
                caches.keys().then(function(names){
                  names.forEach(function(name){ caches.delete(name); });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${bebasNeue.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

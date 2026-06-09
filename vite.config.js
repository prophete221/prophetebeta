import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'logo.png'],
      manifest: {
        name: 'BttsBet – Pronostics Football IA',
        short_name: 'BttsBet',
        description: 'Pronostics football BTTS & Over 2,5 générés par intelligence artificielle. Précision ~78%.',
        theme_color: '#0B1120',
        background_color: '#070D1A',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'fr',
        categories: ['sports', 'entertainment'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/flagcdn\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'flagcdn-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/a\.espncdn\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'espn-logos-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
          {
            urlPattern: /\/predictions\.json$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'predictions-cache',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 2, // 2 hours
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
            urlPattern: /\/win-history\.json$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'win-history-cache',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 6, // 6 hours
              },
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
    }),
  ],
})

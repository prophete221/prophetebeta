// ═══════════════════════════════════════════════════════════════════
// BttsBet – Passthrough Service Worker (PWA install only, NO caching)
// This SW exists only so the browser recognizes the site as a PWA.
// It does NOT intercept or cache ANY requests.
// ═══════════════════════════════════════════════════════════════════
const CACHE_NAME = 'bttsbet-v4'

// Install — activate immediately, clear all old caches
self.addEventListener('install', () => {
  caches.keys().then((names) =>
    Promise.all(names.map((n) => caches.delete(n)))
  )
  self.skipWaiting()
})

// Activate — claim all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  )
})

// Fetch — DO NOT INTERCEPT ANYTHING
// All requests pass through natively to the browser
self.addEventListener('fetch', () => {
  // Intentionally empty — no respondWith() call
  // The browser handles all requests natively
})

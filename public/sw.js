// Self-unregistering service worker
// This replaces the old PWA service worker and immediately removes itself
self.addEventListener('install', function(event) {
  self.skipWaiting()
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(name) {
          return caches.delete(name)
        })
      )
    }).then(function() {
      return self.clients.matchAll()
    }).then(function(clients) {
      clients.forEach(function(client) {
        client.navigate(client.url)
      })
      return self.registration.unregister()
    })
  )
})

// Pass-through fetch — don't intercept anything
self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request))
})

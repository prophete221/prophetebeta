import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

// ─── Unregister any leftover service workers from PWA ───
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
      console.log('Service worker unregistered:', registration.scope)
    }
  }).catch((err) => {
    console.warn('Service worker cleanup failed:', err)
  })

  // Also clear all caches from the old PWA
  if ('caches' in window) {
    caches.keys().then((names) => {
      for (const name of names) {
        caches.delete(name)
        console.log('Cache deleted:', name)
      }
    }).catch((err) => {
      console.warn('Cache cleanup failed:', err)
    })
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)

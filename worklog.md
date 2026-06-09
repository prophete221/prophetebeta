---
Task ID: 1
Agent: Main Agent
Task: Remove PWA and User Account System that broke the page

Work Log:
- Read all critical files: App.jsx, main.jsx, vite.config.js, package.json, index.html, Navbar.jsx, AuthContext.jsx, AuthPages.jsx, PwaInstallPrompt.jsx, LegalPages.jsx
- Identified all PWA-related code: VitePWA plugin in vite.config.js, PwaInstallPrompt component, PWA meta tags in index.html, PWA icon files
- Identified all Auth-related code: AuthProvider in main.jsx, AuthContext.jsx, AuthPages.jsx (LoginPage/RegisterPage/ProfilePage), useAuth in Navbar.jsx, auth routes in App.jsx, firebase dependency
- Removed VitePWA plugin and config from vite.config.js
- Removed AuthProvider wrapper from main.jsx
- Removed PwaInstallPrompt import/usage and auth routes (login/register/profile) from App.jsx
- Rewrote Navbar.jsx to remove useAuth and all auth UI (user avatar, login links, logout button)
- Deleted files: src/contexts/AuthContext.jsx, src/pages/AuthPages.jsx, src/components/PwaInstallPrompt.jsx, src/contexts/ directory
- Deleted PWA icon files: public/pwa-192x192.png, public/pwa-512x512.png, public/maskable-icon-512x512.png, public/apple-touch-icon.png
- Removed firebase and vite-plugin-pwa from package.json dependencies
- Ran npm install and npx vite build — build passes with 0 errors
- Kept LegalPages.jsx (MentionsLegales, PolitiqueConfidentialite, JouerResponsable, CGU) as they are useful content pages that don't cause issues

Stage Summary:
- All PWA features removed: vite-plugin-pwa config, service worker, install prompt, PWA icons
- All User Account system removed: AuthContext, AuthPages, Firebase integration, auth routes
- Build passes successfully (448 modules, 2.67s build time)
- Page should now display content correctly again

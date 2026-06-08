import { SITE, AFFILIATE, LEGAL } from '../data/constants'

export default function Footer() {
  return (
    <>
      {/* Sticky Bottom CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-white/5 py-2 px-4 sm:hidden">
        <div className="flex gap-2">
          <a
            href={AFFILIATE.linebet}
            rel={AFFILIATE.rel}
            target="_blank"
            className="flex-1 text-center px-4 py-3 bg-neon-green text-dark-900 font-bold rounded-xl text-sm"
          >
            Bonus {SITE.promoCode}
          </a>
          <a
            href={AFFILIATE.linebetDownload}
            rel={AFFILIATE.rel}
            target="_blank"
            className="flex-1 text-center px-4 py-3 border border-white/10 text-white font-semibold rounded-xl text-sm"
          >
            Télécharger
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-white/5 pt-16 pb-24 sm:pb-10 px-4 depth-3">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-neon-green/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                    <path d="M2 12h20"/>
                  </svg>
                </div>
                <span className="text-xl font-extrabold text-white">
                  {SITE.name}
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Plateforme de pronostics football BTTS & Over 2,5 propulsée par intelligence artificielle. Les résultats passés ne garantissent pas les résultats futurs.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-500 hover:text-neon-green transition-colors">Accueil</a></li>
                <li><a href="/#free-predictions" className="text-gray-500 hover:text-neon-green transition-colors">Pronostics Gratuits</a></li>
                <li><a href="/blog" className="text-gray-500 hover:text-neon-green transition-colors">Blog</a></li>
                <li><a href="/#faq" className="text-gray-500 hover:text-neon-green transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Légal</h4>
              <ul className="space-y-2 text-sm">
                {LEGAL.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-500 hover:text-neon-green transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Download */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Contact & App</h4>
              <div className="space-y-3">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={AFFILIATE.linebetDownload}
                  rel={AFFILIATE.rel}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon-green text-dark-900 font-semibold rounded-xl transition-all hover:brightness-110 text-sm"
                >
                  Télécharger Linebet
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-white/5 pt-8 mb-6">
            <div className="glass-3d p-5 rounded-xl">
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                <strong className="text-gray-400">Avertissement :</strong> {LEGAL.disclaimer}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong className="text-gray-400">Jeu responsable :</strong> {LEGAL.responsible}
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-gray-600">
            {LEGAL.copyright}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-6 z-50 w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  )
}

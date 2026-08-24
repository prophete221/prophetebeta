import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'

export default function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: { title: string; body: ReactNode }[] }) {
  return <div className="min-h-screen bg-[#050706]"><Navbar /><main className="linebet-shell"><article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-20"><p className="linebet-kicker">BTTSBET · INFORMATIONS</p><h1 className="mt-4 text-4xl font-black tracking-[-.05em] text-white sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#9aaba4]">{intro}</p><div className="mt-10 space-y-4">{sections.map((section) => <section key={section.title} className="linebet-step-card"><h2 className="text-xl font-extrabold text-white">{section.title}</h2><div className="mt-3 text-sm leading-7 text-[#91a19a]">{section.body}</div></section>)}</div></article></main><Footer /><CookieConsent /></div>
}

import type { ReactNode } from 'react'
import { AFFILIATE, FAQ_ITEMS, SITE } from '@/lib/constants'
import CopyableCode from './CopyableCode'
import Footer from './Footer'
import Navbar from './Navbar'
import CookieConsent from './CookieConsent'

type GuideVariant = 'promo' | 'signup' | 'africa' | 'senegal'

const content: Record<GuideVariant, { kicker: string; title: ReactNode; intro: string; sections: { title: string; text: string }[] }> = {
  promo: {
    kicker: 'PAGE PILIER · CODE PROMO LINEBET',
    title: <>Meilleur code promo Linebet Afrique : <span className="linebet-gradient-text">VISION221</span></>,
    intro: 'Découvrez notre sélection du code promo Linebet Afrique VISION221, puis suivez un parcours simple pour vérifier les conditions avant d’utiliser Linebet.',
    sections: [
      { title: 'Pourquoi ce code est-il présenté ?', text: 'BttsBet met en avant VISION221 parce qu’il est associé à son lien partenaire Linebet. Cette présentation ne transforme pas une offre en garantie : la disponibilité du code, du bonus et du parcours dépend toujours de Linebet et de votre situation.' },
      { title: 'Comment l’utiliser ?', text: 'Ouvrez le lien partenaire, créez votre compte si le service est accessible dans votre pays, puis saisissez VISION221 dans l’emplacement promotionnel disponible. Relisez l’écran de confirmation et les conditions avant tout dépôt.' },
      { title: 'Ce qu’il faut vérifier', text: 'Vérifiez le pays éligible, l’âge requis, le montant minimum éventuel, les conditions de mise, les délais et les éventuelles restrictions. Les règles peuvent évoluer sans que BttsBet puisse les modifier.' },
    ],
  },
  signup: {
    kicker: 'GUIDE PRATIQUE · INSCRIPTION LINEBET',
    title: <>Inscription Linebet avec le code <span className="linebet-gradient-text">VISION221</span></>,
    intro: 'Un parcours court pour ouvrir la page Linebet, renseigner le code promo et contrôler les informations importantes avant de déposer.',
    sections: [
      { title: '1. Ouvrir la page partenaire', text: 'Utilisez le bouton BttsBet pour accéder à Linebet. L’inscription, la vérification d’identité et la gestion du compte se déroulent sur la plateforme partenaire, pas sur BttsBet.' },
      { title: '2. Renseigner VISION221', text: 'Pendant l’inscription, cherchez le champ code promo ou promotion. Si le champ n’apparaît pas, ne forcez pas le parcours : vérifiez auprès de Linebet si le code est disponible pour votre pays et votre type de compte.' },
      { title: '3. Lire avant de déposer', text: 'Confirmez l’éligibilité, la devise, les méthodes disponibles, le minimum éventuel et les règles de retrait. Une offre de bienvenue peut être soumise à des conditions qui ne sont pas visibles sur le site BttsBet.' },
    ],
  },
  africa: {
    kicker: 'GUIDE RÉGIONAL · LINEBET EN AFRIQUE',
    title: <>Linebet Afrique : le guide du code <span className="linebet-gradient-text">VISION221</span></>,
    intro: 'Une page de référence pour les visiteurs d’Afrique qui recherchent le code promo Linebet, avec une règle simple : vérifier les conditions de son propre pays.',
    sections: [
      { title: 'Une disponibilité qui peut varier', text: 'L’accès à un bookmaker, une promotion, une devise ou un moyen de paiement peut dépendre du pays, de la réglementation et du compte. BttsBet ne présente donc pas une disponibilité uniforme pour toute l’Afrique.' },
      { title: 'Les régions couvertes par ce guide', text: 'Le contenu s’adresse notamment aux recherches provenant d’Afrique de l’Ouest, d’Afrique centrale, d’Afrique du Nord, d’Afrique de l’Est et d’Afrique australe. Pour chaque visiteur, la page Linebet reste la source à consulter pour l’éligibilité réelle.' },
      { title: 'Le bon réflexe', text: 'Conservez le code VISION221, ouvrez le lien partenaire et contrôlez les conditions affichées dans votre parcours local. Ne déposez pas de fonds avant d’avoir compris le bonus éventuel, les exigences de mise et les règles de retrait.' },
    ],
  },
  senegal: {
    kicker: 'GUIDE LOCAL · LINEBET SÉNÉGAL',
    title: <>Code promo Linebet Sénégal <span className="linebet-gradient-text">VISION221</span></>,
    intro: 'La version locale du guide Linebet : code partenaire, étapes d’inscription et conditions à vérifier depuis le Sénégal.',
    sections: [
      { title: 'Un guide, pas une page officielle', text: 'BttsBet est indépendant de Linebet. Le code VISION221 est présenté dans le cadre de notre lien partenaire ; l’offre réellement visible et l’éligibilité doivent être confirmées sur Linebet.' },
      { title: 'Inscription depuis le Sénégal', text: 'Ouvrez le lien partenaire, renseignez vos informations selon les règles de Linebet, puis contrôlez le champ promotionnel. Les moyens de paiement, les limites et les délais doivent être vérifiés dans votre compte.' },
      { title: 'Avant votre premier dépôt', text: 'Lisez les conditions du bonus éventuel, le minimum requis, les règles de mise et les conditions de retrait. Ne considérez aucune somme, aucun délai ou aucun avantage comme garanti par BttsBet.' },
    ],
  },
}

export default function LinebetGuidePage({ variant }: { variant: GuideVariant }) {
  const item = content[variant]
  const pageTitle = typeof item.title === 'string' ? item.title : variant === 'senegal' ? 'Code promo Linebet Sénégal VISION221' : variant === 'signup' ? 'Inscription Linebet VISION221' : variant === 'africa' ? 'Linebet Afrique VISION221' : 'Meilleur code promo Linebet Afrique VISION221'
  return <div className="min-h-screen bg-[#050706]"><Navbar /><main className="linebet-shell"><section className="mx-auto max-w-5xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-20"><p className="linebet-kicker">{item.kicker}</p><h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-.05em] text-white sm:text-6xl">{item.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#9aaba4] sm:text-lg">{item.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#19d66b] px-5 py-3.5 text-sm font-extrabold text-[#031b0d] transition hover:bg-[#35f17f] active:scale-[.98]"><img src="/logos/linebet-icon.svg" alt="" className="h-5 w-5 rounded" /> Ouvrir Linebet <span aria-hidden="true">↗</span></a><div className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#35f17f]/20 bg-[#35f17f]/[.06] px-5 py-3.5 text-sm font-bold text-[#35f17f]">Code : <CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" /></div></div></section><section className="border-y border-white/10 bg-[#080d0a]"><div className="mx-auto grid max-w-5xl gap-4 px-5 py-10 sm:grid-cols-3 sm:px-8 sm:py-14">{item.sections.map((section, index) => <article key={section.title} className="linebet-step-card"><span className="linebet-step-number">0{index + 1}</span><h2 className="mt-6 text-xl font-extrabold text-white">{section.title}</h2><p className="mt-3 text-sm leading-7 text-[#91a19a]">{section.text}</p></article>)}</div></section><section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16"><div className="linebet-editorial-card"><p className="linebet-kicker">QUESTIONS À VÉRIFIER</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-white">Avant de cliquer, gardez ces réponses sous la main.</h2><div className="mt-7 grid gap-3">{FAQ_ITEMS.slice(0, 4).map((faq) => <details key={faq.q} className="linebet-faq-item"><summary>{faq.q}<span aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></div></section><section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8 sm:pb-24"><div className="linebet-final-cta"><h2 className="text-3xl font-black tracking-[-.04em] text-white">Code à retenir : <CopyableCode code={SITE.promoCode} displayClassName="text-[#35f17f]" /></h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#94a49e]">Ce site fournit une information indépendante. Vérifiez les conditions Linebet applicables à votre pays avant toute inscription ou dépôt.</p><a href={AFFILIATE.linebet} target="_blank" rel={AFFILIATE.rel} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#19d66b] px-5 py-3.5 text-sm font-extrabold text-[#031b0d] transition hover:bg-[#35f17f]">Accéder à Linebet <span aria-hidden="true">↗</span></a></div></section></main><Footer /><CookieConsent /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: pageTitle, description: item.intro, author: { '@type': 'Organization', name: SITE.name, url: SITE.url }, publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url }, mainEntityOfPage: `${SITE.url}/${variant === 'promo' ? 'code-promo-linebet' : variant === 'signup' ? 'linebet-inscription' : variant === 'africa' ? 'linebet-afrique' : 'code-promo-linebet-senegal'}` }) }} /></div>
}

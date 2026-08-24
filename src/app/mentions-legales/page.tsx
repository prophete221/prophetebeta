import type { Metadata } from 'next'
import LegalPage from '@/components/bttsbet/LegalPage'

export const metadata: Metadata = { title: 'Mentions légales', description: 'Mentions légales de BttsBet, site indépendant d’information et d’affiliation Linebet.', alternates: { canonical: 'https://bttsbet.online/mentions-legales' } }

export default function MentionsLegalesPage() {
  return <LegalPage title="Mentions légales" intro="Informations sur l’éditeur, la nature du site et les liens partenaires." sections={[{ title: 'Éditeur du site', body: <p>Le site <strong>BttsBet</strong>, accessible à l’adresse <a href="https://bttsbet.online" className="text-[#35f17f] underline">https://bttsbet.online</a>, est un site éditorial indépendant consacré à l’information sur le code partenaire Linebet VISION221.</p> }, { title: 'Nature de l’activité', body: <p>BttsBet ne propose pas de paris, ne gère pas de compte joueur, ne collecte pas de fonds et ne représente pas Linebet. Les liens vers Linebet sont des liens d’affiliation susceptibles de rémunérer BttsBet.</p> }, { title: 'Propriété intellectuelle', body: <p>Les textes, éléments graphiques, logos et éléments de marque présents sur BttsBet appartiennent à leurs titulaires respectifs ou sont utilisés dans le cadre d’une autorisation. Toute reproduction non autorisée du contenu éditorial est interdite.</p> }, { title: 'Contact', body: <p>Pour une question concernant le site ou une demande relative à un contenu, écrivez à <a href="mailto:contact@bttsbet.online" className="text-[#35f17f] underline">contact@bttsbet.online</a>.</p> }]} />
}

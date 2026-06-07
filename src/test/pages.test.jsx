import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('LegalPages - MentionsLegales', () => {
  it('renders the page title', async () => {
    const { MentionsLegales } = await import('../pages/LegalPages')
    renderWithProviders(<MentionsLegales />)
    const headings = screen.getAllByRole('heading')
    expect(headings.some(h => h.textContent.includes('Mentions Légales'))).toBe(true)
  })

  it('contains key legal content', async () => {
    const { MentionsLegales } = await import('../pages/LegalPages')
    renderWithProviders(<MentionsLegales />)
    expect(screen.getByText(/Éditeur du site/)).toBeTruthy()
    expect(screen.getByText(/Propriété intellectuelle/)).toBeTruthy()
  })
})

describe('LegalPages - PolitiqueConfidentialite', () => {
  it('renders the page title', async () => {
    const { PolitiqueConfidentialite } = await import('../pages/LegalPages')
    renderWithProviders(<PolitiqueConfidentialite />)
    const headings = screen.getAllByRole('heading')
    expect(headings.some(h => h.textContent.includes('Politique de Confidentialité'))).toBe(true)
  })

  it('contains key privacy content', async () => {
    const { PolitiqueConfidentialite } = await import('../pages/LegalPages')
    renderWithProviders(<PolitiqueConfidentialite />)
    expect(screen.getByText(/Cookies et technologies/)).toBeTruthy()
  })
})

describe('LegalPages - JouerResponsable', () => {
  it('renders the page title', async () => {
    const { JouerResponsable } = await import('../pages/LegalPages')
    renderWithProviders(<JouerResponsable />)
    const headings = screen.getAllByRole('heading')
    expect(headings.some(h => h.textContent.includes('Jouer Responsable'))).toBe(true)
  })

  it('contains responsible gambling content', async () => {
    const { JouerResponsable } = await import('../pages/LegalPages')
    renderWithProviders(<JouerResponsable />)
    expect(screen.getAllByText(/paris sportifs comportent des risques/).length).toBeGreaterThan(0)
  })
})

describe('LegalPages - CGU', () => {
  it('renders the page', async () => {
    const { CGU } = await import('../pages/LegalPages')
    renderWithProviders(<CGU />)
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('contains CGU content', async () => {
    const { CGU } = await import('../pages/LegalPages')
    renderWithProviders(<CGU />)
    expect(screen.getByText(/Objet/)).toBeTruthy()
  })
})

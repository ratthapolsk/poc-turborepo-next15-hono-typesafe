import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { HomePage } from '../HomePage'

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <MantineProvider>
        {component}
      </MantineProvider>
    </BrowserRouter>
  )
}

describe('HomePage', () => {
  it('renders the main heading', () => {
    renderWithProviders(<HomePage />)
    
    expect(screen.getByText('Approval System')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    renderWithProviders(<HomePage />)
    
    expect(screen.getByText('Backoffice Dashboard with Vite + Vitest')).toBeInTheDocument()
  })

  it('renders the get started button', () => {
    renderWithProviders(<HomePage />)
    
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
  })
})
import { render, screen } from '@testing-library/react'
import Home from '#app/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByText('Welcome to Flowbite on Next.js!')

    expect(heading).toBeInTheDocument()
  })
})
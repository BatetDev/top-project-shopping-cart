import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartProvider';
import { UIProvider } from '../context/UIProvider';
import Navbar from './Navbar';

function renderNavbar() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <UIProvider>
          <Navbar />
        </UIProvider>
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the brand name and the shop link', () => {
    renderNavbar();

    expect(screen.getByText('Lakon Tech')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument();
  });

  it('renders the cart badge with the total item quantity', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([
        { id: 1, title: 'X', price: 10, thumbnail: '', stock: 5, quantity: 2 },
      ]),
    );

    renderNavbar();

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

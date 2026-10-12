import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartProvider';
import { fetchJSON } from '../utils/fetchJSON';
import ShopPage from './ShopPage';

vi.mock('../utils/fetchJSON', () => ({
  fetchJSON: vi.fn(),
}));

const mockProduct = {
  id: 1,
  title: 'iPhone 9',
  price: 549,
  thumbnail: 'https://example.com/iphone.png',
  stock: 5,
  category: 'smartphones',
};

const mockProduct2 = {
  id: 2,
  title: 'iPhone Case',
  price: 29,
  thumbnail: 'https://example.com/case.png',
  stock: 10,
  category: 'mobile-accessories',
};

function renderShopPage() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <ShopPage />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('ShopPage', () => {
  it('shows a loading message initially', () => {
    renderShopPage();

    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('shows products after the fetch resolves', async () => {
    fetchJSON
      .mockResolvedValueOnce({ products: [mockProduct] })
      .mockResolvedValueOnce({ products: [mockProduct2] });

    renderShopPage();

    expect(await screen.findByText('iPhone 9')).toBeInTheDocument();
  });

  it('shows an error message when the fetch fails', async () => {
    fetchJSON.mockRejectedValue(new Error('Network error'));

    renderShopPage();

    expect(
      await screen.findByText(/Failed to load products/),
    ).toBeInTheDocument();
  });

  it('filters products by category when a filter button is clicked', async () => {
    fetchJSON
      .mockResolvedValueOnce({ products: [mockProduct] })
      .mockResolvedValueOnce({ products: [mockProduct2] });

    renderShopPage();

    await screen.findByText('iPhone 9');
    await screen.findByText('iPhone Case');

    await userEvent.click(screen.getByRole('button', { name: 'Phones' }));

    expect(screen.getByText('iPhone 9')).toBeInTheDocument();
    expect(screen.queryByText('iPhone Case')).not.toBeInTheDocument();
  });
});

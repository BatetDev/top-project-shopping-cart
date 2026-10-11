import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  title: 'iPhone 9',
  price: 549,
  thumbnail: 'https://example.com/iphone.png',
  stock: 5,
};

describe('ProductCard', () => {
  it('renders the product title', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByText('iPhone 9')).toBeInTheDocument();
  });

  it('renders the formatted price', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByText('$549.00')).toBeInTheDocument();
  });

  it('renders the product image with the correct src and alt text', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

    const image = screen.getByRole('img', { name: 'iPhone 9' });

    expect(image).toHaveAttribute('src', mockProduct.thumbnail);
    expect(image).toHaveAttribute('alt', mockProduct.title);
  });

  it('calls onAddToCart with the product when the + button is clicked', async () => {
    const handleAdd = vi.fn();

    render(<ProductCard product={mockProduct} onAddToCart={handleAdd} />);

    const button = screen.getByRole('button', { name: 'Add iPhone 9 to cart' });

    await userEvent.click(button);

    expect(handleAdd).toHaveBeenCalledWith(mockProduct);
  });
});

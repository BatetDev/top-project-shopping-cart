import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItem from './CartItem';

const mockItem = {
  id: 1,
  title: 'iPhone 9',
  price: 549,
  thumbnail: 'https://example.com/iphone.png',
  stock: 5,
  quantity: 2,
};

function renderCartItem(props = {}) {
  return render(
    <CartItem
      item={mockItem}
      onIncrease={() => {}}
      onDecrease={() => {}}
      onRemove={() => {}}
      {...props}
    />,
  );
}

describe('CartItem', () => {
  it('renders the item title', () => {
    renderCartItem();
    expect(screen.getByText('iPhone 9')).toBeInTheDocument();
  });

  it('renders the item price', () => {
    renderCartItem();
    expect(screen.getByText('$549.00 each')).toBeInTheDocument();
  });

  it('renders the item quantity', () => {
    renderCartItem();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

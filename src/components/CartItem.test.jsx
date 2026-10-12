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

  it('calls onIncrease when the + button is clicked', async () => {
    const handleIncrease = vi.fn();

    renderCartItem({ onIncrease: handleIncrease });

    const button = screen.getByRole('button', {
      name: 'Increase quantity of iPhone 9',
    });

    await userEvent.click(button);

    expect(handleIncrease).toHaveBeenCalledOnce();
  });

  it('calls onDecrease when the − button is clicked', async () => {
    const handleDecrease = vi.fn();

    renderCartItem({ onDecrease: handleDecrease });

    const button = screen.getByRole('button', {
      name: 'Decrease quantity of iPhone 9',
    });

    await userEvent.click(button);

    expect(handleDecrease).toHaveBeenCalledOnce();
  });

  it('calls onRemove when the remove button is clicked', async () => {
    const handleRemove = vi.fn();

    renderCartItem({ onRemove: handleRemove });

    const button = screen.getByRole('button', {
      name: 'Remove iPhone 9 from cart',
    });

    await userEvent.click(button);

    expect(handleRemove).toHaveBeenCalledOnce();
  });

  it('disables the − button when quantity is 1', () => {
    renderCartItem({
      item: { ...mockItem, quantity: 1 },
    });

    expect(
      screen.getByRole('button', { name: 'Decrease quantity of iPhone 9' }),
    ).toBeDisabled();
  });

  it('disables the + button when quantity equals stock', () => {
    renderCartItem({
      item: { ...mockItem, quantity: mockItem.stock },
    });

    expect(
      screen.getByRole('button', { name: 'Increase quantity of iPhone 9' }),
    ).toBeDisabled();
  });
});

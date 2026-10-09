import { describe, it, expect } from 'vitest';
import { cartReducer } from './cartReducer';

const mockProduct = {
  id: 1,
  title: 'iPhone 9',
  price: 549,
  thumbnail: 'https://example.com/iphone.png',
  stock: 5,
};

describe('ADD_ITEM', () => {
  it('adds a new product to an empty cart', () => {
    const result = cartReducer([], {
      type: 'ADD_ITEM',
      payload: { product: mockProduct, quantity: 2 },
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].quantity).toBe(2);
  });

  it('increments quantity when the item already exists in the cart', () => {
    const result = cartReducer([{ ...mockProduct, quantity: 1 }], {
      type: 'ADD_ITEM',
      payload: { product: mockProduct, quantity: 2 },
    });

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(3);
  });

  it('caps the quantity at the product stock when adding', () => {
    const result = cartReducer([], {
      type: 'ADD_ITEM',
      payload: { product: mockProduct, quantity: 100 },
    });

    expect(result[0].quantity).toBe(mockProduct.stock);
  });

  it('caps the quantity at stock when incrementing an existing item', () => {
    const result = cartReducer([{ ...mockProduct, quantity: 4 }], {
      type: 'ADD_ITEM',
      payload: { product: mockProduct, quantity: 10 },
    });

    expect(result[0].quantity).toBe(mockProduct.stock);
  });
});

import { describe, it, expect } from 'vitest';
import { cartReducer } from './cartReducer';

const mockProduct = {
  id: 1,
  title: 'iPhone 9',
  price: 549,
  thumbnail: 'https://example.com/iphone.png',
  stock: 5,
};

const mockProduct2 = {
  id: 2,
  title: 'iPhone X',
  price: 899,
  thumbnail: 'https://example.com/iphonex.png',
  stock: 3,
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

describe('REMOVE_ITEM', () => {
  it('removes the item with the matching id', () => {
    const state = [
      { ...mockProduct, quantity: 1 },
      { ...mockProduct2, quantity: 1 },
    ];

    const result = cartReducer(state, {
      type: 'REMOVE_ITEM',
      payload: 1,
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(mockProduct2.id);
  });

  it('returns the state unchanged when the id is not found', () => {
    const state = [{ ...mockProduct, quantity: 1 }];

    const result = cartReducer(state, {
      type: 'REMOVE_ITEM',
      payload: 99,
    });

    expect(result).toHaveLength(state.length);
    expect(result[0].id).toBe(state[0].id);
  });
});

describe('INCREASE_QUANTITY', () => {
  it('increments the quantity of the item with the matching id by 1', () => {
    const state = [
      { ...mockProduct, quantity: 1 },
      { ...mockProduct2, quantity: 1 },
    ];

    const result = cartReducer(state, {
      type: 'INCREASE_QUANTITY',
      payload: 1,
    });

    expect(result[0].quantity).toBe(2);
  });

  it('does not affect other items in the cart', () => {
    const state = [
      { ...mockProduct, quantity: 1 },
      { ...mockProduct2, quantity: 1 },
    ];

    const result = cartReducer(state, {
      type: 'INCREASE_QUANTITY',
      payload: 1,
    });

    expect(result[1].quantity).toBe(state[1].quantity);
  });

  it('does not increment past the product stock', () => {
    const state = [{ ...mockProduct, quantity: mockProduct.stock }];

    const result = cartReducer(state, {
      type: 'INCREASE_QUANTITY',
      payload: 1,
    });

    expect(result[0].quantity).toBe(mockProduct.stock);
  });
});

describe('DECREASE_QUANTITY', () => {
  it('decrements the quantity of the matching item by 1', () => {
    const state = [{ ...mockProduct, quantity: 3 }];

    const result = cartReducer(state, {
      type: 'DECREASE_QUANTITY',
      payload: 1,
    });

    expect(result[0].quantity).toBe(2);
  });

  it('does not decrement below 1', () => {
    const state = [{ ...mockProduct, quantity: 1 }];

    const result = cartReducer(state, {
      type: 'DECREASE_QUANTITY',
      payload: 1,
    });

    expect(result[0].quantity).toBe(1);
  });
});

describe('CLEAR_CART', () => {
  it('empties the cart', () => {
    const state = [
      { ...mockProduct, quantity: 1 },
      { ...mockProduct2, quantity: 1 },
    ];

    const result = cartReducer(state, {
      type: 'CLEAR_CART',
    });

    expect(result).toEqual([]);
  });
});

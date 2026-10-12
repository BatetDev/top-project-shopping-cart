import { useEffect, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

const seedCart = [
  {
    id: 121,
    title: 'iPhone 5s',
    price: 199.99,
    thumbnail:
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp',
    stock: 25,
    quantity: 1,
  },
  {
    id: 122,
    title: 'iPhone 6',
    price: 299.99,
    thumbnail:
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp',
    stock: 60,
    quantity: 1,
  },
];

function loadCart() {
  const savedCart = localStorage.getItem('cart');

  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  }

  return seedCart;
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, undefined, loadCart);

  const addItem = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

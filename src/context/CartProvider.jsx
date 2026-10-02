import { useEffect, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

function loadCart() {
  const savedCart = localStorage.getItem('cart');

  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  }

  return [];
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, loadCart());

  const value = { cartItems, dispatch };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('Saved to localStorage', cartItems);
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

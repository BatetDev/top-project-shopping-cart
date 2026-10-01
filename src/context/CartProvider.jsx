import { useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer, initialState } from './cartReducer';

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);

  const value = { cartItems, dispatch };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

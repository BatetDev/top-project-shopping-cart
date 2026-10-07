import { useState } from 'react';
import { UIContext } from './UIContext';

export function UIProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    isCartOpen,
    openCart,
    closeCart,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

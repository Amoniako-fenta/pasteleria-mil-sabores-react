import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

// Hook personalizado
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('carrito');
      return localData ? JSON.parse(localData) : [];
    } catch (error) { return []; }
  });

  // NUEVO: Estado para la visibilidad del modal
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // NUEVO: Funciones para el modal y vaciar carrito
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const emptyCart = () => setCartItems([]);

  // NUEVO: Lógica para calcular total
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // NUEVO: Lógica para contar items
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    isCartOpen,    // <-- Exporta
    openCart,      // <-- Exporta
    closeCart,     // <-- Exporta
    emptyCart,     // <-- Exporta
    total,         // <-- Exporta
    itemCount      // <-- Exporta
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

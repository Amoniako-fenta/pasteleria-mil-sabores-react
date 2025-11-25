import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 1. Estado de los productos
  const [cartItems, setCartItems] = useState([]);
  
  // 2. Estado de visibilidad (ABIERTO/CERRADO)
  const [isOpen, setIsOpen] = useState(false);

  // Cargar del localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- FUNCIONES DE VISIBILIDAD ---
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // --- FUNCIONES DEL CARRITO ---
  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setIsOpen(true); // Abre el carrito automáticamente al añadir
  };

  const removeFromCart = (productToRemove) => {
    setCartItems(prev => prev.filter(item => item.id !== productToRemove.id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const itemCount = cartItems.length;

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    itemCount,
    cartTotal,
    // Variables de visibilidad vitales para que funcione el botón
    isOpen,
    openCart,
    closeCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
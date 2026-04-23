import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState('EUR');

  const formatPrice = (price) => {
    const val = typeof price === 'string' ? parseFloat(price) : price;
    if (currency === 'CZK') {
      return `${(val * 25).toLocaleString()} Kč`;
    }
    return `${val.toFixed(2)} €`;
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.cartId === product.cartId);
      if (existing) {
        return prev.map(item => item.cartId === product.cartId ? { ...item, qty: item.qty + product.qty } : item);
      }
      return [...prev, product];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const cartCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, cartTotal, cartCount, currency, setCurrency, formatPrice }}>
      {children}
    </CartContext.Provider>
  );
};

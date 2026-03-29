"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // 1. Initial Load (Local Storage only on mount)
  useEffect(() => {
    const savedCart = localStorage.getItem('amazonCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 2. Persistent Backend Load (on user login)
  useEffect(() => {
    const fetchUserCart = async () => {
      // Safety check: ensure user.id exists and is not the string "undefined"
      if (!user?.id || user.id === 'undefined' || user.id === 'null') return;
      
      try {
        const res = await fetch(`${API_URL}/cart/${user.id}`);
        if (!res.ok) throw new Error("Backend reachable but returned error");
        
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCartItems(data); 
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };
    fetchUserCart();
  }, [user?.id, API_URL]);

  // 3. Persistent Sync (to both LocalStorage and DB)
  useEffect(() => {
    localStorage.setItem('amazonCart', JSON.stringify(cartItems));

    const syncCart = async () => {
      if (!user?.id || user.id === 'undefined' || user.id === 'null') return;
      
      try {
        const res = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, cart: cartItems })
        });
        if (!res.ok) console.warn("Cart sync partially failed on server");
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    };

    const timer = setTimeout(syncCart, 1000); // Debounce sync
    return () => clearTimeout(timer);
  }, [cartItems, user?.id, API_URL]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, amount) } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      subtotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

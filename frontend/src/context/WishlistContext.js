'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user, token } = useAuth();
  console.log("WishlistProvider user:", user?.email);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchWishlist = async () => {
    if (!user) {
      console.log("No user for wishlist fetch");
      setWishlistItems([]);
      return;
    }
    try {
      console.log("Fetching wishlist for user:", user.id);
      const res = await fetch(`${API_URL}/wishlist/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setWishlistItems(data);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (product) => {
    console.log("Toggling wishlist for product:", product?.id);
    if (!user) {
      alert("Please login to manage your wishlist");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/wishlist/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId: product.id })
      });
      console.log("Toggle res status:", res.status);
      if (res.ok) {
        const data = await res.json();
        console.log("Toggle success:", data);
        if (data.favorited) {
          setWishlistItems(prev => [...prev, product]);
        } else {
          setWishlistItems(prev => prev.filter(item => item.id !== product.id));
        }
        return data.favorited;
      }
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
    }
    return false;
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

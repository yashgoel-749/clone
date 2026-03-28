"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`} className="image-container">
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-info">
        <Link href={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <div className="rating">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
          <span className="rating-num">({product.rating})</span>
        </div>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">{product.price.toLocaleString()}</span>
        </div>
        <p className="description">{(product.description || "").slice(0, 100)}...</p>
        <button className="btn-primary add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>

    </div>
  );
}

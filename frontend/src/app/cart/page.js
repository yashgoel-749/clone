"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <div className="container cart-page">
      <div className="cart-left">
        <h1>Shopping Cart</h1>
        <hr />
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your Amazon Cart is empty.</p>
            <Link href="/" className="btn-secondary">Shop Today's Deals</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="item-details">
                <Link href={`/product/${item.id}`} className="item-title">{item.title}</Link>
                <p className="stock">In Stock</p>
                <div className="item-actions">
                  <div className="quantity-selector">
                    <span>Qty: </span>
                    <select 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    >
                      {[...Array(10).keys()].map(n => (
                        <option key={n+1} value={n+1}>{n+1}</option>
                      ))}
                    </select>
                  </div>
                  <span className="separator">|</span>
                  <button onClick={() => removeFromCart(item.id)} className="delete-btn">Delete</button>
                </div>
              </div>
              <div className="item-price">
                ${item.price.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-right">
        <div className="subtotal-box">
          <p>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items): <strong>${subtotal.toLocaleString()}</strong></p>
          <div className="gift-checkbox">
            <input type="checkbox" id="gift" />
            <label htmlFor="gift">This order contains a gift</label>
          </div>
          <Link href="/checkout">
            <button className="btn-primary checkout-btn" disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          display: flex;
          gap: 2rem;
          padding-top: 2rem;
        }

        .cart-left {
          flex: 3;
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
        }

        .cart-right {
          flex: 1;
        }

        h1 {
          font-size: 1.8rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        hr {
          border: none;
          border-top: 1px solid #ddd;
          margin-bottom: 1.5rem;
        }

        .empty-cart {
          padding: 2rem 0;
        }

        .cart-item {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #eee;
        }

        .item-image img {
          width: 120px;
          height: 120px;
          object-fit: contain;
        }

        .item-details {
          flex: 1;
        }

        .item-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          display: block;
        }

        .stock {
          color: var(--success);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .item-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
        }

        .item-price {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .delete-btn {
          background: none;
          color: var(--link-color);
        }

        .delete-btn:hover {
          text-decoration: underline;
        }

        .subtotal-box {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
        }

        .subtotal-box p {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .gift-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .checkout-btn {
          width: 100%;
          padding: 0.8rem;
        }

        .checkout-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .cart-page {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

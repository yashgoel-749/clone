"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    card: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cartItems,
          shippingInfo: formData,
          total: subtotal + 5.99,
          userId: user?.id
        })
      });

      const data = await response.json();
      if (response.ok) {
        setOrderId(data.orderId);
        setOrderConfirmed(true);
        clearCart();
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Error processing your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="container confirmation-page">
        <div className="confirmation-box">
          <div className="icon">✅</div>
          <h1>Thank you! Your order is placed.</h1>
          <p>Order ID: <strong>{orderId}</strong></p>
          <p>Check your email for confirmation.</p>
          <button onClick={() => router.push('/')} className="btn-primary shop-more">Keep Shopping</button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container empty-checkout">
        <h1>Your Cart is empty.</h1>
        <button onClick={() => router.push('/')} className="btn-secondary">Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <div className="checkout-left">
        <h2>Enter Shipping Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>
          <div className="form-group row">
            <div className="col">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
            </div>
            <div className="col">
              <label>Zip Code</label>
              <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Credit Card Number (Mock)</label>
            <input type="text" name="card" placeholder="XXXX-XXXX-XXXX-XXXX" value={formData.card} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn-primary submit-order-btn" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Your Order"}
          </button>
        </form>
      </div>

      <div className="checkout-right">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping & handling:</span>
            <span>$5.99</span>
          </div>
          <hr />
          <div className="summary-row total-row">
            <span>Order Total:</span>
            <span>${(subtotal + 5.99).toLocaleString()}</span>
          </div>
          <div className="disclaimer">By placing your order, you agree to Amazon Clone's privacy notice and conditions of use.</div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          display: flex;
          gap: 3rem;
          padding-top: 2rem;
        }

        .checkout-left {
          flex: 2;
          background: white;
          padding: 2rem;
          border-radius: 8px;
        }

        .checkout-right {
          flex: 1;
        }

        h2 {
          font-weight: 500;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .row {
          flex-direction: row;
          gap: 1.5rem;
        }

        .col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-weight: 600;
          font-size: 0.9rem;
        }

        input {
          padding: 0.7rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .submit-order-btn {
          margin-top: 1rem;
          width: 50%;
          padding: 1rem;
          font-size: 1.1rem;
        }

        .order-summary {
          background: white;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
        }

        .total-row {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--error);
          margin-top: 1rem;
        }

        .disclaimer {
          margin-top: 1.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .confirmation-page, .empty-checkout {
          padding-top: 5rem;
          text-align: center;
        }

        .confirmation-box {
          background: white;
          padding: 3rem;
          border-radius: 8px;
          display: inline-block;
        }

        .icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .shop-more {
          margin-top: 2rem;
          padding: 0.8rem 2rem;
        }

        @media (max-width: 900px) {
          .checkout-page {
            flex-direction: column-reverse;
          }
          .submit-order-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

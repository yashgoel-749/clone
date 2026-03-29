'use client';
import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="cart-page" style={{ padding: '20px', maxWidth: '1440px', margin: '0 auto', background: '#eaeded', minHeight: '100vh' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '4px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '400', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
          Your Wish List
        </h1>
        
        {wishlistItems.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <h2 style={{ fontSize: '18px' }}>Your Wish List is empty.</h2>
            <p style={{ marginTop: '10px' }}>
              Add items to your Wish List to keep track of products you like. <Link href="/" style={{ color: '#007185' }}>Continue shopping</Link>
            </p>
          </div>
        ) : (
          <div className="cart-items">
            {wishlistItems.map((item) => (
              <div key={item.id} className="cart-item" style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid #ddd' }}>
                <div style={{ width: '180px', height: '180px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
                   <Link href={`/product/${item.id}`}>
                      <img src={item.image} alt={item.title} style={{ maxWidth: '100%', maxHeight: '160px', mixBlendMode: 'multiply' }} />
                   </Link>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <Link href={`/product/${item.id}`} style={{ textDecoration: 'none', color: '#0f1111' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>{item.title}</h3>
                  </Link>
                  <p style={{ color: '#007600', fontSize: '12px', marginBottom: '8px' }}>In Stock</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700' }}>₹</span>
                    <span style={{ fontSize: '18px', fontWeight: '700' }}>{item.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <button 
                       onClick={() => addToCart(item)}
                       style={{ background: '#FFD814', border: '1px solid #FCD200', borderRadius: '20px', padding: '5px 20px', fontSize: '12px', cursor: 'pointer' }}
                    >
                       Add to Cart
                    </button>
                    <button 
                       onClick={() => toggleWishlist(item)}
                       style={{ background: 'transparent', border: 'none', color: '#007185', fontSize: '12px', cursor: 'pointer' }}
                    >
                       Remove from Wish List
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

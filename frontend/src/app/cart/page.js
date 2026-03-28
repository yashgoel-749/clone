'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="a-cart-page">
      <div className="a-cart-container container">
        {/* LEFT COLUMN: SHOPPING CART LIST */}
        <div className="a-cart-left">
          <div className="a-cart-card">
            <h1 className="a-cart-h1">Shopping Cart</h1>
            <div className="a-cart-deselect-all">Deselect all items</div>
            <div className="a-cart-price-header">Price</div>
            
            <div className="a-cart-divider"></div>

            {cartItems.length === 0 ? (
              <div className="a-empty-cart">
                <h2>Your Amazon Cart is empty.</h2>
                <p>Check your Saved for later items below or <Link href="/">continue shopping</Link>.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="a-cart-item">
                  <div className="a-cart-item-checkbox">
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="a-cart-item-image">
                    <Link href={`/product/${item.id}`}>
                      <img src={item.image} alt={item.title} />
                    </Link>
                  </div>
                  <div className="a-cart-item-info">
                    <Link href={`/product/${item.id}`} className="a-cart-item-title">{item.title}</Link>
                    <div className="a-cart-item-badge">#1 Best Seller <span className="category">in {item.category || "T-Shirts"}</span></div>
                    <div className="a-cart-item-stock">In stock</div>
                    <div className="a-cart-item-shipping">FREE delivery <strong>Mon, 6 Apr</strong></div>
                    <div className="a-cart-item-fulfilled"><img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18._CB485936932_.png" alt="Fulfilled" /></div>
                    
                    <div className="a-cart-item-gift">
                      <input type="checkbox" id={`gift-${item.id}`} />
                      <label htmlFor={`gift-${item.id}`}>This will be a gift <span>Learn more</span></label>
                    </div>

                    <div className="a-cart-item-specs">
                      <strong>Size:</strong> M<br />
                      <strong>Colour:</strong> 666 OPTICAL
                    </div>

                    <div className="a-cart-item-actions">
                      <div className="a-qty-box">
                        <button className="a-qty-btn" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                          {item.quantity === 1 ? '🗑' : '−'}
                        </button>
                        <span className="a-qty-num">{item.quantity}</span>
                        <button className="a-qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <span className="a-action-link" onClick={() => removeFromCart(item.id)}>Delete</span>
                      <span className="a-action-link">Save for later</span>
                      <span className="a-action-link">Share</span>
                    </div>
                  </div>
                  <div className="a-cart-item-price">
                    ₹{item.price.toLocaleString()}
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="a-cart-subtotal-footer">
                Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}): <strong>₹{subtotal.toLocaleString()}</strong>
              </div>
            )}
          </div>

          {/* LOWER SECTION: SAVED FOR LATER / RECENTLY VIEWED */}
          <div className="a-cart-tabs-section">
            <div className="a-cart-tabs">
              <div className="a-tab active">Saved for later (1 item)</div>
              <div className="a-tab">Buy it again</div>
            </div>
            <div className="a-tabs-content">
              {/* Simplified placeholder for 'Saved for Later' as seen in screenshot */}
              <div className="a-saved-item">
                <div className="a-saved-img"><img src="/image/tools_low_res_v1._sy116_cb549138744_.jpg" alt="Saved" /></div>
                <div className="a-saved-info">
                  <div className="a-saved-title">JAISH ADVERTISING Handheld Pyro Party Toy Gun...</div>
                  <div className="a-saved-price">₹305.00</div>
                  <div className="a-saved-stock">In stock</div>
                  <button className="a-move-to-cart">Move to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUBTOTAL & CHECKOUT */}
        <div className="a-cart-right">
          <div className="a-cart-subtotal-card">
            <div className="a-subtotal-text">
              Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}): <strong>₹{subtotal.toLocaleString()}</strong>
            </div>
            <div className="a-gift-check">
              <input type="checkbox" id="gift-main" />
              <label htmlFor="gift-main">This order contains a gift</label>
            </div>
            <Link href="/checkout">
              <button className="a-proceed-btn" disabled={cartItems.length === 0}>
                Proceed to Buy
              </button>
            </Link>
          </div>

          <div className="a-prime-promo">
            <div className="a-prime-header">
              Enjoy faster deliveries, offers and so much more!
            </div>
            <div className="a-prime-subtitle">
              Join Prime now for FREE deliveries, cancel anytime!
            </div>
            <button className="a-prime-btn">Join Prime Shopping Edition at ₹399/year</button>
          </div>

          <div className="a-cart-related-card">
              <h3>Products related to items in your cart</h3>
              <div className="a-related-list">
                 {/* Simplified related product list items... */}
                 <div className="a-related-item">
                    <img src="/image/61dpajs_afl._ac_sy200_.jpg" alt="Related" />
                    <div className="a-related-info">
                      <div className="a-related-title">Snail's home Lucifer...</div>
                      <div className="a-related-price">₹350.00</div>
                      <button className="a-related-btn">See all buying options</button>
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}


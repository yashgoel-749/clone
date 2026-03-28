"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

export default function Header() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [router.asPath]);

  // Lock scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    let query = `/?search=${search}`;
    if (category !== "all") {
      query += `&category=${category}`;
    }
    router.push(query);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    "All", "Keyboards", "Electronics", "Mobiles", "Computers", "Fashion",
    "Home & Kitchen", "Beauty", "Books", "Appliances", "Toys & Games", "Sports & Fitness"
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-belt">
          <Link href="/" className="nav-logo" onClick={handleLogoClick}>
            <div className="nav-logo-text">amazon<span>.in</span></div>
          </Link>

          <div className="nav-location nav-item" onClick={() => setShowLocationModal(true)}>
            <span className="nav-loc-icon">📍</span>
            <div>
              <span className="nav-loc-line1">Delivering to Chandigarh 140603</span>
              <span className="nav-loc-line2">Update location</span>
            </div>
          </div>

          <div className="nav-search-wrapper">
            <form onSubmit={handleSearch} className="nav-search">
              <select
                className="nav-search-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Search category"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map((cat, i) => (
                  <option key={i} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search Amazon.in"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search Amazon.in"
              />
              <button type="submit" className="nav-search-btn" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="#333"><path d="M10 2a8 8 0 105.3 14.7l5 5a1 1 0 001.4-1.4l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" /></svg>
              </button>
            </form>
          </div>

          <div className="nav-right">
            <div className="nav-item nav-lang">
              <span className="nav-flag">🇮🇳</span>
              <span className="nav-item-line2">EN <span className="nav-arrow">▾</span></span>
            </div>

            {user ? (
              <div className="nav-item" onClick={logout}>
                <span className="nav-item-line1">Hello, {user.name}</span>
                <span className="nav-item-line2">Account & Lists <span className="nav-arrow">▾</span></span>
              </div>
            ) : (
              <Link href="/login" className="nav-item">
                <span className="nav-item-line1">Hello, sign in</span>
                <span className="nav-item-line2">Account & Lists <span className="nav-arrow">▾</span></span>
              </Link>
            )}

            <div className="nav-item">
              <span className="nav-item-line1">Returns</span>
              <span className="nav-item-line2">& Orders</span>
            </div>

            <Link href="/cart" className="nav-item nav-cart-wrap">
              <div className="nav-cart">
                <div className="nav-cart-count-wrap">
                  <span className="nav-cart-count">{cartCount}</span>
                  <span className="nav-cart-icon"></span> {/* Styled via CSS for accuracy */}
                </div>
                <span className="nav-cart-text">Cart</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="sub-nav">
        <div className="sub-nav-inner">
          <div className="sub-nav-item sub-nav-all" onClick={() => setIsSidebarOpen(true)}>
            <span className="hamburger">☰</span> All
          </div>
          <div className="sub-nav-item">Fresh</div>
          <div className="sub-nav-item">MX Player</div>
          <div className="sub-nav-item">Sell</div>
          <div className="sub-nav-item">Bestsellers</div>
          <div className="sub-nav-item">Mobiles</div>
          <div className="sub-nav-item">Today's Deals</div>
          <div className="sub-nav-item">Customer Service</div>
          <div className="sub-nav-item">Prime</div>
          <div className="sub-nav-item">New Releases</div>
          <div className="sub-nav-item">Fashion</div>
          <div className="sub-nav-item">Electronics</div>
          <div className="sub-nav-item">Amazon Pay</div>
          <div className="sub-nav-item">Home & Kitchen</div>
        </div>
      </div>

      {showLocationModal && (
        <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
          <div className="location-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Choose your location</h3>
              <button className="close-btn" onClick={() => setShowLocationModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="modal-subtext">Select a delivery location to see product availability and delivery options</p>
              <button className="modal-signin-btn">Sign in to see your addresses</button>
              <div className="modal-divider"><span>or enter an Indian pincode</span></div>
              <div className="pincode-input-row">
                <input type="text" className="pincode-input" maxLength="6" />
                <button className="apply-btn">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        user={user}
      />
    </>
  );
}

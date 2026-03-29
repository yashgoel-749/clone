"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Sidebar from './Sidebar';
import { searchCategories, subNavItems } from '@/data/navigationData';

function HeaderContent() {
  const { cartItems } = useCart();
  const { user, logout, login } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);
  // Clear search bar when returning to root homepage
  useEffect(() => {
    if (pathname === '/' && !searchParams.get('search') && !searchParams.get('category')) {
      setSearch("");
      setCategory("all");
    }
  }, [pathname, searchParams]);

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

    if (!search.trim()) return;

    const query = `/?search=${search}${category !== "all" ? `&category=${category}` : ""
      }`;

    setIsSearchFocused(false);
    router.push(query);
  };
  const handleAutoLogin = async () => {
    const result = await login("goelyash749@gmail.com", "auto_login_secret");
    if (result.success) window.location.reload();
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="navbar">
        <div className="nav-belt">
          <div className="nav-left-mobile-wrap">
            <div className="sub-nav-item sub-nav-all mobile-menu-btn mobile-only" onClick={() => setIsSidebarOpen(true)}>
              <span className="hamburger">☰</span>
            </div>
            <Link href="/" className="nav-logo">
              <span className="nav-logo-base"></span>
            </Link>
          </div>

          <div className="nav-location nav-item desktop-only" onClick={() => setShowLocationModal(true)}>
            <div className="nav-loc-icon"></div>
            <div>
              <span className="nav-loc-line1">Delivering to Mohali 160059</span>
              <span className="nav-loc-line2">Update location</span>
            </div>
          </div>

          <div className="nav-search-wrapper desktop-only">
            <form onSubmit={handleSearch} className={`nav-search ${isSearchFocused ? 'focused' : ''}`}>
              <select
                className="nav-search-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search category"
              >
                {searchCategories.map((cat, i) => (
                  <option key={i} value={i === 0 ? "all" : cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search Amazon.in"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search Amazon.in"
              />
              <button type="submit" className="nav-search-btn" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="#333"><path d="M10 2a8 8 0 105.3 14.7l5 5a1 1 0 001.4-1.4l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" /></svg>
              </button>
            </form>
          </div>

          <div className="nav-right">
            <div className="nav-item nav-lang desktop-only">
              <span className="nav-flag">🇮🇳</span>
              <span className="nav-item-line2">EN <span className="nav-arrow">▾</span></span>
            </div>

            <div className="nav-account-container">
              {user ? (
                <div className="nav-item">
                  <span className="nav-item-line1 mobile-hidden">Hello, {user.name}</span>
                  <span className="nav-item-line2">Account & Lists <span className="nav-arrow mobile-hidden">▾</span></span>
                </div>
              ) : (
                <Link href="/login" className="nav-item">
                  <span className="nav-item-line1 mobile-hidden">Hello, sign in</span>
                  <span className="nav-item-line2">Account & Lists <span className="nav-arrow mobile-hidden">▾</span></span>
                </Link>
              )}

              <div className="nav-account-dropdown">
                <div className="nav-dropdown-title">Your Account</div>
                <div className="nav-dropdown-list">
                  <Link href="/account" className="nav-dropdown-link">Your Account</Link>
                  <Link href="/orders" className="nav-dropdown-link">Your Orders</Link>
                  <Link href="/wishlist" className="nav-dropdown-link">Your Wish List</Link>
                  <Link href="/prime" className="nav-dropdown-link">Your Prime Membership</Link>
                  {!user && (
                    <button
                      className="nav-signout-btn"
                      style={{ background: '#f0c14b', marginTop: '10px' }}
                      onClick={handleAutoLogin}
                    >
                      Quick Login (Yash)
                    </button>
                  )}
                </div>
                {user && (
                  <button className="nav-signout-btn" onClick={logout}>Sign Out</button>
                )}
              </div>
            </div>

            <Link href="/orders" className="nav-item desktop-only">
              <span className="nav-item-line1">Returns</span>
              <span className="nav-item-line2">& Orders</span>
            </Link>

            <Link href="/cart" className="nav-item nav-cart-wrap">
              <div className="nav-cart">
                <div className="nav-cart-count-wrap">
                  <span className="nav-cart-count">{cartCount}</span>
                  <span className="nav-cart-icon"></span>
                </div>
                <span className="nav-cart-text mobile-hidden">Cart</span>
              </div>
            </Link>
          </div>
        </div>

        {/* MOBILE SECOND ROW: SEARCH */}
        <div className="nav-search-row-mobile mobile-only">
          <form onSubmit={handleSearch} className={`nav-search ${isSearchFocused ? 'focused' : ''}`}>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search Amazon.in"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button type="submit" className="nav-search-btn">
              <svg viewBox="0 0 24 24" fill="#333"><path d="M10 2a8 8 0 105.3 14.7l5 5a1 1 0 001.4-1.4l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" /></svg>
            </button>
          </form>
        </div>

        {/* MOBILE THIRD ROW: LOCATION */}
        <div className="nav-location-row-mobile mobile-only" onClick={() => setShowLocationModal(true)}>
          <span className="nav-loc-icon">📍</span>
          <span className="nav-loc-text">Delivering to Mohali 160059</span>
        </div>
      </nav>

      <div className="sub-nav">
        <div className="sub-nav-inner">
          <div className="sub-nav-item sub-nav-all" onClick={() => setIsSidebarOpen(true)}>
            <span className="hamburger">☰</span> All
          </div>
          {subNavItems.map((item, i) => (
            <Link key={i} href={item.href} className="sub-nav-item">
              {item.label}
            </Link>
          ))}
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
      {isSearchFocused && <div className="search-backdrop" onClick={() => setIsSearchFocused(false)}></div>}
    </>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div className="navbar" style={{ height: '60px', background: '#131921' }}></div>}>
      <HeaderContent />
    </Suspense>
  );
}

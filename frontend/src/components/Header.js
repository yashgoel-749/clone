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

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname, searchParams]);

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
    let query = `/?search=${search}`;
    if (category !== "all") {
      query += `&category=${category}`;
    }
    if (typeof document !== 'undefined' && document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
    setIsSearchFocused(false);
    router.push(query);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    router.push("/");
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
            <Link href="/" className="nav-logo" onClick={handleLogoClick}>
              <div className="nav-logo-text">amazon<span>.in</span></div>
            </Link>
          </div>

          <div className="nav-location nav-item desktop-only" onClick={() => setShowLocationModal(true)}>
            <span className="nav-loc-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" fill="#fff" width="14" height="18">
                <path d="M8 0C3.6 0 0 3.4 0 7.6c0 5.7 8 12.4 8 12.4s8-6.7 8-12.4C16 3.4 12.4 0 8 0zm0 10.3c-1.5 0-2.7-1.2-2.7-2.7S6.5 4.9 8 4.9s2.7 1.2 2.7 2.7S9.5 10.3 8 10.3z"/>
              </svg>
            </span>
            <div>
              <span className="nav-loc-line1">Delivering to Mohali 160059</span>
              <span className="nav-loc-line2">Update location</span>
            </div>
          </div>

          <div className={`nav-search ${isSearchFocused ? 'nav-search-focused' : ''}`}>
            <form onSubmit={handleSearch} className="nav-search-form">
              <select
                className="nav-search-dropdown mobile-hidden"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search department"
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
                aria-label="Search"
              />
              <button type="submit" className="nav-search-btn" aria-label="Submit search">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
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

            <Link href="/cart" className="nav-item nav-cart">
              <div className="nav-cart-icon-container">
                <span className="nav-cart-count">{cartCount}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="38" height="38">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <span className="nav-item-line2 nav-cart-text desktop-only">Cart</span>
            </Link>
          </div>
        </div>

        {/* MOBILE SECOND ROW: SEARCH */}
        <div className="nav-search-row-mobile mobile-only">
           <form onSubmit={handleSearch} className="nav-search-form-mobile">
              <input 
                type="text" 
                className="nav-search-input-mobile" 
                placeholder="Search Amazon.in" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="nav-search-btn-mobile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
           </form>
        </div>

        {/* MOBILE THIRD ROW: LOCATION */}
        <div className="nav-location-row-mobile mobile-only" onClick={() => setShowLocationModal(true)}>
           <span className="nav-loc-icon">📍</span>
           <span className="nav-loc-text">Delivering to Mohali 160059</span>
        </div>
      </nav>

      <div className="sub-navbar">
        <div className="sub-nav-container">
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

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} logout={logout} />
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

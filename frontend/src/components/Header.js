"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { cartItems } = useCart();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?search=${search}`);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="amazon-header">
      <div className="container header-content">
        <Link href="/" className="logo">
          <span className="amazon-text">amazon</span>
          <span className="clone-badge">clone</span>
        </Link>

        <form onSubmit={handleSearch} className="search-bar">
          <input 
            type="text" 
            placeholder="Search Amazon Clone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        <nav className="nav-items">
          <div className="nav-account">
            <span className="nav-line-1">Hello, sign in</span>
            <span className="nav-line-2">Account & Lists</span>
          </div>

          <div className="nav-orders">
            <span className="nav-line-1">Returns</span>
            <span className="nav-line-2">& Orders</span>
          </div>

          <Link href="/cart" className="nav-cart">
            <div className="cart-icon">
              🛒
              <span className="cart-count">{cartCount}</span>
            </div>
            <span className="cart-text">Cart</span>
          </Link>
        </nav>
      </div>

    </header>
  );
}

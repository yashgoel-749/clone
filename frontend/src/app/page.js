"use client";
import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuadCard from '@/components/QuadCard';
import Footer from '@/components/Footer';
import { cardGridRows, heroSlides, carouselProducts } from '@/data/homePageData';

// ===== HERO CAROUSEL =====
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const nextSlide = () => setIndex((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 5000);
  };

  return (
    <div className="hero" onMouseEnter={() => clearInterval(timerRef.current)} onMouseLeave={resetTimer}>
      <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {heroSlides.map((slide, i) => (
          <div className="hero-slide" key={i}>
            <img className="hero-slide-bg" src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
      <div className="hero-gradient"></div>
      <button className="hero-arrow hero-arrow-left" onClick={() => { prevSlide(); resetTimer(); }}>❮</button>
      <button className="hero-arrow hero-arrow-right" onClick={() => { nextSlide(); resetTimer(); }}>❯</button>
    </div>
  );
}

// ===== SEARCH RESULT ITEM =====
function SearchResultItem({ product, onAddToCart }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFav = isInWishlist(product.id);

  const handleToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className="search-list-item" style={{ display: 'flex', gap: '20px', padding: '15px 0', borderBottom: '1px solid #ddd', position: 'relative' }}>
        <button 
          onClick={handleToggle}
          style={{
            position: 'absolute', top: '10px', left: '10px', background: 'transparent',
            border: 'none', fontSize: '20px', cursor: 'pointer', zIndex: 5,
            color: isFav ? '#e47911' : '#ccc', transform: 'scale(1.2)'
          }}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      <div className="img-wrap" style={{ width: '250px', height: '250px', flexShrink: 0, backgroundColor: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link href={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '220px', mixBlendMode: 'multiply' }} />
        </Link>
      </div>
      <div className="info-wrap" style={{ flexGrow: 1, paddingTop: '10px' }}>
        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h2 style={{ fontSize: '16px', color: '#0f1111', fontWeight: 500, lineHeight: 1.4, marginBottom: '5px' }}>{product.title} || Marketed by Retailer</h2>
        </Link>
        <div style={{ fontSize: '14px', color: '#007185', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          4.0 <span style={{ color: '#e77600', marginLeft: '4px' }}>★★★★☆</span> <span style={{ marginLeft: '4px' }}>({product.rating_count || '300+'})</span>
        </div>
        <p style={{ fontSize: '12px', color: '#565959', marginBottom: '8px' }}>300+ bought in past month</p>
        <p style={{ color: '#C7511F', fontSize: '12px', marginBottom: '4px' }}>Lowest price in 30 days</p>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '5px' }}>
          <span style={{ fontSize: '14px', position: 'relative', top: '3px' }}>₹</span>
          <span style={{ fontSize: '24px', fontWeight: '500' }}>{(product.price || 0).toLocaleString()}</span>
          <span style={{ fontSize: '12px', color: '#565959', alignSelf: 'flex-end', marginLeft: '2px', position: 'relative', top: '-4px' }}>
            M.R.P: <strike>₹{((product.price || 0) * 1.6).toFixed(0)}</strike> ({(60).toFixed(0)}% off)
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#565959', marginBottom: '8px' }}>Up to 5% back with Amazon Pay ICICI card</p>
        <p style={{ fontSize: '14px', color: '#0f1111', fontWeight: 500, marginBottom: '15px' }}>FREE delivery <span style={{ fontWeight: 'bold' }}>Tue, 31 Mar</span></p>
        <button
          onClick={(e) => { e.preventDefault(); onAddToCart({ ...product, price: product.price }); }}
          style={{
            background: '#FFD814', border: '1px solid #FCD200', borderRadius: '20px',
            padding: '8px 45px', fontSize: '13px', cursor: 'pointer',
            display: 'inline-block', boxShadow: '0 2px 5px rgba(213,217,217,.5)',
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

// ===== MAIN HOME CONTENT =====
function HomeContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || "";
  const category = searchParams.get('category') || "";
  const isSearching = search !== "" || category !== "";

  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [fallbackCategory, setFallbackCategory] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isSearching) {
      setLoadingSearch(true);
      setFallbackCategory(false);
      const query = new URLSearchParams();
      if (search) query.append("search", search);
      if (category && category !== "all") query.append("category", category);

      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?${query.toString()}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length === 0 && search && category && category !== "all") {
            return fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?search=${encodeURIComponent(search)}`)
              .then(r => r.json())
              .then(fallbackData => {
                setSearchResults(Array.isArray(fallbackData) ? fallbackData : []);
                if (Array.isArray(fallbackData) && fallbackData.length > 0) {
                  setFallbackCategory(true);
                }
              });
          } else {
            setSearchResults(Array.isArray(data) ? data : []);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingSearch(false));
    }
  }, [search, category, isSearching]);

  return (
    <div className="home-container">
      {!isSearching && <HeroCarousel />}

      <div className="main-content" style={{ marginTop: isSearching ? "20px" : "-280px" }}>
        {isSearching ? (
          <div className="search-results-page" style={{
            display: 'flex', background: '#fff', minHeight: '100vh',
            maxWidth: '1440px', margin: '0 auto', padding: '20px',
          }}>
            {/* LEFT SIDEBAR */}
            <div className="search-sidebar" style={{ width: '220px', paddingRight: '20px', flexShrink: 0, borderRight: '1px solid #ddd' }}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Brands</h4>
                {['ZEBRONICS', 'Portronics', 'Logitech', 'HP', 'Dell', 'acer', 'Ant Esports'].map(b => (
                  <label key={b} style={{ display: 'block', marginBottom: '5px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ marginRight: '8px' }} /> {b}
                  </label>
                ))}
                <span style={{ color: '#007185', fontSize: '13px', cursor: 'pointer' }}>✓ See more</span>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Customer Reviews</h4>
                <div style={{ color: '#e77600', fontSize: '16px' }}>★★★★☆ <span style={{ color: '#0f1111', fontSize: '13px' }}>&amp; Up</span></div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Price</h4>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '8px' }}>₹185 - ₹45,300+</div>
                <input type="range" min="185" max="45300" style={{ width: '100%', marginBottom: '10px' }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#0f1111' }}>
                  <li>Up to ₹300</li><li>₹300 - ₹450</li><li>₹450 - ₹800</li><li>₹800 - ₹1,400</li><li>Over ₹1,400</li>
                </ul>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Deals &amp; Discounts</h4>
                <div style={{ fontSize: '13px', marginBottom: '5px' }}>All Discounts</div>
                <div style={{ fontSize: '13px', marginBottom: '5px' }}>Today&apos;s Deals</div>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Connectivity</h4>
                {['USB', 'Bluetooth', 'Radio Frequency', 'Infrared', 'PS/2', 'Wi-Fi'].map(b => (
                  <label key={b} style={{ display: 'block', marginBottom: '5px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ marginRight: '8px' }} /> {b}
                  </label>
                ))}
              </div>
            </div>

            {/* MAIN RESULTS */}
            <div className="search-main" style={{ flexGrow: 1, paddingLeft: '20px' }}>
              <div className="search-header" style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '14px', color: '#0f1111', margin: 0 }}>Showing products near you, with fast delivery</p>
                <p style={{ fontSize: '12px', color: '#007185', margin: '0 0 10px 0' }}>See all products, across price ranges.</p>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '15px 0 5px 0' }}>Results</h2>
                <p style={{ fontSize: '12px', color: '#565959', margin: 0 }}>Check each product page for other buying options.</p>
              </div>

              {loadingSearch ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>Searching...</div>
              ) : searchResults.length === 0 ? (
                <div style={{ padding: '40px' }}>
                  <h3 style={{ fontSize: '18px' }}>No results for &quot;{search}&quot;</h3>
                  <p>Try checking your spelling or use more general terms</p>
                </div>
              ) : (
                <div className="search-list-wrapper" style={{ borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                  {fallbackCategory && (
                    <div style={{ padding: '10px 0', fontSize: '14px', color: '#c40000', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 'bold' }}>0 results in {category}.</span> Showing results for &quot;{search}&quot; in all departments instead.
                    </div>
                  )}
                  {searchResults.map(p => (
                    <SearchResultItem key={p.id} product={p} onAddToCart={addToCart} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* CARD GRID ROWS — data-driven from homePageData.js */}
            {cardGridRows.map((row, rowIdx) => (
              <div className="card-grid" key={rowIdx}>
                {row.map((card, cardIdx) => {
                  if (card.type === "signin") {
                    return (
                      <div className="card signin-card" key={cardIdx}>
                        <div className="card-title">Sign in for your best experience</div>
                        <div className="card-body">
                          <Link href="/login" className="signin-btn">Sign in securely</Link>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <QuadCard
                      key={cardIdx}
                      title={card.title}
                      items={card.items}
                      footer={card.footer}
                    />
                  );
                })}
              </div>
            ))}

            {/* PRODUCT CAROUSEL */}
            <div className="carousel-section">
              <div className="carousel-header">
                <span className="carousel-title">Starting ₹70,348 | Engineered for the road</span>
                <Link href="#" className="carousel-seeall">See all offers</Link>
              </div>
              <div className="carousel-viewport">
                <div className="carousel-track-scroll">
                  {carouselProducts.map((p) => (
                    <Link key={p.id} href={`/product/${p.id}`} className="carousel-item">
                      <img src={p.image} alt={p.title} />
                      <div className="carousel-item-title">{p.title}</div>
                      <div className="carousel-item-price">{p.price}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {!isSearching && <Footer />}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center' }}>Loading Amazon...</div>}>
      <HomeContent />
    </Suspense>
  );
}

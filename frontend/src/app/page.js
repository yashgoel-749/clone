"use client";
import React, { useEffect, useState, Suspense, useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const slides = [
    { src: "/image/makeup_pc._cb796616147_.png", alt: "Beauty & Grooming" },
    { src: "/image/mega_home_sale_bau_pc___drying_racks._cb777818991_.jpg", alt: "Home Sale" },
    { src: "/image/3._cb785734045_.jpg", alt: "Electronics" },
    { src: "/image/74._cb783716748_.jpg", alt: "Fashion Deals" },
    { src: "/image/shampoos__conditioners_pc._cb796616147_.png", alt: "Shampoos & Conditioners" },
    { src: "/image/3000x1200_5._cb784815551_.jpg", alt: "Deals" }
  ];
  const timerRef = useRef(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
        {slides.map((slide, i) => (
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
              // Fallback: broaden search to all categories
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
            display: 'flex', 
            background: '#fff',
            minHeight: '100vh',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '20px'
          }}>
            {/* LEFT SIDEBAR (MOCKED) */}
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
                <div style={{ color: '#e77600', fontSize: '16px' }}>★★★★☆ <span style={{ color: '#0f1111', fontSize: '13px' }}>& Up</span></div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Price</h4>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '8px' }}>₹185 - ₹45,300+</div>
                <input type="range" min="185" max="45300" style={{ width: '100%', marginBottom: '10px' }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#0f1111' }}>
                  <li>Up to ₹300</li>
                  <li>₹300 - ₹450</li>
                  <li>₹450 - ₹800</li>
                  <li>₹800 - ₹1,400</li>
                  <li>Over ₹1,400</li>
                </ul>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Deals & Discounts</h4>
                <div style={{ fontSize: '13px', marginBottom: '5px' }}>All Discounts</div>
                <div style={{ fontSize: '13px', marginBottom: '5px' }}>Today's Deals</div>
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

            {/* MAIN RESULTS BLOCK */}
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
                  <h3 style={{fontSize:'18px'}}>No results for "{search}"</h3>
                  <p>Try checking your spelling or use more general terms</p>
                </div>
              ) : (
                <div className="search-list-wrapper" style={{ borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                  {fallbackCategory && (
                    <div style={{ padding: '10px 0', fontSize: '14px', color: '#c40000', marginBottom: '10px' }}>
                      <span style={{fontWeight: 'bold'}}>0 results in {category}.</span> Showing results for "{search}" in all departments instead.
                    </div>
                  )}
                  {searchResults.map(p => (
                    <div key={p.id} className="search-list-item" style={{ display: 'flex', gap: '20px', padding: '15px 0', borderBottom: '1px solid #ddd' }}>
                      <div className="img-wrap" style={{ width: '250px', height: '250px', flexShrink: 0, backgroundColor: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link href={`/product/${p.id}`}>
                          <img src={p.image} alt={p.title} style={{ maxWidth: '100%', maxHeight: '220px', mixBlendMode: 'multiply' }} />
                        </Link>
                      </div>
                      <div className="info-wrap" style={{ flexGrow: 1, paddingTop: '10px' }}>
                        <Link href={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                          <h2 style={{ fontSize: '16px', color: '#0f1111', fontWeight: 500, lineHeight: 1.4, marginBottom: '5px' }}>{p.title} || Marketed by Retailer</h2>
                        </Link>
                        <div style={{ fontSize: '14px', color: '#007185', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          4.0 <span style={{ color: '#e77600', marginLeft: '4px' }}>★★★★☆</span> <span style={{ marginLeft: '4px' }}>({p.rating_count || '300+'})</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#565959', marginBottom: '8px' }}>300+ bought in past month</p>
                        <p style={{ color: '#C7511F', fontSize: '12px', marginBottom: '4px' }}>Lowest price in 30 days</p>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '5px' }}>
                          <span style={{ fontSize: '14px', position: 'relative', top: '3px' }}>₹</span>
                          <span style={{ fontSize: '24px', fontWeight: '500' }}>{(p.price || 0).toLocaleString()}</span>
                          <span style={{ fontSize: '12px', color: '#565959', alignSelf: 'flex-end', marginLeft: '2px', position: 'relative', top: '-4px' }}>
                            M.R.P: <strike>₹{((p.price || 0) * 1.6).toFixed(0)}</strike> ({(60).toFixed(0)}% off)
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#565959', marginBottom: '8px' }}>Up to 5% back with Amazon Pay ICICI card</p>
                        <p style={{ fontSize: '14px', color: '#0f1111', fontWeight: 500, marginBottom: '15px' }}>FREE delivery <span style={{ fontWeight: 'bold' }}>Tue, 31 Mar</span></p>
                        
                        <button 
                          onClick={(e) => { e.preventDefault(); addToCart({ ...p, price: p.price }); }}
                          style={{
                            background: '#FFD814',
                            border: '1px solid #FCD200',
                            borderRadius: '20px',
                            padding: '8px 45px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'inline-block',
                            boxShadow: '0 2px 5px rgba(213,217,217,.5)'
                          }}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* ROW 1 */}
            <div className="card-grid">
              <div className="card">
                <div className="card-title">Continue shopping deals</div>
                <div className="card-body">
                  <div className="quad-grid">
                    <Link href="/product/keyboard-acc-1" className="quad-item">
                      <img src="/image/81cnrbuek7l._ac_sy200_.jpg" alt="Keyboard Rest" />
                      <div className="quad-label">Keyboard accessories</div>
                    </Link>
                    <Link href="/product/mouse-pad-1" className="quad-item">
                      <img src="/image/511nzqxi0sl._ac_sy200_.jpg" alt="Mouse Pad" />
                      <div className="quad-label">Mouse pads</div>
                    </Link>
                    <Link href="/product/mech-kb-1" className="quad-item">
                      <img src="/image/71ewwwqoiql._ac_sy200_.jpg" alt="Mechanical Keyboard" />
                      <div className="quad-label">Mechanical keyboards</div>
                    </Link>
                    <Link href="/product/wrist-rest-1" className="quad-item">
                      <img src="/image/41yffsrplzl._ac_sy200_.jpg" alt="Wrist Rest" />
                      <div className="quad-label">Wrist rest sets</div>
                    </Link>
                  </div>
                </div>
                <div className="card-footer"><Link href="#">See more deals</Link></div>
              </div>
              <div className="card">
                <div className="card-title">Deals related to items you've saved</div>
                <div className="card-body">
                  <div className="quad-grid">
                    <Link href="/product/tshirt-1" className="quad-item">
                      <img src="/image/61dpajs_afl._ac_sy200_.jpg" alt="T-Shirt" />
                      <div className="quad-label">Men's T-Shirts</div>
                    </Link>
                    <Link href="/product/tees-1" className="quad-item">
                      <img src="/image/61edij1btcl._ac_sy200_.jpg" alt="T-Shirt" />
                      <div className="quad-label">Full sleeve tees</div>
                    </Link>
                    <Link href="/product/waffle-1" className="quad-item">
                      <img src="/image/61eksarcwml._ac_sy200_.jpg" alt="Polo" />
                      <div className="quad-label">Waffle T-Shirts</div>
                    </Link>
                    <Link href="/product/zip-tee-1" className="quad-item">
                      <img src="/image/61pt8xmtiol._ac_sy200_.jpg" alt="Zip Tee" />
                      <div className="quad-label">Zip neck tees</div>
                    </Link>
                  </div>
                </div>
                <div className="card-footer"><Link href="#">See more deals</Link></div>
              </div>
              <div className="card">
                <div className="card-title">Appliances for your home | Up to 55% off</div>
                <div className="card-body">
                  <div className="quad-grid">
                    <Link href="/product/ac-1" className="quad-item">
                      <img src="/image/appliances_qc_pc_186x116__b07g5j5fyp._sy116_cb667322346_.jpg" alt="ACs" />
                      <div className="quad-label">Air conditioners</div>
                    </Link>
                    <Link href="/product/fridge-1" className="quad-item">
                      <img src="/image/appliances_qc_pc_186x116__b08345r1zw._sy116_cb667322346_.jpg" alt="Refrigerators" />
                      <div className="quad-label">Refrigerators</div>
                    </Link>
                    <Link href="/product/micro-1" className="quad-item">
                      <img src="/image/appliances_qc_pc_186x116__b08rdl6h79._sy116_cb667322346_.jpg" alt="Microwaves" />
                      <div className="quad-label">Microwaves</div>
                    </Link>
                    <Link href="/product/wm-1" className="quad-item">
                      <img src="/image/186x116___wm._sy116_cb667322346_.jpg" alt="Washing machines" />
                      <div className="quad-label">Washing machines</div>
                    </Link>
                  </div>
                </div>
                <div className="card-footer"><Link href="#">See more</Link></div>
              </div>
              <div className="card signin-card">
                <div className="card-title">Sign in for your best experience</div>
                <div className="card-body">
                  <Link href="/login" className="signin-btn">Sign in securely</Link>
                </div>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="card-grid">
              <div className="card">
                <div className="card-title">Revamp your home in style</div>
                <div className="card-body">
                  <div className="quad-grid">
                    <Link href="/product/shoe-rack-1" className="quad-item"> {/* Updated to Nilkamal Example */}
                      <img src="/image/186x116_home_storage_1._sy116_cb555624324_.jpg" alt="Storage" />
                      <div className="quad-label">Home storage & Racks</div>
                    </Link>
                    <Link href="/product/cushion-1" className="quad-item">
                      <img src="/image/186x116_home_decor_1._sy116_cb555624324_.jpg" alt="Cushions" />
                      <div className="quad-label">Cushion covers & more</div>
                    </Link>
                    <Link href="/product/vases-1" className="quad-item">
                      <img src="/image/186x116_home_furnishings_2._sy116_cb555624324_.jpg" alt="Decor" />
                      <div className="quad-label">Figurines, vases & more</div>
                    </Link>
                    <Link href="/product/lighting-1" className="quad-item">
                      <img src="/image/186x116_home_lighting_2._sy116_cb555624324_.jpg" alt="Lighting" />
                      <div className="quad-label">Lighting solutions</div>
                    </Link>
                  </div>
                </div>
                <div className="card-footer"><Link href="#">Explore all</Link></div>
              </div>

              <div className="card">
                <div className="card-title">Starting ₹49 | Deals on home essentials</div>
                <div className="card-body">
                  <div className="quad-grid">
                    <Link href="/product/cleaning-1" className="quad-item"><img src="/image/shower_heads_low_res_v1._sy116_cb549138744_.jpg" alt="Cleaning" /><div className="quad-label">Cleaning supplies</div></Link>
                    <Link href="/product/bath-1" className="quad-item"><img src="/image/wipes_low_res_v1._sy116_cb549138744_.jpg" alt="Bath" /><div className="quad-label">Bathroom accessories</div></Link>
                    <Link href="/product/tools-1" className="quad-item"><img src="/image/tools_low_res_v1._sy116_cb549138744_.jpg" alt="Tools" /><div className="quad-label">Home tools</div></Link>
                    <Link href="/product/wallpapers-1" className="quad-item"><img src="/image/wallpapers_low_res_v1._sy116_cb549138744_.jpg" alt="Wallpaper" /><div className="quad-label">Wallpapers</div></Link>
                  </div>
                </div>
                <div className="card-footer"><Link href="#">Explore all</Link></div>
              </div>
              <div className="card">
                <div className="card-title">Automotive essentials | Up to 60% off</div>
                <div className="card-body">
                  <div className="quad-grid">
                    <Link href="/product/automotive-cleaning-1" className="quad-item"><img src="/image/glasscare1x._sy116_cb410830553_.jpg" alt="Glass Care" /><div className="quad-label">Cleaning accessories</div></Link>
                    <Link href="/product/tire-care-1" className="quad-item"><img src="/image/rim_tyrecare1x._sy116_cb410830552_.jpg" alt="Tyre Care" /><div className="quad-label">Tyre & rim care</div></Link>
                    <Link href="/product/helmet-1" className="quad-item"><img src="/image/vega_helmet_186x116._sy116_cb405090404_.jpg" alt="Helmets" /><div className="quad-label">Helmets</div></Link>
                    <Link href="/product/vacuum-1" className="quad-item"><img src="/image/vaccum1x._sy116_cb410830552_.jpg" alt="Vacuum" /><div className="quad-label">Vacuum cleaner</div></Link>
                  </div>
                </div>
                <div className="card-footer"><Link href="#">See more</Link></div>
              </div>
              <div className="card">
                <div className="card-title">Starting ₹199 | Amazon Brands & more</div>
                <div className="card-body">
                  <div className="quad-grid">
                    <Link href="/product/bedsheet-1" className="quad-item"><img src="/image/pc_qc_home_size_186_1._sy116_cb567468236_.jpg" alt="Bedsheets" /><div className="quad-label">Starting ₹199 | Bedsheets</div></Link>
                    <Link href="/product/curtain-1" className="quad-item"><img src="/image/pc_qc_home_size_186_2._sy116_cb567468236_.jpg" alt="Curtains" /><div className="quad-label">Starting ₹199 | Curtains</div></Link>
                    <Link href="/product/ironing-1" className="quad-item"><img src="/image/pc_qc_home_size_186_3._sy116_cb567468236_.jpg" alt="Ironing" /><div className="quad-label">Min 40% off | Ironing & more</div></Link>
                    <Link href="/product/decor-1" className="quad-item"><img src="/image/pc_qc_home_size_186_4._sy116_cb567468236_.jpg" alt="Decor" /><div className="quad-label">Up to 60% off | Home decor</div></Link>
                  </div>
                </div>
                <div className="card-footer"><Link href="#">See more</Link></div>
              </div>
            </div>

            {/* CAROUSEL 1 */}
            <div className="carousel-section">
              <div className="carousel-header">
                <span className="carousel-title">Starting ₹70,348 | Engineered for the road</span>
                <Link href="#" className="carousel-seeall">See all offers</Link>
              </div>
              <div className="carousel-viewport">
                <div className="carousel-track-scroll">
                  <Link href="/product/harley-1" className="carousel-item"><img src="/image/619zwdlnnbl._ac_sy200_.jpg" alt="Harley Davidson" /><div className="carousel-item-title">HARLEY-DAVIDSON X440 S Matte Black</div><div className="carousel-item-price">₹2,29,500</div></Link>
                  <Link href="/product/harley-2" className="carousel-item"><img src="/image/71v61d8jm9l._ac_sy200_.jpg" alt="Harley Red" /><div className="carousel-item-title">HARLEY-DAVIDSON X440 Vivid Metallic Thick Red</div><div className="carousel-item-price">₹2,39,500</div></Link>
                  <Link href="/product/harley-3" className="carousel-item"><img src="/product/harley-3" alt="Harley Orange" /><div className="carousel-item-title">HARLEY-DAVIDSON X440 S Baja Orange</div><div className="carousel-item-price">₹2,29,500</div></Link>
                  <Link href="/product/ktm-1" className="carousel-item"><img src="/image/61163l3zeyl._ac_sy200_.jpg" alt="KTM RC 200" /><div className="carousel-item-title">KTM RC 200 Bike Black</div><div className="carousel-item-price">₹2,17,272</div></Link>
                  <Link href="/product/ktm-2" className="carousel-item"><img src="/image/61zcrvey5al._ac_sy200_.jpg" alt="KTM Duke" /><div className="carousel-item-title">KTM Duke 200 Dark Galvano</div><div className="carousel-item-price">₹2,01,546</div></Link>
                  <Link href="/product/hero-1" className="carousel-item"><img src="/image/71rcj8dgb_l._ac_sy200_.jpg" alt="Hero Xtreme" /><div className="carousel-item-title">Hero MotoCorp XTREME 125R</div><div className="carousel-item-price">₹95,000</div></Link>
                  <Link href="/product/bajaj-1" className="carousel-item"><img src="/image/51uaspahpfl._ac_sy200_.jpg" alt="Bajaj Avenger" /><div className="carousel-item-title">Bajaj Avenger 220 Cruise Moon White</div><div className="carousel-item-price">₹1,42,797</div></Link>
                  <Link href="/product/pulsar-1" className="carousel-item"><img src="/image/512jq_6xadl._ac_sy200_.jpg" alt="Pulsar RS" /><div className="carousel-item-title">Bajaj Pulsar RS 200 White</div><div className="carousel-item-price">₹1,72,644</div></Link>
                </div>
              </div>
            </div>
          </>
        )}



        {!isSearching && (
          <div className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</div>
        )}
      </div>

      {!isSearching && (
        <footer className="footer-links">
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-col-title">Get to Know Us</div>
              <ul>
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Press Releases</Link></li>
                <li><Link href="#">Amazon Science</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Connect with Us</div>
              <ul>
                <li><Link href="#">Facebook</Link></li>
                <li><Link href="#">Twitter</Link></li>
                <li><Link href="#">Instagram</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Make Money with Us</div>
              <ul>
                <li><Link href="#">Sell on Amazon</Link></li>
                <li><Link href="#">Become an Affiliate</Link></li>
                <li><Link href="#">Fulfilment by Amazon</Link></li>
                <li><Link href="#">Advertise Your Products</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Let Us Help You</div>
              <ul>
                <li><Link href="#">Your Account</Link></li>
                <li><Link href="#">Returns Centre</Link></li>
                <li><Link href="#">100% Purchase Protection</Link></li>
                <li><Link href="#">Help</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      )}
      {!isSearching && (
        <div className="footer-bottom">
          <div className="footer-logo">amazon<span>.in</span></div>
          <div className="footer-legal">
            <Link href="#">Conditions of Use</Link>
            <Link href="#">Privacy Notice</Link>
            <Link href="#">Interest-Based Ads</Link>
          </div>
          <div className="footer-legal">© 1996-2026, Amazon.com, Inc. or its affiliates</div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{padding:'50px', textAlign:'center'}}>Loading Amazon...</div>}>
      <HomeContent />
    </Suspense>
  );
}
 

'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getProduct, getRelatedProducts } from '@/data/productData';
import Link from 'next/link';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const relatedScrollRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Try API first, fallback to local data
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setProduct(getProduct(id));
        }
      } catch {
        setProduct(getProduct(id));
      }
      setLoading(false);
      setActiveImage(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    };
    if (id) fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    router.push('/cart');
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };

  if (loading) return (
    <div className="pdp-loading">
      <div className="pdp-spinner"></div>
    </div>
  );
  if (!product) return <div className="pdp-error">Product not found.</div>;

  const images = product.images || ["/image/loading_4x_gray._cb485916689_.gif"];
  const related = getRelatedProducts(id, 8);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.3;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <span className="pdp-stars-display">
        {'★'.repeat(full)}
        {half && <span className="pdp-half-star">★</span>}
        {'☆'.repeat(empty)}
      </span>
    );
  };

  return (
    <div className="pdp-page">
      <div className="pdp-container">
        {/* Breadcrumbs */}
        <div className="a-breadcrumbs">
          <Link href="/">Home</Link> &rsaquo; 
          <Link href={`/?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> &rsaquo; 
          <Link href="#">{product.sub_category || product.subCategory || "Essentials"}</Link>
        </div>

        <div className="pdp-main-grid">
          {/* ===== LEFT: IMAGE GALLERY ===== */}
          <div className="pdp-left">
            <div className="pdp-image-section">
              <div className="pdp-thumbnails">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`pdp-thumb ${activeImage === idx ? 'pdp-thumb-active' : ''}`}
                    onMouseEnter={() => setActiveImage(idx)}
                  >
                    <img src={img} alt={`View ${idx + 1}`} />
                  </div>
                ))}
              </div>
              <div className="a-pdp-main-img" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', flexGrow: 1 }}>
                <button 
                  onClick={() => setActiveImage(activeImage > 0 ? activeImage - 1 : images.length - 1)}
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #ddd', borderRadius: '50%', width: '45px', height: '45px', fontSize: '20px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
                  aria-label="Previous image"
                >
                  ❮
                </button>
                <img src={images[activeImage]} alt={product.title} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', zIndex: 1 }} />
                <button 
                  onClick={() => setActiveImage(activeImage < images.length - 1 ? activeImage + 1 : 0)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #ddd', borderRadius: '50%', width: '45px', height: '45px', fontSize: '20px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
                  aria-label="Next image"
                >
                  ❯
                </button>
                <p style={{fontSize: '11px', color: '#565959', marginTop: '15px', textAlign: 'center'}}>Click image to open expanded view</p>
              </div>
            </div>

            {/* Ask Rufus */}
            <div className="pdp-rufus">
              <div className="pdp-rufus-header">✨ Ask Rufus</div>
              <div className="pdp-rufus-chips">
                <div className="pdp-rufus-chip">Is this product worth buying?</div>
                <div className="pdp-rufus-chip">What are the key features?</div>
                <div className="pdp-rufus-chip">Compare with alternatives</div>
              </div>
              <div className="pdp-rufus-input">Ask something else</div>
            </div>
          </div>

          {/* ===== CENTER: PRODUCT INFO ===== */}
          <div className="pdp-center">
            <h1 className="pdp-title">{product.title}</h1>
            <div className="pdp-brand-link">
              Visit the <span className="pdp-brand-name">{product.brand}</span> Store
            </div>

            <div className="pdp-rating-row">
              <span className="pdp-rating-value">{product.rating}</span>
              {renderStars(product.rating)}
              <span className="pdp-rating-count">{product.ratingCount} ratings</span>
              <span className="pdp-rating-sep">|</span>
              <span className="pdp-search-page">Search this page</span>
            </div>

            {parseInt(product.discount) >= 20 && (
              <div className="pdp-deal-badge">Limited time deal</div>
            )}

            <div className="pdp-price-section">
              <div className="pdp-price-row">
                {parseInt(product.discount) > 0 && (
                  <span className="pdp-discount">-{product.discount}%</span>
                )}
                <span className="pdp-price-symbol">₹</span>
                <span className="pdp-price-whole">{product.price.toLocaleString('en-IN')}</span>
              </div>
              {parseInt(product.discount) > 0 && (
                <div className="pdp-mrp">
                  M.R.P.: <span className="pdp-mrp-strike">₹{product.mrp.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="pdp-tax-note">Inclusive of all taxes</div>
              {product.price >= 3000 && (
                <div className="pdp-emi-note">
                  EMI starts at ₹{Math.ceil(product.price / 12).toLocaleString('en-IN')}. No Cost EMI available{' '}
                  <span className="pdp-link-teal">EMI options ›</span>
                </div>
              )}
            </div>

            {/* Offers */}
            {product.offers && product.offers.length > 0 && (
              <div className="pdp-offers-section">
                <div className="pdp-offers-header">
                  <span className="pdp-offers-icon">✨</span> Offers
                </div>
                <div className="pdp-offers-grid">
                  {product.offers.map((offer, i) => (
                    <div className="pdp-offer-card" key={i}>
                      <div className="pdp-offer-title">{offer.title}</div>
                      <div className="pdp-offer-text">{offer.text}</div>
                      <div className="pdp-offer-link">{offer.link} ›</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Icons */}
            <div className="pdp-services">
              <div className="pdp-service-item">
                <div className="pdp-service-icon">🚚</div>
                <span>Free Delivery</span>
              </div>
              <div className="pdp-service-item">
                <div className="pdp-service-icon">🔄</div>
                <span>10 Days Replacement</span>
              </div>
              <div className="pdp-service-item">
                <div className="pdp-service-icon">🛡️</div>
                <span>{product.warranty || "1 Year Warranty"}</span>
              </div>
              <div className="pdp-service-item">
                <div className="pdp-service-icon">⭐</div>
                <span>Top Brand</span>
              </div>
              <div className="pdp-service-item">
                <div className="pdp-service-icon">🔒</div>
                <span>Secure Payment</span>
              </div>
            </div>

            <div className="pdp-divider"></div>

            {/* About this item */}
            {product.features && product.features.length > 0 && (
              <div className="pdp-about">
                <h2>About this item</h2>
                <ul className="pdp-feature-list">
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pdp-divider"></div>

            {/* Product details / specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="pdp-specs">
                <h2>Product details</h2>
                <table className="pdp-specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key}>
                        <th>{key}</th>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ===== RIGHT: BUY BOX ===== */}
          <div className="pdp-right">
            <div className="pdp-buybox">
              <div className="pdp-buybox-price">
                <span className="pdp-price-symbol">₹</span>
                <span className="pdp-price-whole">{product.price.toLocaleString('en-IN')}</span>
              </div>

              <div className="pdp-buybox-delivery">
                <strong>FREE delivery</strong>{' '}
                <strong>{product.deliveryDate || "Monday, 31 March"}</strong>
              </div>

              <div className="pdp-buybox-location">
                <span className="pdp-link-teal">📍 Deliver to your location</span>
              </div>

              <div className="pdp-buybox-stock">In stock</div>

              <div className="pdp-buybox-seller">
                Ships from <strong>Amazon</strong>
                <br />
                Sold by <strong>{product.seller || product.brand}</strong>
              </div>

              <select
                className="pdp-buybox-qty"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>Quantity: {n}</option>
                ))}
              </select>

              <button className="pdp-btn-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="pdp-btn-buy" onClick={handleBuyNow}>
                Buy Now
              </button>

              <div className="pdp-buybox-misc" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button 
                  onClick={() => toggleWishlist(product)}
                  style={{ 
                    background: 'transparent', border: 'none', cursor: 'pointer', 
                    fontSize: '32px', padding: '10px', transition: 'transform 0.2s',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  {isInWishlist(product.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="pdp-buybox-secure">
                <span>🔒</span> Secure transaction
              </div>
            </div>

            {/* Amazon Business Promo */}
            <div className="pdp-biz-promo">
              <div className="pdp-biz-title">
                <span style={{ color: '#e47911', fontWeight: 700 }}>amazon</span> business
              </div>
              <div className="pdp-biz-sub">
                Save up to 15% on this product with business pricing and GST input tax credit.
              </div>
              <button className="pdp-biz-btn">Create a free account</button>
            </div>
          </div>
        </div>

        {/* ===== SIMILAR PRODUCTS ===== */}
        {related.length > 0 && (
          <div className="pdp-related-section">
            <h2 className="pdp-related-title">Products related to this item</h2>
            <div className="pdp-related-scroll" ref={relatedScrollRef}>
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="pdp-related-card"
                >
                  <div className="pdp-related-img">
                    <img src={item.images[0]} alt={item.title} />
                  </div>
                  <div className="pdp-related-info">
                    <div className="pdp-related-name">{item.title.slice(0, 60)}…</div>
                    <div className="pdp-related-rating">
                      {'★'.repeat(Math.floor(item.rating))}
                      {'☆'.repeat(5 - Math.floor(item.rating))}
                      <span> ({item.ratingCount})</span>
                    </div>
                    <div className="pdp-related-price">
                      <span className="pdp-price-symbol">₹</span>
                      {item.price.toLocaleString('en-IN')}
                      {parseInt(item.discount) > 0 && (
                        <span className="pdp-related-mrp">
                          ₹{item.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

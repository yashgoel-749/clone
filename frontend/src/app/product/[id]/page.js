'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/cart');
  };

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!product) return <div className="error-container">Product not found.</div>;

  const images = product.images || [product.image];

  return (
    <div className="product-page-root">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link href="/">Home</Link> &rsaquo; 
          <Link href={`/?category=${product.category}`}>{product.category}</Link> &rsaquo;
          <span>{product.title.split(',')[0]}</span>
        </div>

        <div className="product-main-layout">
          {/* Left: Image Carousel Sidebar */}
          <div className="image-carousel-container">
            <div className="thumbnail-list">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail-item ${activeImage === idx ? 'active' : ''}`}
                  onMouseEnter={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`Thumb ${idx}`} />
                </div>
              ))}
            </div>
            <div className="main-image-view">
              <img src={images[activeImage]} alt={product.title} />
            </div>
          </div>

          {/* Middle: Info & Specs */}
          <div className="product-info-column">
            <h1 className="product-title-large">{product.title}</h1>
            <div className="brand-link">Visit the Store</div>
            
            <div className="rating-row">
              <span className="stars">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="rating-count">{product.rating} ratings</span>
              <span className="divider">|</span>
              <span className="answered-questions">Search this page</span>
            </div>

            <hr className="info-divider" />

            <div className="price-display">
              <span className="price-symbol">$</span>
              <span className="price-whole">{Math.floor(product.price)}</span>
              <span className="price-fraction">{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
            </div>
            <div className="returns-badge">FREE Returns</div>

            <div className="about-section">
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>

            {product.specs && (
              <div className="specs-section">
                <h3>Product Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key}>
                        <td className="spec-key">{key}</td>
                        <td className="spec-val">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right: Buy Box Sidebar */}
          <div className="buy-box-column">
            <div className="buy-card">
              <div className="buy-price">${product.price.toLocaleString()}</div>
              <div className="delivery-info">
                FREE delivery <span className="bold-text">Tomorrow</span>. 
                Order within <span className="green-text">5 hrs 20 mins</span>.
              </div>
              <div className="location-selector">
                📍 Deliver to your location
              </div>
              <div className="stock-status">In Stock</div>
              
              <div className="quantity-select">
                <span>Quantity: 1</span>
              </div>

              <div className="button-group">
                <button className="add-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
              </div>

              <div className="secure-info">
                <span>🔒</span> Secure transaction
              </div>
              
              <div className="ship-info">
                <div className="ship-row"><span>Ships from</span> <span>Amazon Clone</span></div>
                <div className="ship-row"><span>Sold by</span> <span>Amazon Clone</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-page-root {
          background-color: white;
          min-height: 100vh;
          padding-bottom: 50px;
        }
        .breadcrumbs {
          font-size: 12px;
          color: #565959;
          padding: 15px 0;
        }
        .breadcrumbs a {
          color: #565959;
          text-decoration: none;
          margin: 0 5px;
        }
        .breadcrumbs a:hover {
          text-decoration: underline;
          color: #c45500;
        }
        
        .product-main-layout {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 20px;
          margin-top: 10px;
        }

        /* Image Carousel */
        .image-carousel-container {
          display: flex;
          gap: 15px;
        }
        .thumbnail-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .thumbnail-item {
          width: 45px;
          height: 45px;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          overflow: hidden;
          padding: 2px;
        }
        .thumbnail-item.active {
          border: 2px solid #e77600;
          box-shadow: 0 0 3px 2px rgba(228, 121, 17, .5);
        }
        .thumbnail-item img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .main-image-view {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          max-height: 500px;
        }
        .main-image-view img {
          max-width: 100%;
          max-height: 500px;
          object-fit: contain;
        }

        /* Info Column */
        .product-title-large {
          font-size: 24px;
          font-weight: 500;
          line-height: 1.3;
          margin-bottom: 5px;
        }
        .brand-link {
          font-size: 14px;
          color: #007185;
          cursor: pointer;
          margin-bottom: 10px;
        }
        .rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
        .stars { color: #ffa41c; }
        .rating-count, .answered-questions { color: #007185; cursor: pointer; }
        .info-divider { border: 0; border-top: 1px solid #ddd; margin: 15px 0; }
        
        .price-display {
          display: flex;
          align-items: flex-start;
          color: #0f1111;
        }
        .price-symbol { font-size: 13px; margin-top: 5px; }
        .price-whole { font-size: 28px; font-weight: 500; }
        .price-fraction { font-size: 13px; margin-top: 5px; }
        .returns-badge { font-size: 14px; color: #565959; margin-top: 5px; }

        .about-section h3, .specs-section h3 {
          font-size: 16px;
          font-weight: 700;
          margin: 20px 0 10px 0;
        }
        .about-section p {
          font-size: 14px;
          line-height: 1.5;
        }
        .specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .spec-key {
          padding: 8px;
          font-weight: 700;
          width: 40%;
          color: #0f1111;
        }
        .spec-val { padding: 8px; color: #565959; }

        /* Buy Box */
        .buy-card {
          border: 1px solid #d5d9d9;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .buy-price { font-size: 28px; color: #0f1111; }
        .delivery-info { font-size: 14px; line-height: 1.4; }
        .bold-text { font-weight: 700; }
        .green-text { color: #007600; }
        .stock-status { font-size: 18px; color: #007600; }
        .button-group { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
        
        .add-cart-btn {
          background-color: #ffd814;
          border: 1px solid #fcd200;
          border-radius: 20px;
          padding: 10px;
          cursor: pointer;
          font-size: 14px;
        }
        .add-cart-btn:hover { background-color: #f7ca00; }
        
        .buy-now-btn {
          background-color: #ffa41c;
          border: 1px solid #ff8f00;
          border-radius: 20px;
          padding: 10px;
          cursor: pointer;
          font-size: 14px;
        }
        .buy-now-btn:hover { background-color: #f3a847; }
        
        .secure-info { font-size: 14px; color: #007185; display: flex; align-items: center; gap: 5px; }
        .ship-info { font-size: 12px; color: #565959; display: flex; flex-direction: column; gap: 4px; }
        .ship-row { display: flex; justify-content: space-between; }

        .loading-container { height: 80vh; display: flex; align-items: center; justify-content: center; }
        .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #febd69; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        @media (max-width: 1024px) {
          .product-main-layout { grid-template-columns: 1fr; }
          .image-carousel-container { flex-direction: column-reverse; align-items: center; }
          .thumbnail-list { flex-direction: row; }
        }
      `}</style>
    </div>
  );
}

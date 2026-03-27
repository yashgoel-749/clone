"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/cart');
  };

  if (loading) return <div className="loading">Loading Product Details...</div>;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <div className="container product-details-page">
      <div className="product-image-section">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-info-section">
        <h1>{product.title}</h1>
        <div className="link-text">Visit the store</div>
        <div className="rating">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
          <span className="rating-num">({product.rating} ratings)</span>
        </div>
        <hr />
        
        <div className="price-section">
          <span className="price-label">Price:</span>
          <span className="price-value">${product.price.toLocaleString()}</span>
          <span className="price-returns"> & FREE Returns</span>
        </div>

        <div className="details-list">
          <h3>About this item:</h3>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="product-buy-section">
        <div className="buy-box">
          <div className="price-value">${product.price.toLocaleString()}</div>
          <div className="delivery-info">FREE delivery <strong>Tomorrow</strong>. Order within <strong>1 hr 5 mins</strong>.</div>
          <div className="stock-info">In Stock.</div>
          
          <button className="btn-primary buy-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="btn-secondary buy-btn" onClick={handleBuyNow}>Buy Now</button>
          
          <div className="buy-secure">
            <span>🔒</span> Secure transaction
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-details-page {
          display: flex;
          gap: 3rem;
          padding-top: 2rem;
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
        }

        .product-image-section {
          flex: 1.5;
          display: flex;
          justify-content: center;
        }

        .product-image-section img {
          max-width: 100%;
          max-height: 500px;
          object-fit: contain;
        }

        .product-info-section {
          flex: 2;
        }

        .product-info-section h1 {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .link-text {
          font-size: 0.9rem;
          color: var(--link-color);
          margin-bottom: 0.5rem;
        }

        .rating {
          color: #ffa41c;
          margin-bottom: 1rem;
        }

        .rating-num {
          margin-left: 0.5rem;
          color: var(--link-color);
        }

        hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 1.5rem 0;
        }

        .price-label {
          color: var(--text-secondary);
          margin-right: 0.5rem;
        }

        .price-value {
          font-size: 1.5rem;
          color: var(--error);
        }

        .price-returns {
          color: var(--link-color);
          font-size: 0.9rem;
        }

        .details-list h3 {
          font-size: 1rem;
          margin: 1rem 0;
        }

        .product-buy-section {
          flex: 1;
        }

        .buy-box {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .buy-box .price-value {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .delivery-info {
          font-size: 0.9rem;
        }

        .stock-info {
          font-size: 1.2rem;
          color: var(--success);
        }

        .buy-btn {
          padding: 0.8rem;
          width: 100%;
        }

        .buy-secure {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .loading, .error {
          padding: 5rem;
          text-align: center;
          font-size: 1.5rem;
        }

        @media (max-width: 1024px) {
          .product-details-page {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

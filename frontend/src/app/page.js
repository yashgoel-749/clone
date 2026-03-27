"use client";
import React, { useEffect, useState, Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || "";
  const category = searchParams.get('category') || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/products?search=${search}&category=${category}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  return (
    <div className="container product-grid">
      {loading ? (
        <div className="loading">Loading Amazing Products...</div>
      ) : products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="no-products">No products found matching your search.</div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to Amazon Clone</h1>
          <p>Discover Amazing deals on Electronics and Gadgets!</p>
        </div>
      </div>

      <Suspense fallback={<div className="container loading">Loading...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}

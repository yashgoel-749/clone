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

  // Robust Mock Data specifically for high-fidelity demonstration
  const MOCK_DATA = {
    "shoe-rack-1": {
      id: "shoe-rack-1",
      title: "Nilkamal Churchill 2 Door Engineered Wood Shoe Cabinet| Shoe Rack | Shoe Stand with 6-Shelf Compatible Upto 12 Pairs of Shoes (Classic Walnut)",
      category: "Home Storage & Organisation",
      subCategory: "Shoe Organization",
      brand: "Nilkamal",
      price: 5490,
      mrp: 8500,
      discount: "35%",
      rating: 3.7,
      ratingCount: 49,
      images: [
        "/image/nilkamal_shoe_rack_main.jpg",
        "/image/nilkamal_shoe_rack_1.jpg",
        "/image/nilkamal_shoe_rack_2.jpg",
        "/image/nilkamal_shoe_rack_3.jpg",
        "/image/nilkamal_shoe_rack_4.jpg"
      ],
      description: "Engineered wood construction with a classic walnut finish. Features 6 shelves capable of holding up to 12 pairs of shoes. Sleek 2-door design with elegant handles.",
      specs: {
        "Brand": "Nilkamal",
        "Material": "Engineered Wood",
        "Color": "Classic Walnut",
        "Capacity": "Up to 12 Pairs",
        "Dimensions": "60 x 30 x 115 Centimeters",
        "Finish Type": "Classic Walnut",
        "Mounting Type": "Floor Mount"
      },
      offers: [
        { title: "No Cost EMI", text: "Upto ₹551.24 EMI interest savings on...", link: "3 offers" },
        { title: "Cashback", text: "Upto ₹164.00 cashback as Amazon Pay...", link: "1 offer" },
        { title: "Bank Offer", text: "Upto ₹1,000.00 discount on select...", link: "33 offers" }
      ]
    },
    // Default fallback for other IDs
    "default": {
      id: "default",
      title: "Amazon Brand - Solimo 100% Cotton Oversized T-Shirt Unisex Drop Shoulder Dye Washed Street Look Black Pack of 1",
      category: "Men's Fashion",
      subCategory: "Clothing",
      brand: "Solimo",
      price: 350,
      mrp: 999,
      discount: "65%",
      rating: 4.2,
      ratingCount: "1,240",
      images: [
        "/image/61dpajs_afl._ac_sy200_.jpg",
        "/image/61edij1btcl._ac_sy200_.jpg",
        "/image/61eksarcwml._ac_sy200_.jpg"
      ],
      description: "Premium cotton oversized t-shirt for ultimate comfort and street style. Durable dye washed finish.",
      specs: {
        "Brand": "Solimo",
        "Fabric": "100% Cotton",
        "Fit": "Oversized",
        "Style": "Drop Shoulder",
        "Pattern": "Dye Washed",
        "Pack Size": "1"
      },
      offers: [
        { title: "No Cost EMI", text: "Avail No Cost EMI on select cards...", link: "1 offer" },
        { title: "Bank Offer", text: "Flat ₹50 instant discount on...", link: "5 offers" }
      ]
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Try to fetch from real API, fallback to mock data
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) {
           const mock = MOCK_DATA[id] || MOCK_DATA["default"];
           setProduct(mock);
        } else {
           const data = await res.json();
           setProduct(data);
        }
        setLoading(false);
      } catch (error) {
        setProduct(MOCK_DATA[id] || MOCK_DATA["default"]);
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
    <div className="a-pdp-page">
      <div className="a-pdp-container">
        {/* Breadcrumbs */}
        <div className="a-breadcrumbs">
          <Link href="/">Home</Link> &rsaquo; 
          <Link href={`/?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> &rsaquo; 
          <Link href="#">{product.sub_category || product.subCategory || "Essentials"}</Link>
        </div>

        <div className="a-pdp-main-grid">
          {/* LEFT: IMAGES & RUFUS */}
          <div className="a-pdp-left">
            <div className="a-pdp-image-section">
              <div className="a-pdp-thumbnails">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`a-pdp-thumb ${activeImage === idx ? 'active' : ''}`}
                    onMouseEnter={() => setActiveImage(idx)}
                  >
                    <img src={img} alt={`Thumb ${idx}`} />
                  </div>
                ))}
              </div>
              <div className="a-pdp-main-img">
                <img src={images[activeImage]} alt={product.title} />
                <p style={{fontSize: '11px', color: '#565959', marginTop: '10px'}}>Click to see full view</p>
              </div>
            </div>

            <div className="a-ask-rufus">
               <div className="a-rufus-header">✨ Ask Rufus</div>
               <div className="a-rufus-chips">
                  <div className="a-rufus-chip">Does it require assembly?</div>
                  <div className="a-rufus-chip">Is it made of wood?</div>
                  <div className="a-rufus-chip">Can it be used for boots?</div>
               </div>
               <div className="a-rufus-input-box">Ask something else</div>
            </div>
          </div>

          {/* CENTER: PRODUCT INFO */}
          <div className="a-pdp-center">
            <h1 className="a-pdp-title">{product.title}</h1>
            <div className="a-pdp-brand-link">Visit the {product.brand || "Amazon"} Store</div>
            
            <div className="a-pdp-rating">
               <span className="a-pdp-stars">{"★".repeat(Math.floor(product.rating)) || "★★★★"}{"☆".repeat(5 - Math.floor(product.rating)) || "☆"}</span>
               <span style={{color: '#007185'}}>{product.ratingCount || "0"} ratings</span>
               <span style={{color: '#ddd'}}>|</span>
               <span style={{color: '#007185'}}>Search this page</span>
            </div>

            <div className="a-pdp-deal-badge">Limited time deal</div>
            
            <div className="a-pdp-price-row">
               <span className="a-pdp-discount">-{product.discount || "20%"}</span>
               <span className="a-pdp-price-main">₹{product.price.toLocaleString()}</span>
               <span style={{fontSize: '13px', color: '#007185'}}>Price history</span>
            </div>
            <div className="a-pdp-mrp">M.R.P.: ₹{product.mrp?.toLocaleString() || (product.price * 1.5).toLocaleString()}</div>
            
            <div style={{fontSize: '12px', marginBottom: '10px'}}>Inclusive of all taxes</div>
            <div style={{fontSize: '14px', fontWeight: '700', color: '#0f1111'}}>EMI starts at ₹193. No Cost EMI available <span style={{color: '#007185'}}>EMI options ❯</span></div>

            <div className="a-pdp-offers-section">
               <div style={{display: 'flex', alignItems:'center', gap: '5px', fontWeight: '700', marginBottom: '10px'}}><span style={{color: '#e47911'}}>✨</span> Offers</div>
               <div className="a-offers-grid">
                  {product.offers?.map((offer, i) => (
                    <div className="a-offer-card" key={i}>
                       <div className="a-offer-title">{offer.title}</div>
                       <div className="a-offer-text">{offer.text}</div>
                       <div className="a-offer-link">{offer.link} ❯</div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="a-service-icons">
               <div className="a-service-item"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/india/ux/assets/Free_Delivery._CB586154316_.png" /><span>Free Delivery</span></div>
               <div className="a-service-item"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/india/ux/assets/Replacement._CB586154316_.png" /><span>10 days Replacement</span></div>
               <div className="a-service-item"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/india/ux/assets/Warranty._CB586154316_.png" /><span>1 Year Warranty</span></div>
               <div className="a-service-item"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/india/ux/assets/Top_Brand._CB586154316_.png" /><span>Top Brand</span></div>
            </div>

            <div className="a-pdp-divider"></div>

            <div className="a-pdp-about">
               <h2>About this item</h2>
               <p>{product.description}</p>
            </div>

            <div className="a-pdp-divider" style={{margin: '25px 0'}}></div>

            <div className="a-pdp-specs">
               <h2>Product details</h2>
               <table className="a-pdp-specs-table">
                  <tbody>
                    {Object.entries(product.specs || {}).map(([key, val]) => (
                      <tr key={key}>
                        <th>{key}</th>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>


          {/* RIGHT: BUY BOX */}
          <div className="a-pdp-right">
             <div className="a-buy-box">
                <div className="a-buy-price">₹{product.price.toLocaleString()}</div>
                <div className="a-buy-delivery">
                   <strong>FREE scheduled delivery</strong> as soon as <strong>Friday, 3 April, 7 am - 10 pm</strong>
                </div>
                <div style={{fontSize: '13px', color: '#007185'}}>📍 Deliver to Your Location</div>
                <div className="a-buy-stock">In stock</div>
                
                <div style={{fontSize: '13px', color: '#565959'}}>
                   Ships from <strong>Amazon</strong><br/>
                   Sold by <strong>{product.brand || "RetailEZ Pvt Ltd"}</strong>
                </div>

                <div style={{fontSize: '13px', borderTop: '1px solid #eee', paddingTop: '10px', marginTop:'5px'}}>
                   <input type="checkbox" id="warranty" />
                   <label htmlFor="warranty" style={{marginLeft: '8px'}}>Add 1 Year Extended Warranty for ₹799.00</label>
                </div>

                <select className="a-buy-qty">
                   <option>Quantity: 1</option>
                   <option>Quantity: 2</option>
                </select>

                <button className="a-pdp-add-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="a-pdp-buy-now" onClick={handleBuyNow}>Buy Now</button>

                <div style={{fontSize: '13px', color: '#007185'}}>Add to Wish List</div>
             </div>

             <div className="a-business-promo">
                <div className="a-biz-title"><span style={{color: '#e47911'}}>amazon</span> business</div>
                <div className="a-biz-sub">Save up to 15% on this product with business pricing and GST input tax credit.</div>
                <button className="a-biz-btn">Create a free account</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}


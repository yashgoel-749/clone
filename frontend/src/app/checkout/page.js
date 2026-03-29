"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const [step, setStep] = useState('shipping'); // 'shipping', 'payment', 'review'
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [submittingAddress, setSubmittingAddress] = useState(false);

  const [newAddress, setNewAddress] = useState({
    full_name: '',
    mobile_number: '',
    pincode: '',
    flat_house_no: '',
    area_street: '',
    landmark: '',
    city: '',
    state: '',
    is_default: false
  });

  // Helper function for safe JSON fetching
  const safeFetch = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return { ok: response.ok, data, status: response.status };
      } else {
        const text = await response.text();
        console.error("Non-JSON Response from", url, ":", text);
        return { ok: false, data: null, error: "Unexpected response format (HTML)", status: response.status };
      }
    } catch (err) {
      console.error("Fetch Error for", url, ":", err);
      return { ok: false, data: null, error: "Network or Server Error", status: 0 };
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    const { ok, data, error } = await safeFetch(`${API_URL}/addresses/${user.id}`);
    if (ok && data) {
      setAddresses(data);
      if (data.length > 0) {
        const defaultAddr = data.find(a => a.is_default) || data[0];
        setSelectedAddressId(defaultAddr.id);
      }
    } else if (error) {
      console.warn("Could not load addresses:", error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert("You must be logged in to add an address.");
      return;
    }
    
    setSubmittingAddress(true);
    const { ok, data, error } = await safeFetch(`${API_URL}/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newAddress, user_id: user.id })
    });

    if (ok && data) {
      setAddresses([data, ...addresses]);
      setSelectedAddressId(data.id);
      setShowAddressModal(false);
      setNewAddress({
        full_name: '', mobile_number: '', pincode: '', flat_house_no: '',
        area_street: '', landmark: '', city: '', state: '', is_default: false
      });
    } else {
      alert(error || "Failed to add address. Check console for details.");
    }
    setSubmittingAddress(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
       alert("Please select a delivery address.");
       return;
    }

    setIsSubmitting(true);
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    
    const { ok, data, error } = await safeFetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cartItems,
          shippingAddress: selectedAddress,
          paymentMethod,
          total: subtotal + 40,
          userId: user?.id
        })
    });

    if (ok && data) {
      setOrderId(data.orderId);
      setOrderConfirmed(true);
      clearCart();
    } else {
      alert(error || "Failed to place order. Check console or backend logs.");
    }
    setIsSubmitting(false);
  };

  if (orderConfirmed) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="check-icon">✓</div>
          <h1>Order placed, thank you!</h1>
          <p>Confirmation will be sent to your email.</p>
          <div className="order-details-box">
            <span>Order ID: </span>
            <span className="order-id">{orderId}</span>
          </div>
          <button onClick={() => router.push('/')} className="a-button-primary">Continue Shopping</button>
        </div>
        <style jsx>{`
          .confirmation-container { display: flex; justify-content: center; padding: 40px 20px; background: #f0f2f2; min-height: 80vh; }
          .confirmation-card { background: white; padding: 30px; border-radius: 8px; text-align: center; max-width: 500px; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .check-icon { font-size: 50px; color: #007600; margin-bottom: 10px; }
          h1 { color: #007600; font-size: 24px; margin-bottom: 15px; }
          .order-details-box { background: #f8f8f8; padding: 15px; border-radius: 4px; margin: 20px 0; font-size: 16px; }
          .order-id { font-weight: bold; color: #c45500; }
          .a-button-primary { background: #ffd814; border: 1px solid #fcd200; border-radius: 8px; padding: 10px 20px; cursor: pointer; font-weight: 500; }
          .a-button-primary:hover { background: #f7ca00; }
        `}</style>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderConfirmed) {
    return (
      <div className="empty-checkout">
        <h1>Your Cart is empty.</h1>
        <button onClick={() => router.push('/')} className="a-button-primary">Go Shopping</button>
        <style jsx>{`
           .empty-checkout { text-align: center; padding: 100px; }
           .a-button-primary { background: #ffd814; border: 1px solid #fcd200; border-radius: 8px; padding: 10px 20px; cursor: pointer; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
         <div className="header-container container">
            <Link href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="logo" /></Link>
            <h1>Checkout (<span className="item-count">{cartItems.length} items</span>)</h1>
            <div className="secure-lock">
               <svg viewBox="0 0 24 24" width="20" height="20" fill="gray"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>
            </div>
         </div>
      </header>

      <div className="checkout-content container">
        <div className="checkout-left">
          
          {/* STEP 1: SHIPPING ADDRESS */}
          <div className={`checkout-section ${step === 'shipping' ? 'active' : ''}`}>
            <div className="section-header" onClick={() => setStep('shipping')}>
              <span className="step-num">1</span>
              <h2>Select a delivery address</h2>
              {step !== 'shipping' && selectedAddressId && (
                <div className="section-summary">
                  {addresses.find(a => a.id === selectedAddressId)?.full_name}, {addresses.find(a => a.id === selectedAddressId)?.city}...
                </div>
              )}
              {step !== 'shipping' && <span className="change-link">Change</span>}
            </div>

            {step === 'shipping' && (
              <div className="section-body">
                <h3>Your addresses</h3>
                <div className="addresses-list">
                  {addresses.length === 0 && <p className="no-address">No addresses found. Add one below!</p>}
                  {addresses.map(addr => (
                    <label key={addr.id} className={`address-item ${selectedAddressId === addr.id ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="address" 
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                      />
                      <div className="address-details">
                        <span className="name">{addr.full_name}</span>
                        <span className="text">{addr.flat_house_no}, {addr.area_street}, {addr.city}, {addr.state} - {addr.pincode}</span>
                        <span className="text">Phone: {addr.mobile_number}</span>
                        <span className="edit-link">Edit address | Add delivery instructions</span>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="add-address-trigger" onClick={() => setShowAddressModal(true)}>
                  <span className="plus">+</span> Add a new address
                </div>
                <button 
                  className="a-button-primary use-address-btn" 
                  onClick={() => setStep('payment')}
                  disabled={!selectedAddressId}
                >
                  Use this address
                </button>
              </div>
            )}
          </div>

          {/* STEP 2: PAYMENT METHOD */}
          <div className={`checkout-section ${step === 'payment' ? 'active' : ''} ${step === 'shipping' ? 'disabled' : ''}`}>
            <div className="section-header" onClick={() => step !== 'shipping' && setStep('payment')}>
              <span className="step-num">2</span>
              <h2>Payment method</h2>
              {step === 'review' && (
                <div className="section-summary">
                  Using Credit/Debit Card
                </div>
              )}
              {step === 'review' && <span className="change-link">Change</span>}
            </div>

            {step === 'payment' && (
              <div className="section-body">
                <div className="payment-options">
                  <div className="payment-box">
                    <h4>Your available balance</h4>
                    <label className="payment-item disabled">
                       <input type="radio" disabled />
                       <span>Amazon Pay Balance ₹0.00 Unavailable</span>
                    </label>
                  </div>
                  
                  <div className="payment-box">
                    <h4>Another payment method</h4>
                    <label className="payment-item">
                       <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                       <div className="payment-label">
                          <span>Credit or debit card</span>
                          <div className="cards-icons">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                          </div>
                       </div>
                    </label>
                    <label className="payment-item">
                       <input type="radio" name="payment" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                       <span>Net Banking</span>
                    </label>
                    <label className="payment-item">
                       <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                       <span>Other UPI Apps</span>
                    </label>
                    <label className="payment-item">
                       <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                       <span>Cash on Delivery/Pay on Delivery</span>
                    </label>
                  </div>
                </div>
                <button className="a-button-primary use-payment-btn" onClick={() => setStep('review')}>
                  Use this payment method
                </button>
              </div>
            )}
          </div>

          {/* STEP 3: REVIEW ITEMS AND SHIPPING */}
          <div className={`checkout-section ${step === 'review' ? 'active' : ''} ${step !== 'review' ? 'disabled' : ''}`}>
            <div className="section-header">
              <span className="step-num">3</span>
              <h2>Review items and shipping</h2>
            </div>
            
            {step === 'review' && (
              <div className="section-body">
                <div className="delivery-date-card">
                   <div className="date-info">
                      <span className="green">Arriving 6 Apr 2026</span>
                      <span className="free">If you order in the next 2 hours and 45 minutes</span>
                   </div>
                   <div className="review-items">
                      {cartItems.map(item => (
                        <div key={item.id} className="review-item">
                           <img src={item.image} alt={item.title} />
                           <div className="item-info">
                              <span className="title">{item.title}</span>
                              <span className="price">₹{item.price.toLocaleString()}</span>
                              <span className="qty">Quantity: {item.quantity}</span>
                              <span className="sold-by">Sold by: Amazon Clone Retail</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                
                <div className="place-order-bottom">
                   <button className="a-button-primary" onClick={handlePlaceOrder} disabled={isSubmitting}>
                      {isSubmitting ? 'Placing Order...' : 'Place your order'}
                   </button>
                   <div className="total-display">
                      Order Total: ₹{(subtotal + 40).toLocaleString()}
                   </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* SIDEBAR ORDER SUMMARY */}
        <div className="checkout-sidebar">
           <div className="order-summary-card">
              {step === 'review' ? (
                <button className="a-button-primary place-order-btn" onClick={handlePlaceOrder} disabled={isSubmitting}>
                   {isSubmitting ? 'Placing Order...' : 'Place your order'}
                </button>
              ) : (
                <button 
                  className={`a-button-primary place-order-btn ${step === 'shipping' && !selectedAddressId ? 'disabled' : ''}`} 
                  onClick={() => step === 'shipping' ? setStep('payment') : setStep('review')}
                >
                   {step === 'shipping' ? 'Use this address' : 'Use this payment method'}
                </button>
              )}
              
              <p className="terms">By placing your order, you agree to Amazon Clone's privacy notice and conditions of use.</p>
              
              <div className="summary-section">
                 <h3>Order Summary</h3>
                 <div className="summary-row">
                    <span>Items:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                 </div>
                 <div className="summary-row">
                    <span>Delivery:</span>
                    <span>₹40.00</span>
                 </div>
                 <div className="divider"></div>
                 <div className="summary-row total-row">
                    <span>Order Total:</span>
                    <span>₹{(subtotal + 40).toLocaleString()}</span>
                 </div>
              </div>
           </div>
           
           <div className="help-box">
              <Link href="#">How are delivery costs calculated?</Link>
           </div>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add a new address</h3>
              <button className="close-btn" onClick={() => setShowAddressModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddAddress} className="address-form">
               <div className="form-row">
                  <label>Full name (First and Last name)</label>
                  <input type="text" required value={newAddress.full_name} onChange={e => setNewAddress({...newAddress, full_name: e.target.value})} />
               </div>
               <div className="form-row">
                  <label>Mobile number</label>
                  <input type="text" placeholder="10-digit mobile number" required value={newAddress.mobile_number} onChange={e => setNewAddress({...newAddress, mobile_number: e.target.value})} />
               </div>
               <div className="form-row">
                  <label>Pincode</label>
                  <input type="text" placeholder="6 digits [0-9] PIN code" required value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} />
               </div>
               <div className="form-row">
                  <label>Flat, House no., Building, Company, Apartment</label>
                  <input type="text" required value={newAddress.flat_house_no} onChange={e => setNewAddress({...newAddress, flat_house_no: e.target.value})} />
               </div>
               <div className="form-row">
                  <label>Area, Street, Sector, Village</label>
                  <input type="text" required value={newAddress.area_street} onChange={e => setNewAddress({...newAddress, area_street: e.target.value})} />
               </div>
               <div className="form-row">
                  <label>Landmark</label>
                  <input type="text" placeholder="E.g. near Apollo Hospital" value={newAddress.landmark} onChange={e => setNewAddress({...newAddress, landmark: e.target.value})} />
               </div>
               <div className="form-grid">
                  <div className="form-row">
                    <label>Town/City</label>
                    <input type="text" required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} />
                  </div>
                  <div className="form-row">
                    <label>State</label>
                    <input type="text" required value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} />
                  </div>
               </div>
               <div className="form-checkbox">
                  <input type="checkbox" id="is-default" checked={newAddress.is_default} onChange={e => setNewAddress({...newAddress, is_default: e.target.checked})} />
                  <label htmlFor="is-default">Make this my default address</label>
               </div>
               <button type="submit" className="use-address-btn-main" disabled={submittingAddress}>
                   {submittingAddress ? 'Adding Address...' : 'Use this address'}
               </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .checkout-page { background-color: #f0f2f2; min-height: 100vh; padding-bottom: 40px; color: #0f1111; font-family: "Amazon Ember", Arial, sans-serif; }
        .checkout-header { background: #fff; border-bottom: 1px solid #ddd; padding: 10px 0; background: linear-gradient(to bottom, #fff, #f6f6f6); }
        .header-container { display: flex; align-items: center; justify-content: space-between; max-width: 1150px; }
        .checkout-header .logo { height: 28px; filter: grayscale(1) invert(0); }
        .checkout-header h1 { font-size: 24px; font-weight: 400; color: #333; }
        .checkout-header .item-count { color: #007185; }
        .checkout-header .secure-lock { display: flex; align-items: center; }
        .checkout-content { display: flex; gap: 20px; margin-top: 20px; max-width: 1150px; }
        .checkout-left { flex: 1; }
        .checkout-sidebar { width: 300px; }
        .checkout-section { background: #fff; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 12px; overflow: hidden; }
        .checkout-section.active { border: 1px solid #e77600; box-shadow: 0 0 5px rgba(228, 121, 17, 0.5); }
        .checkout-section.disabled { background: #fcfcfc; color: #555; }
        .section-header { padding: 15px 20px; display: flex; align-items: center; cursor: pointer; }
        .step-num { font-size: 20px; font-weight: 700; color: #c45500; margin-right: 15px; }
        .checkout-section h2 { font-size: 19px; font-weight: 700; flex: 1; color: #333; }
        .section-summary { font-size: 14px; flex: 2; margin-left: 10px; color: #333; }
        .change-link { color: #007185; font-size: 13px; cursor: pointer; }
        .change-link:hover { text-decoration: underline; color: #c45500; }
        .section-body { padding: 0 20px 20px 55px; }
        .section-body h3 { font-size: 17px; font-weight: 700; margin-bottom: 15px; }
        .addresses-list { margin-bottom: 20px; }
        .no-address { font-size: 14px; color: #565959; margin-bottom: 15px; }
        .address-item { display: flex; gap: 10px; padding: 10px; border-radius: 4px; cursor: pointer; margin-bottom: 10px; border: 1px solid transparent; }
        .address-item.selected { background: #fcf5ee; border: 1px solid #fbd8b4; }
        .address-item input { margin-top: 4px; }
        .address-details { display: flex; flex-direction: column; font-size: 13px; line-height: 1.5; }
        .address-details .name { font-weight: 700; }
        .address-details .edit-link { color: #007185; margin-top: 5px; cursor: pointer; }
        .add-address-trigger { color: #007185; font-size: 13px; cursor: pointer; margin-bottom: 20px; display: flex; align-items: center; gap: 5px; }
        .add-address-trigger:hover { text-decoration: underline; color: #c45500; }
        .a-button-primary { background: #ffd814; border: 1px solid #fcd200; border-radius: 8px; padding: 8px 15px; cursor: pointer; font-size: 13px; box-shadow: 0 2px 5px rgba(213,217,217,.5); }
        .a-button-primary:hover { background: #f7ca00; }
        .a-button-primary.disabled { background: #f7f8f8; color: #a2a6ac; cursor: default; border-color: #d5d9d9; box-shadow: none; }
        .payment-options { margin-bottom: 20px; }
        .payment-box { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .payment-box h4 { font-size: 15px; font-weight: 700; margin-bottom: 10px; }
        .payment-item { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px; font-size: 14px; }
        .payment-item.disabled { color: #888; }
        .payment-label { display: flex; align-items: center; gap: 10px; }
        .cards-icons img { height: 16px; margin-right: 5px; }
        .review-item { display: flex; gap: 15px; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .review-item img { width: 100px; height: 100px; object-fit: contain; }
        .review-item .item-info { display: flex; flex-direction: column; font-size: 14px; gap: 4px; }
        .review-item .title { font-weight: 700; }
        .review-item .price { color: #b12704; font-weight: 700; }
        .delivery-date-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
        .date-info .green { color: #007600; font-weight: 700; font-size: 17px; }
        .place-order-bottom { display: flex; align-items: center; gap: 20px; padding-top: 15px; border-top: 1px solid #ddd; }
        .total-display { font-size: 18px; font-weight: 700; color: #b12704; }
        .order-summary-card { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
        .place-order-btn { width: 100%; padding: 10px; font-size: 14px; margin-bottom: 15px; }
        .terms { font-size: 12px; color: #565959; text-align: center; margin-bottom: 15px; }
        .summary-section h3 { font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .summary-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
        .divider { border-bottom: 1px solid #ddd; margin: 10px 0; }
        .total-row { font-size: 18px; font-weight: 700; color: #b12704; }
        .help-box { margin-top: 15px; text-align: center; }
        .help-box a { color: #007185; font-size: 12px; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; width: 500px; max-height: 90vh; overflow-y: auto; border-radius: 8px; padding: 20px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px; }
        .close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #888; }
        .address-form { display: flex; flex-direction: column; gap: 15px; }
        .form-row { display: flex; flex-direction: column; gap: 5px; }
        .form-row label { font-size: 13px; font-weight: 700; }
        .form-row input { padding: 8px; border: 1px solid #888; border-radius: 3px; font-size: 13px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .form-checkbox { display: flex; align-items: center; gap: 10px; font-size: 13px; }
        .use-address-btn-main { background: #ffd814; border: 1px solid #fcd200; border-radius: 8px; padding: 10px; margin-top: 10px; cursor: pointer; font-weight: 700; }
        @media (max-width: 900px) { .checkout-content { flex-direction: column; } .checkout-sidebar { width: 100%; order: -1; } }
      `}</style>
    </div>
  );
}

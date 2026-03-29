'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './orders.css';

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (authLoading) return; // Wait for AuthContext to finish checking localStorage

        if (!user) {
            router.push('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/orders/${user.id}`);
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, authLoading]);

    if (loading) return <div className="loading">Loading your orders...</div>;

    return (
        <div className="orders-page-container">
            <div className="orders-content">
                <nav className="orders-breadcrumb">
                    <Link href="/">Your Account</Link> › <span className="current" style={{color: '#C7511F'}}>Your Orders</span>
                </nav>
                
                <div className="orders-header-top">
                    <h1>Your Orders</h1>
                    <div className="orders-search-box">
                        <span className="search-icon">Q</span>
                        <input type="text" placeholder="Search all orders" />
                        <button className="search-orders-btn">Search Orders</button>
                    </div>
                </div>

                <div className="orders-tabs">
                    <div className="order-tab active">Orders</div>
                    <div className="order-tab">Buy Again</div>
                    <div className="order-tab">Not Yet Shipped</div>
                </div>

                <div className="orders-filter-row">
                    <span><strong>{orders.length} orders</strong> placed in </span>
                    <select className="orders-time-select" defaultValue="2025">
                        <option value="past">past 3 months</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                    </select>
                </div>

                {orders.length === 0 ? (
                    <div className="no-orders">
                        <p>You haven't placed any orders yet.</p>
                        <Link href="/" className="shop-link">Shop more deals</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order, index) => (
                            <div key={order.id} className="order-card">
                                <div className="order-card-header">
                                    <div className="order-meta">
                                        <div className="meta-col">
                                            <span className="label">ORDER PLACED</span>
                                            <span className="value">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        {/* Show TOTAL and SHIP TO only for some depending on status, but standard is showing all */}
                                        <div className="meta-col">
                                            <span className="label">TOTAL</span>
                                            <span className="value">₹{order.total.toLocaleString()}</span>
                                        </div>
                                        <div className="meta-col ship-to-col">
                                            <span className="label">SHIP TO</span>
                                            <span className="value user-name">{user.name} ▾</span>
                                        </div>
                                    </div>
                                    <div className="order-id-group">
                                        <span className="label">ORDER # 404-{order.id}08762-9098709</span>
                                        <div className="order-header-links">
                                            <Link href="#">View order details</Link> <span style={{margin:'0 4px', color:'#ddd'}}>|</span> <Link href="#">Invoice ▾</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-card-body">
                                    {index === 0 && order.status === 'cancelled' ? (
                                        <div className="order-status-row">
                                            <h3>Cancelled</h3>
                                            <p>If you have been charged, a refund will be processed and will be available to you in the next 3-5 business days</p>
                                        </div>
                                    ) : null}
                                    <div className="order-items-list">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="order-item-row">
                                                <div className="item-img">
                                                    <img src={item.image} alt={item.title} />
                                                </div>
                                                <div className="item-details">
                                                    <Link href={`/product/${item.id}`} className="item-title">{item.title}</Link>
                                                    <p className="item-meta">Return window closed</p>
                                                    <div className="item-buttons">
                                                        <button className="buy-again-btn">
                                                             <img src="https://m.media-amazon.com/images/G/31/AmazonBusiness/BuyAgain/Buy_Again_Icon_24x24._CB606346736_.png" alt="buyagain" style={{height:'14px', marginRight:'5px', verticalAlign:'middle'}}/>
                                                             Buy it again
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="item-actions">
                                                    <button className="action-btn wide-btn">Write a product review</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


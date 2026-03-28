import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Sidebar = ({ isOpen, onClose, user }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
        <div className="side-header">
          <div className="side-user">
            <span className="user-icon">👤</span>
            <span className="user-greeting">
              Hello, {mounted && user ? user.name : 'sign in'}
            </span>
          </div>
          <button className="side-close" onClick={onClose}>&times;</button>
        </div>

        <div className="side-content">
          <div className="side-section">
            <div className="side-title">Trending</div>
            <Link href="/" onClick={onClose}>Bestsellers</Link>
            <Link href="/" onClick={onClose}>New Releases</Link>
            <Link href="/" onClick={onClose}>Movers and Shakers</Link>
          </div>

          <div className="side-divider"></div>

          <div className="side-section">
            <div className="side-title">Digital Content and Devices</div>
            <div className="side-item-arrow">Echo & Alexa <span>›</span></div>
            <div className="side-item-arrow">Fire TV <span>›</span></div>
            <div className="side-item-arrow">Kindle E-Readers & eBooks <span>›</span></div>
            <div className="side-item-arrow">Audible Audiobooks <span>›</span></div>
            <div className="side-item-arrow">Amazon Prime Video <span>›</span></div>
            <div className="side-item-arrow">Amazon Prime Music <span>›</span></div>
          </div>

          <div className="side-divider"></div>

          <div className="side-section">
            <div className="side-title">Shop by Category</div>
            <div className="side-item-arrow">Mobiles, Computers <span>›</span></div>
            <div className="side-item-arrow">TV, Appliances, Electronics <span>›</span></div>
            <div className="side-item-arrow">Men's Fashion <span>›</span></div>
            <div className="side-item-arrow">Women's Fashion <span>›</span></div>
            <div className="side-item-arrow">See all <span className="down">▾</span></div>
          </div>

          <div className="side-divider"></div>

          <div className="side-section">
            <div className="side-title">Programs & Features</div>
            <div className="side-item-arrow">Gift Cards & Mobile Recharges <span>›</span></div>
            <div className="side-item-arrow">Amazon Launchpad <span>›</span></div>
            <div className="side-item-arrow">Amazon Business <span>›</span></div>
          </div>

          <div className="side-divider"></div>

          <div className="side-section">
            <div className="side-title">Help & Settings</div>
            <Link href="/account" onClick={onClose}>Your Account</Link>
            <Link href="#" onClick={onClose}>Customer Service</Link>
            {mounted && user ? (
              <div className="side-item" onClick={onClose}>Sign Out</div>
            ) : (
              <Link href="/login" onClick={onClose}>Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

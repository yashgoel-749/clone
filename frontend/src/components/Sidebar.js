import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { sidebarSections } from '@/data/navigationData';

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
          {sidebarSections.map((section, sIdx) => (
            <React.Fragment key={sIdx}>
              {sIdx > 0 && <div className="side-divider"></div>}
              <div className="side-section">
                <div className="side-title">{section.title}</div>
                {section.items.map((item, iIdx) => (
                  item.arrow ? (
                    <Link key={iIdx} href={item.href} className="side-item-arrow" onClick={onClose}>
                      {item.label} <span>›</span>
                    </Link>
                  ) : (
                    <Link key={iIdx} href={item.href} onClick={onClose}>
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </React.Fragment>
          ))}

          {/* Auth-dependent item at the end */}
          <div className="side-divider"></div>
          <div className="side-section">
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

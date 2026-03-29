"use client";
import Link from 'next/link';
import { footerColumns } from '@/data/homePageData';

/**
 * Footer — Reusable footer component for the Amazon clone.
 * Renders the "Back to top" button, footer link columns, and bottom legal section.
 * Data-driven from homePageData.js.
 */
export default function Footer() {
  return (
    <>
      <div
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </div>

      <footer className="footer-links">
        <div className="footer-cols">
          {footerColumns.map((col, i) => (
            <div key={i} className="footer-col">
              <div className="footer-col-title">{col.title}</div>
              <ul>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      <div className="footer-bottom">
        <div className="footer-logo">
          amazon<span>.in</span>
        </div>
        <div className="footer-legal">
          <Link href="#">Conditions of Use</Link>
          <Link href="#">Privacy Notice</Link>
          <Link href="#">Interest-Based Ads</Link>
        </div>
        <div className="footer-legal">
          © 1996-2026, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </>
  );
}

"use client";
import Link from 'next/link';

/**
 * QuadCard — Reusable 2x2 grid card component matching Amazon's homepage cards.
 * 
 * Props:
 *   title    — card heading text
 *   items    — array of { label, href, image } (exactly 4 items)
 *   footer   — { text, href } for "See more" link
 * 
 * Usage:
 *   <QuadCard title="Deals" items={[...]} footer={{ text: "See all", href: "#" }} />
 */
export default function QuadCard({ title, items, footer }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-body">
        <div className="quad-grid">
          {items.map((item, i) => (
            <Link key={i} href={item.href} className="quad-item">
              <img src={item.image} alt={item.label} />
              <div className="quad-label">{item.label}</div>
            </Link>
          ))}
        </div>
      </div>
      {footer && (
        <div className="card-footer">
          <Link href={footer.href}>{footer.text}</Link>
        </div>
      )}
    </div>
  );
}

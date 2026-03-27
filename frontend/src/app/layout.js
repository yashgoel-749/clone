import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'Amazon Clone | Shop Best Electronics & Gadgets',
  description: 'A fully functional Amazon-inspired e-commerce platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="main-content">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';

export const metadata = {
  title: 'Amazon Clone | Shop Best Electronics & Gadgets',
  description: 'A fully functional Amazon-inspired e-commerce platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="main-content">
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

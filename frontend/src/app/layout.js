import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: 'Amazon Clone | Shop Best Electronics & Gadgets',
  description: 'A fully functional Amazon-inspired e-commerce platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy_client_id'}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main>
                  {children}
                </main>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

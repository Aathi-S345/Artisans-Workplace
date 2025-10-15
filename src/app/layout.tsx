// In src/app/layout.tsx
import './globals.css';
import { Header } from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AuthProvider from './providers/AuthProvider';
import { CartProvider } from '@/context/CartContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
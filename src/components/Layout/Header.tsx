// In src/components/Layout/Header.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define navigation links for cleaner code
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/cart", label: "Cart" },
  ];

  // Function to close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" onClick={handleLinkClick} className="text-2xl font-bold text-gray-800">
          VishwaKarma
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-600 hover:text-gray-900 transition-colors">
              {link.label}
            </Link>
          ))}
          {session?.user?.role === 'admin' && (
            <Link href="/admin/dashboard" className="font-bold text-red-600 hover:text-red-700 transition-colors">
              Admin Panel
            </Link>
          )}
          {session ? (
            <>
              <Link href="/account" className="text-gray-600 hover:text-gray-900 transition-colors">My Account</Link>
              <button onClick={() => signOut()} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            // ACCESSIBILITY: Added ARIA attributes for screen readers
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {/* FIX: Corrected SVG path for the bottom line */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (collapsible) */}
      {isMenuOpen && (
        <nav id="mobile-menu" className="md:hidden bg-white border-t p-4 space-y-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={handleLinkClick} className="block text-gray-600 hover:bg-gray-100 p-2 rounded transition-colors">
              {link.label}
            </Link>
          ))}
          {session?.user?.role === 'admin' && (
             <Link href="/admin/dashboard" onClick={handleLinkClick} className="block font-bold text-red-600 hover:bg-gray-100 p-2 rounded transition-colors">
              Admin Panel
            </Link>
          )}
          {session ? (
            <>
              <Link href="/account" onClick={handleLinkClick} className="block text-gray-600 hover:bg-gray-100 p-2 rounded transition-colors">My Account</Link>
              <button onClick={() => { signOut(); handleLinkClick(); }} className="w-full text-left bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={handleLinkClick} className="block text-gray-600 hover:bg-gray-100 p-2 rounded transition-colors">Login</Link>
          )}
        </nav>
      )}
    </header>
  );
};
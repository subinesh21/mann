'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/products/allproducts' },
  { name: 'Shop', href: '/shop' },
  { name: 'Cart', href: '/cart' },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Nav */}
      <div className="mobile-nav lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="amado-navbar-brand">
          <a href="/" className="text-2xl font-bold text-[#131212]">
            <span className="text-[#fbb710]">C</span>GG
          </a>
        </div>
        <button 
          className="amado-navbar-toggler flex flex-col gap-1 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-[#131212]"></span>
          <span className="w-6 h-0.5 bg-[#131212]"></span>
          <span className="w-6 h-0.5 bg-[#131212]"></span>
        </button>
      </div>

      {/* Sidebar */}
      <header className={`amado-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Close Icon - Mobile */}
        <div 
          className="nav-close absolute top-5 right-5 cursor-pointer lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <i className="fa fa-close text-2xl text-[#6b6b6b] hover:text-[#fbb710] transition-colors"></i>
        </div>

        {/* Logo */}
        <div className="logo mb-10">
          <a href="/" className="text-3xl font-bold text-[#131212]">
            <span className="text-[#fbb710]">C</span>GG
          </a>
          <p className="text-xs text-[#6b6b6b] mt-1 tracking-[3px]">SUSTAINABLE</p>
        </div>

        {/* Navigation */}
        <nav className="amado-nav mb-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className={pathname === item.href ? 'active' : ''}>
                <a href={item.href}>
                  {item.name === 'Cart' ? `${item.name} (${cartCount})` : item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search button */}
        <div className="cart-fav-search mb-4 ml-2">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="search-nav block w-full text-left mt-4"
          >
            <i className="fa fa-search mr-3 text-[#6b6b6b]"></i>
            Search
          </button>
        </div>

        {/* Search Form */}
        {isSearchOpen && (
          <div className="mb-8 ml-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSearchOpen(false);
              }}
            >
              <input 
                type="search" 
                placeholder="Type your keyword..."
                className="w-full px-4 py-3 border border-[#ebebeb] text-sm focus:outline-none focus:border-[#fbb710]"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Account */}
        <div className="mb-10 pt-4 pb-4 ml-2 border-t border-[#ebebeb]">
          {isAuthenticated ? (
            <div className="space-y-3">
              <a href="/account" className="flex items-center text-sm text-[#6b6b6b] hover:text-[#fbb710] transition-colors">
                <i className="fa fa-user mr-3"></i>
                Hi, {user?.name?.split(' ')[0]}
              </a>
              <button 
                onClick={logout}
                className="flex items-center text-sm text-[#6b6b6b] hover:text-[#fbb710] transition-colors"
              >
                <i className="fa fa-sign-out mr-3"></i>
                Logout
              </button>
            </div>
          ) : (
            <a href="/account" className="flex items-center text-sm text-[#6b6b6b] hover:text-[#fbb710] transition-colors">
              <i className="fa fa-user mr-3"></i>
              Account
            </a>
          )}
        </div>

        {/* Social Button */}
        <div className="social-info flex justify-between">
          <a href="#" className="hover:text-[#fbb710] transition-colors">
            <i className="fa fa-mail"></i>
          </a>
          <a href="#" className="hover:text-[#fbb710] transition-colors">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-[#fbb710] transition-colors">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-[#fbb710] transition-colors">
            <i className="fa fa-file"></i>
          </a>
        </div>
      </header>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

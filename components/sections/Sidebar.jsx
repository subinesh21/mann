'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Mail, Facebook, Twitter, Instagram, FileText } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: 'products' },
  { name: 'Shop', href: '/shop' },
  { name: 'Cart', href: '/cart' },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

        {/* Logo - Increased bottom margin */}
        <div className="logo mb-45">
          <a href="/" className="text-3xl font-bold text-[#131212]">
            <span className="text-[#52dd28ff]">MAnn</span>
          </a>
          <p className="text-xs text-[#6b6b6b] mt-1 tracking-[3px]">SUSTAINABLE</p>
        </div>

        {/* Navigation - Increased bottom margin */}
        <nav className="amado-nav mb-30 ml-7">
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

        {/* Blogs Button - Same style as Search */}
        <div className="mb-4 ml-4">
          <a 
            href="/blogs" 
            className="flex items-center w-full text-left group"
          >
            <FileText className="w-5 h-5 mr-4 text-[#6b6b6b] group-hover:text-[#52dd28ff] transition-colors" />
            <span className="text-sm font-medium text-[#131212] group-hover:text-[#52dd28ff] transition-colors">
              Blogs
            </span>
          </a>
        </div>

        {/* Search Section - Always Open */}
        <div className="mb-6 ml-4">
          <div className="flex items-center mb-3">
            <i className="fa fa-search mr-4 text-[#6b6b6b]"></i>
            <span className="text-sm font-medium text-[#131212]">Search</span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle search submission here
              console.log('Search submitted');
            }}
          >
            <input 
              type="search" 
              placeholder="Type your keyword..."
              className="w-full px-4 py-3 border border-[#ebebeb] text-sm focus:outline-none focus:border-[#52dd28ff]"
            />
          </form>
        </div>

        {/* Account - Increased left margin, vertical padding, and bottom margin */}
        <div className="pt-6 pb-6 ml-4 border-t border-[#ebebeb]">
          {isAuthenticated ? (
            <div className="space-y-4">
              <a href="/account" className="flex items-center text-sm text-[#52dd28ff] hover:text-[#52dd28ff] transition-colors">
                <i className="fa fa-user mr-4"></i>
                Hi, {user?.name?.split(' ')[0]}
              </a>
              <button 
                onClick={logout}
                className="flex items-center text-sm text-[#b31313ff] hover:text-[#b31313ff] transition-colors"
              >
                <i className="fa fa-sign-out mr-4"></i>
                Logout
              </button>
            </div>
          ) : (
            <a href="/account" className="flex items-center text-sm text-[#6b6b6b] hover:text-[#52dd28ff] transition-colors">
              <i className="fa fa-user mr-4"></i>
              Account
            </a>
          )}
        </div>

        {/* Social Button - Increased horizontal gap between icons */}
        <div className="social-info flex justify-between mt-2">
          <a href="#" className="hover:text-[#52dd28ff] transition-colors">
            <Mail className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-[#52dd28ff] transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-[#52dd28ff] transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-[#52dd28ff] transition-colors">
            <Instagram className="w-6 h-6" />
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
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

  // Determine account link based on authentication and role
  const getAccountLink = () => {
    if (!isAuthenticated) {
      return '/login';
    }
    // If user is admin, go to admin panel, otherwise go to account page
    return user?.role === 'admin' ? '/admin' : '/account';
  };

  const handleAccountClick = (e) => {
    if (!isAuthenticated) {
      // For non-authenticated users, let the link handle navigation to login
      return;
    }
    // For authenticated users, we don't need to prevent default
    // The link will navigate based on getAccountLink()
  };

  return (
    <>
      {/* Mobile Nav */}
      <div className="mobile-nav lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="amado-navbar-brand">
          <a href="/" className="text-2xl font-bold text-[#52dd28ff]">
            <span className="text-[#52dd28ff]">C</span>GG
          </a>
        </div>
        <button 
          className="amado-navbar-toggler flex flex-col gap-1 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-[#52dd28ff]"></span>
          <span className="w-6 h-0.5 bg-[#52dd28ff]"></span>
          <span className="w-6 h-0.5 bg-[#52dd28ff]"></span>
        </button>
      </div>

      {/* Sidebar */}
      <header className={`amado-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Close Icon - Mobile */}
        <div 
          className="nav-close absolute top-5 right-5 cursor-pointer lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <i className="fa fa-close text-2xl text-[#6b6b6b] hover:text-[#52dd28ff] transition-colors"></i>
        </div>

        {/* Logo - Increased bottom margin */}
        <div className="logo mb-40">
          <a href="/" className="text-3xl font-bold text-[#131212]">
            <span className="text-[#52dd28ff]">MAnn</span>
          </a>
          <p className="text-xs text-[#6b6b6b] mt-1 tracking-[3px]">SUSTAINABLE LIVING</p>
        </div>

        {/* Navigation - Increased bottom margin */}
        <nav className="amado-nav mb-30 ml-7">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className={pathname === item.href ? 'active' : ''}>
                <a 
                  href={item.href}
                  className={pathname === item.href ? 'text-[#52dd28ff]' : ''}
                >
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
              className="w-full px-4 py-3 border border-[#ebebeb] text-sm focus:outline-none focus:border-[#52dd28ff] focus:ring-1 focus:ring-[#52dd28ff]"
            />
          </form>
        </div>

        {/* Account - Dynamic based on authentication and role */}
        <div className="pt-6 pb-6 ml-4 border-t border-[#ebebeb]">
          {isAuthenticated ? (
            <div className="space-y-4">
              {/* User info and link - goes to either admin or account page based on role */}
              <a 
                href={getAccountLink()}
                onClick={handleAccountClick}
                className="flex items-center text- text-[#52dd28ff] hover:text-[#52dd28ff] transition-colors"
              >
                <i className="fa fa-user mr-4 text-[#52dd28ff]"></i>
                Hi, {user?.name?.split(' ')[0]}
                {user?.role === 'admin' && (
                  <span className="ml-2 text-[10px] text-[#52dd28ff]  px-1.5 py-0.5 rounded-full">Admin</span>
                )}
              </a>
              <button 
                onClick={logout}
                className="flex items-center text-sm text-[#131212] hover:text-[#52dd28ff] transition-colors"
              >
                <i className="fa fa-sign-out mr-4"></i>
                Logout
              </button>
            </div>
          ) : (
            <a            
              href="/account" 
              className="flex items-center text-sm text-[#52dd28ff] hover:text-[#52dd28ff]"
            > <i className="fa fa-user mr-4  text-[#52dd28ff] hover:text-[#52dd28ff]"></i>
              Account
            </a>
          )}
        </div>

{/* Social Buttons - Brand Colors */}
<div className="social-info flex justify-between mt-2">
  {/* Mail / Email - Gmail/Outlook style */}
  <a 
    href="#" 
    className="text-[#6b6b6b] hover:text-[#D44638] transition-colors"
    aria-label="Email"
  >
    <Mail className="w-6 h-6" />
  </a>
  
  {/* Facebook */}
  <a 
    href="#" 
    className="text-[#6b6b6b] hover:text-[#1877F2] transition-colors"
    aria-label="Facebook"
  >
    <Facebook className="w-6 h-6" />
  </a>
  
  {/* Twitter / X */}
  <a 
    href="#" 
    className="text-[#6b6b6b] hover:text-[#1DA1F2] transition-colors"
    aria-label="Twitter"
  >
    <Twitter className="w-6 h-6" />
  </a>
  
  {/* Instagram - using the official Instagram color */}
  <a 
    href="#" 
    className="text-[#6b6b6b] hover:text-[#E4405F] transition-colors"
    aria-label="Instagram"
  >
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

      <style jsx>{`
        .amado-nav ul li a:hover {
          color: #52dd28ff !important;
        }
        .amado-nav ul li.active a {
          color: #52dd28ff !important;
        }
      `}</style>
    </>
  );
}
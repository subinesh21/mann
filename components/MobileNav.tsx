'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Mail, Facebook, Twitter, Instagram, FileText, Search, ShoppingCart, User, LogIn, ChevronDown, XCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Shop', href: '/shop' },
  { name: 'Cart', href: '/cart' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchBarRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      // Close dropdown when clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      // Close search when clicking outside search bar
      if (searchBarRef.current && !searchBarRef.current.contains(event.target) && showSearch) {
        setShowSearch(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  // Focus search input when search is opened
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top bar - always visible on mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden shadow-sm h-15">
        {/* Left side - Menu button and Logo */}
        <div className="flex items-center gap-2">
          <button 
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="hover:bg-gray-100 rounded-lg transition-colors relative p-2"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-gray-600" />

          </button>
          <Link href="/" className="text-2xl font-bold">
            <span className="text-[#52dd28ff]">MAnn</span>
          </Link>
        </div>

        {/* Right side - Search, Account and Cart */}
        <div className="flex items-center gap-1">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Account Button - Always person icon */}
          <Link 
            href="/account" 
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            aria-label="Account"
          >
            <User className="w-5 h-5 text-gray-600" />
          </Link>

          {/* Cart Button with Count */}
          <Link 
            href="/cart" 
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#52dd28ff] text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Centered Search Bar - Appears below top bar */}
      <div 
        ref={searchBarRef}
        className={`fixed left-0 right-0 z-45 lg:hidden transform transition-all duration-300 ease-in-out ${
          showSearch ? 'top-[73px] opacity-100' : '-top-20 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white py-3 px-4 border-b border-gray-200">
          <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Type the keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#52dd28ff] focus:ring-2 focus:ring-[#52dd28ff]/20 bg-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="p-1.5 bg-[#52dd28ff] text-white rounded-full hover:bg-[#45b824] transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Dropdown Menu - Opens from top */}
      <div 
        ref={dropdownRef}
        className={`fixed top-[73px] left-0 right-0 z-40 lg:hidden transform transition-all duration-300 ease-in-out pr-50 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
        }`}
      >

         <div className="bg-white border border-gray-20 shadow-lg rounded-lg mx-4 overflow-hidden ">
          {/* Navigation Links - More compact */}
          <nav className="py-2 ">
            <ul className="divide-y divide-gray-300 mr-8">
              {navItems.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 transition-all duration-200${
                      pathname === item.href 
                        ? 'bg text-gray-60 font-medium' 
                        : 'text-gray-70 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm text-[#131212] hover:text-[#52dd28ff] mr-9">{item.name}</span>
                    {item.name === 'Cart' && cartCount > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        pathname === item.href 
                          ? 'bg-gray-60 text-white' 
                          : 'bg-[#52dd28ff] text-white'
                      }`}>
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <header className="hidden lg:flex fixed top-0 left-0 bottom-0 w-[280px] bg-white border-r border-gray-200 flex-col px-10 pt-14 pb-6 z-50 overflow-y-auto shadow-lg">
        <div className="mb-16">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            <span className="text-[#52dd28ff]">MAnn</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1 tracking-[3px] uppercase">Sustainable</p>
        </div>

        {/* User Info - Desktop */}
        <div className="mb-8 ml-2">
          {isAuthenticated ? (
            <Link 
              href="/account" 
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#52dd28ff] transition-colors group"
            >
              <User className="w-5 h-5 text-gray-500 group-hover:text-[#52dd28ff]" />
              <span className="font-medium">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
            </Link>
          ) : (
            <Link 
              href="/account" 
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#52dd28ff] transition-colors group"
            >
              <User className="w-5 h-5 text-gray-500 group-hover:text-[#52dd28ff]" />
              <span className="font-medium">Account</span>
            </Link>
          )}
        </div>

        <nav className="mb-8 ml-2">
          <ul className="space-y-7">
            {navItems.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-sm uppercase font-semibold tracking-wider transition-colors relative block ${
                    pathname === item.href 
                      ? 'text-[#52dd28ff]' 
                      : 'text-gray-700 hover:text-[#52dd28ff]'
                  }`}
                >
                  {item.name === 'Cart' ? `${item.name} (${cartCount})` : item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mb-4 ml-2">
          <Link href="/products" className="flex items-center group">
            <FileText className="w-5 h-5 mr-4 text-gray-500 group-hover:text-[#52dd28ff] transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#52dd28ff] transition-colors">Blogs</span>
          </Link>
        </div>

        <div className="mb-6 ml-2">
          <div className="flex items-center mb-3">
            <Search className="w-4 h-4 mr-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Search</span>
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Type your keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#52dd28ff] focus:ring-1 focus:ring-[#52dd28ff] bg-white rounded"
            />
          </form>
        </div>

        <div className="mt-auto">
          <div className="social-info flex justify-between pt-4 border-t border-gray-200">
            {[Mail, Facebook, Twitter, Instagram].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="text-gray-500 hover:text-[#52dd28ff] transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </header>

      <style jsx>{`
        /* Custom scrollbar for sidebar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #52dd28ff;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #45b824;
        }
      `}</style>
    </>
  );
}
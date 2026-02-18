import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingCart, Menu, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import MobileMenu from '@/components/MobileMenu';

const navItems = [
  {
    name: 'Shop',
    href: '#',
    dropdown: [
      { name: 'Drinkware', href: '/products/drinkware' },
      { name: 'Tableware', href: '/products/tableware' },
      { name: 'Storage', href: '/products/storage' },
      { name: 'one', href: '/products/one' },
      { name: 'two', href: '/products/two' },
      { name: 'three', href: '/products/three' },
    ],
  },
  {
    name: 'About',
    href: '/about/our-story',
    dropdown: [
      { name: 'Our Story', href: '/about/our-story' },
      { name: 'Our Promise', href: '/about/our-promise' },
      { name: 'Our Principles', href: '/about/our-principles' },
      { name: 'Our Material', href: '/about/our-material' },
    ],
  },
  {
    name: 'Bulk',
    href: '/bulk/b2b-home',
    dropdown: [
      { name: 'Eha B2B Home', href: '/bulk/b2b-home' },
      { name: 'Kitchen Collection', href: '/bulk/kitchen-collection' },
      { name: 'Home Collection', href: '/bulk/home-collection' },
    ],
  },
  {
    name: 'More',
    href: '/contact',
    dropdown: [
      { name: 'Contact', href: '/contact' },
      { name: 'Blogs', href: '/blogs' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-eco-text hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center text-sm font-medium text-eco-text hover:text-blue-500 transition-colors py-2">
                    <span>{item.name}</span>
                    <ChevronDown className="w4 h-4" />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.name && item.dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                      >
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-eco-text hover:text-primary hover:bg-eco-bg transition-colors"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

              {/* Logo */}
              <a href="/" className="flex-shrink-0">
                {/* pr-0 for mobile, lg:pr-48 for desktop (1024px and up) */}
                <div className="text-3xl font-heading font-bold text-primary pr-0 lg:pr-4">
                  <span className="text-eco-text">C</span>GG
                </div>
              </a>

            {/* Right Side - Icons and Account */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-4 w-full">
              {/* Icon Group */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Search */}
                <div className="relative">
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2 text-eco-text hover:text-blue-500 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 240 }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2"
                      >
                        <input
                          type="text"
                          placeholder="Search for products"
                          className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          autoFocus
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Cart */}
                <a
                  href="/cart"
                  className="relative p-2 text-eco-text hover:text-blue-500 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </a>
              </div>

              {/* Account - Moved to Far Right */}
              <div className="flex-shrink-0 ml-4">
                <div className="relative">
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-2">
                      <a
                        href={user?.role === 'admin' ? '/admin' : '/account'}
                        className="hidden sm:flex items-center gap-2 text-sm text-eco-text hover:text-blue-500 transition-colors"
                      >
                        <User className="w-5 h-5" />
                        <span>Hi, {user?.name?.split(' ')[0]}</span>
                      </a>
                      <a
                        href={user?.role === 'admin' ? '/admin' : '/account'}
                        className="sm:hidden p-2 text-eco-text hover:text-blue-500 transition-colors"
                        aria-label="My Account"
                      >
                        <User className="w-5 h-5" />
                      </a>
                      <button
                        onClick={logout}
                        disabled={isLoading}
                        className="p-2 text-eco-text hover:text-blue-500 transition-colors disabled:opacity-50"
                        aria-label="Logout"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <a
                      href="/account"
                      className="p-2 text-eco-text hover:text-blue-500 transition-colors"
                      aria-label="Account"
                    >
                      <User className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Check if user is admin - only redirect if we're sure they're not an admin
  useEffect(() => {
    if (!isLoading && isAuthenticated && user && user.role !== 'admin') {
      console.log('Non-admin user detected, redirecting to account page');
      router.push('/account');
    }
    // Don't redirect if user is loading or not authenticated yet
    // This prevents premature redirects during navigation
  }, [isAuthenticated, user, isLoading, router]);

  // Handle window resize for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amado-light">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amado-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amado-muted">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show access denied if user is not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amado-light">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amado-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amado-muted">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-amado-light">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <>
            {/* Backdrop for mobile */}
            {sidebarOpen && isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:shadow-none lg:border-r border-amado-border flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-amado-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amado-yellow rounded-circle flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-amado-dark">Admin Panel</h5>
                    <p className="text-xs text-amado-muted">CGG EHA</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md hover:bg-amado-light transition-colors lg:hidden"
                >
                  <X className="w-5 h-5 text-amado-gray" />
                </button>
              </div>

              {/* User Info */}
              <div className="p-4 border-b border-amado-border">
                <a 
                  href="/admin" 
                  className="flex items-center space-x-3 hover:bg-amado-light p-2 rounded-lg transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-amado-light rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-amado-gray" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-amado-dark truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-amado-muted truncate">
                      {user?.email}
                    </p>
                  </div>
                </a>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-amado-yellow text-white shadow-sm border border-amado-yellow'
                          : 'text-amado-gray hover:bg-amado-light hover:text-amado-dark border border-transparent hover:border-amado-yellow/30'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </a>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="p-4 border-t border-amado-border">
                <button
                  onClick={logout}
                  disabled={isLoading}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300 disabled:opacity-50 border border-transparent hover:border-red-200"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-amado-border px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-amado-gray hover:text-amado-dark hover:bg-amado-light mr-2 transition-colors duration-300"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-amado-dark">
                {sidebarItems.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-sm text-amado-muted">
                Welcome back, {user?.name?.split(' ')[0]}
              </div>
              <div className="w-8 h-8 bg-amado-light rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-amado-gray" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
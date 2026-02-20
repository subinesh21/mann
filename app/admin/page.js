// app/admin/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  BarChart3,
  Clock
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching dashboard data...');
      
      // Fetch analytics data
      const analyticsResponse = await fetch('/api/admin/analytics');
      const analyticsData = await analyticsResponse.json();
      console.log('Analytics data:', analyticsData);
      
      // Fetch recent orders
      const ordersResponse = await fetch('/api/admin/orders?limit=5');
      const ordersData = await ordersResponse.json();
      console.log('Orders data:', ordersData);
      
      // Fetch recent users
      const usersResponse = await fetch('/api/admin/users?limit=5');
      const usersData = await usersResponse.json();
      console.log('Users data:', usersData);
      
      if (analyticsResponse.ok && ordersResponse.ok && usersResponse.ok) {
        setStats({
          totalUsers: analyticsData.users?.total || 0,
          totalProducts: analyticsData.products?.total || 0,
          totalOrders: analyticsData.orders?.total || 0,
          totalRevenue: analyticsData.revenue?.total || 0,
          recentOrders: (ordersData.orders || []).map(order => ({
            id: order.orderNumber,
            customer: order.user?.name || 'Unknown Customer',
            amount: order.totalAmount,
            status: order.status
          })),
          recentUsers: (usersData.users || []).map(user => ({
            name: user.name,
            email: user.email,
            joined: getTimeAgo(user.createdAt)
          }))
        });
      } else {
        // Fallback to mock data if API fails
        setStats({
          totalUsers: 0,
          totalProducts: 0,
          totalOrders: 0,
          totalRevenue: 0,
          recentOrders: [],
          recentUsers: []
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to mock data
      setStats({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        recentOrders: [],
        recentUsers: []
      });
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleQuickAction = (path) => {
    console.log('Navigating to:', path);
    setClickedButton(path);
    
    setTimeout(() => {
      setClickedButton(null);
      router.push(path);
    }, 150);
  };

  const handleViewAllClick = (action) => {
    setClickedButton('view-all');
    setTimeout(() => setClickedButton(null), 300);
    if (action === 'orders') {
      router.push('/admin/orders');
    } else {
      router.push('/admin/users');
    }
  };

  const refreshData = async () => {
    console.log('Refreshing dashboard data');
    setIsRefreshing(true);
    try {
      await fetchDashboardData();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'r':
            e.preventDefault();
            refreshData();
            break;
          case '1':
            e.preventDefault();
            handleQuickAction('/admin/products');
            break;
          case '2':
            e.preventDefault();
            handleQuickAction('/admin/orders');
            break;
          case '3':
            e.preventDefault();
            handleQuickAction('/admin/users');
            break;
          case '4':
            e.preventDefault();
            handleQuickAction('/admin/analytics');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getButtonClass = (path) => {
    const baseClass = 'flex flex-col items-center p-4 bg-gray-50 hover:bg-[#52dd28ff]/10 rounded-lg transition-all duration-200 border border-gray-200 hover:border-[#52dd28ff] focus:outline-none focus:ring-1 focus:ring-[#52dd28ff]';
    return clickedButton === path 
      ? baseClass + ' scale-95 bg-[#52dd28ff]/20' 
      : baseClass;
  };

  const getIconClass = (path) => {
    const baseClass = 'w-5 h-5 text-gray-600 group-hover:text-[#52dd28ff] transition-colors duration-200';
    return clickedButton === path 
      ? baseClass + ' text-[#52dd28ff]' 
      : baseClass;
  };

  const getBgClass = (path) => {
    const baseClass = 'p-2.5 bg-white rounded-lg mb-2 group-hover:bg-[#52dd28ff]/10 transition-colors duration-200';
    return clickedButton === path 
      ? baseClass + ' bg-[#52dd28ff]/10' 
      : baseClass;
  };

  const getTextClass = (path) => {
    const baseClass = 'text-sm font-medium text-gray-700 group-hover:text-[#52dd28ff] transition-colors duration-200';
    return clickedButton === path 
      ? baseClass + ' text-[#52dd28ff]' 
      : baseClass;
  };

  const getRefreshButtonClass = () => {
    const baseClass = 'px-5 py-2.5 bg-[#52dd28ff] text-white rounded-lg text-sm font-medium hover:bg-[#45b824] transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#52dd28ff]';
    return isRefreshing 
      ? baseClass + ' opacity-50 cursor-not-allowed' 
      : baseClass;
  };

  const getViewAllButtonClass = () => {
    const baseClass = 'text-[#52dd28ff] hover:text-[#45b824] text-sm font-medium transition-colors focus:outline-none';
    return clickedButton === 'view-all' 
      ? baseClass + ' scale-95' 
      : baseClass;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-[#52dd28ff] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-gray-500">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        {/* Page Header - Reduced heading size */}
        <div className="mb-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>Just now</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Square Stats Grid - Increased text sizes */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 p-4 flex flex-col items-center justify-center text-center rounded-lg"
          >
            <Users className="w-6 h-6 text-[#52dd28ff] mb-2" />
            <p className="text-xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="text-xs text-gray-500">Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-white border border-gray-200 p-4 flex flex-col items-center justify-center text-center rounded-lg"
          >
            <Package className="w-6 h-6 text-[#52dd28ff] mb-2" />
            <p className="text-xl font-bold text-gray-900">{stats.totalProducts}</p>
            <p className="text-xs text-gray-500">Products</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white border border-gray-200 p-4 flex flex-col items-center justify-center text-center rounded-lg"
          >
            <ShoppingCart className="w-6 h-6 text-[#52dd28ff] mb-2" />
            <p className="text-xl font-bold text-gray-900">{stats.totalOrders}</p>
            <p className="text-xs text-gray-500">Orders</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white border border-gray-200 p-4 flex flex-col items-center justify-center text-center rounded-lg"
          >
            <DollarSign className="w-6 h-6 text-[#52dd28ff] mb-2" />
            <p className="text-xl font-bold text-gray-900">₹{stats.totalRevenue}</p>
            <p className="text-xs text-gray-500">Revenue</p>
          </motion.div>
        </div>

        {/* Recent Orders - Increased text sizes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white border border-gray-200 overflow-hidden rounded-lg"
        >
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="w-4 h-4 text-[#52dd28ff] mr-2" />
                <h2 className="text-sm font-bold text-gray-900">Recent Orders</h2>
              </div>
              <button 
                onClick={() => handleViewAllClick('orders')}
                className={getViewAllButtonClass()}
                disabled={isRefreshing}
              >
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.25 + index * 0.05 }}
                  className="p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{order.customer}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{order.id}</p>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-sm font-bold text-gray-900">₹{order.amount}</p>
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-sm mt-1 ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-400">No recent orders</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Users - Increased text sizes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="bg-white border border-gray-200 overflow-hidden rounded-lg"
        >
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-[#52dd28ff] mr-2" />
                <h2 className="text-sm font-bold text-gray-900">New Users</h2>
              </div>
              <button 
                onClick={() => handleViewAllClick('users')}
                className={getViewAllButtonClass()}
                disabled={isRefreshing}
              >
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((user, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}
                  className="p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 ml-2 whitespace-nowrap rounded">
                      {user.joined}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-400">No recent users</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions - Hidden on mobile, visible on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="hidden sm:block bg-white border border-gray-200 p-5 rounded-lg"
        >
          <div className="flex items-center mb-4">
            <BarChart3 className="w-5 h-5 text-[#52dd28ff] mr-2" />
            <h2 className="text-base font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => handleQuickAction('/admin/products')}
              className={getButtonClass('/admin/products')}
              aria-label="Manage Products"
              disabled={isRefreshing}
            >
              <div className={getBgClass('/admin/products')}>
                <Package className={getIconClass('/admin/products')} />
              </div>
              <span className={getTextClass('/admin/products')}>Products</span>
            </button>
            <button
              onClick={() => handleQuickAction('/admin/orders')}
              className={getButtonClass('/admin/orders')}
              aria-label="View Orders"
              disabled={isRefreshing}
            >
              <div className={getBgClass('/admin/orders')}>
                <ShoppingCart className={getIconClass('/admin/orders')} />
              </div>
              <span className={getTextClass('/admin/orders')}>Orders</span>
            </button>
            <button
              onClick={() => handleQuickAction('/admin/users')}
              className={getButtonClass('/admin/users')}
              aria-label="Manage Users"
              disabled={isRefreshing}
            >
              <div className={getBgClass('/admin/users')}>
                <Users className={getIconClass('/admin/users')} />
              </div>
              <span className={getTextClass('/admin/users')}>Users</span>
            </button>
            <button
              onClick={() => handleQuickAction('/admin/analytics')}
              className={getButtonClass('/admin/analytics')}
              aria-label="Analytics"
              disabled={isRefreshing}
            >
              <div className={getBgClass('/admin/analytics')}>
                <BarChart3 className={getIconClass('/admin/analytics')} />
              </div>
              <span className={getTextClass('/admin/analytics')}>Analytics</span>
            </button>
          </div>
          
          {/* Refresh Button - Only visible on desktop */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className={getRefreshButtonClass()}
            >
              {isRefreshing ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Refreshing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Refresh Dashboard</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Mobile Refresh Button - Only visible on mobile */}
        <div className="sm:hidden mt-4 flex justify-center">
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="px-4 py-2 bg-[#52dd28ff] text-white rounded-lg text-xs font-medium hover:bg-[#45b824] transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#52dd28ff]"
          >
            {isRefreshing ? (
              <>
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </>
            )}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
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
  Calendar,
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
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const handleQuickAction = (path) => {
    console.log('Navigating to:', path);
    setClickedButton(path);
    
    // Add visual feedback
    setTimeout(() => {
      setClickedButton(null);
      router.push(path);
    }, 150);
  };

  const handleNavigationError = (path, error) => {
    console.error(`Navigation to ${path} failed:`, error);
    setClickedButton(null);
    // You could add toast notification here
  };

  const handleQuickActionWithError = (path) => {
    try {
      handleQuickAction(path);
    } catch (error) {
      handleNavigationError(path, error);
    }
  };

  const handleViewAllWithError = (action) => {
    try {
      handleViewAllClick(action);
    } catch (error) {
      console.error(`View all ${action} failed:`, error);
      setClickedButton(null);
    }
  };

  const handleRefreshWithError = async () => {
    try {
      await refreshData();
    } catch (error) {
      console.error('Refresh failed:', error);
      setIsRefreshing(false);
    }
  };

  // Enhanced button handlers with error handling
  const handleQuickActionSafe = (path) => {
    if (isRefreshing) return; // Prevent navigation during refresh
    handleQuickActionWithError(path);
  };

  const handleViewAllSafe = (action) => {
    if (isRefreshing) return; // Prevent navigation during refresh
    handleViewAllWithError(action);
  };

  const handleRefreshSafe = async () => {
    if (isRefreshing) return; // Prevent multiple refreshes
    await handleRefreshWithError();
  };

  // Add click sound effect simulation
  const playClickSound = () => {
    // This would play a sound in a real implementation
    console.log('Button clicked');
  };

  // Enhanced handlers with sound
  const handleQuickActionWithSound = (path) => {
    playClickSound();
    handleQuickActionSafe(path);
  };

  const handleViewAllWithSound = (action) => {
    playClickSound();
    handleViewAllSafe(action);
  };

  const handleRefreshWithSound = async () => {
    playClickSound();
    await handleRefreshSafe();
  };

  const getButtonClass = (path) => {
    const baseClass = 'flex flex-col items-center p-5 bg-amado-light hover:bg-amado-yellow/10 rounded-lg transition-all duration-300 border border-transparent hover:border-amado-yellow group focus:outline-none focus:ring-2 focus:ring-amado-yellow focus:ring-opacity-50';
    return clickedButton === path 
      ? baseClass + ' scale-95 bg-amado-yellow/20' 
      : baseClass;
  };

  const getIconClass = (path) => {
    const baseClass = 'w-6 h-6 text-amado-gray group-hover:text-white transition-colors duration-300';
    return clickedButton === path 
      ? baseClass + ' text-white' 
      : baseClass;
  };

  const getBgClass = (path) => {
    const baseClass = 'p-3 bg-white rounded-circle mb-3 group-hover:bg-amado-yellow transition-colors duration-300';
    return clickedButton === path 
      ? baseClass + ' bg-amado-yellow' 
      : baseClass;
  };

  const getTextClass = (path) => {
    const baseClass = 'text-sm font-semibold text-amado-dark group-hover:text-amado-yellow transition-colors duration-300';
    return clickedButton === path 
      ? baseClass + ' text-amado-yellow' 
      : baseClass;
  };

  const getRefreshButtonClass = () => {
    const baseClass = 'px-6 py-3 bg-amado-yellow text-white rounded-lg font-semibold hover:bg-amado-dark transition-colors duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amado-yellow focus:ring-opacity-50';
    return isRefreshing 
      ? baseClass + ' opacity-50 cursor-not-allowed' 
      : baseClass;
  };

  const getRefreshTextClass = () => {
    return isRefreshing ? 'opacity-75' : '';
  };

  const getViewAllButtonClass = () => {
    const baseClass = 'text-amado-yellow hover:text-amado-dark text-sm font-medium transition-colors focus:outline-none focus:underline';
    return clickedButton === 'view-all' 
      ? baseClass + ' scale-95' 
      : baseClass;
  };

  const handleViewAllClick = (action) => {
    setClickedButton('view-all');
    setTimeout(() => setClickedButton(null), 300);
    if (action === 'orders') {
      handleViewAllOrders();
    } else {
      handleViewAllUsers();
    }
  };

  const handleViewAllOrders = () => {
    console.log('Viewing all orders');
    router.push('/admin/orders');
  };

  const handleViewAllUsers = () => {
    console.log('Viewing all users');
    router.push('/admin/users');
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

  const StatCard = ({ title, value, icon: Icon, change, isPositive, prefix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className={`flex items-center mt-2 text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
        <div className="p-3 bg-amado-yellow/10 rounded-circle">
          <Icon className="w-8 h-8 text-amado-yellow" />
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-amado-dark mb-2">Dashboard Overview</h1>
              <p className="text-amado-muted">Welcome back! Here's what's happening with your store today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-amado-muted">
                <Clock className="w-4 h-4 mr-2" />
                <span>Last updated: Just now</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            change="+12% from last month"
            isPositive={true}
          />
          <StatCard
            title="Products"
            value={stats.totalProducts}
            icon={Package}
            change="+5% from last month"
            isPositive={true}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            change="-3% from last month"
            isPositive={false}
          />
          <StatCard
            title="Revenue"
            value={stats.totalRevenue}
            prefix="$"
            icon={DollarSign}
            change="+18% from last month"
            isPositive={true}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 bg-amado-light">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-amado-yellow/10 rounded-circle mr-3">
                    <ShoppingCart className="w-5 h-5 text-amado-yellow" />
                  </div>
                  <h2 className="text-xl font-bold text-amado-dark">Recent Orders</h2>
                </div>
                <button 
                  onClick={() => handleViewAllWithSound('orders')}
                  className={getViewAllButtonClass()}
                  disabled={isRefreshing}
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {stats.recentOrders.map((order, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="p-5 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-amado-dark">{order.customer}</p>
                      <p className="text-sm text-amado-muted mt-1">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amado-dark">${order.amount}</p>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full mt-2 ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 bg-amado-light">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-amado-yellow/10 rounded-circle mr-3">
                    <Users className="w-5 h-5 text-amado-yellow" />
                  </div>
                  <h2 className="text-xl font-bold text-amado-dark">New Users</h2>
                </div>
                <button 
                  onClick={() => handleViewAllWithSound('users')}
                  className={getViewAllButtonClass()}
                  disabled={isRefreshing}
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {stats.recentUsers.map((user, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="p-5 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-amado-dark">{user.name}</p>
                      <p className="text-sm text-amado-muted mt-1">{user.email}</p>
                    </div>
                    <span className="text-xs text-amado-muted bg-amado-light px-2 py-1 rounded">
                      {user.joined}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center mb-6">
            <div className="p-2 bg-amado-yellow/10 rounded-circle mr-3">
              <BarChart3 className="w-5 h-5 text-amado-yellow" />
            </div>
            <h2 className="text-xl font-bold text-amado-dark">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleQuickActionWithSound('/admin/products')}
              className={getButtonClass('/admin/products')}
              aria-label="Manage Products"
              disabled={isRefreshing}
            >
              <div className={getBgClass('/admin/products')}>
                <Package className={getIconClass('/admin/products')} />
              </div>
              <span className={getTextClass('/admin/products')}>Manage Products</span>
            </button>
            <button
              onClick={() => handleQuickActionWithSound('/admin/orders')}
              className={getButtonClass('/admin/orders')}
              aria-label="View Orders"
              disabled={isRefreshing}
            >
              <div className={getBgClass('/admin/orders')}>
                <ShoppingCart className={getIconClass('/admin/orders')} />
              </div>
              <span className={getTextClass('/admin/orders')}>View Orders</span>
            </button>
            <button
              onClick={() => handleQuickActionWithSound('/admin/users')}
              className={getButtonClass('/admin/users')}
              aria-label="Manage Users"
              disabled={isRefreshing}
            >
              <div className={getBgClass('/admin/users')}>
                <Users className={getIconClass('/admin/users')} />
              </div>
              <span className={getTextClass('/admin/users')}>Manage Users</span>
            </button>
            <button
              onClick={() => handleQuickActionWithSound('/admin/analytics')}
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
          
          {/* Refresh Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRefreshWithSound}
              disabled={isRefreshing}
              className={getRefreshButtonClass()}
            >
              {isRefreshing ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Dashboard
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
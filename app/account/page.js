'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Mail, Lock, User, ArrowRight, Package, 
  MapPin, Phone, Calendar, CheckCircle, 
  Clock, Truck, XCircle, ChevronDown, ChevronUp, 
  ShoppingBag, LogOut, Chrome, Shield
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import { toast } from 'react-toastify';

// Status config for orders
const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

// User Info Card with Shipping Details Component
function UserInfoCard({ user, orders, onProfileUpdate }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
  });

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isEditing && user?.id) {
      fetchProfile();
    }
  }, [isEditing]);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/user/profile?userId=${user.id}`);
      const data = await response.json();
      
      if (response.ok && data.user) {
        setProfile(data.user);
        if (data.user.shippingAddress) {
          setFormData(data.user.shippingAddress);
        }
      } else {
        // Initialize with user name
        setFormData(prev => ({
          ...prev,
          fullName: user.name || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName?.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.phone?.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!formData.address?.trim()) {
      toast.error('Please enter your address');
      return;
    }
    if (!formData.city?.trim()) {
      toast.error('Please enter your city');
      return;
    }
    if (!formData.state?.trim()) {
      toast.error('Please enter your state');
      return;
    }
    if (!formData.zipCode?.trim()) {
      toast.error('Please enter your ZIP code');
      return;
    }
    
    try {
      setSaving(true);
      
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          shippingAddress: formData,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setProfile(data.user);
        if (data.user.shippingAddress) {
          setFormData(data.user.shippingAddress);
        }
        setIsEditing(false);
        toast.success('Shipping details updated successfully!');
        if (onProfileUpdate) onProfileUpdate();
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const hasAddress = !!(profile?.shippingAddress?.fullName?.trim() && profile?.shippingAddress?.address?.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6 lg:mb-8 transition-all duration-300 hover:shadow-md"
    >
      {isEditing ? (
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Edit Shipping Details</h2>
            <button
              onClick={() => {
                setIsEditing(false);
                if (profile?.shippingAddress) {
                  setFormData(profile.shippingAddress);
                }
              }}
              className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] resize-none transition-all duration-300 hover:border-gray-400"
                placeholder="Street address, apartment, suite, etc."
                required
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                  placeholder="State"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
                  ZIP *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] transition-all duration-300 hover:border-gray-400"
                  placeholder="ZIP"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="pt-3 sm:pt-4 lg:pt-5">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#52dd28ff] text-white font-medium py-2.5 sm:py-3 px-4 text-sm rounded-lg hover:bg-[#45b824] transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                {saving ? 'Saving...' : 'Save Shipping Details'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
            <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-[#52dd28ff]/10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#52dd28ff]">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 sm:gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                {user?.email}
              </p>
              
              <div className="mt-4 sm:mt-5 lg:mt-6 pt-4 sm:pt-5 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2 uppercase tracking-wide">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    Shipping Address
                  </h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs sm:text-sm text-[#52dd28ff] hover:text-[#45b824] font-medium transition-colors"
                  >
                    {hasAddress ? 'Edit' : 'Add'}
                  </button>
                </div>
                
                {loading ? (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : hasAddress ? (
                  <div className="text-xs sm:text-sm text-gray-600 space-y-0.5">
                    <p className="font-medium text-gray-900 text-sm">{profile.shippingAddress.fullName}</p>
                    <p>{profile.shippingAddress.address}</p>
                    <p>{profile.shippingAddress.city}, {profile.shippingAddress.state} - {profile.shippingAddress.zipCode}</p>
                    <p className="flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" />
                      {profile.shippingAddress.phone}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">No shipping address added</p>
                )}
              </div>
            </div>
            
            <div className="flex w-full sm:w-auto justify-around sm:justify-start gap-3 sm:gap-4 mt-3 sm:mt-0 sm:border-l sm:pl-4 sm:ml-2">
              <div className="text-center">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{orders?.length || 0}</p>
                <p className="text-[10px] sm:text-xs text-gray-600">Total Orders</p>
              </div>
              <div className="w-px bg-gray-200 hidden sm:block"></div>
              <div className="text-center">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                  {orders?.filter(o => o.status === 'delivered').length || 0}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-600">Delivered</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Account Dashboard Component
function AccountDashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch orders when component mounts
  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  // Poll for order updates every 30 seconds
  useEffect(() => {
    if (!user?.id) return;
    
    const interval = setInterval(() => {
      fetchOrders();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [user?.id]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('userId', user.id);
      
      const response = await fetch(`/api/orders?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message || 'Failed to fetch orders');
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error loading orders');
      setOrders([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchOrders();
    toast.info('Orders refreshed');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const getTotalItems = (items) => {
    return items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  };

  const StatCard = ({ title, value, icon: Icon, color = '#52dd28ff' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-5 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] sm:text-xs font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mt-0.5">{value}</p>
        </div>
        <div className="p-2 sm:p-2.5 lg:p-3 bg-[#52dd28ff]/10 rounded-full">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#52dd28ff]" />
        </div>
      </div>
    </motion.div>
  );
  
  const cancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
      
    try {
      setCancellingOrder(orderId);
        
      const response = await fetch('/api/orders/cancel', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, userId: user.id }),
      });
        
      const data = await response.json();
        
      if (response.ok) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: 'cancelled', canCancel: false } : order
        ));
        toast.success('Order cancelled successfully');
      } else {
        toast.error(data.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setCancellingOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />
      
      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>
        
        <div className="flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
          {/* Header */}
          <div className="mb-3 sm:mb-4 lg:mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5">My Account</h1>
                <p className="text-xs sm:text-sm text-gray-600">Manage your profile and orders</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Link 
                  href="/products"
                  className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#52dd28ff] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#45b824] transition-colors duration-300"
                >
                  <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span>Shop</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-300 border border-gray-200 hover:border-red-200"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Logout</span>
                </button>
              </div>
            </motion.div>
          </div>

          <UserInfoCard user={user} orders={orders} onProfileUpdate={fetchOrders} />

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 lg:mb-6"
          >
            <StatCard
              title="Total"
              value={orders.length}
              icon={ShoppingBag}
            />
            <StatCard
              title="Delivered"
              value={orders.filter(o => o.status === 'delivered').length}
              icon={CheckCircle}
            />
            <StatCard
              title="Pending"
              value={orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length}
              icon={Clock}
            />
          </motion.div>

          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 sm:p-2 bg-[#52dd28ff]/10 rounded-full mr-2 sm:mr-3">
                    <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-[#52dd28ff]" />
                  </div>
                  <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">My Orders</h2>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-[#52dd28ff] hover:text-[#45b824] bg-gray-100 hover:bg-[#52dd28ff]/10 rounded-lg transition-colors duration-300 border border-gray-200 hover:border-[#52dd28ff] disabled:opacity-50"
                >
                  <svg className={`w-3 h-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 lg:p-5">
              {loading ? (
                <div className="flex items-center justify-center py-8 sm:py-10 lg:py-12">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 border-3 border-[#52dd28ff] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-6 sm:py-8 lg:py-10">
                  <Package className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">No orders found</h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-4">
                    You haven't placed any orders yet.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center px-4 py-2 bg-[#52dd28ff] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-[#45b824] transition-colors duration-300"
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {orders.map((order, index) => {
                    const status = statusConfig[order.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    const isExpanded = expandedOrder === order.id;

                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-300"
                      >
                        <div 
                          className="p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#52dd28ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#52dd28ff]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate max-w-[120px] sm:max-w-none">
                                    #{order.orderNumber || order.id?.slice(-6).toUpperCase()}
                                  </h3>
                                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] sm:text-xs font-medium ${status.color}`}>
                                    <StatusIcon className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5" />
                                    {status.label}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600">
                                  <span className="flex items-center gap-0.5">
                                    <Calendar className="w-2 h-2 sm:w-3 sm:h-3" />
                                    {formatDate(order.createdAt)}
                                  </span>
                                  <span>{getTotalItems(order.items)} items</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                              <div className="text-left sm:text-right">
                                <p className="text-xs sm:text-sm font-bold text-gray-900">
                                  {formatPrice(order.totalAmount)}
                                </p>
                                <p className="text-[8px] sm:text-xs text-gray-600">
                                  {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
                                </p>
                              </div>
                              <div className="p-1.5 bg-gray-50 rounded-lg">
                                {isExpanded ? (
                                  <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                                ) : (
                                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-gray-200 bg-gray-50"
                            >
                              <div className="p-3 sm:p-4 space-y-3">
                                {/* Order Items */}
                                <div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                                    <Package className="w-3 h-3" />
                                    Items
                                  </h4>
                                  <div className="space-y-2">
                                    {order.items?.map((item, itemIndex) => (
                                      <div key={itemIndex} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-gray-200">
                                        <img 
                                          src={item.image || '/images/product-chai-cups.jpg'} 
                                          alt={item.name}
                                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border border-gray-200"
                                          onError={(e) => {
                                            e.target.src = '/images/product-chai-cups.jpg';
                                          }}
                                        />
                                        <div className="flex-1 min-w-0">
                                          <h5 className="text-xs font-medium text-gray-900 truncate">{item.name}</h5>
                                          {item.color && (
                                            <p className="text-[10px] text-gray-600">Color: {item.color}</p>
                                          )}
                                          <p className="text-[10px] text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-xs font-semibold text-gray-900">
                                            {formatPrice(item.price * item.quantity)}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    Shipping
                                  </h4>
                                  <div className="text-[10px] sm:text-xs text-gray-600">
                                    <p className="font-medium text-gray-900">{order.shippingAddress?.fullName}</p>
                                    <p>{order.shippingAddress?.address}</p>
                                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}</p>
                                    <p className="flex items-center gap-1 mt-1">
                                      <Phone className="w-2 h-2" />
                                      {order.shippingAddress?.phone}
                                    </p>
                                  </div>
                                </div>

                                {/* Order Total & Cancel */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-gray-200">
                                  <div>
                                    <p className="text-[10px] text-gray-600">Total</p>
                                    <p className="text-sm sm:text-base font-bold text-gray-900">
                                      {formatPrice(order.totalAmount)}
                                    </p>
                                  </div>
                                  
                                  {order.canCancel && (
                                    <button
                                      onClick={() => cancelOrder(order.id)}
                                      disabled={cancellingOrder === order.id}
                                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 flex items-center gap-1 w-full sm:w-auto justify-center"
                                    >
                                      {cancellingOrder === order.id ? (
                                        <>
                                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                          Cancelling...
                                        </>
                                      ) : (
                                        <>
                                          <XCircle className="w-3 h-3" />
                                          Cancel
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Login/Register Form Component
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'mobile'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [otpStep, setOtpStep] = useState(false); // For registration OTP
  const [forgotPasswordStep, setForgotPasswordStep] = useState(false); // For password reset
  const [otpData, setOtpData] = useState({ userId: '', email: '', mobile: '' }); // Store user data during OTP process
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateForm = () => {
    const newErrors = {};
    
    if (authMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    } else {
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^(\+91|91)?[6-9]\d{9}$/.test(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid Indian mobile number';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    }
    
    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors = {};
    
    if (!otp || otp.length !== 6) {
      newErrors.otp = 'Please enter a valid 6-digit OTP';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetPassword = () => {
    const newErrors = {};
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setErrors({});
      
      if (authMethod === 'email') {
        // Existing email OTP flow
        const response = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setOtpData({ userId: data.userId, email: data.email, mobile: '' });
          setOtpStep(true);
          setCountdown(600); // 10 minutes
          toast.success('OTP sent to your email!');
        } else {
          toast.error(data.message || 'Failed to send OTP');
          setErrors({ general: data.message });
        }
      } else {
        // New mobile OTP flow
        const response = await fetch('/api/auth/mobile/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mobile: formData.mobile.startsWith('+91') ? formData.mobile : '+91' + formData.mobile
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setOtpData({ userId: '', email: '', mobile: formData.mobile });
          setOtpStep(true);
          setCountdown(600); // 10 minutes
          toast.success('OTP sent to your mobile!');
        } else {
          toast.error(data.message || 'Failed to send OTP');
          setErrors({ general: data.message });
        }
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      toast.error('Network error. Please try again.');
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (!validateOTP()) return;
    
    try {
      setIsLoading(true);
      setErrors({});
      
      if (authMethod === 'email') {
        // Existing email OTP verification
        const response = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: otpData.userId,
            otp: otp
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          toast.success('Account created successfully!');
          // User is automatically logged in after verification
          window.location.reload();
        } else {
          toast.error(data.message || 'Invalid OTP');
          setErrors({ otp: data.message });
        }
      } else {
        // New mobile OTP verification
        const mobileNumber = otpData.mobile.startsWith('+91') ? otpData.mobile : '+91' + otpData.mobile;
        
        const response = await fetch('/api/auth/mobile/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mobile: mobileNumber,
            otp: otp,
            name: formData.name,
            password: formData.password
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          toast.success(data.message || 'Login successful!');
          // User is automatically logged in after verification
          window.location.reload();
        } else {
          toast.error(data.message || 'Invalid OTP');
          setErrors({ otp: data.message });
        }
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast.error('Network error. Please try again.');
      setErrors({ otp: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) {
      toast.info(`Please wait ${Math.ceil(countdown / 60)} minutes before resending`);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCountdown(600); // Reset countdown
        toast.success('OTP resent successfully!');
      } else {
        toast.error(data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setErrors({});
      
      if (authMethod === 'email') {
        if (!formData.email) {
          setErrors({ email: 'Email is required' });
          setIsLoading(false);
          return;
        }
        
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setForgotPasswordStep(true);
          setOtpData({ userId: data.userId, email: formData.email, mobile: '' });
          setCountdown(600); // 10 minutes
          toast.success('Password reset OTP sent to your email!');
        } else {
          toast.error(data.message || 'Failed to send reset OTP');
        }
      } else {
        // Mobile password reset
        if (!formData.mobile) {
          setErrors({ mobile: 'Mobile number is required' });
          setIsLoading(false);
          return;
        }
        
        const mobileNumber = formData.mobile.startsWith('+91') ? formData.mobile : '+91' + formData.mobile;
        
        const response = await fetch('/api/auth/mobile/reset-password/otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile: mobileNumber }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setForgotPasswordStep(true);
          setOtpData({ userId: '', email: '', mobile: formData.mobile });
          setCountdown(600); // 10 minutes
          toast.success('Password reset OTP sent to your mobile!');
        } else {
          toast.error(data.message || 'Failed to send reset OTP');
        }
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validateResetPassword()) return;
    
    try {
      setIsLoading(true);
      setErrors({});
      
      let response;
      
      if (authMethod === 'email') {
        response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: otpData.userId,
            otp: otp,
            newPassword: newPassword
          }),
        });
      } else {
        // Mobile password reset
        const mobileNumber = otpData.mobile.startsWith('+91') ? otpData.mobile : '+91' + otpData.mobile;
        response = await fetch('/api/auth/mobile/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mobile: mobileNumber,
            otp: otp,
            newPassword: newPassword
          }),
        });
      }
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Password reset successfully!');
        // Reset form and go back to login
        setForgotPasswordStep(false);
        setOtpStep(false);
        setIsLogin(true);
        setFormData({ name: '', email: '', mobile: '', password: '' });
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({});
      } else {
        toast.error(data.message || 'Failed to reset password');
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Network error. Please try again.');
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const loginAs = isAdmin ? 'admin' : 'user';
    
    if (isLogin) {
      await login(formData.email, formData.password, loginAs);
    } else {
      // For registration, send OTP instead of direct registration
      await handleSendOTP(e);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      
      const loginAs = isAdmin ? 'admin' : 'user';
      
      const response = await fetch('/api/auth/google/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          idToken,
          userInfo: {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL
          },
          loginAs
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (typeof window !== 'undefined') {
          if (data.user.loginAs === 'admin') {
            setTimeout(() => {
              window.location.href = '/admin';
            }, 100);
          } else {
            setTimeout(() => {
              window.location.href = '/';
            }, 100);
          }
        }
      } else {
        alert(data.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Google authentication failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMobileChange = (e) => {
    // Allow only numbers and limit to 10 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, mobile: value }));
    if (errors.mobile) {
      setErrors(prev => ({ ...prev, mobile: '' }));
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
  };

  const handleNewPasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Format countdown timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />
      
      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        <div className="h-14 lg:hidden"></div>
        
        <div className="flex-1 px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6"
              >
                <div className="text-center mb-5">
                  <Link href="/" className="inline-block">
                    <div className="text-3xl font-heading font-bold text-[#52dd28ff] mb-2">
                      MAnn
                    </div>
                  </Link>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {isLogin 
                      ? 'Sign in to your account' 
                      : 'Join the sustainable journey'
                    }
                  </p>
                </div>



                {/* OTP Verification Form */}
                {otpStep && (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-green-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Verify Your {authMethod === 'email' ? 'Email' : 'Mobile'}</h2>
                      <p className="text-gray-600">
                        Enter the 6-digit code sent to <span className="font-medium">
                          {authMethod === 'email' ? otpData.email : `+91${otpData.mobile}`}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">
                        Verification Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={otp}
                          onChange={handleOtpChange}
                          className={`w-full px-4 py-3 text-lg text-center tracking-widest border rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] ${
                            errors.otp ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0 0 0 0 0 0"
                          maxLength={6}
                          autoFocus
                        />
                      </div>
                      {errors.otp && <p className="text-xs text-red-500 mt-1">{errors.otp}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isLoading || countdown > 0}
                        className="text-[#52dd28ff] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {countdown > 0 ? `Resend in ${formatTime(countdown)}` : 'Resend Code'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpStep(false);
                          setOtp('');
                          setErrors({});
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Change Email
                      </button>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading || otp.length !== 6}
                      className="w-full py-3 bg-[#52dd28ff] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#45b824] transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Verify Account
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Password Reset Form */}
                {forgotPasswordStep && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
                      <p className="text-gray-600">
                        Enter the 6-digit code sent to <span className="font-medium">
                          {authMethod === 'email' ? otpData.email : `+91${otpData.mobile}`}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">
                        Verification Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={otp}
                          onChange={handleOtpChange}
                          className={`w-full px-4 py-3 text-lg text-center tracking-widest border rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] ${
                            errors.otp ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0 0 0 0 0 0"
                          maxLength={6}
                          autoFocus
                        />
                      </div>
                      {errors.otp && <p className="text-xs text-red-500 mt-1">{errors.otp}</p>}
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="newPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] ${
                            errors.newPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter new password"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? 
                            <EyeOff className="w-5 h-5 text-gray-400" /> : 
                            <Eye className="w-5 h-5 text-gray-400" />
                          }
                        </button>
                      </div>
                      {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>}
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={handleNewPasswordChange}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Confirm new password"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? 
                            <EyeOff className="w-5 h-5 text-gray-400" /> : 
                            <Eye className="w-5 h-5 text-gray-400" />
                          }
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        onClick={() => {
                          // Resend OTP for password reset
                          if (countdown === 0) {
                            handleForgotPassword({ preventDefault: () => {} });
                          }
                        }}
                        disabled={isLoading || countdown > 0}
                        className="text-[#52dd28ff] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {countdown > 0 ? `Resend in ${formatTime(countdown)}` : 'Resend Code'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotPasswordStep(false);
                          setOtpStep(false);
                          setIsLogin(true);
                          setOtp('');
                          setNewPassword('');
                          setConfirmPassword('');
                          setErrors({});
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Back to Login
                      </button>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading || otp.length !== 6 || !newPassword || !confirmPassword}
                      className="w-full py-3 bg-[#52dd28ff] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#45b824] transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Reset Password
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Main Login/Register Form */}
                {!otpStep && !forgotPasswordStep && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Authentication Method Selector */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                      <button
                        type="button"
                        onClick={() => setAuthMethod('email')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          authMethod === 'email'
                            ? 'bg-white text-green-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMethod('mobile')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          authMethod === 'mobile'
                            ? 'bg-white text-green-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span>📱</span>
                          <span>Mobile</span>
                        </span>
                      </button>
                    </div>

                    {!isLogin && (
                      <div>
                        <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] ${
                              errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Full name"
                          />
                        </div>
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                    )}

                    {/* Email or Mobile Input */}
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">
                        {authMethod === 'email' ? 'Email' : 'Mobile Number'}
                      </label>
                      <div className="relative">
                        {authMethod === 'email' ? (
                          <>
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="your@email.com"
                            />
                          </>
                        ) : (
                          <>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                              <span className="text-gray-400 text-sm">+91</span>
                            </div>
                            <input
                              name="mobile"
                              type="tel"
                              value={formData.mobile}
                              onChange={handleMobileChange}
                              className={`w-full pl-12 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] ${
                                errors.mobile ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="9876543210"
                              maxLength={10}
                            />
                          </>
                        )}
                      </div>
                      {authMethod === 'email' && errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      {authMethod === 'mobile' && errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                    </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block uppercase tracking-wide">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#52dd28ff]/20 focus:border-[#52dd28ff] ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Min 6 characters"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? 
                          <EyeOff className="w-4 h-4 text-gray-400" /> : 
                          <Eye className="w-4 h-4 text-gray-400" />
                        }
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>


                                  {/* Admin Toggle - Only show for login, not for registration */}
                {isLogin && (
                  <div className="mb-6 flex items-center justify-between p-2 sm:p-3 ml-6 bg-gray-50 rounded-box-lg border border-gray-200 w-55">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#52dd28ff]" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Admin Login</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAdmin(!isAdmin)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#52dd28ff] focus:ring-offset-2 ${
                        isAdmin ? 'bg-[#52dd28ff]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded- bg-white transition-transform ${
                          isAdmin ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-[#52dd28ff] text-white rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#45b824] transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        {isLogin ? 'Log In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Forgot Password Link - Only for login */}
                  {isLogin && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-[#52dd28ff] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-500">Or</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                  </button>
                </form>
                )}

                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setFormData({ name: '', email: '', password: '' });
                        setErrors({});
                        setIsAdmin(false); // Reset admin toggle when switching modes
                        setOtpStep(false);
                        setForgotPasswordStep(false);
                        setOtp('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="ml-1 text-[#52dd28ff] font-medium hover:underline"
                    >
                      {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Sidebar />
        <MobileNav />
        <div className="lg:ml-[280px] flex flex-col min-h-screen">
          <div className="h-14 lg:hidden"></div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-3 border-[#52dd28ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {user ? <AccountDashboard /> : <AuthForm />}
    </div>
  );
}
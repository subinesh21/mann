'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Mail, Lock, User, ArrowRight, Package, 
  MapPin, Phone, IndianRupee, Calendar, CheckCircle, 
  Clock, Truck, XCircle, ChevronDown, ChevronUp, 
  ShoppingBag, LogOut, Home, Chrome, AlertCircle,
  Users, ShoppingCart, BarChart3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Sidebar from '@/components/sections/Sidebar';
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
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 transition-all duration-300 hover:shadow-xl"
    >
      {isEditing ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Edit Shipping Details</h2>
            <button
              onClick={() => {
                setIsEditing(false);
                if (profile?.shippingAddress) {
                  setFormData(profile.shippingAddress);
                }
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:border-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:border-gray-400"
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all duration-300 hover:border-gray-400"
                placeholder="Street address, apartment, suite, etc."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:border-gray-400"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:border-gray-400"
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:border-gray-400"
                  placeholder="ZIP Code"
                  required
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                {saving ? 'Saving...' : 'Save Shipping Details'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-3xl font-bold text-primary">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
              <p className="text-gray-600 flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                    <MapPin className="w-4 h-4" />
                    Shipping Address
                  </h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    {hasAddress ? 'Edit' : 'Add'}
                  </button>
                </div>
                
                {loading ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : hasAddress ? (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900">{profile.shippingAddress.fullName}</p>
                    <p>{profile.shippingAddress.address}</p>
                    <p>{profile.shippingAddress.city}, {profile.shippingAddress.state} - {profile.shippingAddress.zipCode}</p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {profile.shippingAddress.phone}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No shipping address added</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 text-center sm:border-l sm:pl-4 sm:ml-2">
              <div>
                <p className="text-2xl font-bold text-gray-900">{orders?.length || 0}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {orders?.filter(o => o.status === 'delivered').length || 0}
                </p>
                <p className="text-sm text-gray-600">Delivered</p>
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
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, [user?.id]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('userId', user.id);
      
      console.log('Fetching orders for user:', user.id);
      
      const response = await fetch(`/api/orders?${params.toString()}`);
      const data = await response.json();
      
      console.log('Orders API response:', data);
      
      if (response.ok) {
        setOrders(data.orders || []);
        if (data.orders?.length === 0) {
          console.log('No orders found for user');
        }
      } else {
        console.error('Failed to fetch orders:', data.message);
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

  const StatCard = ({ title, value, icon: Icon, color = 'amado-yellow' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-amado-border p-6 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-amado-muted uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-amado-dark mt-1">{value}</p>
        </div>
        <div className={`p-3 bg-${color}/10 rounded-circle`}>
          <Icon className={`w-6 h-6 text-${color}`} />
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
    <div className="flex min-h-screen bg-amado-light">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header spacer */}
        <div className="h-16 lg:hidden"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl font-bold text-amado-dark mb-2">My Account</h1>
                <p className="text-amado-muted">Manage your profile and orders</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/products/allproducts"
                  className="flex items-center px-4 py-2 bg-amado-yellow text-white rounded-lg font-semibold hover:bg-amado-dark transition-colors duration-300"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Shop</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300 border border-transparent hover:border-red-200"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <StatCard
              title="Total Orders"
              value={orders.length}
              icon={ShoppingCart}
              color="amado-yellow"
            />
            <StatCard
              title="Delivered"
              value={orders.filter(o => o.status === 'delivered').length}
              icon={CheckCircle}
              color="green-500"
            />
            <StatCard
              title="Pending"
              value={orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length}
              icon={Clock}
              color="blue-500"
            />
          </motion.div>

          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-amado-border overflow-hidden"
          >
            <div className="p-6 border-b border-amado-border bg-amado-light">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-amado-yellow/10 rounded-circle mr-3">
                    <ShoppingCart className="w-5 h-5 text-amado-yellow" />
                  </div>
                  <h2 className="text-xl font-bold text-amado-dark">My Orders</h2>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center px-4 py-2 text-sm font-medium text-amado-yellow hover:text-amado-dark bg-amado-light hover:bg-amado-yellow/10 rounded-lg transition-colors duration-300 border border-amado-border hover:border-amado-yellow disabled:opacity-50"
                >
                  <svg className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-amado-yellow border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-amado-gray mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amado-dark mb-2">No orders found</h3>
                  <p className="text-amado-muted max-w-md mx-auto mb-6">
                    You haven't placed any orders yet. Start shopping to see your orders here.
                  </p>
                  <Link
                    href="/products/allproducts"
                    className="inline-flex items-center px-6 py-3 bg-amado-yellow text-white rounded-lg font-semibold hover:bg-amado-dark transition-colors duration-300"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
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
                        className="border border-amado-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        <div 
                          className="p-5 cursor-pointer hover:bg-amado-light transition-colors duration-200"
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-amado-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-6 h-6 text-amado-yellow" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 flex-wrap mb-2">
                                  <h3 className="font-semibold text-amado-dark text-lg">
                                    Order #{order.orderNumber || order.id?.slice(-8).toUpperCase()}
                                  </h3>
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {status.label}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-amado-muted">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(order.createdAt)}
                                  </span>
                                  <span>{getTotalItems(order.items)} items</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-bold text-amado-dark text-lg">
                                  {formatPrice(order.totalAmount)}
                                </p>
                                <p className="text-sm text-amado-muted">
                                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                </p>
                              </div>
                              <div className="p-2 bg-amado-light rounded-lg transition-colors duration-300 group-hover:bg-amado-yellow/10">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-amado-gray" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-amado-gray" />
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
                              className="border-t border-amado-border bg-amado-light"
                            >
                              <div className="p-5 space-y-5">
                                <div>
                                  <h4 className="font-semibold text-amado-dark mb-3 flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Order Items
                                  </h4>
                                  <div className="space-y-3">
                                    {order.items?.map((item, itemIndex) => (
                                      <div key={itemIndex} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-amado-border">
                                        <img 
                                          src={item.image || '/images/product-chai-cups.jpg'} 
                                          alt={item.name}
                                          className="w-16 h-16 object-cover rounded-lg border border-amado-border"
                                          onError={(e) => {
                                            e.target.src = '/images/product-chai-cups.jpg';
                                          }}
                                        />
                                        <div className="flex-1">
                                          <h5 className="font-medium text-amado-dark">{item.name}</h5>
                                          {item.color && (
                                            <p className="text-sm text-amado-muted">Color: {item.color}</p>
                                          )}
                                          <p className="text-sm text-amado-muted">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-semibold text-amado-dark">
                                            {formatPrice(item.price * item.quantity)}
                                          </p>
                                          <p className="text-sm text-amado-muted">
                                            {formatPrice(item.price)} each
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-amado-border">
                                  <h4 className="font-semibold text-amado-dark mb-3 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Shipping Address
                                  </h4>
                                  <div className="text-sm text-amado-muted">
                                    <p className="font-medium text-amado-dark">{order.shippingAddress?.fullName}</p>
                                    <p>{order.shippingAddress?.address}</p>
                                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}</p>
                                    <p className="flex items-center gap-2 mt-2">
                                      <Phone className="w-4 h-4" />
                                      {order.shippingAddress?.phone}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-amado-border">
                                  <div>
                                    <p className="text-sm text-amado-muted">Order Total</p>
                                    <p className="text-2xl font-bold text-amado-dark">
                                      {formatPrice(order.totalAmount)}
                                    </p>
                                  </div>
                                  
                                  {order.canCancel && (
                                    <button
                                      onClick={() => cancelOrder(order.id)}
                                      disabled={cancellingOrder === order.id}
                                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                                    >
                                      {cancellingOrder === order.id ? (
                                        <>
                                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                          Cancelling...
                                        </>
                                      ) : (
                                        <>
                                          <XCircle className="w-4 h-4" />
                                          Cancel Order
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
  const [loginAs, setLoginAs] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { login, register, isLoading } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (isLogin) {
      await login(formData.email, formData.password, loginAs);
    } else {
      await register(formData.name, formData.email, formData.password);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      
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

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 lg:ml-0">
        <div className="h-16 lg:hidden"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-xl p-8 sm:p-10 border border-gray-200"
              >
                <div className="text-center mb-8">
                  <Link href="/" className="inline-block">
                    <div className="text-4xl font-heading font-bold text-primary mb-2">
                      <span className="text-gray-800">C</span>GG
                    </div>
                  </Link>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {isLogin 
                      ? 'Sign in to your account to continue' 
                      : 'Join us to start your sustainable journey'
                    }
                  </p>
                  
                  {isLogin && (
                    <div className="mt-6 flex justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => setLoginAs('user')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                          loginAs === 'user'
                            ? 'bg-primary text-white shadow-md transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                        }`}
                      >
                        User
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginAs('admin')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                          loginAs === 'admin'
                            ? 'bg-primary text-white shadow-md transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                            errors.name ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                          errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                          errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-900 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-900 transition-colors" />
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Chrome className="w-5 h-5" />
                        {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setFormData({ name: '', email: '', password: '' });
                        setErrors({});
                      }}
                      className="ml-1 text-primary hover:text-primary-dark font-medium"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link 
                    href="/" 
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    ← Back to Home
                  </Link>
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
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1 lg:ml-0">
          <div className="h-16 lg:hidden"></div>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
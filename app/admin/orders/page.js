'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronDown,
  ChevronUp,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  IndianRupee
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }
      
      const queryString = params.toString();
      const url = `/api/admin/orders${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Update local state
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Filter orders by search term
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.orderNumber?.toLowerCase().includes(searchLower) ||
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order.user?.email?.toLowerCase().includes(searchLower) ||
      order.shippingAddress?.phone?.includes(searchTerm)
    );
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate total items in order
  const getTotalItems = (items) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-amado-dark mb-2">Order Management</h1>
            <p className="text-amado-muted">
              Manage and track all customer orders efficiently
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-amado-muted bg-white px-4 py-2 rounded-lg border border-amado-border">
            <div className="p-2 bg-amado-yellow/10 rounded-circle">
              <ShoppingCart className="w-5 h-5 text-amado-yellow" />
            </div>
            <div>
              <span className="block font-semibold text-amado-dark">{orders.length}</span>
              <span className="block">Total Orders</span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 bg-white p-5 rounded-lg border border-amado-border shadow-sm"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amado-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order #, customer name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amado-border rounded-lg focus:ring-2 focus:ring-amado-yellow focus:border-amado-yellow transition-all duration-300 bg-amado-light placeholder:text-amado-muted"
            />
          </div>
          
          {/* Status Filter */}
          <div className="relative min-w-[180px]">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amado-gray w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-3 border border-amado-border rounded-lg focus:ring-2 focus:ring-amado-yellow focus:border-amado-yellow appearance-none bg-white transition-all duration-300 text-amado-dark font-medium"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amado-gray w-4 h-4 pointer-events-none" />
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orders List */}
        <div className="bg-white rounded-lg border border-amado-border overflow-hidden">
          <div className="px-5 py-4 border-b border-amado-border bg-amado-light">
            <h3 className="text-lg font-semibold text-amado-dark">Order History</h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-amado-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-amado-muted">Loading orders...</p>
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-8">
                <Package className="w-16 h-16 text-amado-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-amado-dark mb-2">No orders found</h3>
                <p className="text-amado-muted max-w-md mx-auto">
                  {searchTerm ? 'Try adjusting your search or filters' : 'Orders will appear here when customers place them'}
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-amado-border">
              {filteredOrders.map((order, index) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                const isExpanded = expandedOrder === order.id;
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-amado-light transition-colors duration-200"
                  >
                    {/* Order Header */}
                    <div 
                      className="p-5 cursor-pointer"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Order Info */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-amado-yellow/10 rounded-circle flex items-center justify-center flex-shrink-0">
                            <Package className="w-6 h-6 text-amado-yellow" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                              <h3 className="font-bold text-amado-dark text-lg">
                                Order #{order.orderNumber}
                              </h3>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {status.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-5 flex-wrap text-sm text-amado-muted">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(order.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {order.user?.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {order.user?.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-amado-dark text-lg flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              {order.totalAmount?.toFixed(2)}
                            </p>
                            <p className="text-sm text-amado-muted">
                              {getTotalItems(order.items)} items
                            </p>
                          </div>
                          <button className="p-2 hover:bg-amado-yellow/10 rounded-circle transition-colors duration-300">
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-amado-gray" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-amado-gray" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Order Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-amado-border bg-white"
                        >
                          <div className="p-5 space-y-6">
                            {/* Customer & Shipping Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Customer Details */}
                              <div className="bg-amado-light rounded-lg p-5 border border-amado-border">
                                <h4 className="font-semibold text-amado-dark mb-4 flex items-center gap-2">
                                  <User className="w-5 h-5 text-amado-yellow" />
                                  Customer Details
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div>
                                    <p className="text-amado-dark font-semibold text-base">{order.user?.name}</p>
                                    <p className="text-amado-muted">Full Name</p>
                                  </div>
                                  <div>
                                    <p className="text-amado-dark font-medium flex items-center gap-2">
                                      <Mail className="w-4 h-4 text-amado-gray" />
                                      {order.user?.email}
                                    </p>
                                    <p className="text-amado-muted">Email Address</p>
                                  </div>
                                  <div>
                                    <p className="text-amado-dark font-medium flex items-center gap-2">
                                      <Phone className="w-4 h-4 text-amado-gray" />
                                      {order.shippingAddress?.phone}
                                    </p>
                                    <p className="text-amado-muted">Phone Number</p>
                                  </div>
                                </div>
                              </div>

                              {/* Shipping Address */}
                              <div className="bg-amado-light rounded-lg p-5 border border-amado-border">
                                <h4 className="font-semibold text-amado-dark mb-4 flex items-center gap-2">
                                  <MapPin className="w-5 h-5 text-amado-yellow" />
                                  Shipping Address
                                </h4>
                                <div className="space-y-2 text-sm text-amado-dark">
                                  <p className="font-semibold text-base">{order.shippingAddress?.fullName}</p>
                                  <p className="text-amado-muted">{order.shippingAddress?.address}</p>
                                  <p className="text-amado-muted">{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}</p>
                                  <p className="text-amado-muted">{order.shippingAddress?.country}</p>
                                </div>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h4 className="font-semibold text-amado-dark mb-4 text-lg">Order Items</h4>
                              <div className="space-y-4">
                                {order.items?.map((item, index) => (
                                  <div key={index} className="flex items-center gap-4 p-4 bg-amado-light rounded-lg border border-amado-border">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-16 h-16 object-cover rounded-lg border border-amado-border"
                                    />
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-amado-dark">{item.name}</h5>
                                      {item.color && (
                                        <p className="text-sm text-amado-muted mt-1">Color: {item.color}</p>
                                      )}
                                      <p className="text-sm text-amado-muted">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-amado-dark text-lg flex items-center gap-1">
                                        <IndianRupee className="w-4 h-4" />
                                        {(item.price * item.quantity).toFixed(2)}
                                      </p>
                                      <p className="text-sm text-amado-muted">
                                        <IndianRupee className="w-3 h-3 inline" />
                                        {item.price.toFixed(2)} each
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Total & Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-amado-border">
                              <div>
                                <p className="text-sm text-amado-muted mb-1">Payment Method</p>
                                <p className="font-semibold text-amado-dark text-lg">
                                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-amado-muted mb-1">Total Amount</p>
                                <p className="text-2xl font-bold text-amado-dark flex items-center gap-1 justify-end">
                                  <IndianRupee className="w-6 h-6" />
                                  {order.totalAmount?.toFixed(2)}
                                </p>
                              </div>
                            </div>

                            {/* Status Update */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-amado-border">
                              <span className="text-sm font-semibold text-amado-dark">Update Status:</span>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(statusConfig).map(([key, config]) => (
                                  <button
                                    key={key}
                                    onClick={() => updateOrderStatus(order.id, key)}
                                    disabled={updatingStatus === order.id || order.status === key}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                      order.status === key
                                        ? `${config.color} border border-current`
                                        : 'bg-amado-light text-amado-dark hover:bg-amado-yellow/10 hover:text-amado-yellow border border-amado-border hover:border-amado-yellow'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                  >
                                    {updatingStatus === order.id ? (
                                      <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Updating...
                                      </span>
                                    ) : (
                                      config.label
                                    )}
                                  </button>
                                ))}
                              </div>
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
      </div>
    </AdminLayout>
  );
}

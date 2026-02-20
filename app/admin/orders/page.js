'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
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
    });
  };

  // Calculate total items in order
  const getTotalItems = (items) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <AdminLayout>
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Orders</h1>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Manage customer orders</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs bg-white px-2 py-1 rounded border border-gray-200">
            <ShoppingCart className="w-3 h-3 text-[#52dd28ff]" />
            <span className="font-medium text-gray-900">{orders.length}</span>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 sm:pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#52dd28ff] focus:border-[#52dd28ff] bg-white"
            />
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-7 sm:pl-8 pr-6 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#52dd28ff] focus:border-[#52dd28ff] appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orders List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#52dd28ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredOrders.map((order, index) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                const isExpanded = expandedOrder === order.id;
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Order Header */}
                    <div 
                      className="p-3 cursor-pointer"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#52dd28ff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-[#52dd28ff]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-xs font-semibold text-gray-900 truncate">
                              #{order.orderNumber}
                            </h3>
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-medium ${status.color}`}>
                              <StatusIcon className="w-2 h-2 mr-0.5" />
                              {status.label}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 truncate">{order.user?.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-900 flex items-center gap-0.5">
                            <IndianRupee className="w-2 h-2" />
                            {order.totalAmount}
                          </p>
                          <ChevronDown className="w-3 h-3 text-gray-400 ml-auto" />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-100 bg-gray-50"
                        >
                          <div className="p-3 space-y-3">
                            {/* Customer & Shipping */}
                            <div className="grid grid-cols-1 gap-2">
                              <div className="bg-white p-2 rounded border border-gray-200">
                                <h4 className="text-[10px] font-semibold text-gray-900 mb-2 flex items-center gap-1">
                                  <User className="w-3 h-3 text-[#52dd28ff]" />
                                  Customer
                                </h4>
                                <p className="text-[10px] font-medium text-gray-900">{order.user?.name}</p>
                                <p className="text-[8px] text-gray-500 flex items-center gap-1 mt-1">
                                  <Mail className="w-2 h-2" />
                                  {order.user?.email}
                                </p>
                                <p className="text-[8px] text-gray-500 flex items-center gap-1">
                                  <Phone className="w-2 h-2" />
                                  {order.shippingAddress?.phone}
                                </p>
                              </div>

                              <div className="bg-white p-2 rounded border border-gray-200">
                                <h4 className="text-[10px] font-semibold text-gray-900 mb-2 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-[#52dd28ff]" />
                                  Shipping
                                </h4>
                                <p className="text-[8px] text-gray-600">{order.shippingAddress?.fullName}</p>
                                <p className="text-[8px] text-gray-500">{order.shippingAddress?.address}</p>
                                <p className="text-[8px] text-gray-500">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                                <p className="text-[8px] text-gray-500">{order.shippingAddress?.zipCode}</p>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white p-2 rounded border border-gray-200">
                              <h4 className="text-[10px] font-semibold text-gray-900 mb-2">Items ({getTotalItems(order.items)})</h4>
                              <div className="space-y-2">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-6 h-6 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[8px] font-medium text-gray-900 truncate">{item.name}</p>
                                      <p className="text-[7px] text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-[8px] font-medium text-gray-900">
                                      ₹{item.price * item.quantity}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Status Update */}
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(statusConfig).map(([key, config]) => (
                                <button
                                  key={key}
                                  onClick={() => updateOrderStatus(order.id, key)}
                                  disabled={updatingStatus === order.id || order.status === key}
                                  className={`px-2 py-1 rounded text-[8px] font-medium ${
                                    order.status === key
                                      ? config.color
                                      : 'bg-white border border-gray-200 text-gray-600'
                                  } disabled:opacity-50`}
                                >
                                  {updatingStatus === order.id ? '...' : config.label}
                                </button>
                              ))}
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
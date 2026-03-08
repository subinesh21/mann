'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package, MapPin, Phone, Calendar, CheckCircle,
    Clock, Truck, XCircle, ChevronDown, ChevronUp,
    ShoppingBag, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Sidebar from '@/components/sections/Sidebar';
import MobileNav from '@/components/MobileNav';
import { toast } from 'react-toastify';
import UserInfoCard from './UserInfoCard';
import OrderTimeline from './OrderTimeline';

// Status config for orders
const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const StatCard = ({ title, value, icon: Icon, color = '#52dd28ff' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-box shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-5 hover:shadow-md transition-shadow duration-300"
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

export default function AccountDashboard() {
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
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5 font-cinzel">My Account</h1>
                                <p className="text-xs sm:text-sm text-gray-600 font-mono">Manage your profile and orders</p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Link
                                    href="/products"
                                    className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#52dd28ff] text-white rounded-box text-xs sm:text-sm font-medium hover:bg-[#45b824] transition-colors duration-300"
                                >
                                    <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    <span>Shop</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 rounded-box text-xs sm:text-sm font-medium transition-colors duration-300 border border-gray-200 hover:border-red-200"
                                >
                                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    <span className="hidden xs:inline">Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
                        <div className="lg:col-span-2">
                            <UserInfoCard user={user} onProfileUpdate={fetchOrders} />
                        </div>

                        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-4 lg:gap-4 self-start lg:h-91 sm:h-50">
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
                        </div>
                    </div>

                    {/* Orders Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-box shadow-sm border border-gray-200 overflow-hidden"
                    >
                        <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="p-1.5 sm:p-2 bg-[#52dd28ff]/10 rounded-box mr-2 sm:mr-3">
                                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-[#52dd28ff]" />
                                    </div>
                                    <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">My Orders</h2>
                                </div>
                                <button
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    className="flex items-center px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-[#52dd28ff] hover:text-[#45b824] bg-gray-100 hover:bg-[#52dd28ff]/10 rounded-box transition-colors duration-300 border border-gray-200 hover:border-[#52dd28ff] disabled:opacity-50"
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
                                        className="inline-flex items-center px-4 py-2 bg-[#52dd28ff] text-white rounded-box text-xs sm:text-sm font-medium hover:bg-[#45b824] transition-colors duration-300"
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
                                                className="border border-gray-200 rounded-box overflow-hidden hover:shadow-sm transition-shadow duration-300"
                                            >
                                                <div
                                                    className="p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                                                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                                >
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                                                        <div className="flex items-start gap-2 sm:gap-3">
                                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#52dd28ff]/10 rounded-box flex items-center justify-center flex-shrink-0">
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
                                                            <div className="p-1.5 bg-gray-50 rounded-box">
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
                                                            <div className="p-3 sm:p-4">
                                                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4">
                                                                    <div className="flex-1 space-y-3 lg:pr-4">
                                                                        {/* Order Items */}
                                                                        <div>
                                                                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                                                                                <Package className="w-3 h-3" />
                                                                                Items
                                                                            </h4>
                                                                            <div className="space-y-2">
                                                                                {order.items?.map((item, itemIndex) => (
                                                                                    <div key={itemIndex} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-box border border-gray-200">
                                                                                        <img
                                                                                            src={item.image || '/images/product-chai-cups.jpg'}
                                                                                            alt={item.name}
                                                                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-box border border-gray-200"
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
                                                                        <div className="bg-white rounded-box p-2 sm:p-3 border border-gray-200">
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
                                                                    </div>

                                                                    {/* Order Timeline - Vertical on right */}
                                                                    <div className="lg:w-1/3 lg:min-w-[280px]">
                                                                        <div className="bg-white rounded-box p-3 sm:p-4 border border-gray-200 h-full">
                                                                            <OrderTimeline 
                                                                                currentStatus={order.status} 
                                                                                createdAt={order.createdAt} 
                                                                                updatedAt={order.updatedAt} 
                                                                            />
                                                                        </div>
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
                                                                            className="px-3 py-1.5 bg-red-500 text-white rounded-box text-xs font-medium hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 flex items-center gap-1 w-full sm:w-auto justify-center"
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

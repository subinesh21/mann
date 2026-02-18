'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  IndianRupee,
  Package,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  Clock,
  BarChart3,
  PieChart,
  UserPlus,
  Box
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

// Simple Bar Chart Component
function BarChart({ data, labelKey, valueKey, color = 'bg-primary' }) {
  const maxValue = Math.max(...data.map(d => d[valueKey]));
  
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-16 text-xs text-gray-500 text-right truncate">
            {item[labelKey]}
          </div>
          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item[valueKey] / maxValue) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`h-full ${color} rounded-full`}
            />
          </div>
          <div className="w-12 text-xs font-medium text-gray-700">
            {item[valueKey]}
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple Line Chart Component
function LineChart({ data, valueKey }) {
  if (data.length === 0) return <div className="text-center text-gray-500 py-8">No data available</div>;
  
  const maxValue = Math.max(...data.map(d => d[valueKey]));
  const minValue = Math.min(...data.map(d => d[valueKey]));
  const range = maxValue - minValue || 1;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * 100;
    const y = 100 - ((d[valueKey] - minValue) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative h-48 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
        ))}
        
        {/* Area fill */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill="rgba(59, 130, 246, 0.1)"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1 || 1)) * 100;
          const y = 100 - ((d[valueKey] - minValue) / range) * 80 - 10;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill="#3b82f6"
            />
          );
        })}
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0 || i === data.length - 1).map((d, i) => (
          <span key={i}>{d._id?.slice(5) || d.date?.slice(5)}</span>
        ))}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, subtitle, trend, trendUp, icon: Icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="flex items-center mt-4">
          {trendUp ? (
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-xs text-gray-500 ml-2">vs last period</span>
        </div>
      )}
    </motion.div>
  );
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7d');

  const periods = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
  ];

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/analytics?period=${period}`);
      const data = await response.json();
      
      if (response.ok) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Failed to load analytics data</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your business performance and metrics</p>
          </div>
          
          {/* Period Selector */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            {periods.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(analytics.revenue?.period || 0)}
            subtitle={`Lifetime: ${formatCurrency(analytics.revenue?.total || 0)}`}
            trend={analytics.revenue?.growth || 0}
            trendUp={analytics.revenue?.growth >= 0}
            icon={IndianRupee}
            color="bg-green-500"
          />
          
          <StatCard
            title="New Orders"
            value={formatNumber(analytics.orders?.new || 0)}
            subtitle={`Total: ${formatNumber(analytics.orders?.total || 0)}`}
            trend={analytics.orders?.growth || 0}
            trendUp={analytics.orders?.growth >= 0}
            icon={ShoppingCart}
            color="bg-blue-500"
          />
          
          <StatCard
            title="New Users"
            value={formatNumber(analytics.users?.new || 0)}
            subtitle={`Total: ${formatNumber(analytics.users?.total || 0)}`}
            trend={analytics.users?.growth || 0}
            trendUp={analytics.users?.growth >= 0}
            icon={UserPlus}
            color="bg-purple-500"
          />
          
          <StatCard
            title="Avg Order Value"
            value={formatCurrency(analytics.revenue?.average || 0)}
            subtitle="Per order"
            icon={Activity}
            color="bg-orange-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Revenue Trend
              </h3>
              <span className="text-sm text-gray-500">Daily</span>
            </div>
            <LineChart 
              data={analytics.orders?.dailyStats || []} 
              valueKey="revenue" 
            />
          </motion.div>

          {/* Orders Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Orders Trend
              </h3>
              <span className="text-sm text-gray-500">Daily</span>
            </div>
            <LineChart 
              data={analytics.orders?.dailyStats || []} 
              valueKey="orders" 
            />
          </motion.div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Order Status
            </h3>
            <BarChart 
              data={Object.entries(analytics.orders?.byStatus || {}).map(([status, count]) => ({
                status: status.charAt(0).toUpperCase() + status.slice(1),
                count
              }))}
              labelKey="status"
              valueKey="count"
              color="bg-blue-500"
            />
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment Methods
            </h3>
            <BarChart 
              data={Object.entries(analytics.paymentMethods || {}).map(([method, data]) => ({
                method: method === 'cod' ? 'Cash on Delivery' : method,
                count: data.count
              }))}
              labelKey="method"
              valueKey="count"
              color="bg-green-500"
            />
          </motion.div>

          {/* Top Selling Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" />
              Top Products
            </h3>
            <div className="space-y-3">
              {(analytics.products?.topSelling || []).map((product, index) => (
                <div key={product._id} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                    {index + 1}
                  </span>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.totalSold} sold</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(product.revenue)}
                  </span>
                </div>
              ))}
              {(analytics.products?.topSelling || []).length === 0 && (
                <p className="text-center text-gray-500 py-4">No sales data yet</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Product Inventory Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Product Inventory Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {formatNumber(analytics.products?.total || 0)}
              </p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {formatNumber(analytics.products?.active || 0)}
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {formatNumber(analytics.products?.lowStock || 0)}
              </p>
              <p className="text-sm text-gray-600">Low Stock</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {formatNumber(analytics.products?.outOfStock || 0)}
              </p>
              <p className="text-sm text-gray-600">Out of Stock</p>
            </div>
          </div>
        </motion.div>

        {/* User Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            User Activity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analytics.users?.total || 0)}
                </p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analytics.users?.new || 0)}
                </p>
                <p className="text-sm text-gray-600">New This Period</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(analytics.users?.active || 0)}
                </p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}

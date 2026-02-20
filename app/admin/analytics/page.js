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
    <div className="space-y-1.5">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-12 text-[10px] sm:text-xs text-gray-500 text-right truncate">
            {item[labelKey]}
          </div>
          <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item[valueKey] / maxValue) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`h-full ${color} rounded-full`}
            />
          </div>
          <div className="w-10 text-[10px] sm:text-xs font-medium text-gray-700">
            {item[valueKey]}
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple Line Chart Component
function LineChart({ data, valueKey }) {
  if (data.length === 0) return <div className="text-center text-gray-500 py-6 text-xs">No data available</div>;
  
  const maxValue = Math.max(...data.map(d => d[valueKey]));
  const minValue = Math.min(...data.map(d => d[valueKey]));
  const range = maxValue - minValue || 1;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * 100;
    const y = 100 - ((d[valueKey] - minValue) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative h-36 sm:h-40 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
        ))}
        
        {/* Area fill */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill="rgba(82, 221, 40, 0.1)"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#52dd28ff"
          strokeWidth="1.5"
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
              r="1"
              fill="#52dd28ff"
            />
          );
        })}
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between text-[8px] sm:text-[10px] text-gray-500 mt-1">
        {data.filter((_, i) => i % Math.ceil(data.length / 4) === 0 || i === data.length - 1).map((d, i) => (
          <span key={i}>{d._id?.slice(5) || d.date?.slice(5)}</span>
        ))}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, subtitle, trend, trendUp, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5">{title}</p>
          <h3 className="text-sm sm:text-base font-bold text-gray-900">{value}</h3>
          {subtitle && <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="p-1.5 sm:p-2 bg-[#52dd28ff]/10 rounded-lg">
          <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#52dd28ff]" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="flex items-center mt-2">
          {trendUp ? (
            <ArrowUpRight className="w-3 h-3 text-green-500 mr-0.5" />
          ) : (
            <ArrowDownRight className="w-3 h-3 text-red-500 mr-0.5" />
          )}
          <span className={`text-[8px] sm:text-[10px] font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-[8px] sm:text-[10px] text-gray-500 ml-1">vs last</span>
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
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' },
    { value: '1y', label: '1y' },
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
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#52dd28ff] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-gray-500">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-xs text-gray-500">Failed to load analytics</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Analytics</h1>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Business performance metrics</p>
          </div>
          
          {/* Period Selector */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#52dd28ff] focus:border-[#52dd28ff] bg-white w-24"
          >
            {periods.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            title="Revenue"
            value={formatCurrency(analytics.revenue?.period || 0)}
            subtitle={`Total: ${formatCurrency(analytics.revenue?.total || 0)}`}
            trend={analytics.revenue?.growth || 0}
            trendUp={analytics.revenue?.growth >= 0}
            icon={IndianRupee}
          />
          
          <StatCard
            title="Orders"
            value={formatNumber(analytics.orders?.new || 0)}
            subtitle={`Total: ${formatNumber(analytics.orders?.total || 0)}`}
            trend={analytics.orders?.growth || 0}
            trendUp={analytics.orders?.growth >= 0}
            icon={ShoppingCart}
          />
          
          <StatCard
            title="Users"
            value={formatNumber(analytics.users?.new || 0)}
            subtitle={`Total: ${formatNumber(analytics.users?.total || 0)}`}
            trend={analytics.users?.growth || 0}
            trendUp={analytics.users?.growth >= 0}
            icon={UserPlus}
          />
          
          <StatCard
            title="Avg Order"
            value={formatCurrency(analytics.revenue?.average || 0)}
            icon={Activity}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-3">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-3 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#52dd28ff]" />
                Revenue Trend
              </h3>
              <span className="text-[8px] text-gray-500">Daily</span>
            </div>
            <LineChart 
              data={analytics.orders?.dailyStats || []} 
              valueKey="revenue" 
            />
          </motion.div>

          {/* Orders Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white p-3 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                <ShoppingCart className="w-3 h-3 text-[#52dd28ff]" />
                Orders Trend
              </h3>
              <span className="text-[8px] text-gray-500">Daily</span>
            </div>
            <LineChart 
              data={analytics.orders?.dailyStats || []} 
              valueKey="orders" 
            />
          </motion.div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Order Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-3 rounded-lg border border-gray-200"
          >
            <h3 className="text-xs font-semibold text-gray-900 mb-3 flex items-center gap-1">
              <PieChart className="w-3 h-3 text-[#52dd28ff]" />
              Order Status
            </h3>
            <BarChart 
              data={Object.entries(analytics.orders?.byStatus || {}).map(([status, count]) => ({
                status: status.slice(0, 3),
                count
              }))}
              labelKey="status"
              valueKey="count"
              color="bg-blue-500"
            />
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white p-3 rounded-lg border border-gray-200"
          >
            <h3 className="text-xs font-semibold text-gray-900 mb-3 flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-[#52dd28ff]" />
              Payment
            </h3>
            <BarChart 
              data={Object.entries(analytics.paymentMethods || {}).map(([method, data]) => ({
                method: method === 'cod' ? 'COD' : method.slice(0, 3),
                count: data.count
              }))}
              labelKey="method"
              valueKey="count"
              color="bg-green-500"
            />
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-3 rounded-lg border border-gray-200"
          >
            <h3 className="text-xs font-semibold text-gray-900 mb-3 flex items-center gap-1">
              <Box className="w-3 h-3 text-[#52dd28ff]" />
              Top Products
            </h3>
            <div className="space-y-2">
              {(analytics.products?.topSelling || []).slice(0, 3).map((product, index) => (
                <div key={product._id} className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-[8px] font-medium text-gray-600">
                    {index + 1}
                  </span>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-6 h-6 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-gray-900 truncate">{product.name}</p>
                  </div>
                  <span className="text-[8px] font-medium text-gray-700">
                    {product.totalSold}
                  </span>
                </div>
              ))}
              {(analytics.products?.topSelling || []).length === 0 && (
                <p className="text-center text-[10px] text-gray-400 py-2">No sales yet</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Inventory Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white p-3 rounded-lg border border-gray-200"
        >
          <h3 className="text-xs font-semibold text-gray-900 mb-3 flex items-center gap-1">
            <Package className="w-3 h-3 text-[#52dd28ff]" />
            Inventory
          </h3>
          <div className="grid grid-cols-4 gap-1">
            <div className="text-center p-2 bg-blue-50 rounded">
              <p className="text-xs font-bold text-blue-600">{formatNumber(analytics.products?.total || 0)}</p>
              <p className="text-[8px] text-gray-600">Total</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <p className="text-xs font-bold text-green-600">{formatNumber(analytics.products?.active || 0)}</p>
              <p className="text-[8px] text-gray-600">Active</p>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <p className="text-xs font-bold text-yellow-600">{formatNumber(analytics.products?.lowStock || 0)}</p>
              <p className="text-[8px] text-gray-600">Low</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded">
              <p className="text-xs font-bold text-red-600">{formatNumber(analytics.products?.outOfStock || 0)}</p>
              <p className="text-[8px] text-gray-600">Out</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
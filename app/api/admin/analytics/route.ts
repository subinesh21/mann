import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserModel from '@/models/User';
import OrderModel from '@/models/Order';
import ProductModel from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d'; // 7d, 30d, 90d, 1y

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case '24h':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // ========== USER METRICS ==========
    const totalUsers = await UserModel.countDocuments({ role: 'user' });
    const newUsers = await UserModel.countDocuments({
      role: 'user',
      createdAt: { $gte: startDate }
    });
    const activeUsers = await UserModel.countDocuments({
      role: 'user',
      isActive: true
    });

    // User growth by day (for chart)
    const userGrowth = await UserModel.aggregate([
      { 
        $match: { 
          role: 'user',
          createdAt: { $gte: startDate } 
        } 
      },
      {
        $group: {
          _id: { 
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } 
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // ========== ORDER METRICS ==========
    const totalOrders = await OrderModel.countDocuments();
    const newOrders = await OrderModel.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Revenue calculations
    const revenueStats = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          avgOrderValue: { $avg: '$totalAmount' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    const periodRevenue = await OrderModel.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      }
    ]);

    // Orders by status
    const ordersByStatus = await OrderModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Daily orders & revenue (for chart)
    const dailyStats = await OrderModel.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: { 
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } 
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // ========== PRODUCT METRICS ==========
    const totalProducts = await ProductModel.countDocuments();
    const activeProducts = await ProductModel.countDocuments({ isActive: true });
    const lowStockProducts = await ProductModel.countDocuments({
      stock: { $gt: 0, $lt: 10 }
    });
    const outOfStockProducts = await ProductModel.countDocuments({
      stock: 0
    });

    // Top selling products (based on orders)
    const topProducts = await OrderModel.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          name: { $first: '$items.name' },
          image: { $first: '$items.image' },
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // ========== PAYMENT METHODS ==========
    const paymentMethods = await OrderModel.aggregate([
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    // ========== COMPARISON WITH PREVIOUS PERIOD ==========
    const previousPeriodStart = new Date(startDate);
    const periodDuration = now.getTime() - startDate.getTime();
    previousPeriodStart.setTime(previousPeriodStart.getTime() - periodDuration);

    const previousPeriodOrders = await OrderModel.countDocuments({
      createdAt: { $gte: previousPeriodStart, $lt: startDate }
    });

    const previousPeriodRevenue = await OrderModel.aggregate([
      {
        $match: { 
          createdAt: { $gte: previousPeriodStart, $lt: startDate } 
        }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    const previousPeriodUsers = await UserModel.countDocuments({
      role: 'user',
      createdAt: { $gte: previousPeriodStart, $lt: startDate }
    });

    // Calculate growth percentages
    const currentRevenue = periodRevenue[0]?.revenue || 0;
    const prevRevenue = previousPeriodRevenue[0]?.revenue || 0;
    const revenueGrowth = prevRevenue > 0 ? parseFloat(((currentRevenue - prevRevenue) / prevRevenue * 100).toFixed(1)) : 0;
    
    const orderGrowth = previousPeriodOrders > 0 ? 
      parseFloat(((newOrders - previousPeriodOrders) / previousPeriodOrders * 100).toFixed(1)) : 0;
    
    const userGrowthPercent = previousPeriodUsers > 0 ? 
      parseFloat(((newUsers - previousPeriodUsers) / previousPeriodUsers * 100).toFixed(1)) : 0;

    return NextResponse.json({
      period,
      dateRange: {
        start: startDate.toISOString(),
        end: now.toISOString()
      },
      users: {
        total: totalUsers,
        new: newUsers,
        active: activeUsers,
        growth: userGrowthPercent,
        dailyGrowth: userGrowth
      },
      orders: {
        total: totalOrders,
        new: newOrders,
        growth: orderGrowth,
        byStatus: ordersByStatus.reduce((acc: any, curr: any) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        dailyStats
      },
      revenue: {
        total: revenueStats[0]?.totalRevenue || 0,
        period: currentRevenue,
        average: revenueStats[0]?.avgOrderValue || 0,
        growth: revenueGrowth
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        lowStock: lowStockProducts,
        outOfStock: outOfStockProducts,
        topSelling: topProducts
      },
      paymentMethods: paymentMethods.reduce((acc: any, curr: any) => {
        acc[curr._id] = { count: curr.count, revenue: curr.revenue };
        return acc;
      }, {})
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { message: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

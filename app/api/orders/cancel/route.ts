import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order';

// PATCH /api/orders/cancel - Cancel user's order
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { orderId, userId } = body;

    console.log('Cancel order request:', { orderId, userId });

    if (!orderId || !userId) {
      return NextResponse.json(
        { success: false, message: 'Order ID and User ID are required' },
        { status: 400 }
      );
    }

    // Find the order and verify it belongs to the user
    const order = await OrderModel.findOne({
      _id: orderId,
      'user.id': userId,
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.status)) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Cannot cancel order with status: ${order.status}. Only pending or confirmed orders can be cancelled.` 
        },
        { status: 400 }
      );
    }

    // Update order status to cancelled
    order.status = 'cancelled';
    order.updatedAt = new Date();
    await order.save();

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully',
      order: {
        id: order._id.toString(),
        orderNumber: order._id.toString().slice(-8).toUpperCase(),
        status: order.status,
        updatedAt: order.updatedAt,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to cancel order' },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function POST() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order';
// In the GET function, update the query:
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Build query - using string IDs, not ObjectId
    const query: any = { 
      $or: [
        { 'user.id': userId },
        { 'user.uid': userId }
      ]
    };
    
    if (status && status !== 'all' && status !== 'undefined' && status !== 'null') {
      query.status = status;
    }

    console.log('Fetching orders for userId:', userId);
    console.log('Query:', JSON.stringify(query));

    // Fetch orders sorted by newest first
    const orders = await OrderModel.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    console.log('Found orders:', orders.length);

    // Format orders for response
    const formattedOrders = orders.map((order: any) => ({
      id: order._id.toString(),
      orderNumber: order._id.toString().slice(-8).toUpperCase(),
      items: order.items,
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      canCancel: ['pending', 'confirmed'].includes(order.status),
    }));

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    console.log('Received order request:', body);

    const { user, items, totalAmount, shippingAddress, paymentMethod = 'cod' } = body;

    // Validate required fields
    if (!user || !user.id || !user.name || !user.email) {
      return NextResponse.json(
        { success: false, message: 'User information is required' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Valid total amount is required' },
        { status: 400 }
      );
    }

    if (!shippingAddress || 
        !shippingAddress.fullName || 
        !shippingAddress.address || 
        !shippingAddress.city || 
        !shippingAddress.state || 
        !shippingAddress.zipCode || 
        !shippingAddress.phone) {
      return NextResponse.json(
        { success: false, message: 'Complete shipping address is required' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!/^\d{10}$/.test(shippingAddress.phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, message: 'Phone number must be 10 digits' },
        { status: 400 }
      );
    }

    // Create the order
    const order = await OrderModel.create({
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
      },
      items: items.map((item: any) => ({
        productId: String(item._id || item.id || item.productId),
        name: item.name,
        price: Number(item.price),
        image: item.image || '/images/product-chai-cups.jpg',
        quantity: Number(item.quantity),
        color: item.color || null,
      })),
      totalAmount: Number(totalAmount),
      shippingAddress: {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country || 'India',
        phone: shippingAddress.phone.replace(/\D/g, ''),
      },
      paymentMethod,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('Order created successfully:', order._id);

    return NextResponse.json(
      { 
        success: true,
        message: 'Order placed successfully',
        order: {
          id: order._id,
          orderNumber: order._id.toString().slice(-8).toUpperCase(),
          status: order.status,
          createdAt: order.createdAt,
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating order:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error', 
          errors: Object.values(error.errors).map((e: any) => e.message) 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create order. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
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

export async function PATCH() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed. Use /api/orders/cancel for cancellations' },
    { status: 405 }
  );
}
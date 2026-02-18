import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { user, items, totalAmount, shippingAddress, paymentMethod = 'cod' } = body;

    // Validate required fields
    if (!user || !user.id || !user.name || !user.email) {
      return NextResponse.json(
        { message: 'User information is required' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { message: 'Valid total amount is required' },
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
        { message: 'Complete shipping address is required' },
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
        productId: String(item.productId),
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        color: item.color || null,
      })),
      totalAmount,
      shippingAddress: {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country || 'India',
        phone: shippingAddress.phone,
      },
      paymentMethod,
      status: 'pending',
    });

    return NextResponse.json(
      { 
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
        { message: 'Validation error', errors: Object.values(error.errors).map((e: any) => e.message) },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to create order. Please try again.' },
      { status: 500 }
    );
  }
}

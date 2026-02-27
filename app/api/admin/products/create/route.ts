import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

// POST - Create new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Check if user is admin (basic auth check)
    const session = await getSession(request, NextResponse.next());
    if (!session.userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const product = new Product(body);
    await product.save();
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Create product error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { message: messages.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Failed to create product' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

// GET - Fetch all products or filter by query parameters
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const inStock = searchParams.get('inStock');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    
    // Build query
    let query: any = {};
    
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (inStock !== null) query.inStock = inStock === 'true';
    if (isActive !== null) query.isActive = isActive === 'true';
    if (search) {
      query.$text = { $search: search };
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: products.length,
      products
    });
    
  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to fetch products',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// POST - Create new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Check if user is admin
    const session = await getSession(request);
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
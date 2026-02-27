import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

// GET - Fetch products with filtering
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
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
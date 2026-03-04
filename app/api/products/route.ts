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
    const id = searchParams.get('id'); // New parameter for direct ID lookup
    
    // Build query
    let query: any = { isActive: true }; // Only show active products by default
    
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (inStock !== null) query.inStock = inStock === 'true';
    if (isActive !== null) query.isActive = isActive === 'true';
    if (search) {
      query.$text = { $search: search };
    }
    
    // Handle direct ID lookup
    if (id) {
      try {
        // Try to find by _id first
        const productById = await Product.findOne({ 
          _id: id, 
          isActive: true 
        }).lean();
        
        if (productById) {
          return NextResponse.json({
            success: true,
            count: 1,
            products: [productById]
          });
        }
        
        // Try by id field
        const productByFieldId = await Product.findOne({ 
          id: id, 
          isActive: true 
        }).lean();
        
        if (productByFieldId) {
          return NextResponse.json({
            success: true,
            count: 1,
            products: [productByFieldId]
          });
        }
        
        // Try numeric ID
        const numericId = parseInt(id);
        if (!isNaN(numericId)) {
          const productByNumericId = await Product.findOne({ 
            id: numericId, 
            isActive: true 
          }).lean();
          
          if (productByNumericId) {
            return NextResponse.json({
              success: true,
              count: 1,
              products: [productByNumericId]
            });
          }
        }
        
        // If no direct match, fall back to search
        query.$text = { $search: id };
      } catch (error) {
        // If ID parsing fails, fall back to text search
        query.$text = { $search: id };
      }
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
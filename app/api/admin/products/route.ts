import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ProductModel from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    const query: any = {};
    
    // Add search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Add category filter if provided
    if (category && category !== 'all') {
      query.category = category;
    }

    // Add status filter if provided
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await ProductModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await ProductModel.countDocuments(query);

    // Format products for response
    const formattedProducts = products.map((product: any) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching products:', error);
    
    // More specific error handling
    if (error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { 
          message: 'Database connection failed. Please check MongoDB configuration.',
          error: 'DATABASE_CONNECTION_FAILED'
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Failed to fetch products',
        error: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Update product status (activate/deactivate)
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { productId, isActive } = body;

    if (!productId || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { message: 'Product ID and isActive status are required' },
        { status: 400 }
      );
    }

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { isActive, updatedAt: new Date() },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Product ${isActive ? 'activated' : 'deactivated'} successfully`,
      product: {
        id: product._id.toString(),
        name: product.name,
        isActive: product.isActive,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Failed to update product' },
      { status: 500 }
    );
  }
}

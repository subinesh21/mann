import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ProductModel from '@/models/Product';
import ReviewModel from '@/models/Review';
import { PRODUCTS } from '@/lib/product-data';
import { Types } from 'mongoose';

// GET - Fetch products (with optional filters)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    const inStock = searchParams.get('inStock');
    const search = searchParams.get('search');
    const id = searchParams.get('id'); // For single product lookup

    // If ID is provided, return single product
    if (id) {
      // 1. Find product in static data
      const staticProduct = PRODUCTS.find(
        (p) => p._id === id || p.id.toString() === id || (Types.ObjectId.isValid(id) && p._id === id)
      );

      if (!staticProduct) {
        return NextResponse.json({
          success: true,
          products: [],
          count: 0
        });
      }

      let mongoProduct = null;
      // Try string/num id match first
      mongoProduct = await (ProductModel as any).findOne({ $or: [{ id: parseInt(id) || -1 }, { _id: Types.ObjectId.isValid(id) ? id : null }] });

      if (!mongoProduct && staticProduct) {
        // Retroactive fallback for stubs missing ID
        mongoProduct = await (ProductModel as any).findOne({ name: staticProduct.name });
        if (mongoProduct) {
          mongoProduct.id = staticProduct.id || parseInt(staticProduct._id);
          await mongoProduct.save();
        }
      }

      const productIdForReviews = mongoProduct ? mongoProduct._id : (Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null);

      let reviews = [];
      if (productIdForReviews) {
        reviews = await ReviewModel.find({ productId: productIdForReviews });
      }

      const calculatedRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : (staticProduct.rating || 0);

      const mergedProduct = {
        ...staticProduct,
        inStock: mongoProduct ? mongoProduct.inStock : staticProduct.inStock,
        isActive: mongoProduct ? mongoProduct.isActive : (staticProduct as any).isActive ?? true,
        rating: calculatedRating,
        reviews: reviews.length > 0 ? reviews.length : (staticProduct.reviews || 0),
        mongoId: mongoProduct ? mongoProduct._id : null
      };

      return NextResponse.json({
        success: true,
        products: [mergedProduct],
        count: 1
      });
    }

    // Build query for multiple products filtering
    const isActFill = isActive !== null && isActive !== undefined ? isActive === 'true' : null;
    const inStockFill = inStock !== null && inStock !== undefined ? inStock === 'true' : null;

    // 1. Fetch all product statuses from MongoDB
    const allMongoProducts = await (ProductModel as any).find({});
    // 2. Fetch all reviews from MongoDB
    const allReviews = await ReviewModel.find({});

    // Build map for quick lookup
    const mongoProductsMap = new Map();
    const reviewsMap = new Map(); // productId -> array of reviews

    allMongoProducts.forEach((p: any) => {
      // Keep track by string _id and string id to match against static data
      mongoProductsMap.set(p._id.toString(), p);
      if (p.id !== undefined) mongoProductsMap.set(p.id.toString(), p);
    });

    allReviews.forEach(r => {
      const pid = r.productId.toString();
      if (!reviewsMap.has(pid)) reviewsMap.set(pid, []);
      reviewsMap.get(pid).push(r);
    });

    // 3. Merge data
    let mergedProducts = PRODUCTS.map(staticProd => {
      // Find matching mongo product (using either _id or id)
      const mProd = mongoProductsMap.get(staticProd._id) || mongoProductsMap.get(staticProd.id.toString());

      let reviewCount = staticProd.reviews || 0;
      let reviewRating = staticProd.rating || 0;

      if (mProd) {
        const prodReviews = reviewsMap.get(mProd._id.toString()) || [];
        if (prodReviews.length > 0) {
          reviewCount = prodReviews.length;
          reviewRating = prodReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount;
        }
      }

      return {
        ...staticProd,
        inStock: mProd ? mProd.inStock : staticProd.inStock,
        isActive: mProd ? mProd.isActive : (staticProd as any).isActive ?? true,
        rating: reviewRating,
        reviews: reviewCount,
        mongoId: mProd ? mProd._id : null
      };
    });

    // 4. Apply all filters on the merged string
    if (category) {
      mergedProducts = mergedProducts.filter(p => p.category === category);
    }


    if (isActFill !== null) {
      mergedProducts = mergedProducts.filter(p => p.isActive === isActFill);
    }

    if (inStockFill !== null) {
      mergedProducts = mergedProducts.filter(p => p.inStock === inStockFill);
    }

    if (search) {
      const s = search.toLowerCase();
      mergedProducts = mergedProducts.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
      );
    }

    // Usually we want newest first, but static data doesn't have createdAt.  
    // We can reverse the static array to maintain the behavior of "newest at top" if added at bottom, 
    // or just leave as is. The original code did `sort({ createdAt: -1 })`.
    // Let's just reverse the static list if it's not sorted.
    // Maintain the order from the product-data file as requested
    // mergedProducts.reverse();

    return NextResponse.json({
      success: true,
      products: mergedProducts,
      count: mergedProducts.length
    });

  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

// POST - Create new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'price', 'primaryImage', 'category', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create product
    const product = await (ProductModel as any).create(body);

    return NextResponse.json({
      success: true,
      product,
      message: 'Product created successfully'
    });

  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create product',
        error: error.message
      },
      { status: 500 }
    );
  }
}
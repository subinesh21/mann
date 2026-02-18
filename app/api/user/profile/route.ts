import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserModel from '@/models/User';

// GET /api/user/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log('GET /api/user/profile - userId:', userId);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find user by uid (Firebase UID) since that's what we're using
    const user = await UserModel.findOne({ uid: userId }).lean();

    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      // Return empty profile instead of 404 to allow creation
      return NextResponse.json({
        success: true,
        user: {
          id: userId,
          uid: userId,
          name: '',
          email: '',
          shippingAddress: {
            fullName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India',
            phone: '',
          },
        },
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        shippingAddress: user.shippingAddress || {
          fullName: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'India',
          phone: '',
        },
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// POST /api/user/profile - Create user profile
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, name, email } = body;

    console.log('POST /api/user/profile - Create profile request:', { userId, name, email });

    if (!userId || !name || !email) {
      return NextResponse.json(
        { success: false, message: 'User ID, name, and email are required' },
        { status: 400 }
      );
    }

    // Check if user already exists by uid
    let user = await UserModel.findOne({ uid: userId });

    if (!user) {
      // Check if user exists by email
      user = await UserModel.findOne({ email });
      
      if (user) {
        // Update existing user with Firebase UID
        user.uid = userId;
        user.updatedAt = new Date();
        await user.save();
      } else {
        // Create new user with string ID
        user = await UserModel.create({
          _id: userId, // Use Firebase UID as _id
          uid: userId,
          name,
          email,
          shippingAddress: {
            fullName: name,
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India',
            phone: '',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      
      console.log('User created/updated:', user._id);
    }

    return NextResponse.json({
      success: true,
      message: 'Profile created successfully',
      user: {
        id: user._id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        shippingAddress: user.shippingAddress,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating user profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

// PATCH /api/user/profile - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, shippingAddress, name } = body;

    console.log('PATCH /api/user/profile - Update profile request:', { 
      userId, 
      shippingAddress, 
      name 
    });

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Validate shipping address fields if provided
    if (shippingAddress) {
      const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'phone'];
      for (const field of requiredFields) {
        if (!shippingAddress[field]?.trim()) {
          return NextResponse.json(
            { success: false, message: `${field} is required` },
            { status: 400 }
          );
        }
      }

      // Validate phone number (10 digits)
      const cleanPhone = shippingAddress.phone.replace(/\D/g, '');
      if (!/^\d{10}$/.test(cleanPhone)) {
        return NextResponse.json(
          { success: false, message: 'Phone number must be 10 digits' },
          { status: 400 }
        );
      }
      shippingAddress.phone = cleanPhone;
    }

    // Find user by uid (Firebase UID)
    let user = await UserModel.findOne({ uid: userId });

    // If user doesn't exist, create one
    if (!user) {
      console.log('User not found, creating new user:', userId);
      
      // Try to find by email if provided in body
      if (body.email) {
        user = await UserModel.findOne({ email: body.email });
      }
      
      if (user) {
        // Update existing user with Firebase UID
        user.uid = userId;
        if (name) user.name = name;
        user.updatedAt = new Date();
      } else {
        // Create completely new user
        user = await UserModel.create({
          _id: userId,
          uid: userId,
          name: name || 'User',
          email: body.email || '',
          shippingAddress: shippingAddress || {
            fullName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India',
            phone: '',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // Update fields
    if (name) {
      user.name = name;
    }

    // Update shipping address if provided
    if (shippingAddress) {
      user.shippingAddress = {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country || 'India',
        phone: shippingAddress.phone,
      };
    }

    user.updatedAt = new Date();
    await user.save();

    console.log('Profile updated successfully for user:', user._id);

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        shippingAddress: user.shippingAddress || {
          fullName: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'India',
          phone: '',
        },
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed. Use PATCH to update profile.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
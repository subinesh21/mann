import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Try to connect to DB
    try {
      await connectDB();
    } catch (dbError) {
      return NextResponse.json(
        { message: 'Database not available for authentication' },
        { status: 503 }
      );
    }
    
    const { email, password, loginAs } = await request.json(); // loginAs: 'user' or 'admin'
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // FIX: Use type assertion for User model
    const UserModel = User as any;
    
    // Find user and include password field
    const user = await UserModel.findOne({ email }).select('+password');
    
    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check if this is a Google user (no password set)
    if (user.googleId && !user.password) {
      return NextResponse.json(
        { message: 'This account uses Google Sign-In. Please use Google to log in.' },
        { status: 401 }
      );
    }
    
    // Check password for email/password users
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check role-based access
    if (loginAs === 'admin' && user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Access denied. User is not an administrator.' },
        { status: 403 }
      );
    }
    
    if (loginAs === 'user' && user.role === 'admin') {
      return NextResponse.json(
        { message: 'Please select admin login to access admin panel.' },
        { status: 403 }
      );
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Create session
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        loginAs: loginAs || user.role,
        createdAt: user.createdAt,
      }
    });
    
    // Set session cookie
    const session = await getSession(request, response);
    session.userId = user._id.toString();
    session.email = user.email;
    session.isLoggedIn = true;
    await session.save();
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
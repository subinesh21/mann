import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
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
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { 
          message: 'Database connection failed. Please check your MongoDB configuration.',
          error: process.env.NODE_ENV === 'development' ? dbError.message : undefined
        },
        { status: 503 }
      );
    }
    
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // FIX: Use type assertion for User model
    const UserModel = User as any;
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      if (existingUser.googleId) {
        return NextResponse.json(
          { message: 'An account with this email already exists and uses Google Sign-In. Please use Google to log in.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Generate a unique ID for the user
    const userId = new mongoose.Types.ObjectId().toString();
    
    // Create new user
    const user = new UserModel({
      _id: userId,
      uid: userId,
      name,
      email,
      password,
      role: 'user' // Default to user role
    });
    
    await user.save();
    
    // Create session
    const response = NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
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
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { message: messages.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
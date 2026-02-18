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
      return NextResponse.json(
        { message: 'Database not available for authentication' },
        { status: 503 }
      );
    }
    
    const { idToken, userInfo, loginAs } = await request.json(); // loginAs: 'user' or 'admin'
    
    // Validate input
    console.log('Received auth data:', {
      hasIdToken: !!idToken,
      hasUserInfo: !!userInfo,
      userInfoKeys: userInfo ? Object.keys(userInfo) : []
    });
    
    if (!idToken || !userInfo) {
      return NextResponse.json(
        { message: 'ID token and user info are required' },
        { status: 400 }
      );
    }
    
    const { uid: googleId, email, displayName: name, photoURL: picture } = userInfo;
    
    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { message: 'Email and name are required' },
        { status: 400 }
      );
    }
    
    // FIX: Use type assertion for User model
    const UserModel = User as any;
    
    // Check if user already exists with this Google ID
    let user = await UserModel.findOne({ googleId });
    
    if (!user) {
      // Check if user exists with this email (existing email/password user)
      user = await UserModel.findOne({ email });
      
      if (user) {
        // Link Google account to existing user
        user.googleId = googleId;
        user.name = name;
        // Remove password requirement for Google users
        if (user.password) {
          user.password = undefined;
        }
      } else {
        // Generate a unique ID for the user
        const userId = new mongoose.Types.ObjectId().toString();
        
        // Create new user
        user = new UserModel({
          _id: userId,
          uid: userId,
          name,
          email,
          googleId,
          role: loginAs === 'admin' ? 'admin' : 'user',
          isActive: true
        });
      }
    }
    
    // Update user information
    user.lastLogin = new Date();
    user.isActive = true;
    
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
    
    await user.save();
    
    // Create session
    const response = NextResponse.json({
      message: 'Google authentication successful',
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
    console.error('Google authentication error:', error);
    return NextResponse.json(
      { message: 'Internal server error during Google authentication' },
      { status: 500 }
    );
  }
}
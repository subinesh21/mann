import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getSession } from '@/lib/session';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// POST - Verify mobile OTP and create session
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { mobile, otp, name, password } = await request.json();
    
    if (!mobile || !otp) {
      return NextResponse.json(
        { message: 'Mobile number and OTP are required' },
        { status: 400 }
      );
    }
    
    // Find user by mobile
    // @ts-ignore - Mongoose typing issue with findOne
    const user = await User.findOne({ mobile: mobile });
    
    if (!user) {
      // For new users, we need name and password for registration
      if (!name || !password) {
        return NextResponse.json(
          { message: 'Name and password are required for new registration' },
          { status: 400 }
        );
      }
      
      // Check if a user with this mobile already exists (race condition protection)
      // @ts-ignore - Mongoose typing issue with findOne
      const existingUser = await User.findOne({ mobile: mobile });
      if (existingUser) {
        return NextResponse.json(
          { message: 'User already exists. Please login instead.' },
          { status: 400 }
        );
      }
      
      // Create new user
      const newUser = new User({
        _id: crypto.randomUUID(), // Generate unique ID
        uid: `mobile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique UID
        name: name,
        mobile: mobile,
        password: password, // Store plain text for now (should hash in production)
        isVerified: true, // Verified through OTP
        role: 'user'
      });
      
      await newUser.save();
      
      // Create session
      const response = NextResponse.json({
        success: true,
        message: 'Account created and logged in successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          mobile: newUser.mobile,
          isVerified: newUser.isVerified
        }
      });
      
      // Set session cookie
      const session = await getSession(request, response);
      session.userId = newUser._id.toString();
      session.isLoggedIn = true;
      await session.save();
      
      return response;
    }
    
    // For existing users, verify OTP
    // Check if OTP is expired
    if (!user.otpExpires || user.otpExpires < new Date()) {
      return NextResponse.json(
        { message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }
    
    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }
    
    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    
    // Create session using iron-session
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        isVerified: user.isVerified
      }
    });
    
    // Set session cookie using iron-session
    const session = await getSession(request, response);
    session.userId = user._id.toString();
    session.isLoggedIn = true;
    await session.save();
    
    return response;
    
  } catch (error: any) {
    console.error('Mobile OTP verification error:', error);
    
    // Handle duplicate key errors specifically
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'User already exists with this mobile number' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Verification failed' },
      { status: 500 }
    );
  }
}
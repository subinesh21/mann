import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { userId, otp } = await request.json();
    
    // Validate input
    if (!userId || !otp) {
      return NextResponse.json(
        { message: 'User ID and OTP are required' },
        { status: 400 }
      );
    }
    
    // Find user by ID
    const UserModel = User as any;
    const user = await UserModel.findById(userId).select('+otp +otpExpires');
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        { message: 'Account already verified' },
        { status: 400 }
      );
    }
    
    // Check if OTP exists and is valid
    if (!user.otp || !user.otpExpires) {
      return NextResponse.json(
        { message: 'No OTP found for this user' },
        { status: 400 }
      );
    }
    
    // Check if OTP is expired
    if (user.otpExpires < new Date()) {
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
    
    // OTP is valid - verify the user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.lastLogin = new Date();
    await user.save();
    
    // Create session
    const response = NextResponse.json({
      message: 'Account verified successfully',
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
    console.error('Verify OTP error:', error);
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
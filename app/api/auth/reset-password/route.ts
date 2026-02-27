import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { userId, otp, newPassword } = await request.json();
    
    // Validate input
    if (!userId || !otp || !newPassword) {
      return NextResponse.json(
        { message: 'User ID, OTP, and new password are required' },
        { status: 400 }
      );
    }
    
    // Validate password strength
    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
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
    
    // Check if OTP exists and is valid
    if (!user.otp || !user.otpExpires) {
      return NextResponse.json(
        { message: 'No password reset request found' },
        { status: 400 }
      );
    }
    
    // Check if OTP is expired
    if (user.otpExpires < new Date()) {
      return NextResponse.json(
        { message: 'OTP has expired. Please request a new password reset.' },
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
    
    // OTP is valid - update password
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    
    return NextResponse.json({
      message: 'Password reset successfully'
    });
    
  } catch (error: any) {
    console.error('Reset password error:', error);
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
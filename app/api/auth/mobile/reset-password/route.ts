import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

// POST - Reset password with OTP
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { mobile, otp, newPassword } = await request.json();
    
    if (!mobile || !otp || !newPassword) {
      return NextResponse.json(
        { message: 'Mobile, OTP, and new password are required' },
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
    
    // Find user by mobile
    // @ts-ignore - Mongoose typing issue
    const user = await User.findOne({ mobile });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
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
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update password and clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'Password reset successfully'
    });
    
  } catch (error: any) {
    console.error('Mobile password reset error:', error);
    return NextResponse.json(
      { message: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { generateOTP, sendEmail, generateOTPHTML } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email } = await request.json();
    
    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const UserModel = User as any;
    const user = await UserModel.findOne({ email, isVerified: true });
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive an OTP shortly.'
      });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Save OTP to user
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
    
    // Send OTP email
    try {
      const emailHtml = generateOTPHTML(otp, 'reset-password');
      await sendEmail({
        to: email,
        subject: 'Password Reset OTP',
        html: emailHtml
      });
      
      return NextResponse.json({
        message: 'Password reset OTP sent successfully',
        userId: user._id.toString()
      });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      return NextResponse.json(
        { message: 'Failed to send password reset email. Please try again.' },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error('Forgot password error:', error);
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
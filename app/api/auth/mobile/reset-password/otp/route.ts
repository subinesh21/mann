import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { generateOTP, sendMobileOTP } from '@/lib/mobile-otp';

export const dynamic = 'force-dynamic';

// POST - Send OTP for password reset
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { mobile } = await request.json();
    
    if (!mobile) {
      return NextResponse.json(
        { message: 'Mobile number is required' },
        { status: 400 }
      );
    }
    
    // Find user by mobile
    // @ts-ignore - Mongoose typing issue
    const user = await User.findOne({ mobile });
    
    if (!user) {
      // Don't reveal if user exists for security
      return NextResponse.json({
        success: true,
        message: 'If account exists, OTP has been sent'
      });
    }
    
    // Generate reset OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Update user with reset OTP
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
    
    // Send OTP via SMS
    try {
      await sendMobileOTP(mobile, otp);
      console.log(`Password reset OTP ${otp} sent to ${mobile}`);
    } catch (smsError) {
      console.error('SMS sending failed:', smsError);
    }
    
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully for password reset'
    });
    
  } catch (error: any) {
    console.error('Mobile password reset OTP error:', error);
    return NextResponse.json(
      { message: 'Failed to send reset OTP' },
      { status: 500 }
    );
  }
}
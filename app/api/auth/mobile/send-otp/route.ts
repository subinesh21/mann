import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { generateOTP, sendMobileOTP } from '@/lib/mobile-otp';

export const dynamic = 'force-dynamic';

// POST - Send OTP for mobile registration/login
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { mobile } = await request.json();
    
    // Validate Indian mobile number format (+91 followed by 10 digits)
    const mobileRegex = /^(\+91|91)?[6-9]\d{9}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
      return NextResponse.json(
        { message: 'Please enter a valid Indian mobile number (XXXXXXXXXX)' },
        { status: 400 }
      );
    }
    
    // Normalize mobile number to +91 format
    let normalizedMobile = mobile;
    if (mobile.startsWith('91')) {
      normalizedMobile = '+' + mobile;
    } else if (!mobile.startsWith('+91')) {
      normalizedMobile = '+91' + mobile;
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ mobile: normalizedMobile });
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    if (existingUser) {
      // Update existing user with new OTP
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      await existingUser.save();
    } else {
      // For new users, we'll send OTP but create the user during verification
      // This avoids requiring name/email during initial OTP request
      console.log(`Generated OTP ${otp} for new mobile user ${normalizedMobile}`);
    }
    
    // Send OTP via SMS (implement your SMS service here)
    try {
      await sendMobileOTP(normalizedMobile, otp);
      console.log(`OTP ${otp} sent to ${normalizedMobile}`);
    } catch (smsError) {
      console.error('SMS sending failed:', smsError);
      // Don't expose SMS errors to client for security
    }
    
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      mobile: normalizedMobile,
      isNewUser: !existingUser
    });
    
  } catch (error: any) {
    console.error('Send mobile OTP error:', error);
    return NextResponse.json(
      { message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
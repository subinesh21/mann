import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { generateOTP, sendEmail, generateOTPHTML } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, name, password } = await request.json();
    
    // Validate input
    if (!email || !name || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const UserModel = User as any;
    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { message: 'User with this email already exists' },
          { status: 409 }
        );
      } else {
        // User exists but not verified, we can resend OTP
        // Continue with OTP generation
      }
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Save OTP to user (create temporary user if doesn't exist)
    let user;
    if (existingUser && !existingUser.isVerified) {
      user = existingUser;
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      // Generate a unique ID for the user
      const userId = new mongoose.Types.ObjectId().toString();
      
      const newUser = new UserModel({
        _id: userId,
        uid: userId,
        name,
        email,
        password,
        role: 'user',
        otp,
        otpExpires,
        isVerified: false
      });
      user = await newUser.save();
    }
    
    // Send OTP email
    try {
      const emailHtml = generateOTPHTML(otp, 'registration');
      await sendEmail({
        to: email,
        subject: 'Account Verification OTP',
        html: emailHtml
      });
      
      return NextResponse.json({
        message: 'OTP sent successfully',
        userId: user._id.toString(),
        email: user.email
      });
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError);
      return NextResponse.json(
        { message: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error('Send OTP error:', error);
    
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
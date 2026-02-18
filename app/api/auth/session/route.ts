import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const session = await getSession(request, new Response());
    
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Find user
    const user = await User.findById(session.userId);
    
    if (!user || !user.isActive) {
      // Clear invalid session
      session.destroy();
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        loginAs: user.role, // Default to user role for session
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
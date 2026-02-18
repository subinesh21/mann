import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getSession } from '@/lib/session';

export async function getUserFromSession(request: NextRequest) {
  try {
    await connectDB();
    
    const session = await getSession(request, new Response());
    
    if (!session.isLoggedIn || !session.userId) {
      return null;
    }
    
    const user = await User.findById(session.userId);
    
    if (!user || !user.isActive) {
      // Clear invalid session
      session.destroy();
      return null;
    }
    
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error('Error getting user from session:', error);
    return null;
  }
}

export async function requireAuth(request: NextRequest) {
  const user = await getUserFromSession(request);
  
  if (!user) {
    return NextResponse.json(
      { message: 'Authentication required' },
      { status: 401 }
    );
  }
  
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const user = await requireAuth(request);
  
  if (user instanceof NextResponse) {
    return user; // Return the 401 response
  }
  
  if (user.role !== 'admin') {
    return NextResponse.json(
      { message: 'Admin access required' },
      { status: 403 }
    );
  }
  
  return user;
}
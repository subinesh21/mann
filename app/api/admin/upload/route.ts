import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// POST - Upload image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${Math.random().toString(36).substring(2, 15)}.${extension}`;
    
    // Save to public/images directory
    const publicDir = path.join(process.cwd(), 'public', 'images');
    
    // Ensure directory exists
    try {
      await fs.access(publicDir);
    } catch {
      await fs.mkdir(publicDir, { recursive: true });
    }
    
    const filepath = path.join(publicDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filepath, buffer);
    
    // Return the URL path
    const imageUrl = `/images/${filename}`;
    
    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl,
      filename
    });

  } catch (error: any) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to upload image',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
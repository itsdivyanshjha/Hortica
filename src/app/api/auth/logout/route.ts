import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json<ApiResponse>({
      success: true,
      message: 'Logout successful',
    }, { status: 200 });

    // Clear the authentication cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
} 
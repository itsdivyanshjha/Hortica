import { NextRequest, NextResponse } from 'next/server';
import initializeDatabase from '@/lib/init-database';

export async function POST(request: NextRequest) {
  try {
    // In production, you'd want to add authentication here
    // For now, we'll allow anyone to initialize the database
    
    const result = await initializeDatabase();
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Database initialization error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to initialize database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: 'Use POST method to initialize the database',
      instructions: 'Send a POST request to this endpoint to initialize the database with sample data'
    },
    { status: 200 }
  );
} 
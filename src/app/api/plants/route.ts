import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Plant from '@/models/Plant';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');
    
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (active !== null) {
      query.isActive = active === 'true';
    }
    
    const plants = await Plant.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: plants,
      message: 'Plants fetched successfully'
    });
    
  } catch (error) {
    console.error('Error fetching plants:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch plants',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
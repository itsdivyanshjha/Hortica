import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Soil from '@/models/Soil';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    
    let query: any = {};
    
    if (active !== null) {
      query.isActive = active === 'true';
    }
    
    const soils = await Soil.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: soils,
      message: 'Soils fetched successfully'
    });
    
  } catch (error) {
    console.error('Error fetching soils:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch soils',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
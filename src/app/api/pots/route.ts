import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Pot from '@/models/Pot';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const active = searchParams.get('active');
    
    let query: any = {};
    
    if (type) {
      query.type = type;
    }
    
    if (active !== null) {
      query.isActive = active === 'true';
    }
    
    const pots = await Pot.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: pots,
      message: 'Pots fetched successfully'
    });
    
  } catch (error) {
    console.error('Error fetching pots:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch pots',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
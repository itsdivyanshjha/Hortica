import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import StockAlert from '@/models/StockAlert';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const alertLevel = searchParams.get('alertLevel');
    const itemType = searchParams.get('itemType');
    const active = searchParams.get('active');
    
    let query: any = {};
    
    if (alertLevel) {
      query.alertLevel = alertLevel;
    }
    
    if (itemType) {
      query.itemType = itemType;
    }
    
    if (active !== null) {
      query.isActive = active === 'true';
    }
    
    const stockAlerts = await StockAlert.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: stockAlerts,
      message: 'Stock alerts fetched successfully'
    });
    
  } catch (error) {
    console.error('Error fetching stock alerts:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch stock alerts',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
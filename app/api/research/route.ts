import { NextResponse } from 'next/server';
import { getAllResearchDocuments } from '@/lib/research';

export async function GET() {
  try {
    const documents = await getAllResearchDocuments();
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching research documents:', error);
    return NextResponse.json(
      { error: 'Failed to load research documents' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';

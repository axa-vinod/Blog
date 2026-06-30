import { NextRequest, NextResponse } from 'next/server';
import { getPostServer } from '@/lib/posts-server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPostServer(id);

    return NextResponse.json(post);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch post' }, { status: 404 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getPostsServer, createPostServer } from '@/lib/posts-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const result = getPostsServer({
      search,
      category,
      tag,
      page,
      limit,
      sortBy,
      order,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, content, category, author, tags, coverImage } = body;

    if (!title || !content || !category || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = createPostServer({
      title,
      description,
      content,
      category,
      author,
      tags,
      coverImage,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

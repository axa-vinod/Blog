import { NextRequest, NextResponse } from 'next/server';
import { mockPosts } from '@/lib/mock-db';
import { Post } from '@/types';

// Let's keep a mutable copy in memory for mock updates (creates)
const postsStore: Post[] = [...mockPosts];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sortBy = searchParams.get('sortBy') || 'createdAt'; // 'createdAt', 'views', 'likes'
    const order = searchParams.get('order') || 'desc'; // 'asc', 'desc'

    let filteredPosts = [...postsStore];

    // Filter by search query and calculate relevance scores
    const relevanceScores: Record<string, number> = {};
    if (search) {
      filteredPosts = filteredPosts.filter((post) => {
        let score = 0;
        const titleLower = post.title.toLowerCase();
        const descLower = post.description.toLowerCase();
        const catLower = post.category.toLowerCase();
        const authorLower = post.author.toLowerCase();
        
        const titleMatch = titleLower.includes(search);
        const descMatch = descLower.includes(search);
        const catMatch = catLower.includes(search);
        const authorMatch = authorLower.includes(search);
        const tagMatch = post.tags.some((t) => t.toLowerCase().includes(search));

        if (!titleMatch && !descMatch && !catMatch && !authorMatch && !tagMatch) {
          return false;
        }

        // Calculate relevance weight
        if (titleLower.startsWith(search)) {
          score += 10;
        } else if (titleMatch) {
          score += 8;
        }
        
        if (post.tags.some((t) => t.toLowerCase() === search)) {
          score += 6;
        } else if (tagMatch) {
          score += 4;
        }
        
        if (catLower === search) {
          score += 5;
        } else if (catMatch) {
          score += 3;
        }
        
        if (descMatch) {
          score += 2;
        }
        
        if (authorMatch) {
          score += 1;
        }

        relevanceScores[post.id] = score;
        return true;
      });
    }

    // Filter by category
    if (category && category !== 'All') {
      filteredPosts = filteredPosts.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by tag
    if (tag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    // Sorting
    filteredPosts.sort((a, b) => {
      // If search is active and standard sorting by date is chosen, prioritize relevance score
      if (search && sortBy === 'createdAt') {
        const scoreA = relevanceScores[a.id] || 0;
        const scoreB = relevanceScores[b.id] || 0;
        if (scoreA !== scoreB) {
          return scoreB - scoreA; // Descending relevance
        }
      }

      let comparison = 0;
      if (sortBy === 'views') {
        comparison = a.views - b.views;
      } else if (sortBy === 'likes') {
        comparison = a.likes - b.likes;
      } else {
        // default to createdAt
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return order === 'desc' ? -comparison : comparison;
    });

    // Pagination
    const total = filteredPosts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
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

    const newPost: Post = {
      id: String(postsStore.length + 1),
      title,
      description: description || title.slice(0, 150) + '...',
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      category,
      author,
      authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString(),
      readingTime: `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
      tags: tags || [],
      views: 0,
      likes: 0,
    };

    postsStore.unshift(newPost); // Add to the beginning of list

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

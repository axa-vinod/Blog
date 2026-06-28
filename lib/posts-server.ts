import { mockPosts } from './mock-db';
import { Post } from '@/types';

// Use global store to persist mock database changes across Next.js dev reloads and serverless hot reloads
const globalRef = global as unknown as { postsStore: Post[] };
if (!globalRef.postsStore) {
  globalRef.postsStore = [...mockPosts];
}
export const postsStore = globalRef.postsStore;

export interface GetPostsParams {
  category?: string;
  search?: string;
  tag?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}

export function getPostsServer(params: GetPostsParams = {}) {
  const {
    category = '',
    search = '',
    tag = '',
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
  } = params;

  let filteredPosts = [...postsStore];

  // Filter by search query and calculate relevance scores
  const relevanceScores: Record<string, number> = {};
  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter((post) => {
      let score = 0;
      const titleLower = post.title.toLowerCase();
      const descLower = post.description.toLowerCase();
      const catLower = post.category.toLowerCase();
      const authorLower = post.author.toLowerCase();
      
      const titleMatch = titleLower.includes(searchLower);
      const descMatch = descLower.includes(searchLower);
      const catMatch = catLower.includes(searchLower);
      const authorMatch = authorLower.includes(searchLower);
      const tagMatch = post.tags.some((t) => t.toLowerCase().includes(searchLower));

      if (!titleMatch && !descMatch && !catMatch && !authorMatch && !tagMatch) {
        return false;
      }

      // Calculate relevance weights
      if (titleLower.startsWith(searchLower)) {
        score += 10;
      } else if (titleMatch) {
        score += 8;
      }
      
      if (post.tags.some((t) => t.toLowerCase() === searchLower)) {
        score += 6;
      } else if (tagMatch) {
        score += 4;
      }
      
      if (catLower === searchLower) {
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
    if (search && sortBy === 'createdAt') {
      const scoreA = relevanceScores[a.id] || 0;
      const scoreB = relevanceScores[b.id] || 0;
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }
    }

    let comparison = 0;
    if (sortBy === 'views') {
      comparison = a.views - b.views;
    } else if (sortBy === 'likes') {
      comparison = a.likes - b.likes;
    } else {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return order === 'desc' ? -comparison : comparison;
  });

  const total = filteredPosts.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export function createPostServer(postData: Partial<Post>) {
  const newPost: Post = {
    id: String(postsStore.length + 1),
    title: postData.title || 'Untitled',
    description: postData.description || '',
    content: postData.content || '',
    category: postData.category || 'Technology',
    coverImage: postData.coverImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    author: postData.author || 'Administrator',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
    tags: postData.tags || [],
    createdAt: new Date().toISOString(),
    readingTime: `${Math.ceil((postData.content || '').split(/\s+/).length / 200)} min read`,
    views: 0,
    likes: 0,
    featured: false,
  };
  postsStore.unshift(newPost);
  return newPost;
}

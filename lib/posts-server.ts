import axios from 'axios';
import { mockPosts } from './mock-db';
import { Post } from '@/types';

// Use global store to persist mock database changes across Next.js dev reloads and serverless hot reloads
const globalRef = global as unknown as { postsStore: Post[] };
if (!globalRef.postsStore) {
  globalRef.postsStore = [...mockPosts];
}
export const postsStore = globalRef.postsStore;

const MOCK_API_URL = process.env.MOCK_API_URL;

async function fetchPostsFromMockAPI(): Promise<Post[]> {
  if (!MOCK_API_URL) {
    console.warn('WARNING: MOCK_API_URL environment variable is not defined. Falling back to local mock database.');
    return postsStore;
  }

  try {
    const { data } = await axios.get<Post[]>(MOCK_API_URL, { timeout: 8000 });
    
    // Self-seeding: If MockAPI is reachable but empty, seed it with initial mockPosts
    if (Array.isArray(data) && data.length === 0) {
      console.log('MockAPI database is empty. Seeding initial posts...');
      const seededPosts: Post[] = [];
      // We process them sequentially to avoid MockAPI rate limits and preserve insertion order
      for (const post of mockPosts) {
        try {
          // Exclude the ID when creating new entries so MockAPI auto-generates sequential/unique IDs
          const { id, ...postPayload } = post;
          const { data: createdPost } = await axios.post<Post>(MOCK_API_URL, postPayload);
          seededPosts.push(createdPost);
        } catch (postErr: any) {
          console.error(`Failed to seed post "${post.title}":`, postErr.message);
        }
      }
      if (seededPosts.length > 0) {
        // Sync local memory store with seeded database
        postsStore.length = 0;
        postsStore.push(...seededPosts);
        return postsStore;
      }
    }
    
    if (Array.isArray(data)) {
      // Sync local memory store with MockAPI data
      postsStore.length = 0;
      postsStore.push(...data);
      return postsStore;
    }
    
    return postsStore;
  } catch (error: any) {
    console.warn(
      `WARNING: Failed to fetch posts from MockAPI (${error.message}). ` +
      `Please ensure you have created the "posts" resource at your MockAPI project dashboard. ` +
      `Falling back to local in-memory database.`
    );
    return postsStore;
  }
}

export interface GetPostsParams {
  category?: string;
  search?: string;
  tag?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}

export async function getPostsServer(params: GetPostsParams = {}) {
  const {
    category = '',
    search = '',
    tag = '',
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
  } = params;

  // Retrieve current active posts (from MockAPI or local fallback)
  const activePosts = await fetchPostsFromMockAPI();
  let filteredPosts = [...activePosts];

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
      comparison = (a.views || 0) - (b.views || 0);
    } else if (sortBy === 'likes') {
      comparison = (a.likes || 0) - (b.likes || 0);
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

export async function createPostServer(postData: Partial<Post>): Promise<Post> {
  const newPost = {
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

  if (MOCK_API_URL) {
    try {
      const { data } = await axios.post<Post>(MOCK_API_URL, newPost);
      postsStore.unshift(data);
      return data;
    } catch (error: any) {
      console.error('Failed to create post on MockAPI:', error.message);
    }
  }

  // Fallback when MockAPI is not active/fails
  const fallbackPost: Post = {
    ...newPost,
    id: String(postsStore.length + 1),
  };
  postsStore.unshift(fallbackPost);
  return fallbackPost;
}

export async function getPostServer(id: string): Promise<Post> {
  if (MOCK_API_URL) {
    try {
      const { data: post } = await axios.get<Post>(`${MOCK_API_URL}/${id}`);
      
      // Increment views count and save back to MockAPI (asynchronous background operation)
      const updatedViews = (post.views || 0) + 1;
      axios.put(`${MOCK_API_URL}/${id}`, { views: updatedViews }).catch((putErr) => {
        console.error(`Failed to update views count for post ${id}:`, putErr.message);
      });
      
      post.views = updatedViews;
      return post;
    } catch (error: any) {
      console.warn(`Failed to fetch post ${id} from MockAPI (${error.message}). Falling back to local store.`);
    }
  }

  // Local fallback
  const localPost = postsStore.find((p) => p.id === id);
  if (!localPost) {
    throw new Error('Post not found');
  }
  localPost.views += 1;
  return localPost;
}

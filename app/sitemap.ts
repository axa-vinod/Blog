import { MetadataRoute } from 'next';
import { getPostsServer } from '@/lib/posts-server';
import { Post } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  let postsList: Post[] = [];
  try {
    const { posts } = await getPostsServer({ limit: 100 });
    postsList = posts;
  } catch (error) {
    console.error('Failed to load posts for sitemap:', error);
  }

  const posts = postsList.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...posts,
  ];
}

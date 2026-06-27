export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  authorImage: string;
  createdAt: string;
  readingTime: string;
  tags: string[];
  views: number;
  likes: number;
  featured?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  authorImage?: string;
  content: string;
  createdAt: string;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
}

export type Category = 'Technology' | 'Design' | 'Development' | 'Productivity';

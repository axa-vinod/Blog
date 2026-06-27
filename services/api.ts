import { axiosInstance } from '@/lib/axios';
import { Post } from '@/types';

export interface GetPostsParams {
  search?: string;
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface GetPostsResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const apiService = {
  getPosts: async (params?: GetPostsParams): Promise<GetPostsResponse> => {
    const { data } = await axiosInstance.get<GetPostsResponse>('/api/posts', { params });
    return data;
  },

  getPost: async (id: string): Promise<Post> => {
    const { data } = await axiosInstance.get<Post>(`/api/posts/${id}`);
    return data;
  },

  subscribeNewsletter: async (email: string): Promise<{ message: string; email: string }> => {
    const { data } = await axiosInstance.post('/api/newsletter', { email });
    return data;
  },
};

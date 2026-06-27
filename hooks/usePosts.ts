import { useQuery } from '@tanstack/react-query';
import { apiService, GetPostsParams } from '@/services/api';

export function usePosts(params?: GetPostsParams) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => apiService.getPosts(params),
    placeholderData: (previousData) => previousData, // keep previous page data during pagination transitions
  });
}

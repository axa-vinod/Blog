import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => apiService.getPost(id),
    enabled: !!id,
  });
}

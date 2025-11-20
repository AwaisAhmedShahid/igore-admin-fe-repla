import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { DashboardStats } from '@/types';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await apiClient.get<DashboardStats>('/dashboard/stats');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
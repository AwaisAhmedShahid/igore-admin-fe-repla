import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { Session } from '@/types';

// Query Keys
export const sessionKeys = {
  all: ['sessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...sessionKeys.lists(), { filters }] as const,
  details: () => [...sessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
};

// Hooks
export const useSessionsQuery = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: sessionKeys.list(filters || {}),
    queryFn: async () => {
      const response = await apiClient.get<Session[]>('/sessions');
      return response.data;
    },
  });
};

export const useSessionQuery = (id: string) => {
  return useQuery({
    queryKey: sessionKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<Session>(`/sessions/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateSessionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<Session, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await apiClient.post<Session>('/sessions', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });
};

export const useUpdateSessionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Session> & { id: string }) => {
      const response = await apiClient.put<Session>(`/sessions/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sessionKeys.detail(data.id) });
    },
  });
};

export const useDeleteSessionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<{ success: boolean }>(`/sessions/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });
};
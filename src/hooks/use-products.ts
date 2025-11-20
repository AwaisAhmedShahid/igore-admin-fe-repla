import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { Product } from '@/types';

// Query Keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Hooks
export const useProductsQuery = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: productKeys.list(filters || {}),
    queryFn: async () => {
      const response = await apiClient.get<Product[]>('/products');
      return response.data;
    },
  });
};

export const useProductQuery = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<Product, 'id' | 'addedDate'>) => {
      const response = await apiClient.post<Product>('/products', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Product> & { id: string }) => {
      const response = await apiClient.put<Product>(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(data.id) });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<{ success: boolean }>(`/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};
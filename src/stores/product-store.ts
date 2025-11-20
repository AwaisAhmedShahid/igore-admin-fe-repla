import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product } from '@/types';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  activeTab: 'physical' | 'digital';
  filters: {
    status: string;
    search: string;
  };
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setActiveTab: (tab: 'physical' | 'digital') => void;
  setFilters: (filters: Partial<ProductState['filters']>) => void;
}

export const useProductStore = create<ProductState>()(
  devtools(
    (set) => ({
      products: [],
      selectedProduct: null,
      activeTab: 'physical',
      filters: {
        status: 'all',
        search: '',
      },
      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
    }),
    { name: 'product-store' }
  )
);
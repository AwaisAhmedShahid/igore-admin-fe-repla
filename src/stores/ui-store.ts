import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  isMobile: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      isMobile: false,
      theme: 'light',
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      setIsMobile: (isMobile) => set({ isMobile }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'ui-store' }
  )
);
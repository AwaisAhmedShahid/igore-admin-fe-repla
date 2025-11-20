import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/sidebar';
import { Topbar } from '@/components/navigation/topbar';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export const MainLayout = () => {
  const { sidebarCollapsed, mobileMenuOpen, isMobile, setIsMobile, setMobileMenuOpen } = useUIStore();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      
      // Close mobile menu when switching to desktop
      if (!mobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile, mobileMenuOpen, setMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && mobileMenuOpen) {
        const target = e.target as Element;
        const sidebar = document.getElementById('mobile-sidebar');
        const hamburger = document.getElementById('mobile-hamburger');
        
        if (sidebar && !sidebar.contains(target) && hamburger && !hamburger.contains(target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, mobileMenuOpen, setMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-full transition-transform duration-300",
        // Desktop behavior
        "lg:translate-x-0",
        // Mobile behavior
        isMobile ? (
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        ) : "translate-x-0"
      )}>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        // Desktop margins
        isMobile ? "ml-0" : (sidebarCollapsed ? "ml-16" : "ml-72")
      )}>
        {/* Topbar */}
        <Topbar />
        
        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
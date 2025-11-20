import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/sidebar';
import { Topbar } from '@/components/navigation/topbar';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';

export const MainLayout = () => {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-full">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {/* Topbar */}
        <Topbar />
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
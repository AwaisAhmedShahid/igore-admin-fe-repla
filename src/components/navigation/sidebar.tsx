import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Users,
  CreditCard,
  ShoppingCart,
  FileText,
  FileCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  isCollapsed,
}: SidebarItemProps) => {
  const { setMobileMenuOpen, isMobile } = useUIStore();
  
  const handleClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-3 sm:py-2 transition-all hover:bg-gray-800 touch-manipulation",
        isActive ? "bg-primary text-white" : "text-gray-300 hover:text-primary",
        isCollapsed && !isMobile && "justify-center"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {(!isCollapsed || isMobile) && <span className="font-medium">{label}</span>}
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, isMobile, setMobileMenuOpen } = useUIStore();

  const navigation = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Calendar,
      label: "Session Management",
      href: "/session-management",
    },
    {
      icon: Package,
      label: "Product Management",
      href: "/product-management",
    },
    {
      icon: Users,
      label: "Customer Management",
      href: "/customer-management",
    },
    {
      icon: CreditCard,
      label: "Payment Management",
      href: "/payment-management",
    },
    {
      icon: ShoppingCart,
      label: "Order Management",
      href: "/order-management",
    },
    {
      icon: FileText,
      label: "Contract Management",
      href: "/contract-management",
    },
    {
      icon: FileCheck,
      label: "Contract Requests",
      href: "/contract-requests",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div
      id="mobile-sidebar"
      className={cn(
        "bg-gray-900 text-white transition-all duration-300 h-screen flex flex-col",
        isMobile ? "w-64" : (sidebarCollapsed ? "w-16" : "w-64")
      )}
    >
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-500">
          {(!sidebarCollapsed || isMobile) && (
            <div className="flex items-center">
              <img 
                src="/igor-logo.png" 
                alt="IGORE Admin" 
                className="h-8" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <span className="text-xl font-bold hidden">IGORE</span>
            </div>
          )}
          
          {isMobile ? (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 hover:bg-gray-800 transition-colors"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={
                location.pathname === item.href ||
                location.pathname.startsWith(item.href + "/")
              }
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

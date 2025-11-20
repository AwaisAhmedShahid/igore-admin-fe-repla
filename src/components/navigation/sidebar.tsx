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
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-800",
        isActive ? "bg-primary text-white" : "text-gray-300 hover:text-primary",
        isCollapsed && "justify-center"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

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
      className={cn(
        "bg-gray-900 text-white transition-all duration-300 h-screen flex flex-col",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-500">
          {!sidebarCollapsed && (
            <img src="/igor-logo.png" alt="IGORE Admin" className="h-8" />
          )}
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-gray-800 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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

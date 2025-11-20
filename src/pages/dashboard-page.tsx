import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChartCard } from '@/components/ui/chart-card';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, changeLabel, icon: Icon }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center mt-1">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <p className={cn(
            "text-xs",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            {isPositive ? '+' : ''}{change}% {changeLabel}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};



// Mock data
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    product: "Premium Session Package",
    amount: "$299.00",
    status: "completed" as const,
    date: "2024-11-20"
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    product: "Digital Course Access",
    amount: "$99.00",
    status: "pending" as const,
    date: "2024-11-20"
  },
  {
    id: "ORD-003",
    customer: "Carol White",
    product: "Consultation Session",
    amount: "$150.00",
    status: "processing" as const,
    date: "2024-11-19"
  },
  {
    id: "ORD-004",
    customer: "David Brown",
    product: "Workshop Bundle",
    amount: "$450.00",
    status: "completed" as const,
    date: "2024-11-19"
  },
  {
    id: "ORD-005",
    customer: "Eva Davis",
    product: "Basic Session",
    amount: "$75.00",
    status: "cancelled" as const,
    date: "2024-11-18"
  },
];



export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change={20.1}
          changeLabel="from last month"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value="2,350"
          change={15.3}
          changeLabel="from last month"
          icon={ShoppingCart}
        />
        <StatCard
          title="Active Customers"
          value="1,429"
          change={8.2}
          changeLabel="from last month"
          icon={Users}
        />
        <StatCard
          title="Products Sold"
          value="573"
          change={-2.4}
          changeLabel="from last month"
          icon={Package}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue Overview" type="area" />
        <ChartCard title="Order Statistics" type="bar" />
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="font-semibold">{order.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status as 'completed' | 'pending' | 'processing' | 'cancelled'} />
                  </TableCell>
                  <TableCell className="text-gray-500">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
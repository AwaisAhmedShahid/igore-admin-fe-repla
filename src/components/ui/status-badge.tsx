import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'out-of-stock' | 'scheduled' | 'processing' | 'shipped' | 'delivered';
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Active',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  },
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
  'out-of-stock': {
    label: 'Out of Stock',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
  scheduled: {
    label: 'Scheduled',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  processing: {
    label: 'Processing',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge
      variant="secondary"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};
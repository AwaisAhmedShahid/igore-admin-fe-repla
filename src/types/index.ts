export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface Session {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  price: number;
  status: 'active' | 'inactive' | 'scheduled';
  meetingLink?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  type: 'physical' | 'digital';
  price: number;
  quantity?: number; // Only for physical products
  status: 'active' | 'inactive' | 'out-of-stock';
  image?: string;
  description: string;
  addedDate: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'card' | 'paypal' | 'bank_transfer' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}

export interface Contract {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: 'draft' | 'sent' | 'signed' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface DashboardStats {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
  };
  customers: {
    total: number;
    active: number;
    new: number;
  };
  products: {
    total: number;
    lowStock: number;
    outOfStock: number;
  };
}
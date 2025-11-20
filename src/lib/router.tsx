import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/main-layout';

// Pages
import { DashboardPage } from '@/pages/dashboard-page';
import { SessionManagementPage } from '@/pages/session-management-page';
import { AddSessionPage } from '@/pages/add-session-page';
import { ProductManagementPage } from '@/pages/product-management-page';
import { CustomerManagementPage } from '@/pages/customer-management-page';
import { PaymentManagementPage } from '@/pages/payment-management-page';
import { OrderManagementPage } from '@/pages/order-management-page';
import { ContractManagementPage } from '@/pages/contract-management-page';
import { ContractRequestsPage } from '@/pages/contract-requests-page';
import { SettingsPage } from '@/pages/settings-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'session-management',
        element: <SessionManagementPage />,
      },
      {
        path: 'session-management/add',
        element: <AddSessionPage />,
      },
      {
        path: 'product-management',
        element: <ProductManagementPage />,
      },
      {
        path: 'product-management/:tab',
        element: <ProductManagementPage />,
      },
      {
        path: 'customer-management',
        element: <CustomerManagementPage />,
      },
      {
        path: 'payment-management',
        element: <PaymentManagementPage />,
      },
      {
        path: 'order-management',
        element: <OrderManagementPage />,
      },
      {
        path: 'contract-management',
        element: <ContractManagementPage />,
      },
      {
        path: 'contract-requests',
        element: <ContractRequestsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);
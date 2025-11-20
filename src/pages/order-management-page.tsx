import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const OrderManagementPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600">View and manage customer orders</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Order management features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
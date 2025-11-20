import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CustomerManagementPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
        <p className="text-gray-600">Manage your customers and their information</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Customer management features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
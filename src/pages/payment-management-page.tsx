import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PaymentManagementPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
        <p className="text-gray-600">Track and manage payments and transactions</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Payment management features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
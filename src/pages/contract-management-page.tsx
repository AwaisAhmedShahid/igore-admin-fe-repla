import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContractManagementPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contract Management</h1>
        <p className="text-gray-600">Manage contracts and agreements</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Contract management features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
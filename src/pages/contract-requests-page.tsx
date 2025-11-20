import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContractRequestsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contract Requests</h1>
        <p className="text-gray-600">Review and respond to contract requests</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Contract Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Contract requests features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
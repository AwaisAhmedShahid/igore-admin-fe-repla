import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your application settings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Settings configuration coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
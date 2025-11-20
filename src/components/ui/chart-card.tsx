import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

interface ChartCardProps {
  title: string;
  type?: 'line' | 'bar' | 'pie' | 'area';
  height?: string;
  className?: string;
}

const chartIcons = {
  line: TrendingUp,
  bar: BarChart3,
  pie: PieChart,
  area: Activity,
};

export const ChartCard = ({ 
  title, 
  type = 'line', 
  height = 'h-64', 
  className 
}: ChartCardProps) => {
  const Icon = chartIcons[type];
  
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          'flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 transition-colors hover:border-gray-300',
          height
        )}>
          <div className="text-center">
            <Icon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-xs text-gray-400 mt-1">Chart data will appear here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
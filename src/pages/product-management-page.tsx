import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, MoreHorizontal, Edit, Trash2, Package } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'Premium Coaching Bundle',
    sku: 'PCB-001',
    type: 'digital' as const,
    price: 299.99,
    status: 'active' as const,
    image: '/api/placeholder/64/64',
    description: 'Complete coaching program with video sessions',
    addedDate: '2024-11-15',
  },
  {
    id: '2',
    name: 'Leadership Handbook',
    sku: 'LH-001',
    type: 'physical' as const,
    price: 49.99,
    quantity: 150,
    status: 'active' as const,
    image: '/api/placeholder/64/64',
    description: 'Physical book on leadership principles',
    addedDate: '2024-11-10',
  },
  {
    id: '3',
    name: 'Digital Workshop Access',
    sku: 'DWA-001',
    type: 'digital' as const,
    price: 99.99,
    status: 'active' as const,
    image: '/api/placeholder/64/64',
    description: 'Access to online workshop recordings',
    addedDate: '2024-11-08',
  },
  {
    id: '4',
    name: 'Coaching Workbook Set',
    sku: 'CWS-001',
    type: 'physical' as const,
    price: 35.00,
    quantity: 5,
    status: 'out-of-stock' as const,
    image: '/api/placeholder/64/64',
    description: 'Set of 3 coaching workbooks',
    addedDate: '2024-11-05',
  },
  {
    id: '5',
    name: 'Masterclass Series',
    sku: 'MS-001',
    type: 'digital' as const,
    price: 199.99,
    status: 'inactive' as const,
    image: '/api/placeholder/64/64',
    description: 'Complete masterclass video series',
    addedDate: '2024-11-01',
  },
];



interface ProductTableProps {
  products: typeof mockProducts;
  searchTerm: string;
  statusFilter: string;
}

const ProductTable = ({ products, searchTerm, statusFilter }: ProductTableProps) => {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="overflow-x-auto">
      <Table className="table-mobile">
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="hidden sm:table-cell">SKU</TableHead>
            <TableHead>Price</TableHead>
            {products.some(p => p.type === 'physical') && <TableHead className="hidden md:table-cell">Stock</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Added Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
      <TableBody>
        {filteredProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                  <AvatarImage src={product.image} alt={product.name} />
                  <AvatarFallback>
                    <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm sm:text-base truncate">{product.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 truncate sm:hidden">
                    {product.sku}
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    {product.description}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell font-mono text-sm">{product.sku}</TableCell>
            <TableCell className="font-semibold text-sm">${product.price}</TableCell>
            {products.some(p => p.type === 'physical') && (
              <TableCell className="hidden md:table-cell">
                {product.type === 'physical' ? (
                  <span className={product.quantity! <= 10 ? 'text-red-600 font-medium text-sm' : 'text-sm'}>
                    {product.quantity} units
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">Digital</span>
                )}
              </TableCell>
            )}
            <TableCell>
              <StatusBadge status={product.status} />
            </TableCell>
            <TableCell className="hidden lg:table-cell text-gray-500 text-sm">{product.addedDate}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 touch-target">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export const ProductManagementPage = () => {
  const { tab } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState(tab || 'physical');

  const physicalProducts = mockProducts.filter(p => p.type === 'physical');
  const digitalProducts = mockProducts.filter(p => p.type === 'digital');

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your physical and digital products</p>
        </div>
        <Button className="flex items-center justify-center gap-2 touch-target">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-responsive"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Product Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="physical">
            Physical Products ({physicalProducts.length})
          </TabsTrigger>
          <TabsTrigger value="digital">
            Digital Products ({digitalProducts.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="physical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Physical Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductTable 
                products={physicalProducts} 
                searchTerm={searchTerm} 
                statusFilter={statusFilter} 
              />
              
              {physicalProducts.length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-500">No physical products found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="digital" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductTable 
                products={digitalProducts} 
                searchTerm={searchTerm} 
                statusFilter={statusFilter} 
              />
              
              {digitalProducts.length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-500">No digital products found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
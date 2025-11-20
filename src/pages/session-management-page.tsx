import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const mockSessions = [
  {
    id: '1',
    title: 'Leadership Coaching Session',
    description: 'One-on-one leadership development session',
    duration: 60,
    price: 150,
    status: 'active' as const,
    meetingLink: 'https://meet.google.com/abc-def-ghi',
    createdAt: '2024-11-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Team Building Workshop',
    description: 'Interactive team building activities',
    duration: 120,
    price: 300,
    status: 'active' as const,
    meetingLink: 'https://zoom.us/j/123456789',
    createdAt: '2024-11-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'Career Development Session',
    description: 'Personal career planning and guidance',
    duration: 45,
    price: 100,
    status: 'inactive' as const,
    createdAt: '2024-11-05T09:15:00Z',
  },
  {
    id: '4',
    title: 'Executive Mentoring',
    description: 'High-level executive mentoring program',
    duration: 90,
    price: 250,
    status: 'scheduled' as const,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/abc123',
    createdAt: '2024-11-01T16:45:00Z',
  },
];



export const SessionManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSessions = mockSessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Session Management</h1>
          <p className="text-gray-600">Manage your coaching sessions and workshops</p>
        </div>
        <Link to="/session-management/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Session
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
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
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions ({filteredSessions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="text-sm text-gray-500">
                        {session.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{session.duration} min</TableCell>
                  <TableCell className="font-semibold">${session.price}</TableCell>
                  <TableCell>
                    <StatusBadge status={session.status} />
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
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
          
          {filteredSessions.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">No sessions found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
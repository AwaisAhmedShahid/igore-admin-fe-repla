import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, Upload } from 'lucide-react';

const sessionSchema = z.object({
  title: z.string().min(1, 'Session title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  duration: z.number().min(15, 'Minimum duration is 15 minutes').max(480, 'Maximum duration is 8 hours'),
  price: z.number().min(0, 'Price must be positive'),
  meetingLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  status: z.enum(['active', 'inactive', 'scheduled']),
});

type SessionFormData = z.infer<typeof sessionSchema>;

export const AddSessionPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);

  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: 60,
      price: 0,
      meetingLink: '',
      status: 'active',
    },
  });

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIconFile(file);
    }
  };

  const onSubmit = async (data: SessionFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically submit to your API
      console.log('Session data:', data);
      console.log('Icon file:', iconFile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to session list
      navigate('/session-management');
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/session-management')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sessions
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Session</h1>
        <p className="text-gray-600">Create a new coaching session or workshop</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Leadership Coaching Session" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a clear, descriptive title for your session
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Session Icon</FormLabel>
                  <div className="mt-2">
                    <label htmlFor="icon-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> session icon
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or SVG (MAX. 2MB)</p>
                      </div>
                      <input 
                        id="icon-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleIconUpload}
                      />
                    </label>
                    {iconFile && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected: {iconFile.name}
                      </p>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what this session covers..."
                          className="resize-none"
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description of the session content and objectives
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes) *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="60" 
                            {...field}
                            value={field.value?.toString() || ''}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($) *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            placeholder="0.00" 
                            {...field}
                            value={field.value?.toString() || ''}
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="meetingLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Link</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://meet.google.com/..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Add a direct link to join the session
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select session status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Active sessions can be booked by customers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 sm:flex-none"
              >
                {isSubmitting ? 'Creating...' : 'Create Session'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/session-management')}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
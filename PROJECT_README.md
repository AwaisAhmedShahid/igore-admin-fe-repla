# IGORE Admin Dashboard

A modern, production-ready admin dashboard built with React 18, TypeScript, and the latest frontend technologies. This application provides a comprehensive management interface for sessions, products, customers, orders, and more.

## 🚀 Features

### Core Features
- **Dashboard Overview**: Real-time statistics with KPI cards and charts
- **Session Management**: Create, edit, and manage coaching sessions
- **Product Management**: Handle both physical and digital products with inventory tracking
- **Customer Management**: Manage customer relationships and data
- **Order Management**: Track and process customer orders
- **Payment Management**: Monitor payment transactions and statuses
- **Contract Management**: Handle contracts and agreements
- **Contract Requests**: Review and process contract requests
- **Settings**: Configure application preferences

### Technical Features
- **Responsive Design**: Mobile-first approach with modern UI components
- **Real-time Updates**: Optimistic updates with React Query
- **State Management**: Zustand for client-side state
- **Type Safety**: Full TypeScript implementation
- **Modern Routing**: React Router v6 with nested layouts
- **Component Library**: Shadcn/ui with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query for server state management

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **React Router DOM v6** - Client-side Routing
- **Tailwind CSS** - Styling Framework

### State Management
- **Zustand** - Client State Management
- **TanStack Query (React Query)** - Server State Management

### UI Components
- **Shadcn/ui** - Component Library
- **Radix UI** - Headless UI Primitives
- **Lucide React** - Icons
- **Sonner** - Toast Notifications

### Form & Validation
- **React Hook Form** - Form State Management
- **Zod** - Schema Validation
- **@hookform/resolvers** - Form Validation Integration

### Data & Tables
- **TanStack Table** - Advanced Data Tables
- **Date-fns** - Date Utilities

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── navigation/     # Navigation components (Sidebar, Topbar)
│   └── ui/            # Base UI components (shadcn/ui)
├── features/          # Feature-specific components
├── hooks/             # Custom React hooks & API integration
├── layouts/           # Page layouts (MainLayout, AuthLayout)
├── lib/              # Utilities & configurations
│   ├── api-client.ts  # HTTP client wrapper
│   ├── react-query.ts # React Query configuration
│   ├── router.tsx     # Application routing
│   └── utils.ts       # Utility functions
├── pages/            # Page components
├── stores/           # Zustand stores
├── types/            # TypeScript type definitions
└── main.tsx         # Application entry point
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd igore-admin-fe-repla
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

## 🎨 Design System

The application follows a clean, modern design approach with:

- **Dark sidebar navigation** with icon-based menu items
- **Light content area** with rounded cards and subtle shadows
- **Consistent color palette** with status-based color coding
- **Responsive grid layouts** that adapt to different screen sizes
- **Typography hierarchy** with clear information architecture

### Component Library

Built on **Shadcn/ui**, the application includes:
- Form components (Input, Select, Textarea, etc.)
- Data display (Table, Card, Badge, Avatar)
- Navigation (Dropdown, Tabs, Dialog)
- Feedback (Toast notifications, Loading states)

## 🔌 API Integration

The application is designed to work with RESTful APIs:

### API Client
```typescript
// Example API usage
import { apiClient } from '@/lib/api-client';

// GET request
const sessions = await apiClient.get<Session[]>('/sessions');

// POST request
const newSession = await apiClient.post<Session>('/sessions', sessionData);
```

### React Query Hooks
```typescript
// Custom hooks for data fetching
import { useSessionsQuery, useCreateSessionMutation } from '@/hooks/use-sessions';

// In component
const { data: sessions, isLoading } = useSessionsQuery();
const createSession = useCreateSessionMutation();
```

## 🗂 State Management

### UI State (Zustand)
```typescript
import { useUIStore } from '@/stores/ui-store';

// Toggle sidebar, theme, etc.
const { sidebarCollapsed, toggleSidebar } = useUIStore();
```

### Feature State (Zustand)
```typescript
import { useSessionStore } from '@/stores/session-store';

// Feature-specific state
const { sessions, addSession, updateSession } = useSessionStore();
```

## 📊 Data Management

### Tables
Advanced data tables with:
- Sorting and pagination
- Search and filtering
- Status badges and actions
- Responsive design

### Forms
Type-safe forms with:
- Real-time validation
- Error handling
- File uploads
- Dynamic fields

## 🛡 Type Safety

Complete TypeScript coverage:
- API response types
- Component prop types
- Store state types
- Form validation schemas

## 🎯 Routing

Nested routing structure:
```
/dashboard              # Main dashboard
/session-management     # Session list
/session-management/add # Add new session
/product-management     # Product tabs
/customer-management    # Customer list
/payment-management     # Payment history
/order-management       # Order tracking
/contract-management    # Contract list
/contract-requests      # Contract requests
/settings              # Application settings
```

## 📱 Responsive Design

- **Mobile-first** approach
- **Collapsible sidebar** for smaller screens
- **Responsive tables** with horizontal scroll
- **Touch-friendly** interactive elements

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized assets ready for deployment.

### Environment Configuration
Create environment files for different stages:
```bash
# .env.development
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

Built with ❤️ using modern React ecosystem tools.
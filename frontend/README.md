# Frontend - RBAC System

React + Vite application with TailwindCSS for the RBAC system frontend.

## 📁 Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── client.js         # Axios instance with interceptors
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation with role-based links
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication state management
│   ├── pages/
│   │   ├── Login.jsx         # Login page with quick login
│   │   ├── Register.jsx      # User registration
│   │   ├── Dashboard.jsx     # Main dashboard (all roles)
│   │   ├── AdminPanel.jsx    # User management (admin only)
│   │   ├── EditorPanel.jsx   # Post management (admin/editor)
│   │   └── ViewerPage.jsx    # View posts (all roles)
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles + Tailwind
├── index.html
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies
```

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎨 Features

### Authentication
- ✅ Login with JWT tokens
- ✅ User registration
- ✅ Persistent sessions (localStorage)
- ✅ Auto-logout on token expiration
- ✅ Quick login buttons for demo

### Authorization
- ✅ Role-based route protection
- ✅ Conditional UI rendering
- ✅ Access denied pages
- ✅ Automatic redirects

### UI/UX
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Modern gradients and animations
- ✅ Role-specific color coding
- ✅ Real-time feedback messages
- ✅ Loading states
- ✅ Smooth transitions

### State Management
- ✅ React Context API for auth
- ✅ localStorage persistence
- ✅ Token refresh handling

## 🎯 Pages Overview

### Public Pages

#### Login (`/login`)
- Email/password authentication
- Quick login buttons for demo
- Redirect to dashboard on success
- Form validation

#### Register (`/register`)
- User registration form
- Role selection
- Password confirmation
- Validation and error handling

### Protected Pages

#### Dashboard (`/dashboard`)
- Welcome screen with user info
- Role-based feature cards
- Quick action links
- Stats display

#### Admin Panel (`/admin`) - Admin Only
- View all users
- Update user roles
- Delete users
- User statistics

#### Editor Panel (`/editor`) - Admin & Editor
- Create new posts
- Edit own posts (Editor) or all posts (Admin)
- Delete own posts (Editor) or all posts (Admin)
- Post status management (draft/published)

#### Viewer Page (`/viewer`) - All Roles
- Browse all posts
- Search functionality
- Filter by status
- Read-only access

## 🔌 API Integration

### Axios Client (`src/api/client.js`)

Configured with:
- Base URL: `http://localhost:5000/api`
- Request interceptor: Adds JWT token
- Response interceptor: Handles 401 errors

Usage:
```javascript
import apiClient from '../api/client';

// GET request
const response = await apiClient.get('/posts');

// POST request
const response = await apiClient.post('/posts', {
  title: 'My Post',
  content: 'Content here'
});
```

## 🛡️ Route Protection

### ProtectedRoute Component

```jsx
// Protect route for all authenticated users
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

// Protect route for specific roles
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

## 🎨 Styling

### TailwindCSS

Custom configuration in `tailwind.config.js`:
- Custom color palette (primary shades)
- Extended theme
- Content paths configured

### Custom Classes

Global utility classes in `index.css`:
- `.btn` - Base button styles
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-danger` - Danger button
- `.input` - Input field styles
- `.card` - Card container

### Role Colors

```javascript
Admin: Red (#EF4444)
Editor: Blue (#3B82F6)
Viewer: Green (#10B981)
```

## 🔐 Authentication Context

### Usage

```jsx
import { useAuth } from '../context/AuthContext';

function Component() {
  const {
    user,              // Current user object
    loading,           // Loading state
    isAuthenticated,   // Boolean
    login,             // Login function
    register,          // Register function
    logout,            // Logout function
    hasRole,           // Check single role
    hasAnyRole,        // Check multiple roles
    updateUser         // Update user data
  } = useAuth();

  // Check if user is admin
  if (hasRole('admin')) {
    // Show admin features
  }

  // Check if user is admin or editor
  if (hasAnyRole(['admin', 'editor'])) {
    // Show editor features
  }
}
```

## 🎨 Component Examples

### Protected Button

```jsx
function MyComponent() {
  const { hasAnyRole } = useAuth();

  return (
    <>
      {hasAnyRole(['admin', 'editor']) && (
        <button className="btn-primary">
          Create Post
        </button>
      )}
    </>
  );
}
```

### Conditional Rendering

```jsx
function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      {user.role === 'admin' && <AdminWidget />}
      {user.role === 'editor' && <EditorWidget />}
      {user.role === 'viewer' && <ViewerWidget />}
    </div>
  );
}
```

## 📱 Responsive Design

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

## 🔧 Configuration

### Vite Config (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,  // Auto-open browser
  },
})
```

### Environment Variables

Create `.env` in frontend root (if needed):

```env
VITE_API_URL=http://localhost:5000/api
```

Use in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🐛 Debugging

### React DevTools
- Install React DevTools browser extension
- Inspect component tree and state

### Network Tab
- Check API requests/responses
- Verify token in headers
- Check status codes

### Console Logs
- Check for error messages
- Verify API responses
- Debug state changes

## 🚀 Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Netlify

```bash
# Build
npm run build

# Drag and drop 'dist' folder to Netlify
```

### Environment Variables (Production)

Set in deployment platform:
- `VITE_API_URL` - Production API URL

## 📝 Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Navbar.jsx` (if needed)
4. Protect route if required

Example:

```jsx
// src/pages/NewPage.jsx
function NewPage() {
  return <div>New Page Content</div>;
}

export default NewPage;

// App.jsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

## 🎯 Best Practices

1. **Always protect sensitive routes** with `ProtectedRoute`
2. **Use AuthContext** for user state instead of prop drilling
3. **Show loading states** for better UX
4. **Handle errors gracefully** with user-friendly messages
5. **Keep components small** and focused
6. **Use Tailwind classes** instead of custom CSS when possible

---

For more details, see the main [README.md](../README.md)


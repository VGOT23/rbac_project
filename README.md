# 🔐 RBAC System - Role-Based Access Control

A full-stack MERN application implementing comprehensive Role-Based Access Control (RBAC) with JWT authentication. This system demonstrates how different user roles (Admin, Editor, Viewer) have different permissions and access levels throughout the application.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Roles & Permissions](#user-roles--permissions)
- [Demo Accounts](#demo-accounts)
- [Screenshots](#screenshots)

## ✨ Features

### Authentication & Authorization
- ✅ User registration with role selection
- ✅ Secure login with JWT tokens
- ✅ Token-based authentication
- ✅ Role-based route protection (frontend & backend)
- ✅ Persistent login sessions

### Role-Based Access Control
- ✅ **Admin**: Full system access, user management, post management
- ✅ **Editor**: Create and manage own posts
- ✅ **Viewer**: Read-only access to content

### User Management (Admin Only)
- ✅ View all users
- ✅ Update user roles
- ✅ Delete users
- ✅ Real-time role statistics

### Post Management
- ✅ Create posts (Admin & Editor)
- ✅ Edit own posts (Editor) or all posts (Admin)
- ✅ Delete own posts (Editor) or all posts (Admin)
- ✅ View all posts (All roles)
- ✅ Post status (Draft/Published)
- ✅ Search and filter functionality

### UI/UX
- ✅ Modern, responsive design with TailwindCSS
- ✅ Beautiful gradient backgrounds
- ✅ Interactive components
- ✅ Real-time feedback messages
- ✅ Role-specific color coding
- ✅ Smooth animations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt.js** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **TailwindCSS** - Styling

## 📁 Project Structure

```
role-based-access-control/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── postController.js     # Post CRUD operations
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── roleCheck.js          # Role-based authorization
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Post.js               # Post schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── postRoutes.js         # Post endpoints
│   │   └── userRoutes.js         # User endpoints
│   ├── scripts/
│   │   └── seed.js               # Database seeding
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── client.js         # Axios configuration
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── context/
    │   │   └── AuthContext.jsx   # Auth state management
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   ├── Dashboard.jsx     # Main dashboard
    │   │   ├── AdminPanel.jsx    # Admin management
    │   │   ├── EditorPanel.jsx   # Post management
    │   │   └── ViewerPage.jsx    # View posts
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd role-based-access-control
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rbac-system
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
```

**Note:** Replace `MONGO_URI` with your MongoDB connection string. For MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rbac-system
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

### Step 4: Seed the Database (Optional but Recommended)

This creates demo users for testing:
```bash
cd backend
npm run seed
```

## 🎯 Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Option 2: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 👥 User Roles & Permissions

| Feature | Admin | Editor | Viewer |
|---------|-------|--------|--------|
| View Posts | ✅ | ✅ | ✅ |
| Create Posts | ✅ | ✅ | ❌ |
| Edit Own Posts | ✅ | ✅ | ❌ |
| Edit All Posts | ✅ | ❌ | ❌ |
| Delete Own Posts | ✅ | ✅ | ❌ |
| Delete All Posts | ✅ | ❌ | ❌ |
| View Users | ✅ | ❌ | ❌ |
| Update User Roles | ✅ | ❌ | ❌ |
| Delete Users | ✅ | ❌ | ❌ |

## 🔑 Demo Accounts

After running `npm run seed`, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Editor | editor@example.com | editor123 |
| Viewer | viewer@example.com | viewer123 |

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "viewer"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Post Endpoints

#### Get All Posts
```http
GET /api/posts
Authorization: Bearer <token>
```

#### Get Single Post
```http
GET /api/posts/:id
Authorization: Bearer <token>
```

#### Create Post (Admin & Editor)
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Post",
  "content": "Post content here",
  "status": "published"
}
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "status": "published"
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

### User Management Endpoints (Admin Only)

#### Get All Users
```http
GET /api/users
Authorization: Bearer <token>
```

#### Update User Role
```http
PATCH /api/users/:id/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "editor"
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

## 🎨 Features in Detail

### Frontend Features

1. **Persistent Authentication**
   - JWT tokens stored in localStorage
   - Auto-login on page refresh
   - Automatic token refresh

2. **Protected Routes**
   - Frontend route protection based on roles
   - Automatic redirection for unauthorized access
   - Beautiful access denied pages

3. **Real-time Feedback**
   - Success/error messages
   - Loading states
   - Smooth animations

4. **Responsive Design**
   - Mobile-friendly interface
   - Tablet optimized
   - Desktop layouts

### Backend Features

1. **Security**
   - Password hashing with bcrypt
   - JWT token authentication
   - Role-based middleware
   - CORS enabled

2. **Validation**
   - Email format validation
   - Password strength requirements
   - Role validation
   - Input sanitization

3. **Error Handling**
   - Global error handler
   - Descriptive error messages
   - Status code management

## 🔒 Security Best Practices

1. **Environment Variables**: Sensitive data stored in `.env` file
2. **Password Hashing**: Passwords hashed with bcrypt (10 rounds)
3. **JWT Tokens**: Secure token generation with expiration
4. **Role Validation**: Both frontend and backend role checks
5. **Input Validation**: All inputs validated before processing
6. **CORS**: Configured for specific origins in production

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running
# For local MongoDB:
mongod

# For MongoDB Atlas: Check your connection string and network access
```

### Port Already in Use
```bash
# Change PORT in backend/.env or kill the process
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill -9
```

### CORS Issues
- Ensure backend is running on port 5000
- Check `apiClient.js` baseURL matches backend URL
- Verify CORS is enabled in `server.js`

## 📝 Development Notes

### Adding New Roles
1. Update User model enum in `backend/models/User.js`
2. Add role check logic in controllers
3. Update frontend role checks
4. Add UI elements for new role

### Customizing Permissions
- Modify middleware in `backend/middleware/roleCheck.js`
- Update route protection in `backend/routes/`
- Adjust frontend `ProtectedRoute` component

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Vansh 

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js team
- React team
- TailwindCSS team
- All open-source contributors

---

**Happy Coding! 🚀**

For questions or issues, please open an issue on GitHub.


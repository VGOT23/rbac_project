# Backend - RBAC System

## 📁 Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── authController.js  # Authentication logic (register, login)
│   ├── postController.js  # Post CRUD operations
│   └── userController.js  # User management (admin only)
├── middleware/
│   ├── auth.js            # JWT token verification
│   └── roleCheck.js       # Role-based authorization
├── models/
│   ├── User.js            # User schema with roles
│   └── Post.js            # Post schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── postRoutes.js      # Post endpoints
│   └── userRoutes.js      # User management endpoints
├── scripts/
│   └── seed.js            # Database seeding script
├── .env                   # Environment variables (create this!)
├── .env.example           # Example environment file
├── server.js              # Main server entry point
└── package.json           # Dependencies and scripts
```

## 🚀 Available Scripts

```bash
# Start server (production)
npm start

# Start server with nodemon (development)
npm run dev

# Seed database with demo users
npm run seed
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

### Posts (`/api/posts`)

- `GET /` - Get all posts (protected)
- `GET /:id` - Get single post (protected)
- `GET /my/posts` - Get current user's posts (protected)
- `POST /` - Create post (admin/editor)
- `PUT /:id` - Update post (admin/editor)
- `DELETE /:id` - Delete post (admin/editor)

### Users (`/api/users`)

- `GET /` - Get all users (admin only)
- `GET /:id` - Get single user (admin only)
- `PATCH /:id/role` - Update user role (admin only)
- `DELETE /:id` - Delete user (admin only)

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rbac-system
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **nodemon** - Development server (dev dependency)

## 🛡️ Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS enabled

## 🧪 Testing with Postman/Thunder Client

### 1. Register a User

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "role": "editor"
}
```

### 2. Login

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```

Save the token from the response!

### 3. Create a Post (use token)

```http
POST http://localhost:5000/api/posts
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my post",
  "status": "published"
}
```

## 📊 Database Models

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'editor', 'viewer']),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model

```javascript
{
  title: String,
  content: String,
  author: ObjectId (ref: User),
  status: String (enum: ['draft', 'published']),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Middleware

### `protect` (auth.js)

Verifies JWT token and attaches user to request:

```javascript
router.get('/protected', protect, controller);
```

### `checkRole` (roleCheck.js)

Restricts access based on roles:

```javascript
router.get('/admin', protect, checkRole(['admin']), controller);
router.post('/post', protect, checkRole(['admin', 'editor']), controller);
```

## 📝 Adding New Routes

1. Create controller in `controllers/`
2. Create route file in `routes/`
3. Apply middleware (`protect`, `checkRole`)
4. Mount route in `server.js`

Example:

```javascript
// routes/example.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');

router.get('/', protect, checkRole(['admin']), controller);

module.exports = router;

// server.js
app.use('/api/example', require('./routes/example'));
```

## 🐛 Debugging

Enable console logging by removing `NODE_ENV=production` from `.env`:

```env
# This will enable request logging
NODE_ENV=development
```

Check logs in the terminal where the server is running.

## 🚀 Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Railway

1. Connect your GitHub repo
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

---

For more details, see the main [README.md](../README.md)


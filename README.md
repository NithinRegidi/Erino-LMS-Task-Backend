# Erino Lead Management System - Backend

A robust Node.js backend API for managing leads with authentication, advanced filtering, and pagination capabilities.

## Features

- **User Authentication**: JWT-based authentication with secure cookie handling
- **Lead Management**: Complete CRUD operations for leads
- **Advanced Filtering**: Comprehensive filtering options for leads
- **Pagination**: Efficient pagination for large datasets
- **Data Validation**: Mongoose schema validation
- **Security**: bcrypt password hashing and JWT tokens

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv
- **CORS**: Cross-origin resource sharing enabled

## Project Structure

```
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── leadController.js     # Lead management logic
├── middleware/
│   └── authMiddleware.js     # JWT authentication middleware
├── models/
│   ├── Lead.js              # Lead schema
│   └── User.js              # User schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── leadRoutes.js        # Lead management routes
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies and scripts
└── server.js               # Application entry point
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Erino-LMS-Task-Backend.git
   cd Erino-LMS-Task-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npx nodemon server.js
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/logout` | User logout | No |
| GET | `/me` | Get current user | Yes |

### Lead Management Routes (`/api/leads`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create new lead | Yes |
| GET | `/` | Get leads (with filtering & pagination) | Yes |
| GET | `/:id` | Get lead by ID | Yes |
| PUT | `/:id` | Update lead | Yes |
| DELETE | `/:id` | Delete lead | Yes |

## Lead Model Schema

```javascript
{
  first_name: String (required),
  last_name: String (required),
  email: String (required, unique),
  phone: String,
  company: String,
  city: String,
  state: String,
  source: Enum ["website", "facebook_ads", "google_ads", "referral", "events", "other"],
  status: Enum ["new", "contacted", "qualified", "lost", "won"],
  score: Number (0-100),
  lead_value: Number,
  last_activity_at: Date,
  is_qualified: Boolean,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}

```

## Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: Tokens stored in secure, HTTP-only cookies
- **CORS Configuration**: Configured for frontend integration
- **Input Validation**: Mongoose schema validation

## Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Running in Development Mode
```bash
npx nodemon server.js
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Server port (default: 5000) | No |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support or questions, please open an issue in the GitHub repository.
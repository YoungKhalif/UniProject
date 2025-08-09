# Stack Tech - PC Building Website

Stack Tech is a full-stack web application for building and purchasing custom PCs and components. The application consists of a React frontend and an Express backend with a PostgreSQL database.

## Project Structure

```
stack-tech/
├── client/               # Frontend React application
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── assets/       # Images and other assets
│       ├── component/    # Reusable React components
│       ├── context/      # React context providers
│       ├── pages/        # Page components
│       └── services/     # API services
│
└── server/               # Backend Express application
    ├── config/           # Configuration files
    ├── controllers_sequelize/ # PostgreSQL controllers
    ├── database/         # Database connection
    ├── middleware/       # Express middleware
    ├── models_sequelize/ # Sequelize models
    └── routes_sequelize/ # Express routes
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Setup and Installation

### 1. Set up PostgreSQL Database

1. Install PostgreSQL if you haven't already.
2. Create a new database:
   ```sql
   CREATE DATABASE stack_tech_db;
   ```

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd stack-tech/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Edit the `.env` file with your PostgreSQL credentials.

4. Seed the database:
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on port 5000 by default.

### 3. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd stack-tech/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on port 5173 by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search` - Search products by term
- `POST /api/products` - Create a product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)

### Orders
- `POST /api/orders` - Create an order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/:id` - Get order by ID (Admin only)
- `PUT /api/orders/:id` - Update order status (Admin only)

### Configurations
- `POST /api/configs` - Create a configuration
- `GET /api/configs/user/:userId` - Get user configurations
- `GET /api/configs/:id` - Get configuration by ID
- `PUT /api/configs/:id` - Update a configuration
- `DELETE /api/configs/:id` - Delete a configuration

## Default Admin User

```
Email: admin@stacktech.com
Password: admin123
```

## Technologies Used

### Frontend
- React
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcryptjs

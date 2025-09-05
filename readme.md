# Inventory & Billing Management System

## Overview
A comprehensive RESTful API backend for managing inventory and billing operations. Built for small to medium-sized businesses, this system handles products, contacts, transactions, and reporting with a robust architecture.

## 🚀 Key Features
- **Authentication & Security**
  - JWT-based secure authentication
  - Password hashing with bcrypt
  - Protected API endpoints

- **Core Functionality**
  - Product & inventory management
  - Customer and vendor tracking
  - Sales and purchase transactions
  - Automated stock updates
  - Comprehensive reporting

- **Technical Features**
  - RESTful API architecture
  - Server-side validation
  - Modular & scalable codebase
  - CORS support

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT, bcrypt
- **Development**: Nodemon

## 📋 Prerequisites
- Node.js (v14+)
- npm
- MongoDB (local or Atlas)

## 🚦 Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/inventory-billing-backend.git

# Navigate to project directory
cd inventory-billing-backend

# Install dependencies
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/inventory_billing
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d
```

### Running the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint   | Description                |
|--------|------------|----------------------------|
| POST   | /register  | Register new user          |
| POST   | /login     | User login                 |
| GET    | /logout    | User logout                |

### Products
| Method | Endpoint           | Description          |
|--------|-------------------|---------------------|
| GET    | /products         | List all products   |
| POST   | /products         | Create product      |
| PUT    | /products/:id     | Update product      |
| DELETE | /products/:id     | Delete product      |
| PATCH  | /products/:id/stock| Update stock       |

### Contacts
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /contacts      | List all contacts   |
| POST   | /contacts      | Create contact      |
| PUT    | /contacts/:id  | Update contact      |
| DELETE | /contacts/:id  | Delete contact      |

### Transactions
| Method | Endpoint        | Description           |
|--------|----------------|-----------------------|
| GET    | /transactions  | List all transactions |
| POST   | /transactions  | Create transaction    |

### Reports
| Method | Endpoint            | Description          |
|--------|--------------------|--------------------|
| GET    | /reports/inventory  | Inventory summary   |
| GET    | /reports/transactions| Transaction report |

## 📁 Project Structure
```
inventory-billing-backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   └── app.js         # Entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 📄 License
This project is licensed under the MIT License.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support
For support, email support@example.com or create an issue in the repository.
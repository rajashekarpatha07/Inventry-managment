Inventory & Billing Management System - Backend
This repository contains the backend source code for the Inventory and Billing Management System. It's a robust RESTful API built with Node.js, Express, and MongoDB, designed to handle products, contacts, transactions, and reporting for small to medium-sized businesses.

Table of Contents
Features

Technologies Used

Prerequisites

Getting Started

Installation

Environment Variables

Running the Application

API Endpoints

Authentication

Products

Contacts (Customers/Vendors)

Transactions (Sales/Purchases)

Reports

Project Structure

License

Features
User Authentication: Secure user registration and login using JWT (JSON Web Tokens).

Product Management: CRUD operations for managing products and inventory stock.

Contact Management: Keep track of customers and vendors.

Transaction Handling: Record sales and purchase transactions, with automatic stock updates.

Reporting: Generate insightful reports on inventory status and transaction history.

Validation: Server-side validation for incoming data.

Scalable Structure: Organized and modular code structure for easy maintenance and future expansion.

Technologies Used
Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

Authentication: JSON Web Tokens (JWT), bcrypt for password hashing

Middleware: CORS, Express-Validator

Development: Nodemon for live-reloading

Prerequisites
Make sure you have the following installed on your local machine:

Node.js (v14 or newer)

npm (comes with Node.js)

MongoDB (running locally or a cloud instance like MongoDB Atlas)

Getting Started
Follow these instructions to get the project up and running on your local machine.

Installation
Clone the repository:

git clone [https://github.com/your-username/inventory-billing-backend.git](https://github.com/your-username/inventory-billing-backend.git)
cd inventory-billing-backend

Install dependencies:

npm install

Environment Variables
The application requires environment variables for configuration. Create a .env file in the root of the project and add the following variables.

# Port for the server to run on
PORT=3000

# Your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/inventory_billing

# Secret key for signing JWTs (change this to a long, random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# JWT token expiration time (e.g., 7d, 24h, 60m)
JWT_EXPIRE=7d

Running the Application
You can run the server in two modes:

Development Mode (with auto-reload):

npm run dev

The server will start on http://localhost:3000 and automatically restart on file changes.

Production Mode:

npm start

API Endpoints
The base URL for all API endpoints is /api. All protected routes require a Bearer Token in the Authorization header.

🔐 Authentication
Method

Endpoint

Description

POST

/register

Register a new user and their business.

POST

/login

Log in to get an authentication token.

GET

/logout

A placeholder endpoint for client-side logout.

POST /register

{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "businessName": "Test Business Inc."
}

📦 Products
Authentication required for all product routes.

Method

Endpoint

Description

GET

/products

Get all products. Supports query params search and category.

POST

/products

Create a new product.

PUT

/products/:id

Update a product by its ID.

DELETE

/products/:id

Delete a product by its ID.

PATCH

/products/:id/stock

Update a product's stock.

PATCH /products/:id/stock

{
    "quantity": 10,
    "operation": "increase" // or "decrease"
}

👤 Contacts (Customers/Vendors)
Authentication required for all contact routes.

Method

Endpoint

Description

GET

/contacts

Get all contacts. Supports query params type (customer or vendor) and search.

POST

/contacts

Create a new contact.

PUT

/contacts/:id

Update a contact by its ID.

DELETE

/contacts/:id

Delete a contact by its ID.

POST /contacts

{
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john.doe@email.com",
    "address": "123 Main St, Anytown",
    "type": "customer" // or "vendor"
}

🧾 Transactions (Sales/Purchases)
Authentication required for all transaction routes.

Method

Endpoint

Description

GET

/transactions

Get all transactions. Supports filtering by type, startDate, endDate, etc.

POST

/transactions

Create a new transaction (sale or purchase). Automatically updates product stock.

POST /transactions (for a Sale)

{
    "type": "sale",
    "customerId": "60d0fe4f5311236168a109ca",
    "products": [
        {
            "productId": "60d0fe4f5311236168a109cb",
            "quantity": 2,
            "price": 1150
        }
    ],
    "date": "2025-09-05"
}

📊 Reports
Authentication required for all report routes.

Method

Endpoint

Description

GET

/reports/inventory

Get a summary of inventory, including total value and low-stock items.

GET

/reports/transactions

Get a transaction report with summaries. Supports filtering by date, type, etc.

Project Structure
inventory-billing-backend/
├── src/
│   ├── controllers/    # Request handling logic
│   ├── middleware/     # Custom middleware (e.g., auth)
│   ├── models/         # Mongoose schemas and models
│   ├── routes/         # API route definitions
│   ├── utils/          # Utility functions (e.g., token generator)
│   └── app.js          # Main application entry point
├── .env                # Environment variables (ignored by git)
├── .gitignore          # Files to be ignored by git
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation

License
This project is licensed under the MIT License. See the LICENSE file for details.
# Food Delivery API

## Overview

This project implements a **RESTful API** for a Food Delivery Application. The backend system manages three types of users: **Admin**, **User**, and **Delivery Man**. The API enables functionalities like user authentication, food management, order placement, and order tracking. It includes role-based access control (RBAC), JWT authentication, transaction logging, and modularized code for ease of maintenance.

## Features

### 1. Authentication & Authorization
- **JWT Authentication**: Admin, User, and Delivery Man can log in using their credentials (email/username & password). A JWT token is generated upon successful login and is required to access protected routes.
- **Role-Based Authorization**: 
  - **Admin**: Full access to manage food items, view and manage orders, and user data.
  - **User**: Can place orders, view food items, and view their own order history.
  - **Delivery Man**: Can view and update orders assigned to them (mark orders as delivered).
- Role validation middleware ensures users can only access routes specific to their role.

### 2. User Management
- **Admin Model**: Stores admin credentials and role.
- **User Model**: Stores user details, credentials, and their role.
- **Delivery Man Model**: Stores delivery man credentials and assigned orders.
- **Endpoints** for login, registration, and role validation:
  - Admin can log in through `/auth/login-admin`
  - User can log in through `/auth/login-user`
  - Delivery Man can log in through `/auth/login-delivery-man`
  
### 3. Food Management (Admin only)
- **Food Model**: Manages food items like name, description, price, and category.
- **Endpoints** for adding, updating, and deleting food items (Admin only):
  - `GET /foods`: List all available food items.
  - `POST /foods`: Admin adds a new food item.
  - `PUT /foods/:id`: Admin edits an existing food item.
  - `DELETE /foods/:id`: Admin deletes a food item.

### 4. Order Management
- **Order Model**: Stores order details including user ID, food items, total price, status, and assigned delivery man.
- **Endpoints**:
  - `POST /orders`: User places a new order.
  - `GET /orders`: Admin can view all orders.
  - `GET /orders/:id`: Admin and User can view order details (User can only view their own orders).
  - `PUT /orders/:id/status`: Admin can update order status (e.g., from "pending" to "accepted" or "completed").
  - `GET /orders/assigned`: Delivery Man can view orders assigned to them.

### 5. Delivery Man Order Tracking
- **Delivery Man Model**: Manages delivery man details and assigned orders.
- **Endpoints**:
  - `GET /orders/assigned`: Delivery Man can view all orders assigned to them.
  - `PUT /orders/:id/delivered`: Delivery Man marks an order as delivered.
  
### 6. Transaction Logs (Optional but Recommended)
- **Transaction Log Model**: Tracks significant actions performed by users, such as logging in, creating orders, updating order status, and managing food items.
- **Endpoints** for Admin to view all transaction logs:
  - `GET /logs`: View transaction logs (Admin only).

## Installation

### Prerequisites
- **Node.js**: Version 14.x or higher
- **MongoDB**: MongoDB instance (either locally or using MongoDB Atlas)

### Setup

1. Clone the repository and navigate to the project folder.
2. Install dependencies by running `npm install`.
3. Set up the environment variables in a `.env` file:
   - `PORT=5000`
   - `MONGO_URI=<your_mongodb_connection_string>`
   - `JWT_SECRET=<your_jwt_secret_key>`
4. Run the application with `npm start`.

### API Documentation

#### Authentication Routes
- `POST /auth/login-admin`: Admin login.
- `POST /auth/login-user`: User login.
- `POST /auth/login-delivery-man`: Delivery Man login.

#### Food Management (Admin only)
- `GET /foods`: List food items.
- `POST /foods`: Add a new food item (Admin only).
- `PUT /foods/:id`: Update food item (Admin only).
- `DELETE /foods/:id`: Delete food item (Admin only).

#### Order Management
- `POST /orders`: Place a new order.
- `GET /orders`: View all orders (Admin only).
- `GET /orders/:id`: View order details (Admin and User can view their own orders).
- `PUT /orders/:id/status`: Update order status (Admin only).
- `GET /orders/assigned`: View orders assigned to a delivery man.

#### Delivery Man Order Tracking
- `PUT /orders/:id/delivered`: Delivery Man marks an order as delivered.

#### Transaction Logs (Optional)
- `GET /logs`: View transaction logs (Admin only).

## Security

- **Password Hashing**: Passwords are securely hashed using bcryptjs before storing them in the database.
- **JWT Secret**: The JWT tokens are signed using a secret key for secure communication and validation.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose for ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Role-Based Access Control (RBAC)**: Middleware for authorization checks

## Folder Structure
/controllers
  |-- auth.controller.js
  |-- delivery.controller.js
  |-- food.controller.js
  |-- order.controller.js
  |-- transaction.controller.js

/middlewares
  |-- auth.middleware.js
  |-- role.middleware.js
  |-- transaction.middleware.js

/models
  |-- admin.model.js
  |-- deliveryMan.model.js
  |-- food.model.js
  |-- order.model.js
  |-- transactionLog.model.js
  |-- user.model.js

/routes
  |-- auth.routes.js
  |-- delivery.routes.js
  |-- food.routes.js
  |-- order.routes.js
  |-- transaction.routes.js

/utils
  |-- logger.js


This folder structure represents the key components of your Food Delivery API project. Each section focuses on a different aspect of the API:

/controllers: Handles the logic for managing requests and responses related to the business functions like authentication, food management, orders, delivery, and transactions.
/middlewares: Includes custom middleware for authentication, role-based authorization, and transaction logging.
/models: Defines the Mongoose models for the data entities such as users, food, orders, and transactions.
/routes: Defines the route handling for each resource, ensuring that the correct controllers and middlewares are used.
/utils: Can include utility functions like logging or other helper methods.
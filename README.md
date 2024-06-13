## Bike rental service for tourists or locals.

## Project Overview

The Bike Rental Reservation System is designed to facilitate seamless bike rentals for tourists and locals in Cox's Bazar. This backend system allows users to rent bikes, manage bookings, and supports different functionalities based on user roles (users and admins). The core features include user authentication, bike management, and booking handling, ensuring an efficient and user-friendly experience.

# Technology Stack

- **Programming Language**: TypeScript
- **Framework**: Express.js for web framework.
- **Database**: MongoDB with Mongoose for ODM.
- **Authentication**: JWT for token-based authentication.
- **Validation**: Zod for schema validation.
- **Environment Configuration**: dotenv for managing environment variables.
- **bcrypt**: bcrypt for password hashing.

## API Endpoints

### User Routes

-   **Sign Up**: `/api/auth/signup` (POST)
-   **Login**: `/api/auth/login` (POST)
-   **Get Profile**: `/api/users/me` (GET)
-   **Update Profile**: `/api/users/me` (PUT)

### Bike Routes

-   **Create Bike (Admin Only)**: `/api/bikes` (POST)
-   **Get All Bikes**: `/api/bikes` (GET)
-   **Update Bike (Admin Only)**: `/api/bikes/:id` (PUT)
-   **Delete Bike (Admin Only)**: `/api/bikes/:id` (DELETE)

### Booking Routes

-   **Create Rental**: `/api/rentals` (POST)
-   **Return Bike (Admin Only)**: `/api/rentals/:id/return` (PUT)
-   **Get All Rentals for User**: `/api/rentals` (GET)

## Project Setup

### Prerequisites

-   Node.js (version >= 14.x)
-   MongoDB

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/AALabonya/Bike-Rental-Reservation-System-Backend.git
    cd Bike-Rental-Reservation-System-Backend
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Set up environment variables**

    Create a `.env` file in the root directory and add the following variables:

    ```bash
    NODE_ENV = development
    PORT = 5000
    DB_URI = mongodb+srv://<name>:<password>>@cluster0.waps95s.mongodb.net/<DatabasenName>?retryWrites=true&w=majority&appName=Cluster0
    BCRYPT_SALT_ROUNDS=12
    JWT_ACCESS_SECRET = accessSecret
    JWT_ACCESS_EXPIRE_IN = 0h
    ```

4. **Run the server**
    ```bash
    npm run build
    npm run start:dev
    ```

## Database Setup

**Environment File**: Create a .env file in your project’s root directory.

**MongoDB Installation and Running**: Ensure MongoDB is installed and running with appropriate credentials.

## Authentication

- Use JWT for authentication.
- Make sure you have a secure JWT_ACCESS_SECRET in the .env file.

## Zod Validation

Implement Zod to validate request data, ensuring the validation schemas are consistent with the data models to maintain data integrity.
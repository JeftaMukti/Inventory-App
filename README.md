---

# Inventory Management System

An Inventory Management System built with **Laravel 11** (for the backend API) and **ReactJS** (for the frontend). This system manages **purchases, distributions**, and **user roles** (admin, purchase, and distribution).

---

## Project Structure

- **Backend (API):** `inventory-api` (Laravel 11)
- **Frontend (App):** `inventory-app` (ReactJS)

---

## Table of Contents

1. [Installation](#installation)
   - [Backend (Laravel 11 API)](#backend-laravel-11-api)
   - [Frontend (ReactJS)](#frontend-reactjs)
2. [Environment Variables](#environment-variables)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)
5. [License](#license)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Backend (Laravel 11 API)

- Navigate to the `inventory-api` folder:

  ```bash
  cd inventory-api
  ```

- Install PHP dependencies:

  ```bash
  composer install
  ```

- Set up the environment:
  - Copy `.env.example` to `.env`:
  
    ```bash
    cp .env.example .env
    ```
  - Update the database configuration in the `.env` file.
  - Generate an application key:

    ```bash
    php artisan key:generate
    ```

- Run the migrations:

  ```bash
  php artisan migrate
  ```

- Start the Laravel development server:

  ```bash
  php artisan serve
  ```

### 3. Frontend (ReactJS)

- Navigate to the `inventory-app` folder:

  ```bash
  cd ../inventory-app
  ```

- Install the dependencies:

  ```bash
  npm install
  ```

- Start the React development server:

  ```bash
  npm start
  ```

---

## Backend (Laravel 11 API)

The Inventory API is built using Laravel 11, supporting the following:

- **User Roles**: Admin, Purchase, Distribution.
- **Inventory Management**: Handles purchase and distribution records.
- **RESTful API** with endpoints for managing users, products, purchases, and distributions.

---

## API Endpoints

| Method | Endpoint              | Description                  |
|--------|------------------------|------------------------------|
| GET    | `/api/products`       | List all products            |
| POST   | `/api/products`       | Create a new product         |
| PUT    | `/api/products/{id}`  | Update product details       |
| DELETE | `/api/products/{id}`  | Delete a product             |
| POST   | `/api/purchases`      | Record a product purchase    |
| POST   | `/api/distributions`  | Record product distribution  |

---

## Frontend (ReactJS)

The Inventory Frontend, built in ReactJS, provides a user interface to manage products, purchases, and distributions.

### Key Features

- **Dashboard**: Overview of stock levels and activities.
- **Product Management**: Add, update, and delete products.
- **Purchase and Distribution Tracking**: Manage inventory flow.
- **Role-based Access**: Different views for admin, purchase, and distribution users.

---

## Environment Variables

Both the Laravel API and React app require environment variables.

### Backend (Laravel)

In `inventory-api/.env`, set the following variables:

```plaintext
APP_NAME=InventoryAPI
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### Frontend (React)

In `inventory-app/.env` (create this if it doesn't exist), set the following:

```plaintext
REACT_APP_API_URL=http://localhost:8000/api
```

---

## Running the Application

1. Start the Laravel API server:
   ```bash
   cd inventory-api
   php artisan serve
   ```

2. Start the React frontend:
   ```bash
   cd ../inventory-app
   npm start
   ```

The frontend will be available at [http://localhost:3000](http://localhost:3000) and will interact with the API running at [http://localhost:8000](http://localhost:8000).

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

Enjoy building and managing your inventory system! 😊

---

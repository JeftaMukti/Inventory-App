Inventory Management System
This is an Inventory Management System built with Laravel 11 (for the backend API) and ReactJS (for the frontend). The system manages purchases, distributions, and user roles (admin, purchase, and distribution).

Project Structure
Backend (API): inventory-api (Laravel 11)
Frontend (App): inventory-app (ReactJS)
Table of Contents
Installation
Backend (Laravel 11 API)
Frontend (ReactJS)
Environment Variables
Running the Application
License
Installation
1. Clone the repository
bash
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
2. Backend (Laravel 11)
Navigate to the inventory-api folder:

bash
Copy code
cd inventory-api
Install the PHP dependencies:

bash
Copy code
composer install
Set up the environment:

Copy .env.example to .env:
bash
Copy code
cp .env.example .env
Update the database configuration in the .env file.
Generate an application key:

bash
Copy code
php artisan key:generate
Run the migrations:

bash
Copy code
php artisan migrate
Start the Laravel development server:

bash
Copy code
php artisan serve
3. Frontend (ReactJS)
Navigate to the inventory-app folder:

bash
Copy code
cd ../inventory-app
Install the dependencies:

bash
Copy code
npm install
Start the React development server:

bash
Copy code
npm start
Backend (Laravel 11 API)
The Inventory API is built using Laravel 11 and includes the following features:

User Roles: Admin, Purchase, Distribution.
Purchase and Distribution: Handles the inventory flow.
RESTful API with endpoints for users, products, stations, purchases, and distributions.
API Endpoints
Method	Endpoint	Description
GET	/api/products	List all products
POST	/api/products	Create a new product
PUT	/api/products/{id}	Update product details
DELETE	/api/products/{id}	Delete a product
POST	/api/purchases	Record a product purchase
POST	/api/distributions	Record product distribution
Frontend (ReactJS)
The Inventory Frontend is built using ReactJS and serves as the user interface for managing products, purchases, and distributions.

Key Features
Dashboard: Overview of stock levels and activity.
Product Management: Add, update, and delete products.
Purchase and Distribution Tracking: Manage incoming and outgoing inventory.
Role-based Access: Different UI views for admin, purchase, and distribution users.
Environment Variables
Both the Laravel API and React app require environment variables to be set for proper functioning.

Backend (Laravel)
In the inventory-api/.env file, set the following variables:

plaintext
Copy code
APP_NAME=InventoryAPI
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
Frontend (React)
In the inventory-app/.env file (create this if it doesn't exist), set the following:

plaintext
Copy code
REACT_APP_API_URL=http://localhost:8000/api
Running the Application
1. Start the Laravel API server:
bash
Copy code
cd inventory-api
php artisan serve
2. Start the React frontend:
bash
Copy code
cd ../inventory-app
npm start
The frontend will be available at http://localhost:3000 and will interact with the API running at http://localhost:8000.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Enjoy building and managing your inventory system! 😊

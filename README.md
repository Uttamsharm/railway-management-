# Railway Management System 🚉

A **Railway Management System** built with **Node.js** and **Express.js**, using Sequelize as the ORM and MySQL as the database. The system allows admins to manage trains and users to book seats, check seat availability, and view booking details.

---

## Features ✨

- **Admin Features:**
  - Add new trains.
  - Update train seat availability.
  
- **User Features:**
  - Register and log in.
  - View train seat availability.
  - Book train seats.
  - Check booking details.

---

## Technologies Used 🛠️

- **Backend:** Node.js, Express.js
- **Database:** MySQL (via Sequelize ORM)
- **Authentication:** JSON Web Tokens (JWT)
- **Environment Management:** `dotenv`
- **Validation:** Custom middlewares for API keys and roles

---

## Setup Instructions 🖥️

### Prerequisites:
- Install **Node.js** and **npm** from [Node.js Official Website](https://nodejs.org/).
- Install **MySQL** and ensure it is running.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/railway-management.git
cd railway-management

## Install Dependencies
npm install

##  Configure Environment Variables

Create a .env file in the root directory and add the following:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=railway_management
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret
ADMIN_API_KEY=your_admin_api_key

## API Endpoints
    Admin Routes
Method	Endpoint	Description
POST	/api/admin/add-train	Add a new train
PUT	/api/admin/update-seats/:trainId	Update train seats

## User Routes
Method	Endpoint	Description
POST	/api/user/register	Register a new user
POST	/api/user/login	Login for existing users
GET	/api/user/trains/availability	Check train availability
POST	/api/user/book-seat	Book a seat
GET	/api/user/booking/:bookingId	Get booking details

## Folder Structure 📂
bash
Copy code
railway-management/
├── controllers/       # Route handlers
├── middlewares/       # Authentication & validation
├── models/            # Sequelize models
├── routes/            # API routes
├── config/            # Database configuration
├── .env               # Environment variables
├── .gitignore         # Ignored files
├── app.js             # Application entry point
├── README.md          # Project documentation



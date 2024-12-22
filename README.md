# STARTUP KANO GPS-BASED ATTENDANCE SYSTEM

Hub GPS is an attendance management system that uses geofencing and time-based restrictions to mark attendance. The system is built using Node.js, Express, and MySQL.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Attendance](#attendance)
  - [Admin](#admin)
- [Project Structure](#project-structure)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/xclusive09/hub-gps.git
    cd hub-gps
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```properties
    AIVEN_DB_HOST=mysql-20847264-e-attendance-statrup-kano.h.aivencloud.com
    AIVEN_DB_USER=avnadmin
    AIVEN_DB_PASSWORD=AVNS_CD69PKXdXFW7ZCyB9Do
    AIVEN_DB_NAME=attendance_system
    AIVEN_DB_PORT=23829
    PORT=5000
    JWT_SECRET=423b9e1e262fc7fbc135cf3fe1574d3a042130b5b0d74333df037ee69d1615816c64316fa884b5037c091017313b4622a2d8d4294331c97c30613935c4adf23f

    OFFICE_LATITUDE=11.969484892832641
    OFFICE_LONGITUDE=8.557645371472917
    OFFICE_RADIUS=10 // radius in km for office geofencing
    OPENING_HOURS=07:00:00
    CLOSING_HOURS=18:00:00

    EMAIL_USER=xclusive@startupkano.com
    EMAIL_PASS=@Xclusive09
    FRONTEND_URL=https://startupqr.vercel.app/

    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=adminpassword
    ADMIN_FULL_NAME="Admin User"
    ADMIN_USER_NAME=admin
    ADMIN_PHONE_NUMBER=1234567890
    ADMIN_ROLE=admin
    CREATED_AT=$(date +'%Y-%m-%dT%H:%M:%S%z') # Current datetime can be set dynamically

    # CORS Configuration
    CORS_ORIGIN=*
    ```

4. **Run the server:**
    ```bash
    npm start
    ```

## Configuration

The configuration is managed using environment variables. The `config/env.js` file loads these variables and exports them for use throughout the application.

## Usage

Once the server is running, you can interact with the API using tools like Postman or cURL. The server listens on the port specified in the `.env` file (default is 5000).

## API Endpoints

### Authentication

- **Sign Up**
    ```http
    POST /auth/signup
    ```
    **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "fullName": "John Doe",
      "userName": "johndoe",
      "phoneNumber": "1234567890",
      "role": "user"
    }
    ```

- **Sign In**
    ```http
    POST /auth/signin
    ```
    **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **Forgot Password**
    ```http
    POST /auth/forgot-password
    ```
    **Request Body:**
    ```json
    {
      "email": "user@example.com"
    }
    ```

- **Reset Password**
    ```http
    POST /auth/reset-password
    ```
    **Request Body:**
    ```json
    {
      "token": "resetToken",
      "newPassword": "newPassword123"
    }
    ```

### Attendance

- **Mark Attendance**
    ```http
    POST /attendance/mark
    ```
    **Headers:**
    ```http
    Authorization: Bearer <token>
    ```
    **Request Body:**
    ```json
    {
      "latitude": 11.969548890880134,
      "longitude": 8.557612051980156
    }
    ```

- **Get Personal Records**
    ```http
    GET /attendance/records
    ```
    **Headers:**
    ```http
    Authorization: Bearer <token>
    ```

### Admin

- **Admin Login**
    ```http
    POST /admin/login
    ```
    **Request Body:**
    ```json
    {
      "email": "admin@example.com",
      "password": "adminpassword"
    }
    ```

- **Get All Users**
    ```http
    GET /admin/users
    ```
    **Headers:**
    ```http
    Authorization: Bearer <token>
    ```

- **Get All Attendance Records**
    ```http
    GET /admin/attendance-records
    ```
    **Headers:**
    ```http
    Authorization: Bearer <token>
    ```

- **Get Attendance Records for a Specific Day**
    ```http
    GET /admin/attendance-records/:date
    ```
    **Headers:**
    ```http
    Authorization: Bearer <token>
    ```

- **Get Attendance Records for a Specific User**
    ```http
    GET /admin/user-attendance/:userId
    ```
    **Headers:**
    ```http
    Authorization: Bearer <token>
    ```

## Project Structure

```plaintext
hub-gps/
├── controllers/
│   ├── adminController.js
│   ├── attendanceController.js
│   ├── authController.js
│   └── qrController.js
├── models/
│   ├── attendanceModel.js
│   └── userModel.js
├── routes/
│   ├── adminRoutes.js
│   ├── attendanceRoutes.js
│   ├── authRoutes.js
│   └── qrRoutes.js
├── utils/
│   ├── initializeAdmin.js
│   ├── middleware.js
│   ├── mysqlClient.js
│   └── supabaseClient.js
├── config/
│   └── env.js
├── .env
├── .gitattributes
├── .gitignore
├── app.js
├── babel.config.js
├── package.json
├── README.md
└── records.sql
# STARTUP KANO QR CODE ATTENDANCE

Hub QR is an attendance management system that uses geofencing and time-based restrictions to mark attendance. The system is built using Node.js, Express, and Supabase.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/xclusive09/hub-qr.git
    cd hub-qr
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    DB_HOST=localhost
DB_USER=fakeuser
DB_PASSWORD=fakepassword
DB_NAME=fake_database
PORT=5000
JWT_SECRET=fake_jwt_secret
OFFICE_LATITUDE=12.345678
OFFICE_LONGITUDE=98.765432
OFFICE_RADIUS=0.1
OPENING_HOURS=07:00:00
CLOSING_HOURS=18:00:00
EMAIL_USER=fakeemail@example.com
EMAIL_PASS=fakeemailpassword
FRONTEND_URL=http://fake-frontend-url.com
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

- **Get Attendance Records**
    ```http
    GET /admin/attendance-records
    ```
    **Headers:**
    ```http
    Authorization: Bearer <token>
    ```

### QR Code

- **Generate QR Code**
    ```http
    GET /qr/generate
    ```
    **Headers:**
    ```http
    Authorization: Bearer <token>
    ```

## Project Structure

```plaintext
hub-qr/
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
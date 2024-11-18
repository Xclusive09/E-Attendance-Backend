# STARTUP KANO  QR CODE ATTENDANCE

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

    ```env
    PORT=5000
    JWT_SECRET=your_jwt_secret
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    OFFICE_LATITUDE=your_office_latitude
    OFFICE_LONGITUDE=your_office_longitude
    OFFICE_RADIUS=0.1 // radius in km for office geofencing
    OPENING_HOURS=07:00:00
    CLOSING_HOURS=18:00:00
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
      "fullName": "Joh Doe",
     "userName": "johoe",
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

### Attendance

- **Mark Attendance**

    ```http
    POST /attendance/mark-attendance
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

- **Get Attendance Records**

    ```http
    GET /admin/attendance-records
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
│   └── authController.js
├── models/
│   ├── attendanceModel.js
│   └── userModel.js
├── routes/
│   ├── adminRoutes.js
│   ├── attendanceRoutes.js
│   └── authRoutes.js
├── utils/
│   ├── middleware.js
│   └── supabaseClient.js
├── config/
│   └── env.js
├── .env
├── app.js
├── package.json
└── README.md
CREATE DATABASE IF NOT EXISTS attendance_system;

USE attendance_system;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  role VARCHAR(50),
  reset_token VARCHAR(255),
  reset_token_expiry BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  user_name VARCHAR(255) NOT NULL, -- Add this line to store the user name
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  qr_code_hash VARCHAR(255), -- Add this line to store the hashed QR code text
  FOREIGN KEY (user_id) REFERENCES users(id)
);
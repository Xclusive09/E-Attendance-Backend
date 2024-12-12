import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import pool from '../utils/mysqlClient.js';

export const User = {

  

  // Method to create a new user
  createUser: async (email, password, fullName, userName, phoneNumber, role, createdAt) => {
    try {
      console.log('createUser input:', { email, password, fullName, userName, phoneNumber, role, createdAt });
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);
      const [result] = await pool.query(
        'INSERT INTO users (email, password, full_name, user_name, phone_number, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [email, hashedPassword, fullName, userName, phoneNumber, role, createdAt]
      );
      console.log('Query result:', result);
      return { data: { id: result.insertId }, error: null };
    } catch (error) {
      console.error('Error executing query:', error.message);
      return { data: null, error: error.message };
    }
  },

  getAdminByEmail: async (email) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, 'admin']);
      return rows;
    } catch (error) {
      console.error('Error retrieving admin by email:', error.message);
      throw error;
    }
  },

  
  // Method to get user details by userId
  getUserDetails: async (userId) => {
    try {
      const [rows] = await pool.query(
        'SELECT id, user_name FROM users WHERE id = ?',
        [userId]
      );
      if (rows.length > 0) {
        return { data: rows[0], error: null };
      }
      return { data: null, error: 'User not found' };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },


  // Method to login user
  loginUser: async (email, password) => {
    try {
      const [rows] = await pool.query(
        'SELECT id, password FROM users WHERE email = ?',
        [email]
      );
      if (rows.length > 0) {
        const isMatch = await bcrypt.compare(password, rows[0].password);
        return isMatch ? { data: { user: { id: rows[0].id } }, error: null } : { data: null, error: 'Invalid email or password' };
      }
      return { data: null, error: 'Invalid email or password' };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Method to reset password
  resetPassword: async (token, newPassword) => {
    try {
      const [rows] = await pool.query(
        'SELECT email FROM users WHERE reset_token = ? AND reset_token_expiry > ?',
        [token, Date.now()]
      );

      if (rows.length === 0) {
        return { data: null, error: 'Invalid or expired reset token' };
      }

      const email = rows[0].email;
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const [result] = await pool.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?',
        [hashedPassword, email]
      );

      return { data: { affectedRows: result.affectedRows }, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Method to update the reset token
  updateResetToken: async (email, token, expiry) => {
    try {
      const [result] = await pool.query(
        'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
        [token, expiry, email]
      );
      return { data: { affectedRows: result.affectedRows }, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },
};

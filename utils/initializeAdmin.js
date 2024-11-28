import { User } from '../models/userModel.js';
import pool from './mysqlClient.js';
import bcrypt from 'bcryptjs';

const initializeAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminFullName = process.env.ADMIN_FULL_NAME;
  const adminUserName = process.env.ADMIN_USER_NAME;
  const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;
  const adminRole = process.env.ADMIN_ROLE;
  const createdAt = new Date(process.env.CREATED_AT);

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE role = ?', [adminRole]);
    if (rows.length === 0) {
       /*
      const result = await User.createUser(adminEmail, adminPassword, adminFullName, adminUserName, adminPhoneNumber, adminRole, createdAt);
      if (result.error) {
        console.error('Error creating admin user:', result.error);
      } else {
        console.log('Admin user created');
      }
        */
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error.message);
  }
};

export default initializeAdmin;
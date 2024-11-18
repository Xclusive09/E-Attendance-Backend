import bcrypt from 'bcryptjs';
import pool from './mysqlClient.js';

const initializeAdmin = async () => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'adminpassword';
  const adminFullName = 'Admin User';
  const adminUserName = 'admin';
  const adminPhoneNumber = '1234567890';
  const adminRole = 'admin';

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE role = ?', [adminRole]);
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await pool.query(
        'INSERT INTO users (email, password, full_name, user_name, phone_number, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [adminEmail, hashedPassword, adminFullName, adminUserName, adminPhoneNumber, adminRole, new Date()]
      );
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error.message);
  }
};

initializeAdmin();

export default initializeAdmin;
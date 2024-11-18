import { Attendance } from '../models/attendanceModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../utils/mysqlClient.js';
import config from '../config/env.js';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, 'admin']);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: admin.id, role: admin.role }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
};

export const getAttendanceRecords = async (req, res) => {
  try {
    const data = await Attendance.getAttendanceRecords();
    res.status(200).json({ attendanceRecords: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
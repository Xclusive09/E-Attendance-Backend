import { Attendance } from '../models/attendanceModel.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/env.js';
import pool from '../utils/mysqlClient.js'; 

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Admin login attempt:', { email, password }); // Debug log

    const rows = await User.getAdminByEmail(email);
    if (rows.length === 0) {
      console.log('Admin not found'); // Debug log
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Password does not match'); // Debug log
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: admin.id, role: admin.role }, config.jwtSecret, { expiresIn: '1d' });
    console.log('Admin login successful:', { token }); // Debug log
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during admin login:', error.message);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json({ users: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export const getAllAttendanceForDay = async (req, res) => {
  const { date } = req.params;

  try {
    const records = await Attendance.getAllAttendanceForDay(date);
    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve attendance records for the day' });
  }
};

export const getUserAttendanceRecords = async (req, res) => {
  const { userId } = req.params;

  try {
    const records = await Attendance.getPersonalRecords(userId);
    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user attendance records' });
  }
};
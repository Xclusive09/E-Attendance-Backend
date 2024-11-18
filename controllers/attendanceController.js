import { Attendance } from '../models/attendanceModel.js';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export const markAttendance = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const userName = decoded.userName;

    await Attendance.markAttendance(userName);
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};
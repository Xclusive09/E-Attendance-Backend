import { Attendance } from '../models/attendanceModel.js';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export const markAttendance = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    await Attendance.markAttendance(userId);
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error.message);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

export const getPersonalRecords = async (req, res) => {
  const { userId } = req;

  try {
    const records = await Attendance.getPersonalRecords(userId);
    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve records' });
  }
};
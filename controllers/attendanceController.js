import { Attendance } from '../models/attendanceModel.js';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export const markAttendance = async (req, res) => {
  const { token, qrText } = req.query;

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const userName = decoded.userName;

    // Verify the QR code text
    const isMatch = await Attendance.verifyQRCode(userName, qrText);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid QR code text' });
    }

    await Attendance.markAttendance(userName, qrText);
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
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
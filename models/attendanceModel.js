import pool from '../utils/mysqlClient.js';
import bcrypt from 'bcryptjs';

export const Attendance = {
  markAttendance: async (userName, qrCodeText) => {
    const hashedText = await bcrypt.hash(qrCodeText, 10);
    const [result] = await pool.query(
      'INSERT INTO attendance (user_name, timestamp, qr_code_hash) VALUES (?, ?, ?)',
      [userName, new Date(), hashedText]
    );
    return result;
  },

  verifyQRCode: async (userName, qrCodeText) => {
    const [rows] = await pool.query(
      'SELECT qr_code_hash FROM attendance WHERE user_name = ? ORDER BY timestamp DESC LIMIT 1',
      [userName]
    );
    if (rows.length === 0) {
      return false;
    }
    const isMatch = await bcrypt.compare(qrCodeText, rows[0].qr_code_hash);
    return isMatch;
  },

  getAttendanceRecords: async () => {
    const [rows] = await pool.query(
      'SELECT * FROM attendance ORDER BY timestamp DESC'
    );
    return rows;
  },
};
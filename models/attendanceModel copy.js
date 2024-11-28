import pool from '../utils/mysqlClient.js';
import bcrypt from 'bcryptjs';

export const Attendance = {
  markAttendance: async (userId, qrCodeText) => {
    try {
      const hashedText = await bcrypt.hash(qrCodeText, 10);
      const [result] = await pool.query(
        'INSERT INTO attendance (user_id, timestamp, qr_code_hash) VALUES (?, ?, ?)',
        [userId, new Date(), hashedText]
      );
      console.log('Attendance marked:', result);
      return result;
    } catch (error) {
      console.error('Error marking attendance:', error.message);
      throw error;
    }
  },

  verifyQRCode: async (qrCodeText) => {
    try {
      const [rows] = await pool.query(
        'SELECT qr_code_hash FROM qr_code_hash'
      );
      if (rows.length === 0) {
        console.log('No QR code hash found');
        return false;
      }
      const isMatch = await bcrypt.compare(qrCodeText, rows[0].qr_code_hash);
      console.log('QR code verification result:', isMatch);
      return isMatch;
    } catch (error) {
      console.error('Error verifying QR code:', error.message);
      throw error;
    }
  },

  getPersonalRecords: async (userId) => {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM attendance WHERE user_id = ? ORDER BY timestamp DESC',
        [userId]
      );
      console.log('Personal records retrieved:', rows);
      return rows;
    } catch (error) {
      console.error('Error retrieving personal records:', error.message);
      throw error;
    }
  },
};
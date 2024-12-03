import pool from '../utils/mysqlClient.js';

export const Attendance = {
  markAttendance: async (userId, userName) => {
    try {
      const [result] = await pool.query(
        'INSERT INTO attendance (user_id, user_name, timestamp) VALUES (?, ?, ?)',
        [userId, userName, new Date()]
      );

      console.log('Attendance marked:', result);
      return result;
    } catch (error) {
      console.error('Error marking attendance:', error.message);
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
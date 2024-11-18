import pool from '../utils/mysqlClient.js';

export const Attendance = {
  markAttendance: async (userName) => {
    const [result] = await pool.query(
      'INSERT INTO attendance (user_name, timestamp) VALUES (?, ?)',
      [userName, new Date()]
    );
    return result;
  },

  getAttendanceRecords: async () => {
    const [rows] = await pool.query(
      'SELECT * FROM attendance ORDER BY timestamp DESC'
    );
    return rows;
  },
};
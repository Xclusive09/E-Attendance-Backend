import request from 'supertest';
import app from '../app.js'; // Ensure this path is correct
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

const token = jwt.sign({ userId: 1 }, config.jwtSecret, { expiresIn: '1d' });

describe('Admin Controller', () => {
  it('should get attendance records', async () => {
    const res = await request(app)
      .get('/admin/attendance-records')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('attendanceRecords');
  });
});
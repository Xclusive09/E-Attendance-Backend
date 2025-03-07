import request from 'supertest';
import app from '../app.js'; // Ensure this path is correct
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

describe('Attendance Controller', () => {
  let token;

  beforeAll(async () => {
    // Sign in to get a valid token
    const res = await request(app)
      .post('/auth/signin')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    token = res.body.token;
  });

  it('should mark attendance', async () => {
    const res = await request(app)
      .post('/attendance/mark')
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 11.969548890880134,
        longitude: 8.557612051980156
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Attendance marked successfully');
  });

  it('should return error for missing latitude and longitude', async () => {
    const res = await request(app)
      .post('/attendance/mark')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Latitude and longitude are required');
  });

  it('should return error for outside office location', async () => {
    const res = await request(app)
      .post('/attendance/mark')
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 0,
        longitude: 0
      });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('error', 'Outside office location');
  });

  it('should return error for outside office hours', async () => {
    jest.spyOn(Date.prototype, 'toTimeString').mockReturnValue('06:00:00 GMT');
    const res = await request(app)
      .post('/attendance/mark')
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 11.969548890880134,
        longitude: 8.557612051980156
      });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('error', 'Outside office hours');
  });
});
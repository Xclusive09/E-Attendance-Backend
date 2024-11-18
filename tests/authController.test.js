import request from 'supertest';
import app from '../app.js'; // Ensure this path is correct

describe('Auth Controller', () => {
  it('should sign up a user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        fullName: "Joh Doe",
       UserName: "johoe",
       phoneNumber: "1234567890",
       role: "user"
        
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Sign-up successful, please verify your email.');
  });

  it('should sign in a user', async () => {
    const res = await request(app)
      .post('/auth/signin')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should send a password reset link', async () => {
    const res = await request(app)
      .post('/auth/forgot-password')
      .send({
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Password reset link sent to email.');
  });
});
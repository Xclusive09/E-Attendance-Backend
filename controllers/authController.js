import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import config from '../config/env.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const signup = async (req, res) => {
  const { email, password, fullName, userName, phoneNumber, role } = req.body;
  const createdAt = new Date();

  try {
    console.log('Signup data:', { email, password, fullName, userName, phoneNumber, role, createdAt });
    const result = await User.createUser(email, password, fullName, userName, phoneNumber, role, createdAt);
    if (result.error) return res.status(400).json({ error: result.error });

    res.status(200).json({ message: 'Sign-up successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.loginUser(email, password);
    if (result.error) return res.status(400).json({ error: result.error });

    const token = jwt.sign({ userId: result.data.user.id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// This function handles the forgot password functionality by resetting the user's password
// and sending a password reset link to the user's email.

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a random reset token and set an expiry time (1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Update the user's record with the reset token and expiry date
    const result = await User.updateResetToken(email, resetToken, resetTokenExpiry);
    if (result.error) return res.status(400).json({ error: result.error });

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // use environment variable
        pass: process.env.EMAIL_PASS, // use environment variable
      },
    });

    // Define email content
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`; // use environment variable
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Use the following link to reset your password: ${resetUrl}. This link will expire in 1 hour.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');

    return res.status(200).json({ message: 'Password reset link sent to email.' });
  } catch (error) {
    console.error('Error in forgotPassword:', error.message);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};


export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const result = await User.resetPassword(token, newPassword);
    if (result.error) return res.status(400).json({ error: result.error });

    return res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while resetting your password.' });
  }
};
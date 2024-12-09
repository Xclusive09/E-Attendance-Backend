import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export const getUserProfile = async (req, res) => {
  const { userId } = req;

  try {
    const userDetails = await User.getUserDetails(userId);
    if (userDetails.error) {
      return res.status(400).json({ error: userDetails.error });
    }
    res.status(200).json({ user: userDetails.data });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};
import { Attendance } from '../models/attendanceModel.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

const getDistance = (loc1, loc2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
  const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const markAttendance = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded.userId;

    const userDetails = await User.getUserDetails(userId);
    if (userDetails.error) {
      return res.status(400).json({ error: userDetails.error });
    }
    const userName = userDetails.data.user_name;

    const userLocation = { lat: latitude, lng: longitude };
    const officeLocation = { lat: config.officeLatitude, lng: config.officeLongitude };
    const distance = getDistance(userLocation, officeLocation);

    if (distance > config.officeRadius) {
      return res.status(403).json({ error: 'Outside office location' });
    }

    await Attendance.markAttendance(userId, userName);
    res.status(200).json({
      message: 'Attendance marked successfully',
      userLocation,
      officeLocation,
      radius: config.officeRadius
    });
  } catch (error) {
    console.error('Error marking attendance:', error.message);
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
import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  officeLatitude: parseFloat(process.env.OFFICE_LATITUDE),
  officeLongitude: parseFloat(process.env.OFFICE_LONGITUDE),
  officeRadius: parseFloat(process.env.OFFICE_RADIUS),
  openingHours: process.env.OPENING_HOURS,
  closingHours: process.env.CLOSING_HOURS,
};

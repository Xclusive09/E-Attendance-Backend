import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  dbHost: process.env.AIVEN_DB_HOST, // Update this line
  dbUser: process.env.AIVEN_DB_USER, // Update this line
  dbPassword: process.env.AIVEN_DB_PASSWORD, // Update this line
  dbName: process.env.AIVEN_DB_NAME, // Update this line
  officeLatitude: parseFloat(process.env.OFFICE_LATITUDE),
  officeLongitude: parseFloat(process.env.OFFICE_LONGITUDE),
  officeRadius: parseFloat(process.env.OFFICE_RADIUS),
  openingHours: process.env.OPENING_HOURS,
  closingHours: process.env.CLOSING_HOURS,
};
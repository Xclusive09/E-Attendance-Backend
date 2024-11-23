import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  dbHost: process.env.AIVEN_DB_HOST,
  dbUser: process.env.AIVEN_DB_USER,
  dbPassword: process.env.AIVEN_DB_PASSWORD,
  dbName: process.env.AIVEN_DB_NAME,
  dbPort: process.env.AIVEN_DB_PORT, // Add this line
  officeLatitude: parseFloat(process.env.OFFICE_LATITUDE),
  officeLongitude: parseFloat(process.env.OFFICE_LONGITUDE),
  officeRadius: parseFloat(process.env.OFFICE_RADIUS),
  openingHours: process.env.OPENING_HOURS,
  closingHours: process.env.CLOSING_HOURS,
  corsOrigin: process.env.CORS_ORIGIN,
  corsMethods: process.env.CORS_METHODS,
  corsAllowedHeaders: process.env.CORS_ALLOWED_HEADERS,
  corsCredentials: process.env.CORS_CREDENTIALS === 'true',
};

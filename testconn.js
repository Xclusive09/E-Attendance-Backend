import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.AIVEN_DB_HOST,
  user: process.env.AIVEN_DB_USER,
  password: process.env.AIVEN_DB_PASSWORD,
  database: process.env.AIVEN_DB_NAME,
};

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection(config);
    console.log('Connected to Aiven MySQL database');
    await connection.end();
  } catch (error) {
    console.error('Error connecting to Aiven MySQL database:', error.message);
  }
};

testConnection();
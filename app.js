import express from 'express';
import cors from 'cors';
import config from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import qrRoutes from './routes/qrRoutes.js';
import initializeAdmin from './utils/initializeAdmin.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/admin', adminRoutes);
app.use('/qr', qrRoutes);

// Ensure initializeAdmin is only called once
initializeAdmin();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
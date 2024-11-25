import express from 'express';
import { markAttendance } from '../controllers/attendanceController.js';
import { authenticateUser } from '../utils/middleware.js';

const router = express.Router();

router.post('/mark', authenticateUser, markAttendance);
router.get('/records', authenticateUser, getPersonalRecords);

export default router;

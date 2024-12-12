import express from 'express';
import { adminLogin, getUsers, getAttendanceRecords, getAllAttendanceForDay, getUserAttendanceRecords } from '../controllers/adminController.js';
import { authenticateAdmin } from '../utils/middleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', authenticateAdmin, getUsers);
router.get('/attendance-records', authenticateAdmin, getAttendanceRecords);
router.get('/attendance-records/:date', authenticateAdmin, getAllAttendanceForDay);
router.get('/user-attendance/:userId', authenticateAdmin, getUserAttendanceRecords);

export default router;
import express from 'express';
import { adminLogin, getUsers, getAttendanceRecords } from '../controllers/adminController.js';
import { authenticateAdmin } from '../utils/middleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', authenticateAdmin, getUsers);
router.get('/attendance-records', authenticateAdmin, getAttendanceRecords);

export default router;
import express from 'express';
import { generateQRCode } from '../controllers/qrController.js';
import { authenticateUser } from '../utils/middleware.js';

const router = express.Router();

router.get('/generate', authenticateUser, generateQRCode);

export default router;
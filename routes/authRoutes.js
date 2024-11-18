import express from 'express';
import { signup, signin, forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword); // Password reset route


export default router;

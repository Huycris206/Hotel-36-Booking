import express from 'express';
import { sendVerification, verifyCode } from '../controllers/verficationController.js';

const router = express.Router();

// Endpoint: /api/verifications
router.post("/send", sendVerification);   // Gửi OTP
router.post("/verify", verifyCode);       // Kiểm tra OTP

export default router;
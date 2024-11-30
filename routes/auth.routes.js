import express from 'express';
import { loginAdmin, loginUser, loginDeliveryMan } from '../controllers/auth.controller.js';

const router = express.Router();

// Admin login
router.post('/login-admin', loginAdmin);

// User login
router.post('/login-user', loginUser);

// Delivery Man login
router.post('/login-delivery-man', loginDeliveryMan);

export default router;

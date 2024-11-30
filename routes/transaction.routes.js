import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { getTransactionLogs } from '../controllers/transaction.controller.js';

const router = express.Router();

// Admin views all transaction logs
router.get('/', authenticate, authorize(['admin']), getTransactionLogs);

export default router;

import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import {
    placeOrder,
    viewAllOrders,
    viewOrderById,
    updateOrderStatus,
} from '../controllers/order.controller.js';

const router = express.Router();

// User places a new order
router.post('/', authenticate, authorize(['user']), placeOrder);

// Admin views all orders
router.get('/', authenticate, authorize(['admin']), viewAllOrders);

// Admin or User views a specific order
router.get('/:id', authenticate, viewOrderById);

// Admin updates the order status
router.put('/:id/status', authenticate, authorize(['admin']), updateOrderStatus);

export default router;

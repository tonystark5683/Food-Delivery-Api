import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import {
    viewAssignedOrders,
    markOrderDelivered,
} from '../controllers/delivery.controller.js';

const router = express.Router();

// Delivery Man views assigned orders
router.get('/assigned-orders', authenticate, authorize(['deliveryMan']), viewAssignedOrders);

// Delivery Man marks an order as delivered
router.put('/:id/delivered', authenticate, authorize(['deliveryMan']), markOrderDelivered);

export default router;

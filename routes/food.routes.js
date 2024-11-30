import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import {
    getAllFoods,
    addFood,
    updateFood,
    deleteFood,
} from '../controllers/food.controller.js';

const router = express.Router();

// List all food items
router.get('/', getAllFoods);

// Add a new food item (Admin only)
router.post('/', authenticate, authorize(['admin']), addFood);

// Update a food item (Admin only)
router.put('/:id', authenticate, authorize(['admin']), updateFood);

// Delete a food item (Admin only)
router.delete('/:id', authenticate, authorize(['admin']), deleteFood);

export default router;

import { Order } from '../models/order.model.js';

export const getAssignedOrders = async (req, res) => {
    try {
        const { id } = req.user; // User ID from JWT
        const orders = await Order.find({ assignedDeliveryMan: id }).populate('foodItems.foodId', 'name price');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch assigned orders.', error: error.message });
    }
};

export const markOrderDelivered = async (req, res) => {
    try {
        const { id } = req.params; // Order ID
        const order = await Order.findOneAndUpdate(
            { _id: id, assignedDeliveryMan: req.user.id },
            { status: 'delivered' },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found or not assigned to you.' });
        }
        res.status(200).json({ message: 'Order marked as delivered.', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to mark order as delivered.', error: error.message });
    }
};

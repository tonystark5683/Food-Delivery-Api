import { Order } from '../models/order.model.js';

export const placeOrder = async (req, res) => {
    try {
        const { foodItems, totalPrice } = req.body;
        const userId = req.user.id; // User ID from JWT
        const order = new Order({ userId, foodItems, totalPrice, status: 'pending' });
        await order.save();
        res.status(201).json({ message: 'Order placed successfully.', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to place order.', error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name').populate('foodItems.foodId', 'name price');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders.', error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('userId', 'name').populate('foodItems.foodId', 'name price');
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order details.', error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order status updated.', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status.', error: error.message });
    }
};

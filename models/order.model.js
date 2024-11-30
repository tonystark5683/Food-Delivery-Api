import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    foodItems: [{
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
        quantity: { type: Number, required: true, min: 1 },
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in-transit', 'delivered', 'cancelled'],
        default: 'pending',
    },
    assignedDeliveryMan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryMan',
    },
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const deliveryManSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'deliveryMan',
    },
    assignedOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],
}, { timestamps: true });

deliveryManSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const DeliveryMan = mongoose.model('DeliveryMan', deliveryManSchema);

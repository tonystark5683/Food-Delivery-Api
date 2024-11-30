import mongoose from 'mongoose';

const transactionLogSchema = new mongoose.Schema({
    actionType: {
        type: String,
        required: true,
        enum: ['login', 'createOrder', 'updateOrder', 'manageFood'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userRole',
    },
    userRole: {
        type: String,
        required: true,
        enum: ['Admin', 'User', 'DeliveryMan'],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: Object,
    },
}, { timestamps: true });

export const TransactionLog = mongoose.model('TransactionLog', transactionLogSchema);

import { TransactionLog } from '../models/transactionLog.model.js';

export const getTransactionLogs = async (req, res) => {
    try {
        const logs = await TransactionLog.find().populate('userId', 'name email role');
        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch transaction logs.', error: error.message });
    }
};

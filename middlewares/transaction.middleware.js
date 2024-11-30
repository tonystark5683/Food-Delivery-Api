import { TransactionLog } from '../models/transactionLog.model.js';

export const logTransaction = async (req, res, next) => {
    try {
        const log = new TransactionLog({
            userId: req.user.id,
            action: req.method + ' ' + req.originalUrl,
            timestamp: new Date(),
        });
        await log.save();
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: 'Failed to log transaction.', error: error.message });
    }
};

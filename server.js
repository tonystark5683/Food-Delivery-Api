import express from 'express';
import authRoutes from './routes/auth.routes.js';
import deliveryRoutes from './routes/delivery.routes.js';
import foodRoutes from './routes/food.routes.js';
import orderRoutes from './routes/order.routes.js';
import transactionRoutes from './routes/transaction.routes.js';

const app = express();


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

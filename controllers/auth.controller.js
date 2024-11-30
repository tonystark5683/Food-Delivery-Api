import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Admin, User, DeliveryMan } from '../models/index.js';

const generateToken = (user) => {
    const payload = { id: user._id, role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Email, password, and role are required.' });
        }

        let user;
        if (role === 'admin') user = await Admin.findOne({ email });
        else if (role === 'user') user = await User.findOne({ email });
        else if (role === 'deliveryMan') user = await DeliveryMan.findOne({ email });
        else return res.status(400).json({ message: 'Invalid role provided.' });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};

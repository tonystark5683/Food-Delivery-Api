import { Food } from '../models/food.model.js';

export const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json({ foods });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch food items.', error: error.message });
    }
};

export const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const food = new Food({ name, description, price, category });
        await food.save();
        res.status(201).json({ message: 'Food item added successfully.', food });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add food item.', error: error.message });
    }
};

export const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const food = await Food.findByIdAndUpdate(id, updates, { new: true });
        if (!food) {
            return res.status(404).json({ message: 'Food item not found.' });
        }
        res.status(200).json({ message: 'Food item updated successfully.', food });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update food item.', error: error.message });
    }
};

export const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findByIdAndDelete(id);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found.' });
        }
        res.status(200).json({ message: 'Food item deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete food item.', error: error.message });
    }
};

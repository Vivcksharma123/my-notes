const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// User registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, date } = req.body;
        const user = new User({ name, email, password, date });
        await user.save();
        res.json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ message: 'Login successful', userId: user._id, name: user.name });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Test endpoint
router.get('/register', (req, res) => {
    res.json({ message: 'Use POST method to register a user' });
});

module.exports = router;

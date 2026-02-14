const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/jsonDb');
const { v4: uuidv4 } = require('uuid'); // Need to install uuid, or use simple random ID

// @route   POST api/auth/register
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    try {
        const users = readData('users');
        let user = users.find(u => u.email === email);

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = {
            id: uuidv4(),
            name,
            email,
            password, // In real app, hash this!
            date: new Date()
        };

        users.push(user);
        writeData('users', users);

        res.status(201).json({ msg: 'User registered successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    try {
        const users = readData('users');
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        res.json({ msg: 'Login successful', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

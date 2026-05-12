const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register (Admin tool)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, code, group } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role, code, group });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dual Login Logic
router.post('/login', async (req, res) => {
    try {
        const { email, password, isProf } = req.body;
        let user;

        if (isProf) {
            // Login for Prof/Admin via Email
            user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'Compte introuvable!' });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect!' });
        } else {
            // Login for Student via Name (email field) and Code (password field)
            // Note: In our frontend, we send Name as 'email' and Code as 'password' for students
            user = await User.findOne({ 
                name: { $regex: new RegExp(`^${email.trim()}$`, 'i') }, 
                code: password.trim() 
            });
            if (!user) return res.status(404).json({ message: 'Smiya wlla Code ghaltin!' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                role: user.role, 
                group: user.group, 
                code: user.code, 
                absences: user.absences,
                grades: user.grades
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

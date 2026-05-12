const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all students (for Admin/Prof)
router.get('/', async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update student (Grades/Absences)
router.put('/:id', async (req, res) => {
    try {
        const { grades, absences } = req.body;
        const student = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: { grades, absences } }, 
            { new: true }
        );
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new student (Admin)
router.post('/', async (req, res) => {
    try {
        const { name, code, group, password } = req.body;
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password || '123456', 10);
        const newUser = new User({ name, code, group, password: hashedPassword, role: 'student' });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete student
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

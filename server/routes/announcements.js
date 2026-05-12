const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get all
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post new
router.post('/', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newAnnounce = new Announcement({ title, content, author });
        await newAnnounce.save();
        res.status(201).json(newAnnounce);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

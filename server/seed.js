const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');
const Announcement = require('./models/Announcement');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Announcement.deleteMany({});

        const hashedPassword = await bcrypt.hash('123456', 10);

        // Create Admin
        await User.create({
            name: 'Admin Masar',
            email: 'admin@test.com',
            password: hashedPassword,
            role: 'admin'
        });

        // Create Prof
        await User.create({
            name: 'Ahmed El Mansouri',
            email: 'prof@test.com',
            password: hashedPassword,
            role: 'prof'
        });

        // Create Student
        await User.create({
            name: 'Zakaria Mansour',
            code: 'STU001',
            password: hashedPassword,
            role: 'student',
            group: 'G1',
            absences: 2,
            grades: { 'Mathématiques': '18', 'Français': '15' }
        });

        // Create Announcement
        await Announcement.create({
            title: 'Bienvenue sur Massar Pro',
            content: 'Le nouveau portail de gestion scolaire ISTA AZILAL est désormais en ligne.',
            author: 'Administration'
        });

        console.log('✅ Seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
};

seedData();

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['prof', 'student'], default: 'student' },
    filiere: { type: String }, // For students
    group: { type: String }   // For students
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, 
    password: { type: String, required: true },
    code: { type: String, unique: true, sparse: true },  
    role: { type: String, enum: ['admin', 'prof', 'student'], default: 'student' },
    group: { type: String },
    absences: { type: Number, default: 0 },
    profilePic: { type: String, default: '' },
    grades: { type: Map, of: String, default: {} } 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

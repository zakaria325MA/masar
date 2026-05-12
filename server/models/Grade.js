const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    prof_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Grade', GradeSchema);

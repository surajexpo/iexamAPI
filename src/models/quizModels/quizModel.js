const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false } // marks correct option
});

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [optionSchema], // array of options
    explanation: { type: String }, // optional: why answer is correct
    marks: { type: Number, default: 1 }
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['GK', 'Science', 'Math', 'History', 'Other'], // example categories
        default: 'Other'
    },
    questions: [questionSchema],
    timeLimit: {
        type: Number, // in minutes
        default: 30
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);

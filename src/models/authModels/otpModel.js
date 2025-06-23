const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
}, {
    timestamps: true,
    strict: false,
    collection: 'OTPModel'
});

const OTPModel = mongoose.model('OTPModel', otpSchema);
module.exports = OTPModel;
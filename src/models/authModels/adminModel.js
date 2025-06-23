const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String },
    number: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    status: { type: Boolean, default: true },
},
    {
        timestamps: true,
        collection: 'admins',
        strict: false
    }
);

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})
const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
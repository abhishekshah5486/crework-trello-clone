const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// User Schema
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4,
        unique: true
    },
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
    isLoggedIn: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
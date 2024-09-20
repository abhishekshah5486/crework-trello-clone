const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TaskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['to-do', 'in-progress', 'under-review', 'finished']
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'urgent']
    },
    deadline: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        ref: 'users'
    }
}, {
    timestamps: true
})

const TaskModel = mongoose.model('tasks', TaskSchema);
module.exports = TaskModel;
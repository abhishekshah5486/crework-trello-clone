const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TaskSchema = new mongoose.Schema({
    taskID: {
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
        enum: ['To do', 'In Progress', 'Under review', 'Finished']
    },
    priority: {
        type: String,
        required: false,
        enum: ['Low', 'Medium', 'Urgent']
    },
    deadline: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
}, {
    timestamps: true
})

const TaskModel = mongoose.model('tasks', TaskSchema);
module.exports = TaskModel;
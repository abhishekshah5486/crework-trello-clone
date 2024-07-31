const taskModel = require('../models/taskModel');

// Create a task 
exports.createTask = async (req, res) => {
    try {
        
        const newTask = new taskModel({
            title: req.body.title,
            status: req.body.status,
            priority: req.body.priority,
            deadline: req.body.deadline,
            description: req.body.description,
            userID: req.body.userID
        })
        const savedTask = await newTask.save();

        res.status(201).send({
            success: true,
            message: "Task created successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}

// Update a task by ID




// Delete a task by ID

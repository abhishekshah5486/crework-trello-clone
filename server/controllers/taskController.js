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
        })
        const savedTask = await newTask.save();

        // Respond with the created task
        res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task: savedTask
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

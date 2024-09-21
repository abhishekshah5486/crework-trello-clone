const taskModel = require('../models/taskModel');

// Retrieve a task by ID
exports.retrieveTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const retrievedTask = await taskModel.findOne({taskId: taskId});
        if (retrievedTask) {
            // Respond with the retrieved task
            res.status(200).json({
                success: true,
                message: "Task retrieved successfully.",
                task: retrievedTask
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}

// Create a task 
exports.createTask = async (req, res) => {
    try {
        
        const newTask = new taskModel({
            title: req.body.title,
            status: req.body.status,
            priority: req.body.priority,
            deadline: req.body.deadline,
            description: req.body.description,
            userId: req.body.userId
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
exports.updateTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = await taskModel.findOneAndUpdate({taskId: taskId}, req.body, {new: true});
        if (updatedTask)
        {
            // Respond with the updated task
            res.status(200).json({
                success: true,
                message: "Task updated successfully.",
                task: updatedTask
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}

// Delete a task by ID
exports.deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await taskModel.findOneAndDelete(taskId);
        if (deletedTask) {
            // Respond with the deleted task
            res.status(200).json({
                success: true,
                message: "Task deleted successfully.",
                task: deletedTask
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}

// Retrieve all tasks by status
exports.retrieveTasksByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const retrievedTasks = await taskModel.find({status: status});

        // Respond with the retrieved tasks
        res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully.",
            tasks: retrievedTasks
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });  
    }
}

// Update task status by ID
exports.updateTaskStatusById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const newStatus = req.body.status;

        const updatedTask = await taskModel.findOneAndUpdate({taskId: taskId}, {status: newStatus}, {new: true});
        if (updatedTask) 
        {
            // Respond with the updated task
            res.status(200).json({
                success: true,
                message: "Task status updated successfully.",
                task: updatedTask
            });
        }   
        else 
        {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}
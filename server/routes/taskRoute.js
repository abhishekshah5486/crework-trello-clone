const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/taskController');

// Retrieve a task by id
router.get('/tasks/:id', taskControllers.retrieveTaskById);
// Create a task
router.post('/tasks', taskControllers.createTask);
// Update a task by id
router.patch('/tasks/:id', taskControllers.updateTaskById);
// Delete a task by id
router.delete('/tasks/:id', taskControllers.deleteTaskById);
// Retrieve all tasks by status
router.get('/tasks/status/:status', taskControllers.retrieveTasksByStatus);

// Retrieve all tasks by userId and task status
router.get('/tasks/user/:userId/status/:status', taskControllers.retrieveAllTasksByUserIdAndStatus);

// Update task status by id
router.patch('/tasks/status/:id', taskControllers.updateTaskStatusById);

// Retrieve all tasks
router.get('/tasks', taskControllers.retrieveAllTasks);

// Retrieve all tasks by userId
router.get('/tasks/by-user/:userId', taskControllers.retrieveAllTasksByUserId);

module.exports = router;

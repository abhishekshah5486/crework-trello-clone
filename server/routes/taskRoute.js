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

module.exports = router;

const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/taskController');

// Create a task
router.post('/tasks', taskControllers.createTask);
// Update a task by id
// router.patch('/tasks/:id', taskControllers.updateTask);
// Delete a task by id
// router.delete('/tasks/:id', taskControllers.deleteTask);

module.exports = router;

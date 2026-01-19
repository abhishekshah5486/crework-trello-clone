const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const userControllers = require('../controllers/userController');
// Define a route for the root URL

// Retrieve user by id
router.get('/users/:id', userControllers.retrieveUserById);

// Create a new user
router.post('/users/signup', userControllers.registerUser);

// Login an existing user
router.post('/users/login', userControllers.loginUser);

// Update user by id
router.patch('/users/:id', userControllers.updateUserById);

// Delete user by id
router.delete('/users/:id', userControllers.deleteUserById);

// Logout user
router.post('/users/logout/:id', userControllers.logoutUser);

// Validate the bearer token and return the user
router.get('/get-current-user', authMiddleware, userControllers.getCurrentUser);
module.exports = router;
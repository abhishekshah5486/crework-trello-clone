const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userController');
// Define a route for the root URL
router.get('/', userControllers.getUserDetails);


router.post('/signup', userControllers.registerUser);
router.post('/login', userControllers.loginUser);
module.exports = router;
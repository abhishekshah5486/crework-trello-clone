const express = require('express');
const app = express();
const router = express.Router();

const userControllers = require('../controllers/userController');
const userModel = require('../models/userModel');
// Define a route for the root URL
router.get('/', userControllers.getUserDetails);


router.post('/signup', userControllers.registerUser);
module.exports = router;
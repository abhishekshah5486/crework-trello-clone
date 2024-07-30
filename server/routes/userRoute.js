const express = require('express');
const app = express();
const router = express.Router();

const userControllers = require('../controllers/userController');
// Define a route for the root URL
router.get('/', userControllers.getUserDetails);

module.exports = router;
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');


// Routes
router.route('/createuser').post(registerController.createUser); // Create a user
router.route('/getusers').get(registerController.getAllUsers); // Get all users
router.route('/login').post(registerController.userLogin);

module.exports = router;

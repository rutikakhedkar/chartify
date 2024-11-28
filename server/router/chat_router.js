const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');


// Routes
router.route('/createchat').post(chatController.upload.single("attachment"), chatController.createChat ); // Create a user
router.route('/getchat').get(chatController.getAllMessages); // Get all users


module.exports = router;